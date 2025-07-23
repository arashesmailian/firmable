import React from "react";

interface DropdownOption {
  value: string;
  label: string;
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
  return (
    <div className="mb-4 lg:mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        className="filter-input custom-select w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm lg:text-base appearance-none bg-no-repeat bg-right-3 bg-center"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundSize: "16px",
          paddingRight: "40px",
          transform: "scale(1)",
          transition: "transform 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.transform = "scale(1.02)";
        }}
        onBlur={(e) => {
          e.target.style.transform = "scale(1)";
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
