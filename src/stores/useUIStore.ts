import { create } from "zustand";

type UIState = {
  isSideBarShow: "show" | "minify";
  toggleSidebar: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSideBarShow: "show",
  toggleSidebar: () =>
    set((state) => ({
      isSideBarShow: state.isSideBarShow === "show" ? "minify" : "show",
    })),
}));
