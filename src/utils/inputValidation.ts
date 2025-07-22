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
  maxEventsCount: 100, // Increased from 50
  maxUrlParamSize: 500000, // Increased from 100KB to 500KB
  allowedTimeFormats: [
    /^\d{1,2}:\d{2}\s?(AM|PM)$/i,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    /^\d+$/, // Unix timestamp
    /^\d{1,2}:\d{2}$/, // 24-hour format without AM/PM
    /.*/ // Allow any format - let the app handle time parsing
  ]
};

// XSS-safe HTML encoding
export const encodeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// More lenient schedule data validation
export const validateScheduleData = (data: any, schema: ScheduleValidationSchema = DEFAULT_VALIDATION_SCHEMA): {
  isValid: boolean;
  sanitizedData: any;
  errors: string[];
} => {
  const errors: string[] = [];
  let sanitizedData = { ...data };

  try {
    console.log('Validating schedule data:', data);

    // Validate schedule name - be more lenient
    if (data.name) {
      if (typeof data.name === 'string') {
        if (data.name.length > schema.maxScheduleNameLength) {
          sanitizedData.name = data.name.substring(0, schema.maxScheduleNameLength);
        } else {
          sanitizedData.name = data.name; // Keep original name, just basic sanitization
        }
      } else {
        sanitizedData.name = 'Untitled Schedule';
      }
    } else {
      sanitizedData.name = data.scheduleName || 'Untitled Schedule';
    }

    // Validate schedule type - be more permissive
    const allowedTypes = ['custom', 'generated', 'imported', 'shared', 'default'];
    if (data.type && typeof data.type === 'string') {
      sanitizedData.type = allowedTypes.includes(data.type) ? data.type : 'custom';
    } else {
      sanitizedData.type = 'custom';
    }

    // Handle legacy scheduleType field
    if (data.scheduleType && typeof data.scheduleType === 'string') {
      sanitizedData.scheduleType = allowedTypes.includes(data.scheduleType) ? data.scheduleType : 'custom';
    }

    // Validate events array - be more lenient
    const eventsArray = data.events || data.setEvents || [];
    if (Array.isArray(eventsArray)) {
      if (eventsArray.length > schema.maxEventsCount) {
        console.warn(`Too many events (${eventsArray.length}), truncating to ${schema.maxEventsCount}`);
        sanitizedData.events = eventsArray.slice(0, schema.maxEventsCount);
      } else {
        sanitizedData.events = eventsArray;
      }

      // Sanitize individual events with minimal validation
      sanitizedData.events = sanitizedData.events.map((event: any, index: number) => {
        const sanitizedEvent = { ...event };

        // Event name - keep original or provide fallback
        if (event.name && typeof event.name === 'string') {
          sanitizedEvent.name = event.name.length > schema.maxEventNameLength 
            ? event.name.substring(0, schema.maxEventNameLength)
            : event.name;
        } else if (event.title && typeof event.title === 'string') {
          sanitizedEvent.name = event.title.length > schema.maxEventNameLength 
            ? event.title.substring(0, schema.maxEventNameLength)
            : event.title;
        } else {
          sanitizedEvent.name = `Event ${index + 1}`;
        }

        // Time fields - accept any format, let the app handle parsing
        ['startTime', 'endTime', 'start', 'end'].forEach(timeField => {
          if (event[timeField]) {
            sanitizedEvent[timeField] = event[timeField];
          }
        });

        // Color data - validate but provide fallback
        if (event.colorData && typeof event.colorData === 'object') {
          const { red, green, blue } = event.colorData;
          if (typeof red === 'number' && typeof green === 'number' && typeof blue === 'number') {
            // Allow colors outside 0-1 range, some apps might use 0-255
            sanitizedEvent.colorData = event.colorData;
          } else {
            sanitizedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 }; // Default blue
          }
        } else {
          sanitizedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 }; // Default blue
        }

        return sanitizedEvent;
      });
    } else {
      // No events is still valid
      sanitizedData.events = [];
    }

    // Preserve other fields that might be important
    if (data.userId) {
      sanitizedData.userId = data.userId;
    }

    console.log('Validation completed successfully:', sanitizedData);

  } catch (error) {
    console.error('Schedule validation error:', error);
    errors.push('Failed to validate schedule data structure');
  }

  return {
    isValid: errors.length === 0,
    sanitizedData,
    errors
  };
};

// More lenient URL parameter validation
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

  // Only check for the most obvious malicious patterns
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:\s*[^;]+/gi,
    /on\w+\s*=\s*["\'][^"\']*["\']>/gi
  ];

  const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(param));
  if (hasSuspiciousContent) {
    console.warn('Suspicious content detected in parameter');
    return { isValid: false, error: 'Suspicious content detected in parameter' };
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
