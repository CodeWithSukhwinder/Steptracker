import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.delete(name),
};

interface StepState {
  liveCount: number;
  todayTotal: number;
  isTracking: boolean;
  increment: () => void;
  reset: () => void;
  setTodayTotal: (count: number) => void;
  toggleTracking: () => void;
}

export const useStepStore = create<StepState>()(
  persist(
    (set) => ({
      liveCount: 0,
      todayTotal: 0,
      isTracking: false,
      increment: () =>
        set((state) => ({
          liveCount: state.liveCount + 1,
          todayTotal: state.todayTotal + 1,
        })),
      reset: () => set({ liveCount: 0, todayTotal: 0 }),
      setTodayTotal: (count) => set({ todayTotal: count, liveCount: 0 }),
      toggleTracking: () => set((state) => ({ isTracking: !state.isTracking })),
    }),
    {
      name: 'step-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
