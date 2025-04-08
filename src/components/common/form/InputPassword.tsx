import React, { useState } from "react";
import MyIcon from "../icon/MyIcon";

interface InputPasswordProps {
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  ref?: React.Ref<HTMLInputElement>;
  error?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  disabled = false,
  label = "",
  ref,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <label className="mb-1 font-medium text-sm text-[#374151]">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          className={`w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
          } ${className}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm leading-5"
        >
          {showPassword ? (
            <MyIcon
              src="/assets/icons/ic-eye_off.svg"
              width={20}
              height={20}
              className="text-[#9CA3AF]"
            />
          ) : (
            <MyIcon
              src="/assets/icons/ic-eye.svg"
              width={20}
              height={20}
              className="text-[#9CA3AF]"
            />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputPassword;
