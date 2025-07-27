
import { create } from 'zustand';
import { ScheduleData } from '@/types';

interface ScheduleStore {
  scheduleData: ScheduleData | null;
  setScheduleData: (data: ScheduleData) => void;
  clearScheduleData: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  scheduleData: null,
  setScheduleData: (data: ScheduleData) => set({ scheduleData: data }),
  clearScheduleData: () => set({ scheduleData: null }),
}));
