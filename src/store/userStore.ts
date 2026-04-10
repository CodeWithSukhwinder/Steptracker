import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.delete(name),
};

interface User {
  id: string;
  name: string;
  createdAt: number;
}

interface UserState {
  activeUserId: string | null;
  users: User[];
  setActiveUser: (id: string | null) => void;
  addUser: (name: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      activeUserId: null,
      users: [],
      setActiveUser: (id) => set({ activeUserId: id }),
      addUser: (name) => {
        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          name,
          createdAt: Date.now(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          activeUserId: state.activeUserId ?? newUser.id,
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
