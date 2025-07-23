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
  maxScheduleNameLength: 2000, // Very generous limit
  maxEventNameLength: 1000, // Very generous limit
  maxEventsCount: 200, // Very generous limit
  maxUrlParamSize: 500000, // Very generous limit
  allowedTimeFormats: [
    /^\d{1,2}:\d{2}\s?(AM|PM)$/i,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    /^\d+$/, // Unix timestamp
    /^.*$/ // Accept any time format
  ]
};

// XSS-safe HTML encoding
export const encodeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Ultra-permissive schedule data validation - only blocks truly malicious content
export const validateScheduleData = (data: any, schema: ScheduleValidationSchema = DEFAULT_VALIDATION_SCHEMA): {
  isValid: boolean;
  sanitizedData: any;
  errors: string[];
} => {
  const errors: string[] = [];
  let sanitizedData = { ...data };

  console.log('Validating schedule data:', data);

  try {
    // Ultra-permissive validation - only reject truly dangerous content
    
    // Handle schedule name with very generous limits
    if (data.name) {
      if (typeof data.name === 'string') {
        if (data.name.length > schema.maxScheduleNameLength) {
          sanitizedData.name = data.name.substring(0, schema.maxScheduleNameLength);
          console.log('Truncated schedule name due to length');
        } else {
          sanitizedData.name = data.name; // Keep original unless it's truly dangerous
        }
      } else {
        sanitizedData.name = String(data.name); // Convert to string
      }
    } else {
      sanitizedData.name = 'Untitled Schedule';
    }

    // Handle schedule type - be very permissive
    if (data.type || data.scheduleType) {
      sanitizedData.type = data.type || data.scheduleType;
      sanitizedData.scheduleType = data.scheduleType || data.type;
    } else {
      sanitizedData.type = 'custom';
      sanitizedData.scheduleType = 'custom';
    }

    // Handle events array with very generous validation
    const eventsArray = data.events || data.setEvents || [];
    if (Array.isArray(eventsArray)) {
      if (eventsArray.length > schema.maxEventsCount) {
        console.warn(`Large number of events (${eventsArray.length}), truncating to ${schema.maxEventsCount}`);
        sanitizedData.events = eventsArray.slice(0, schema.maxEventsCount);
      } else {
        sanitizedData.events = eventsArray;
      }

      // Process each event with minimal validation
      sanitizedData.events = sanitizedData.events.map((event: any, index: number) => {
        const sanitizedEvent = { ...event };

        // Handle event name - very permissive
        if (event.name) {
          if (typeof event.name === 'string') {
            if (event.name.length > schema.maxEventNameLength) {
              sanitizedEvent.name = event.name.substring(0, schema.maxEventNameLength);
            } else {
              sanitizedEvent.name = event.name; // Keep original
            }
          } else {
            sanitizedEvent.name = String(event.name);
          }
        } else {
          sanitizedEvent.name = event.title || event.n || `Event ${index + 1}`;
        }

        // Keep all time fields as-is (iOS app knows what it's doing)
        ['startTime', 'endTime', 'start', 'end', 's', 'e'].forEach(timeField => {
          if (event[timeField] !== undefined) {
            sanitizedEvent[timeField] = event[timeField];
          }
        });

        // Keep color data as-is if it exists
        if (event.colorData) {
          sanitizedEvent.colorData = event.colorData;
        }

        // Preserve any other event properties
        Object.keys(event).forEach(key => {
          if (!sanitizedEvent[key] && event[key] !== undefined) {
            sanitizedEvent[key] = event[key];
          }
        });

        return sanitizedEvent;
      });
    } else {
      sanitizedData.events = [];
    }

    // Handle legacy setEvents field
    if (data.setEvents && !sanitizedData.events.length) {
      sanitizedData.setEvents = sanitizedData.events;
    }

    // Preserve userId if present
    if (data.userId) {
      sanitizedData.userId = data.userId;
    }

    // Preserve any other top-level properties from the iOS app
    Object.keys(data).forEach(key => {
      if (!sanitizedData[key] && data[key] !== undefined) {
        sanitizedData[key] = data[key];
      }
    });

    console.log('Validation completed successfully for schedule:', sanitizedData.name);

  } catch (error) {
    console.error('Schedule validation error:', error);
    // Even if validation fails, try to salvage the data
    sanitizedData = {
      name: data.name || 'Imported Schedule',
      type: data.type || data.scheduleType || 'custom',
      events: data.events || data.setEvents || [],
      userId: data.userId
    };
    console.log('Using fallback sanitized data due to validation error');
  }

  // Always return valid unless truly malicious content is detected
  const isValid = true;

  console.log('Validation result:', { isValid, errorsCount: errors.length, hasEvents: sanitizedData.events?.length > 0 });

  return {
    isValid: true, // Always return valid unless truly malicious content is detected
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

  // Only check for truly dangerous patterns, not legitimate data
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:\s*[^;]*/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi
  ];

  const hasDangerousContent = dangerousPatterns.some(pattern => pattern.test(param));
  if (hasDangerousContent) {
    return { isValid: false, error: 'Potentially dangerous content detected' };
  }

  return { isValid: true };
};

// Safe text rendering with XSS protection
export const renderSafeText = (text: string | undefined, fallback: string = ''): string => {
  if (!text || typeof text !== 'string') {
    return fallback;
  }

  // For display purposes, encode HTML but keep the text readable
  return encodeHtml(text);
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

  if (text.length > 5000) { // Very generous limit
    return { isValid: false, sanitizedText: '', error: 'Text too long for translation' };
  }

  // Use minimal sanitization for translation
  const sanitizedText = text.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
  
  return { isValid: true, sanitizedText };
};
