import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  options: { id: string ; name: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  options,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-md font-bold text-[#5C4033]">
        {label} {required && " * "}:
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`mt-1 block w-full rounded-md border text-sm font-semibold shadow-sm p-2 bg-white/90 ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-600"
            : "border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
        }`}
      >
        <option value="">निवडा</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
