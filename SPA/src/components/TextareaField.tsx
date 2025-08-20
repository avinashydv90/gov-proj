import React from "react";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  error?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 3,
  maxLength,
  error,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-md font-bold text-[#5C4033]">
        {label} {required && "*"} :
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`mt-1 block w-full rounded-md border text-sm font-semibold shadow-sm p-2 bg-white/90
          ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-600"
              : "border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
          }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default TextareaField;
