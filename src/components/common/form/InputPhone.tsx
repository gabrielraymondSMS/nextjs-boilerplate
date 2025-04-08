import React, { useState, useRef, useEffect } from "react";
import MyIcon from "../icon/MyIcon";

interface CountryCode {
  code: string;
  country: string;
}

interface InputPhoneProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  required?: boolean;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "+62", country: "ID" },
  { code: "+1", country: "US" },
  { code: "+33", country: "FR" },
  { code: "+91", country: "IN" },
];

const DEFAULT_COUNTRY = COUNTRY_CODES[0];

const InputPhone: React.FC<InputPhoneProps> = ({
  name,
  value = "",
  onChange,
  onBlur,
  placeholder = "Phone number",
  className = "",
  disabled = false,
  label,
  error,
  required = false,
}) => {
  const [selectedCode, setSelectedCode] =
    useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);

  // Initialize values from props
  useEffect(() => {
    if (value !== prevValueRef.current) {
      const matchedCode =
        COUNTRY_CODES.find(({ code }) => value.startsWith(code)) ||
        DEFAULT_COUNTRY;

      const phone = matchedCode ? value.replace(matchedCode.code, "") : value;

      setSelectedCode(matchedCode);
      setPhoneNumber(phone);
      prevValueRef.current = value;
    }
  }, [value]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle phone number changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(numericValue);
    if (onChange) {
      onChange(`${selectedCode.code}${numericValue}`);
    }
  };

  // Handle country code changes
  const handleCodeSelect = (code: CountryCode) => {
    setSelectedCode(code);
    setIsDropdownOpen(false);
    if (onChange) {
      onChange(`${code.code}${phoneNumber}`);
    }
  };

  return (
    <div className={`flex flex-col w-full text-sm ${className}`}>
      {label && (
        <label className={`mb-1 font-medium text-sm text-gray-700`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`relative flex border rounded-md ${
          disabled ? "bg-gray-100" : "bg-white"
        } ${error ? "border-red-500" : "border-gray-300"} ${
          !disabled && "focus-within:ring-2 focus-within:ring-blue-500"
        }`}
      >
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center px-3 py-2 border-r rounded-l-md ${
              disabled
                ? "bg-gray-200 text-gray-400 border-gray-300"
                : "cursor-pointer bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="mr-1">{selectedCode.code}</span>
            {!disabled && (
              <MyIcon
                src="/assets/icons/ic-chevron_down.svg"
                width={16}
                height={16}
                className="text-gray-400"
              />
            )}
          </button>

          {isDropdownOpen && !disabled && (
            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 max-h-60 overflow-y-auto">
              {COUNTRY_CODES.map((code) => (
                <div
                  key={`${code.code}-${code.country}`}
                  className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                    code.code === selectedCode.code ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleCodeSelect(code)}
                >
                  <span className="font-medium">{code.code}</span>
                  <span className="text-gray-500 ml-2">{code.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          name={name}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 w-full px-3 py-2 focus:outline-none rounded-r-md ${
            disabled ? "bg-gray-200 text-gray-500" : "bg-white"
          }`}
          aria-invalid={!!error}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputPhone;
