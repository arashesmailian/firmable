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
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
