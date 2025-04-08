"use client";

import React, { useState, useRef, useEffect } from "react";
import MyIcon from "../icon/MyIcon";

interface CustomSelectProps {
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  options: Record<string, any>[]; // Bisa menerima objek dengan key dinamis
  valueKey?: string; // Menentukan field untuk value
  labelKey?: string; // Menentukan field untuk label
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  disabled = false,
  label = "",
  error,
  options,
  valueKey = "value", // Default "value"
  labelKey = "label", // Default "label"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && options.length > 0) {
      const optionExists = options.some((option) => option[valueKey] === value);
      if (!optionExists) {
        onChange(""); // Reset jika tidak ditemukan
      }
    }
  }, [options, value, valueKey, onChange]);

  const filteredOptions = options.filter((option) =>
    option[labelKey].toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);

      setTimeout(() => {
        if (dropdownRef.current && buttonRef.current) {
          const dropdownHeight = dropdownRef.current.offsetHeight;
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;

          // Open above if not enough space below and enough space above
          setOpenAbove(
            spaceBelow < dropdownHeight && spaceAbove > dropdownHeight
          );
        }
      }, 0);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  // Temukan label berdasarkan value yang dipilih
  const selectedLabel =
    options.find((option) => option[valueKey] === value)?.[labelKey] || "";

  return (
    <div className="flex flex-col w-full text-sm">
      {label && (
        <label className="mb-1 font-medium text-sm text-[#374151]">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`w-full cursor-pointer flex justify-between items-center px-3.5 py-2.5 border rounded-md border-[#D1D5DB] 
            ${
              disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            } ${className}`}
          onClick={toggleDropdown}
          onBlur={onBlur}
          ref={buttonRef}
        >
          <div className="w-full">{selectedLabel || <span className="text-gray-400">{placeholder}</span>}</div>
          <MyIcon
            src="/assets/icons/ic-chevron_down.svg"
            width={20}
            height={20}
            className="text-[#9CA3AF]"
          />
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute z-10 w-full bg-white border border-[#D1D5DB] rounded-md shadow-lg ${
              openAbove ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            <input
              type="text"
              name={name}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2.5 border-b border-[#D1D5DB] focus:outline-none"
            />
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option[valueKey]}
                  className={`px-3.5 py-2.5 hover:bg-gray-100 cursor-pointer ${
                    option[valueKey] === value ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleSelect(option[valueKey])}
                >
                  {option[labelKey]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
