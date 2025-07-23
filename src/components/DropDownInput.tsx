import React, { useState, useEffect } from "react";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

interface DropdownOption {
  value: string;
  label: string;
  mobileLabel: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const { isMobile } = useDeviceDetect();

  const getResponsiveComponentLabel = (fullLabel: string) => {
    if (fullLabel === "GST Status") return isMobile ? "GST" : fullLabel;
    if (fullLabel === "State") return fullLabel;
    return fullLabel;
  };

  return (
    <div className="mb-4 lg:mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {getResponsiveComponentLabel(label)}
      </label>
      <select
        className="filter-input custom-select w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm lg:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {isMobile ? option.mobileLabel : option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
