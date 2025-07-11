
import { sanitizeInput } from './security';

export interface ShareableScheduleData {
  name: string;
  type: string;
  subjects: string[];
  periods: number;
  startTime: string;
  endTime: string;
  days: string[];
  notifications: boolean;
  createdAt?: string;
}

/**
 * Encodes schedule data to base64 for URL sharing
 */
export const encodeScheduleData = (scheduleData: ShareableScheduleData): string => {
  try {
    // Sanitize all string inputs
    const sanitizedData = {
      ...scheduleData,
      name: sanitizeInput(scheduleData.name),
      type: sanitizeInput(scheduleData.type),
      subjects: scheduleData.subjects.map(subject => sanitizeInput(subject)),
      startTime: sanitizeInput(scheduleData.startTime),
      endTime: sanitizeInput(scheduleData.endTime),
      days: scheduleData.days.map(day => sanitizeInput(day)),
      createdAt: new Date().toISOString()
    };

    const jsonString = JSON.stringify(sanitizedData);
    return btoa(jsonString);
  } catch (error) {
    console.error('Error encoding schedule data:', error);
    throw new Error('Failed to encode schedule data');
  }
};

/**
 * Decodes base64 schedule data from URL
 */
export const decodeScheduleData = (encodedData: string): ShareableScheduleData => {
  try {
    const jsonString = atob(encodedData);
    const data = JSON.parse(jsonString);
    
    // Validate required fields
    if (!data.name || !data.type || !Array.isArray(data.subjects)) {
      throw new Error('Invalid schedule data structure');
    }

    return data;
  } catch (error) {
    console.error('Error decoding schedule data:', error);
    throw new Error('Invalid schedule data format');
  }
};

/**
 * Generates a shareable URL for schedule data
 */
export const generateShareableUrl = (
  scheduleData: ShareableScheduleData,
  baseUrl: string = window.location.origin
): string => {
  const encodedData = encodeScheduleData(scheduleData);
  return `${baseUrl}/import?data=${encodedData}`;
};

/**
 * Generates a Universal Link compatible URL
 */
export const generateUniversalLink = (
  scheduleData: ShareableScheduleData,
  scheduleId?: string,
  baseUrl: string = window.location.origin
): string => {
  if (scheduleId) {
    return `${baseUrl}/import/${scheduleId}`;
  }
  return generateShareableUrl(scheduleData, baseUrl);
};

/**
 * Creates a shortened display version of the share URL
 */
export const createDisplayUrl = (fullUrl: string): string => {
  try {
    const url = new URL(fullUrl);
    return `${url.hostname}/import/...`;
  } catch {
    return 'Invalid URL';
  }
};

/**
 * Validates if a URL contains valid schedule data
 */
export const validateScheduleUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const encodedData = urlObj.searchParams.get('data');
    
    if (!encodedData) {
      return false;
    }

    decodeScheduleData(encodedData);
    return true;
  } catch {
    return false;
  }
};
