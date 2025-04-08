import React from "react";

interface CheckboxProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  register: any; // Receive register function from React Hook Form
  errors?: any; // Optionally, receive errors for validation
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  className = "",
  disabled = false,
  register,
  errors,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        {...register(name)} // Register the checkbox field with React Hook Form
        disabled={disabled}
        className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
      />
      <label htmlFor={name} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
      {errors?.[name] && (
        <p className="text-red-500 text-xs">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Checkbox;
