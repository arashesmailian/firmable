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
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        pattern={pattern}
      />
      {(helperText || defaultHelperText) && (
        <p className="text-xs text-gray-500 mt-1">
          {helperText || defaultHelperText}
        </p>
      )}
    </div>
  );
};
