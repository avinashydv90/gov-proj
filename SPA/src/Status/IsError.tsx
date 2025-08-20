// src/components/ErrorMessage.tsx
import React from "react";

interface ErrorMessageProps {
  isError: boolean;
  title?: string;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ isError, title, message }) => {
  if (!isError) return null;

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md text-center">
        <strong className="block font-semibold mb-1">
          {title || "त्रुटी आली!"}
        </strong>
        <span className="text-sm">
          {message || "डेटा मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा."}
        </span>
      </div>
    </div>
  );
};

export default ErrorMessage;
