// components/Snackbar.tsx
"use client";

import { useEffect, useState } from "react";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export const Snackbar = () => {
  const { isOpen, message, type, duration, closeSnackbar, position } =
    useSnackbarStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Show snackbar
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // Small delay to trigger animation

      // Auto-hide after duration
      const timer = setTimeout(() => {
        closeSnackbar();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      // Hide snackbar with animation
      if (isVisible) {
        setIsAnimating(false);
        const timer = setTimeout(() => setIsVisible(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, duration, closeSnackbar, isVisible]);

  const typeStyles = {
    success: "bg-[#E0F8E4] text-[#267D39] border border-[#93E2A4]",
    error: "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]",
    warning: "bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]",
    info: "bg-[#FAFAFA] text-[#414651] border border-[#E9EAEB]",
  };

  const positionClasses = {
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "top-left" : "top-4 left-4",
    "bottom-left" : "bottom-4 left-4"

  };

  const getAnimationClasses = () => {
    if (!isAnimating) {
      return position === "top"
        ? "-translate-y-full opacity-0"
        : position === "bottom"
        ? "translate-y-full opacity-0"
        : position === "top-right"
        ? "translate-x-full opacity-0"
        : position === "bottom-right"
        ? "translate-x-full opacity-0"
        : position === "top-left"
        ? "-translate-x-full opacity-0"
        : "-translate-x-full opacity-0";
    }
    return position === "top" || position === "bottom"
      ? "translate-y-0 opacity-100"
      : "translate-x-0 opacity-100";
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${
        positionClasses[position]
      } min-w-[300px] max-w-[90%] rounded-md shadow-lg p-4 ${
        typeStyles[type]
      } transform transition-all duration-300 ease-in-out ${getAnimationClasses()} z-[100]`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={closeSnackbar}
          className="ml-4 p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
