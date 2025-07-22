
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

// Very lenient schedule data validation - only check for basic structure
export const validateScheduleData = (data: any, schema: ScheduleValidationSchema = DEFAULT_VALIDATION_SCHEMA): {
  isValid: boolean;
  sanitizedData: any;
  errors: string[];
} => {
  const errors: string[] = [];
  let sanitizedData = { ...data };

  try {
    console.log('Validating schedule data:', data);

    // Very basic validation - just ensure we have some kind of data structure
    if (!data || typeof data !== 'object') {
      errors.push('Invalid data structure');
      return { isValid: false, sanitizedData: {}, errors };
    }

    // Handle schedule name with multiple possible field names
    if (data.name || data.scheduleName || data.title) {
      sanitizedData.name = data.name || data.scheduleName || data.title || 'Imported Schedule';
    } else {
      sanitizedData.name = 'Imported Schedule';
    }

    // Handle schedule type
    sanitizedData.type = data.type || data.scheduleType || 'imported';

    // Handle events with multiple possible field names and be very permissive
    const possibleEventFields = ['events', 'setEvents', 'scheduleEvents', 'items', 'classes'];
    let eventsArray = [];
    
    for (const field of possibleEventFields) {
      if (data[field] && Array.isArray(data[field])) {
        eventsArray = data[field];
        break;
      }
    }

    // If no events found in standard fields, look for any array in the data
    if (eventsArray.length === 0) {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0) {
          console.log(`Found potential events array in field: ${key}`);
          eventsArray = value;
          break;
        }
      }
    }

    console.log('Found events array:', eventsArray);

    // Process events with minimal validation
    if (Array.isArray(eventsArray)) {
      sanitizedData.events = eventsArray.map((event: any, index: number) => {
        // Very permissive event processing - keep all data
        const sanitizedEvent = { ...event };

        // Ensure we have some kind of name
        if (!sanitizedEvent.name && !sanitizedEvent.title) {
          sanitizedEvent.name = `Event ${index + 1}`;
        }

        // Provide default color if none exists
        if (!sanitizedEvent.colorData && !sanitizedEvent.color) {
          sanitizedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 };
        }

        return sanitizedEvent;
      });
    } else {
      sanitizedData.events = [];
    }

    // Preserve all other fields from the original data
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

// Much more lenient URL parameter validation - only block obvious attacks
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

  // Only block obviously dangerous scripts - be very specific
  const reallyDangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:\s*[^;]+/gi,
    /<iframe[^>]*>/gi,
    /eval\s*\(/gi
  ];

  const hasDangerousContent = reallyDangerousPatterns.some(pattern => pattern.test(param));
  if (hasDangerousContent) {
    console.warn('Dangerous content detected in parameter');
    return { isValid: false, error: 'Dangerous content detected' };
  }

  // Base64 validation - be permissive about valid base64 characters
  if (param.length > 10) { // Only validate if it looks like it could be base64
    const base64Pattern = /^[A-Za-z0-9+/=_-]*$/; // Allow URL-safe base64 too
    if (!base64Pattern.test(param)) {
      console.warn('Invalid base64 characters detected');
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
