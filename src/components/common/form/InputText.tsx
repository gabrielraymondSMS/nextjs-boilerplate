import React from "react";

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

const InputText: React.FC<InputTextProps> = ({
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
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          className={`w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-200 text-gray-500" : "bg-white "
          } ${className}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputText;
