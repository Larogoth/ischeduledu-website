
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
  maxEventsCount: 50,
  maxUrlParamSize: 100000, // 100KB
  allowedTimeFormats: [
    /^\d{1,2}:\d{2}\s?(AM|PM)$/i,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    /^\d+$/ // Unix timestamp
  ]
};

// XSS-safe HTML encoding
export const encodeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Enhanced schedule data validation
export const validateScheduleData = (data: any, schema: ScheduleValidationSchema = DEFAULT_VALIDATION_SCHEMA): {
  isValid: boolean;
  sanitizedData: any;
  errors: string[];
} => {
  const errors: string[] = [];
  let sanitizedData = { ...data };

  try {
    // Validate schedule name
    if (data.name) {
      if (typeof data.name !== 'string') {
        errors.push('Schedule name must be a string');
        sanitizedData.name = 'Untitled Schedule';
      } else if (data.name.length > schema.maxScheduleNameLength) {
        errors.push(`Schedule name too long (max ${schema.maxScheduleNameLength} characters)`);
        sanitizedData.name = sanitizeInput(data.name.substring(0, schema.maxScheduleNameLength));
      } else {
        sanitizedData.name = sanitizeInput(data.name);
      }
    }

    // Validate schedule type
    const allowedTypes = ['custom', 'generated', 'imported'];
    if (data.type && !allowedTypes.includes(data.type)) {
      sanitizedData.type = 'custom';
    }
    if (data.scheduleType && !allowedTypes.includes(data.scheduleType)) {
      sanitizedData.scheduleType = 'custom';
    }

    // Validate events array
    if (data.events && Array.isArray(data.events)) {
      if (data.events.length > schema.maxEventsCount) {
        errors.push(`Too many events (max ${schema.maxEventsCount})`);
        sanitizedData.events = data.events.slice(0, schema.maxEventsCount);
      }

      sanitizedData.events = data.events.map((event: any, index: number) => {
        const sanitizedEvent = { ...event };

        // Validate event name
        if (event.name) {
          if (typeof event.name !== 'string') {
            sanitizedEvent.name = `Event ${index + 1}`;
          } else if (event.name.length > schema.maxEventNameLength) {
            sanitizedEvent.name = sanitizeInput(event.name.substring(0, schema.maxEventNameLength));
          } else {
            sanitizedEvent.name = sanitizeInput(event.name);
          }
        }

        // Validate time fields
        ['startTime', 'endTime', 'start', 'end'].forEach(timeField => {
          if (event[timeField]) {
            const timeValue = event[timeField];
            if (typeof timeValue === 'string') {
              const isValidFormat = schema.allowedTimeFormats.some(format => format.test(timeValue));
              if (!isValidFormat) {
                console.warn(`Invalid time format for ${timeField}:`, timeValue);
              }
            }
          }
        });

        // Validate color data
        if (event.colorData && typeof event.colorData === 'object') {
          const { red, green, blue } = event.colorData;
          if (typeof red === 'number' && typeof green === 'number' && typeof blue === 'number') {
            if (red < 0 || red > 1 || green < 0 || green > 1 || blue < 0 || blue > 1) {
              sanitizedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 }; // Default blue
            }
          }
        }

        return sanitizedEvent;
      });
    }

    // Validate setEvents (legacy support)
    if (data.setEvents && Array.isArray(data.setEvents)) {
      sanitizedData.setEvents = sanitizedData.events || data.setEvents.map((event: any, index: number) => ({
        ...event,
        name: event.name ? sanitizeInput(event.name.substring(0, schema.maxEventNameLength)) : `Event ${index + 1}`
      }));
    }

  } catch (error) {
    errors.push('Failed to validate schedule data structure');
    console.error('Schedule validation error:', error);
  }

  return {
    isValid: errors.length === 0,
    sanitizedData,
    errors
  };
};

// Enhanced URL parameter validation
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

  // Check for malicious patterns in encoded data
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /data:text\/html/i,
    /eval\(/i,
    /Function\(/i,
    /setTimeout\(/i,
    /setInterval\(/i
  ];

  const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(param));
  if (hasSuspiciousContent) {
    return { isValid: false, error: 'Suspicious content detected in parameter' };
  }

  return { isValid: true };
};

// Safe text rendering with XSS protection
export const renderSafeText = (text: string | undefined, fallback: string = ''): string => {
  if (!text || typeof text !== 'string') {
    return fallback;
  }

  // Sanitize input first
  const sanitized = sanitizeInput(text);
  
  // Then HTML encode for safe rendering
  return encodeHtml(sanitized);
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

  const sanitizedText = sanitizeInput(text);
  
  if (!validateFormInput(sanitizedText, 1000)) {
    return { isValid: false, sanitizedText: '', error: 'Text contains invalid characters' };
  }

  return { isValid: true, sanitizedText };
};
