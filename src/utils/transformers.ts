
import { ScheduleData } from '@/types';

export const transformScheduleData = (rawData: any): ScheduleData => {
  // Basic transformation logic
  const transformedData: ScheduleData = {
    name: rawData.name || rawData.scheduleName || 'Untitled Schedule',
    type: rawData.type || rawData.scheduleType || 'custom',
    events: rawData.events || rawData.setEvents || [],
    userId: rawData.userId
  };

  // Ensure events are properly formatted
  if (transformedData.events) {
    transformedData.events = transformedData.events.map((event: any) => ({
      name: event.name || event.title || 'Untitled Event',
      startTime: event.startTime || event.start,
      endTime: event.endTime || event.end,
      colorData: event.colorData || { red: 0.231, green: 0.510, blue: 0.965 }
    }));
  }

  return transformedData;
};
