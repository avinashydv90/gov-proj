// src/components/IsLoading.tsx
import React from "react";

interface IsLoadingProps {
  isLoading: boolean;
  message?: string; // optional custom message
}

const IsLoading: React.FC<IsLoadingProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div
          className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#5C4033] rounded-full"
          role="status"
          aria-label={message || "लोड करत आहे..."}
        ></div>
        <p className="mt-4 text-sm font-medium text-[#5C4033]">
          {message || "लोड करत आहे..."}
        </p>
      </div>
    </div>
  );
};

export default IsLoading;
