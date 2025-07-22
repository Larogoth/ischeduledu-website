
export interface ScheduleData {
  name?: string;
  type?: string;
  scheduleType?: string;
  userId?: string;
  events?: Event[];
  setEvents?: Event[];
}

export interface Event {
  name?: string;
  startTime?: string;
  endTime?: string;
  start?: string;
  end?: string;
  colorData?: {
    red: number;
    green: number;
    blue: number;
  };
}
