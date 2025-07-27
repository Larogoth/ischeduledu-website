import { sanitizeErrorMessage } from './security';

// Production-safe error handling
export class SafeError extends Error {
  public readonly originalError: Error | unknown;
  public readonly userMessage: string;
  public readonly context?: string;

  constructor(userMessage: string, originalError?: Error | unknown, context?: string) {
    super(userMessage);
    this.name = 'SafeError';
    this.userMessage = userMessage;
    this.originalError = originalError;
    this.context = context;
  }
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Safe error logging
export const logSafeError = (
  error: Error | unknown,
  context: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM
): void => {
  const sanitizedMessage = sanitizeErrorMessage(error);
  const timestamp = new Date().toISOString();
  
  const logData = {
    timestamp,
    context,
    severity,
    message: sanitizedMessage,
    userAgent: navigator.userAgent.substring(0, 100),
    url: window.location.pathname
  };

  switch (severity) {
    case ErrorSeverity.CRITICAL:
      console.error(`[CRITICAL] ${context}:`, logData);
      break;
    case ErrorSeverity.HIGH:
      console.error(`[HIGH] ${context}:`, logData);
      break;
    case ErrorSeverity.MEDIUM:
      console.warn(`[MEDIUM] ${context}:`, logData);
      break;
    case ErrorSeverity.LOW:
      console.info(`[LOW] ${context}:`, logData);
      break;
  }
};

// Create user-friendly error messages
export const createUserError = (
  technicalError: Error | unknown,
  userContext: string,
  fallbackMessage: string = 'An unexpected error occurred'
): SafeError => {
  let userMessage = fallbackMessage;

  if (technicalError instanceof Error) {
    // Map technical errors to user-friendly messages
    if (technicalError.message.includes('JSON')) {
      userMessage = 'The schedule data format is invalid. Please check that the share link is complete.';
    } else if (technicalError.message.includes('base64') || technicalError.message.includes('decode')) {
      userMessage = 'Unable to read the schedule data. The share link may be corrupted.';
    } else if (technicalError.message.includes('network') || technicalError.message.includes('fetch')) {
      userMessage = 'Network error occurred. Please check your connection and try again.';
    } else if (technicalError.message.includes('validation')) {
      userMessage = 'The schedule data contains invalid information and could not be loaded.';
    }
  }

  return new SafeError(userMessage, technicalError, userContext);
};

// Error boundary helper
export const handleAsyncError = async <T>(
  operation: () => Promise<T>,
  context: string,
  fallbackMessage?: string
): Promise<{ success: true; data: T } | { success: false; error: SafeError }> => {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const safeError = createUserError(error, context, fallbackMessage);
    logSafeError(error, context, ErrorSeverity.MEDIUM);
    return { success: false, error: safeError };
  }
};

// Validation error handling
export const handleValidationError = (
  errors: string[],
  context: string
): SafeError => {
  const userMessage = errors.length === 1 
    ? `Validation error: ${errors[0]}`
    : `Multiple validation errors found. Please check the schedule data.`;
  
  const technicalError = new Error(`Validation failed: ${errors.join(', ')}`);
  logSafeError(technicalError, context, ErrorSeverity.LOW);
  
  return new SafeError(userMessage, technicalError, context);
};

// Add the missing handleSecureError function
export const handleSecureError = (
  error: Error | unknown,
  context: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM
): void => {
  logSafeError(error, context, severity);
};
