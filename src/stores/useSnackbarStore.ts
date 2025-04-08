import { create } from "zustand";

type SnackbarType = "success" | "error" | "warning" | "info";
type SnackbarPosition = "top" | "bottom" | "top-right" | "bottom-right" | "top-left" | "bottom-left";

type SnackbarState = {
  isOpen: boolean;
  message: string;
  type: SnackbarType;
  duration: number;
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    position?: SnackbarPosition,
    duration?: number
  ) => void;
  closeSnackbar: () => void;
  position: SnackbarPosition;
  //   setPosition: (position: SnackbarPosition) => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  isOpen: false,
  message: "",
  type: "info",
  duration: 5000,
  position: "top",
  showSnackbar: (message, type = "info", position = "top", duration = 5000) => {
    set({ isOpen: true, message, type, position, duration });
  },
  closeSnackbar: () => set({ isOpen: false }),
  //   setPosition: (value: SnackbarPosition) => set({ position: value }),
}));
