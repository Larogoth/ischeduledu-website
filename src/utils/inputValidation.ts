
import { sanitizeInput, validateFormInput } from './security';

// Enhanced validation schemas for schedule data
export interface ScheduleValidationSchema {
  maxScheduleNameLength: number;
  maxEventNameLength: number;
  maxEventsCount: number;
  maxUrlParamSize: number;
  allowedTimeFormats: RegExp[];
}

export const DEFAULT_VALIDATION_SCHEMA: ScheduleValidationSchema = {
  maxScheduleNameLength: 500,
  maxEventNameLength: 200,
  maxEventsCount: 100,
  maxUrlParamSize: 2000000, // Increased to 2MB for large schedules
  allowedTimeFormats: [
    /.*/ // Allow any format - let the app handle time parsing
  ]
};

// XSS-safe HTML encoding
export const encodeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Real schedule validation that matches iOS app structure
export const validateScheduleData = (data: any, schema: ScheduleValidationSchema = DEFAULT_VALIDATION_SCHEMA): {
  isValid: boolean;
  sanitizedData: any;
  errors: string[];
} => {
  const errors: string[] = [];
  let sanitizedData = { ...data };

  try {
    console.log('Validating schedule data:', data);

    // Check if we have a valid data structure
    if (!data || typeof data !== 'object') {
      errors.push('Invalid data structure');
      return { isValid: false, sanitizedData: {}, errors };
    }

    // Handle schedule name - iOS app likely uses 'name' field
    if (data.name && typeof data.name === 'string') {
      sanitizedData.name = data.name.trim();
    } else {
      sanitizedData.name = 'Imported Schedule';
    }

    // Handle schedule start/end times if they exist
    if (data.startTime) {
      sanitizedData.startTime = data.startTime;
    }
    if (data.endTime) {
      sanitizedData.endTime = data.endTime;
    }

    // Handle schedule type
    sanitizedData.type = data.type || 'imported';

    // Handle version and compression info
    if (typeof data.version === 'number') {
      sanitizedData.version = data.version;
    }
    if (typeof data.compressed === 'boolean') {
      sanitizedData.compressed = data.compressed;
    }

    // Handle events - look for events array
    if (data.events && Array.isArray(data.events)) {
      sanitizedData.events = data.events.map((event: any, index: number) => {
        const sanitizedEvent: any = {};

        // Event name
        if (event.name && typeof event.name === 'string') {
          sanitizedEvent.name = event.name.trim();
        } else {
          sanitizedEvent.name = `Event ${index + 1}`;
        }

        // Event start time
        if (event.startTime) {
          sanitizedEvent.startTime = event.startTime;
        } else if (event.start) {
          sanitizedEvent.startTime = event.start;
        }

        // Event end time  
        if (event.endTime) {
          sanitizedEvent.endTime = event.endTime;
        } else if (event.end) {
          sanitizedEvent.endTime = event.end;
        }

        // Event color
        if (event.colorData) {
          sanitizedEvent.colorData = event.colorData;
        } else if (event.color) {
          sanitizedEvent.colorData = event.color;
        } else {
          // Default blue color
          sanitizedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 };
        }

        // Keep any other event properties
        Object.keys(event).forEach(key => {
          if (!sanitizedEvent.hasOwnProperty(key)) {
            sanitizedEvent[key] = event[key];
          }
        });

        return sanitizedEvent;
      });
    } else {
      sanitizedData.events = [];
    }

    // Preserve other top-level properties
    Object.keys(data).forEach(key => {
      if (!sanitizedData.hasOwnProperty(key)) {
        sanitizedData[key] = data[key];
      }
    });

    console.log('Validation completed successfully:', sanitizedData);

  } catch (error) {
    console.error('Schedule validation error:', error);
    errors.push('Failed to process schedule data');
  }

  return {
    isValid: errors.length === 0,
    sanitizedData,
    errors
  };
};

// Proper URL parameter validation for base64 data
export const validateUrlParameter = (param: string, maxSize: number = DEFAULT_VALIDATION_SCHEMA.maxUrlParamSize): {
  isValid: boolean;
  error?: string;
} => {
  if (typeof param !== 'string') {
    return { isValid: false, error: 'Parameter must be a string' };
  }

  if (param.length > maxSize) {
    return { isValid: false, error: `Parameter too large (max ${maxSize} bytes)` };
  }

  // Only block really dangerous scripts
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:\s*[^;]+/gi,
    /<iframe[^>]*>/gi,
    /eval\s*\(/gi
  ];

  const hasDangerousContent = dangerousPatterns.some(pattern => pattern.test(param));
  if (hasDangerousContent) {
    console.warn('Dangerous content detected in parameter');
    return { isValid: false, error: 'Dangerous content detected' };
  }

  // Validate base64 format - allow URL-safe base64 characters
  if (param.length > 10) {
    const urlSafeBase64Pattern = /^[A-Za-z0-9+/\-_=]*$/;
    if (!urlSafeBase64Pattern.test(param)) {
      console.warn('Invalid base64 characters detected in parameter:', param.substring(0, 50));
      return { isValid: false, error: 'Invalid characters in data parameter' };
    }
  }

  return { isValid: true };
};

// Safe text rendering with XSS protection
export const renderSafeText = (text: string | undefined, fallback: string = ''): string => {
  if (!text || typeof text !== 'string') {
    return fallback;
  }

  // Basic sanitization only
  return text.replace(/[<>]/g, '');
};

// Validation for external API requests (translation)
export const validateTranslationInput = (text: string): {
  isValid: boolean;
  sanitizedText: string;
  error?: string;
} => {
  if (typeof text !== 'string') {
    return { isValid: false, sanitizedText: '', error: 'Input must be a string' };
  }

  if (text.length > 1000) {
    return { isValid: false, sanitizedText: '', error: 'Text too long for translation' };
  }

  // Basic sanitization
  const sanitizedText = text.replace(/[<>]/g, '');
  
  return { isValid: true, sanitizedText };
};
