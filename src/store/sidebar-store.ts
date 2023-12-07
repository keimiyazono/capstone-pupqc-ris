import { create } from 'zustand';

interface SidebarState {
  show: boolean;
  toggleHandler: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  show: true,
  toggleHandler: () => set({ show: !get().show }, false),
}));
