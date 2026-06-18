import React from "react";

interface SmallLoadingProps {
  message?: string;
}

const SmallLoading: React.FC<SmallLoadingProps> = ({
  message = "Loading data...",
}) => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#1F3A5F]/5 border border-[#1F3A5F]/10">
        
        {/* Spinner */}
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-[#1F3A5F] border-r-[#1F3A5F]/40 border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <span className="text-sm font-medium text-[#1F3A5F]">
          {message}
        </span>
      </div>
    </div>
  );
};

export default SmallLoading;