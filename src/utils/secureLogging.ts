// Secure logging utility for production safety
// For GitHub Pages, we'll sanitize logs but allow them (since it's static hosting)
const allowLogging = true;

interface LogLevel {
  DEBUG: 'debug';
  INFO: 'info';
  WARN: 'warn';
  ERROR: 'error';
}

const LOG_LEVELS: LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

// Sanitize sensitive data from logs
const sanitizeLogData = (data: any): any => {
  if (typeof data === 'string') {
    // Don't log full base64 encoded data
    if (data.length > 100 && /^[A-Za-z0-9+/=]+$/.test(data)) {
      return `[BASE64_DATA:${data.length}chars]`;
    }
    // Don't log full URLs with data parameters
    if (data.includes('data=') && data.length > 200) {
      return data.replace(/data=[^&]+/, 'data=[REDACTED]');
    }
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.toLowerCase().includes('data') && typeof value === 'string' && value.length > 100) {
        sanitized[key] = `[LARGE_DATA:${value.length}chars]`;
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizeLogData(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  
  return data;
};

class SecureLogger {
  private log(level: string, message: string, data?: any) {
    // Always log but sanitize sensitive data
    if (!allowLogging) {
      return;
    }

    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    const timestamp = new Date().toISOString();
    
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(`[${timestamp}] DEBUG: ${message}`, sanitizedData);
        break;
      case LOG_LEVELS.INFO:
        console.info(`[${timestamp}] INFO: ${message}`, sanitizedData);
        break;
      case LOG_LEVELS.WARN:
        console.warn(`[${timestamp}] WARN: ${message}`, sanitizedData);
        break;
      case LOG_LEVELS.ERROR:
        console.error(`[${timestamp}] ERROR: ${message}`, sanitizedData);
        break;
    }
  }

  debug(message: string, data?: any) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  info(message: string, data?: any) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  error(message: string, data?: any) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }
}

export const secureLogger = new SecureLogger();

// Legacy console replacement for sensitive areas
export const secureConsole = {
  log: (message: string, ...args: any[]) => secureLogger.info(message, args),
  debug: (message: string, ...args: any[]) => secureLogger.debug(message, args),
  info: (message: string, ...args: any[]) => secureLogger.info(message, args),
  warn: (message: string, ...args: any[]) => secureLogger.warn(message, args),
  error: (message: string, ...args: any[]) => secureLogger.error(message, args),
}; 