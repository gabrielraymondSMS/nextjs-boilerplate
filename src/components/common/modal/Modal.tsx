"use client";
import { ReactNode, useEffect, useState } from "react";

const Modal = ({
  header,
  children,
  footer,
  isShow,
  setIsShow,
  width,
}: {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  isShow?: boolean;
  setIsShow: (prev: any) => void;
  width?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isShow) {
      // Show snackbar
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // Small delay to trigger animation

      // Auto-hide after duration
      const timer = setTimeout(() => {
        setIsShow;
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Hide snackbar with animation
      if (isVisible) {
        setIsAnimating(false);
        const timer = setTimeout(() => setIsVisible(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isShow, setIsShow, isVisible]);

  if (!isVisible) return null;
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[#101828B2] flex justify-center items-center transition-all duration-75 ${
      isAnimating ? "z-50 opacity-100" : "-z-10 opacity-0 delay-300"
      }`}
      style={{ backdropFilter: "blur(8px)", }}
      onClick={() => setIsShow(false)}
    >
      <div
        className={`bg-white min-w-[400px] ${
          width ? width : "w-[80%]"
        } max-w-[760px] rounded-xl p-6 flex flex-col gap-6 transform duration-700 ease-in-out ${
          isAnimating ? "translate-x-0" : " translate-y-[100vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{header}</div>
        <div>{children}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
