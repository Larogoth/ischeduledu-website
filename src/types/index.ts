
export interface ScheduleData {
  id?: string;
  name?: string;
  type?: string;
  scheduleType?: string;
  userId?: string;
  events?: Event[];
  setEvents?: Event[];
  importedAt?: string;
  startTime?: string;
  endTime?: string;
  periods?: Period[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Period {
  name?: string;
  startTime: string;
  endTime: string;
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
