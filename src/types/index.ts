
export interface ScheduleData {
  name?: string;
  type?: string;
  scheduleType?: string;
  userId?: string;
  events?: Event[];
  setEvents?: Event[];
  importedAt?: string;
}

export interface Event {
  name?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  start?: string | Date;
  end?: string | Date;
  color?: string;
  colorData?: {
    red: number;
    green: number;
    blue: number;
  };
  enableAlert?: boolean;
  alarmsEnabled?: boolean;
}
