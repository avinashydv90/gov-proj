// components/InputField.tsx
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-md font-bold text-[#5C4033]">
        {label} {required && " * "}:
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full rounded-md border text-sm font-semibold shadow-sm p-2 bg-white/90 ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-600"
            : "border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
        }`}
        {...rest}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
