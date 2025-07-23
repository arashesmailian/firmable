import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
  pattern?: string;
  isDebounced?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  pattern,
  isDebounced = false,
  helperText,
  icon,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // For postcode, only allow digits and limit to 4 characters
    if (pattern === "[0-9]{4}") {
      newValue = newValue.replace(/\D/g, "").slice(0, 4);
    }

    onChange(newValue);
  };

  const defaultHelperText = isDebounced ? "Search with 400ms delay" : undefined;

  return (
    <div className="mb-4 lg:mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          className="filter-input w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm lg:text-base pl-8 lg:pl-10"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          style={{
            transform: "scale(1)",
            transition: "transform 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
        {icon && (
          <div className="absolute left-2 lg:left-3 top-2.5 lg:top-3.5 w-4 h-4 lg:w-5 lg:h-5 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {(helperText || defaultHelperText) && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText || defaultHelperText}
        </p>
      )}
    </div>
  );
};
