// stores/useUIStore.ts
import { create } from "zustand";

type UIState = {
  theme: "light" | "dark";
  isSideBarShow: 'show' | 'minify' | 'hidden';
  toggleSidebar: () => void;
  toggleTheme: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: "light",
  isSideBarShow: 'show',
  toggleSidebar: () => set((state) => ({ isSideBarShow: state.isSideBarShow === 'show' ? 'minify' : state.isSideBarShow === 'minify' ? 'hidden' : 'show' })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
