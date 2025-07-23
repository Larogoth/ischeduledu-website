
import { ScheduleData } from '@/types';

// Convert TimeInterval (seconds since 2001-01-01) to JavaScript Date
const parseTimeInterval = (timeInterval: number): Date => {
  const swiftReferenceDate = new Date('2001-01-01T00:00:00Z');
  return new Date(swiftReferenceDate.getTime() + (timeInterval * 1000));
};

// Convert various date formats to readable time
const parseDate = (dateValue: any): Date => {
  console.log('Parsing date value:', dateValue, 'Type:', typeof dateValue);
  
  if (typeof dateValue === 'string') {
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } else if (typeof dateValue === 'number') {
    if (dateValue > 0 && dateValue < 1000000000) {
      return parseTimeInterval(dateValue);
    } else if (dateValue > 1000000000) {
      if (dateValue > 10000000000) {
        return new Date(dateValue);
      } else {
        return new Date(dateValue * 1000);
      }
    }
  }
  
  console.warn('Failed to parse date value, using current time:', dateValue);
  return new Date();
};

// Minimal format interfaces matching iOS app
interface ShareableEvent {
  n: string;  // name
  s: number;  // startTime (TimeInterval)
  e: number;  // endTime (TimeInterval)
}

interface ShareableSchedule {
  n: string;  // name
  e: ShareableEvent[];  // events
  t: number;  // type (0 = custom, 1 = generated)
}

const convertMinimalToFullSchedule = (shareableSchedule: ShareableSchedule): any => {
  console.log('Converting minimal format:', shareableSchedule);
  
  const fullEvents = shareableSchedule.e.map(event => {
    const startTime = parseTimeInterval(event.s);
    const endTime = parseTimeInterval(event.e);
    
    return {
      name: event.n,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      start: startTime,
      end: endTime,
      color: '#3B82F6', // Default blue color
      colorData: { red: 0.231, green: 0.510, blue: 0.965 }, // Blue color data
      enableAlert: true  // Default alerts enabled
    };
  });
  
  const scheduleType = shareableSchedule.t === 0 ? 'custom' : 'generated';
  
  const fullSchedule = {
    name: shareableSchedule.n,
    scheduleType: scheduleType,
    type: scheduleType,
    events: fullEvents,
    setEvents: fullEvents, // Legacy support
    importedAt: new Date().toISOString()
  };
  
  console.log('✅ Converted schedule:', fullSchedule.name, 'with', fullEvents.length, 'events');
  return fullSchedule;
};

export const transformScheduleData = (rawData: any): ScheduleData => {
  console.log('=== TRANSFORMING SCHEDULE DATA ===');
  console.log('Raw data:', JSON.stringify(rawData, null, 2));
  
  // Check if this is a minimal format from iOS app
  if (rawData.n && rawData.e && Array.isArray(rawData.e) && typeof rawData.t === 'number') {
    console.log('Detected minimal iOS app format, converting...');
    const shareableSchedule: ShareableSchedule = {
      n: rawData.n,
      e: rawData.e,
      t: rawData.t
    };
    const convertedData = convertMinimalToFullSchedule(shareableSchedule);
    return convertedData;
  }
  
  let events: any[] = [];
  let scheduleName = '';
  let scheduleType = 'custom';
  
  if (rawData.name) {
    scheduleName = rawData.name;
  }
  
  if (rawData.scheduleType) {
    scheduleType = rawData.scheduleType;
  } else if (rawData.type) {
    scheduleType = rawData.type;
  }
  
  if (rawData.events && Array.isArray(rawData.events)) {
    events = rawData.events;
    console.log('Found events array with', events.length, 'events');
  } else if (rawData.setEvents && Array.isArray(rawData.setEvents)) {
    events = rawData.setEvents;
    console.log('Found setEvents array with', events.length, 'events');
  } else {
    console.warn('No events array found in data');
    events = [];
  }
  
  // Process events with proper time handling
  const processedEvents = events.map((event: any, index: number) => {
    console.log(`Processing event ${index}:`, event);
    
    try {
      let eventName = event.name || event.title || `Event ${index + 1}`;
      let startTime: Date;
      let endTime: Date;
      let color = '#3B82F6'; // Default blue color
      
      if (event.colorData) {
        try {
          const r = Math.round((event.colorData.red || 0) * 255);
          const g = Math.round((event.colorData.green || 0) * 255);
          const b = Math.round((event.colorData.blue || 0) * 255);
          color = `rgb(${r}, ${g}, ${b})`;
        } catch (e) {
          console.warn('Failed to parse color data:', event.colorData);
        }
      }
      
      if (event.startTime !== undefined) {
        startTime = parseDate(event.startTime);
      } else if (event.start !== undefined) {
        startTime = parseDate(event.start);
      } else {
        console.warn('No start time found for event:', event);
        startTime = new Date();
      }
      
      if (event.endTime !== undefined) {
        endTime = parseDate(event.endTime);
      } else if (event.end !== undefined) {
        endTime = parseDate(event.end);
      } else {
        console.warn('No end time found for event:', event);
        endTime = new Date(startTime.getTime() + 3600000); // Add 1 hour
      }
      
      return {
        name: eventName,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        start: startTime,
        end: endTime,
        color: color,
        colorData: event.colorData || { red: 0.231, green: 0.510, blue: 0.965 },
        enableAlert: event.enableAlert !== false,
        alarmsEnabled: event.alarmsEnabled !== false
      };
    } catch (eventError) {
      console.error('Error processing event:', eventError, 'Event data:', event);
      // Return a fallback event
      return {
        name: `Event ${index + 1}`,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        start: new Date(),
        end: new Date(Date.now() + 3600000),
        color: '#3B82F6',
        colorData: { red: 0.231, green: 0.510, blue: 0.965 },
        enableAlert: true
      };
    }
  });
  
  const transformedData: ScheduleData = {
    name: scheduleName || 'Untitled Schedule',
    type: scheduleType,
    scheduleType: scheduleType,
    events: processedEvents,
    setEvents: processedEvents, // Legacy support
    userId: rawData.userId,
    importedAt: new Date().toISOString()
  };
  
  console.log('=== FINAL TRANSFORMED DATA ===');
  console.log('Transformed data:', transformedData);
  
  return transformedData;
};
