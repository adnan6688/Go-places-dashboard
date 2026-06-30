import React from 'react';

interface GlobalLoadingProps {
  message?: string; 
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative flex flex-col items-center space-y-4">
        
        {/* Outer Pulsing Glow */}
        <div className="absolute w-24 h-24 bg-[#1F3A5F]/10 rounded-full animate-ping pointer-events-none"></div>

        {/* Core Spinner & Car Track Concept */}
        <div className="relative w-20 h-20">
          {/* Main Rotating Track */}
          <div className="w-full h-full border-4 border-gray-200 rounded-full"></div>
          {/* Active Color Tracker (Using #1F3A5F) */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#1F3A5F] border-r-[#1F3A5F]/40 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          
          {/* Center Car Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-[#1F3A5F] animate-pulse">
            <svg 
              className="w-8 h-8" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </svg>
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="flex flex-col items-center space-y-1">
          <p className="text-lg font-semibold text-[#1F3A5F] tracking-wide animate-pulse">
            {message}
          </p>
          <span className="text-xs text-gray-400 font-medium">Please wait a moment</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;