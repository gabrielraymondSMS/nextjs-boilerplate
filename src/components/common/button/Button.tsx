import React from "react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: "primary" | "outline_secondary" | "cancel" | "danger";
  children: React.ReactNode;
}

const Button: React.FC<CustomButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  children,
  style = "primary",
}) => {
  const buttonType = {
    primary: "bg-[#267D39] hover:bg-[#205B2D] text-white",
    outline_secondary:
      "border-[#D5D7DA] border text-[#414651] hover:bg-[#FAFAFA]",
    cancel: "border-[#B42318] border text-[#B42318] hover:bg-[#FAFAFA]",
    danger: "border-[#D92D20] border text-white bg-[#D92D20]"
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
        disabled || loading
          ? "bg-gray-300 cursor-not-allowed"
          : buttonType[style]
      } ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span className="mr-2">Loading...</span>
          {/* Add a spinner or loading animation here */}
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
