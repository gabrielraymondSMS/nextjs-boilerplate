import React from "react";
import MyIcon from "../icon/MyIcon";

interface InputTextProps {
  name: string; // Required for React Hook Form
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Optional for React Hook Form
  placeholder?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  ref?: React.Ref<HTMLInputElement>; // Optional for React Hook Form
  error?: string;
}

const InputSearch: React.FC<InputTextProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  type = "text",
  disabled = false,
  label = "",
  ref,
  error,
}) => {
  return (
    <div className="flex flex-col w-full text-sm">
      <label className="mb-1 font-medium text-sm text-[#374151]">{label}</label>
      <div className="relative">
        <div className="border-[#D1D5DB] border bg-white flex items-center px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 gap-2 rounded-md">
          <MyIcon src="/assets/icons/ic-search.svg" width={20} height={20} />
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            className={`w-full outline-none   ${
              disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            } ${className}`}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputSearch;
