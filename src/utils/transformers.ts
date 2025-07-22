
import { ScheduleData } from '@/types';

export const transformScheduleData = (rawData: any): ScheduleData => {
  console.log('Transforming schedule data:', rawData);
  
  // More flexible transformation logic
  const transformedData: ScheduleData = {
    name: rawData.name || rawData.scheduleName || rawData.title || 'Untitled Schedule',
    type: rawData.type || rawData.scheduleType || 'imported',
    events: [],
    userId: rawData.userId
  };

  // Handle multiple possible event field names
  const eventsSource = rawData.events || rawData.setEvents || rawData.scheduleEvents || [];
  
  if (Array.isArray(eventsSource)) {
    transformedData.events = eventsSource.map((event: any, index: number) => {
      const transformedEvent = {
        name: event.name || event.title || event.eventName || `Event ${index + 1}`,
        startTime: event.startTime || event.start || event.startDate,
        endTime: event.endTime || event.end || event.endDate,
        colorData: event.colorData || event.color || { red: 0.231, green: 0.510, blue: 0.965 }
      };

      // Handle different color formats
      if (event.colorData) {
        transformedEvent.colorData = event.colorData;
      } else if (event.color && typeof event.color === 'object') {
        transformedEvent.colorData = event.color;
      } else if (event.backgroundColor) {
        // Try to parse hex or RGB colors
        transformedEvent.colorData = { red: 0.231, green: 0.510, blue: 0.965 };
      }

      return transformedEvent;
    });
  }

  console.log('Transformed data:', transformedData);
  return transformedData;
};
