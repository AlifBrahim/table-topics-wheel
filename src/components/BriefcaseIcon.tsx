import React from 'react';

interface BriefcaseIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const BriefcaseIcon: React.FC<BriefcaseIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative p-4 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg"
      aria-label={isOpen ? "Close briefcase" : "Open briefcase"}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Briefcase Body */}
        <rect
          x="6"
          y="18"
          width="36"
          height="22"
          rx="2"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        
        {/* Briefcase Lid */}
        <rect
          x="6"
          y="16"
          width="36"
          height="6"
          rx="2"
          fill="#A0522D"
          stroke="#654321"
          strokeWidth="1.5"
          className={`transition-all duration-500 origin-bottom ${
            isOpen ? 'transform -rotate-12 translate-y-1' : ''
          }`}
        />
        
        {/* Handle */}
        <rect
          x="20"
          y="12"
          width="8"
          height="8"
          rx="1"
          fill="none"
          stroke="#654321"
          strokeWidth="2"
          className={`transition-all duration-500 ${
            isOpen ? 'transform -rotate-12 translate-y-1' : ''
          }`}
        />
        
        {/* Lock/Clasp */}
        <circle
          cx="24"
          cy="25"
          r="2"
          fill="#FFD700"
          stroke="#DAA520"
          strokeWidth="1"
          className="transition-all duration-300"
        />
        
        {/* Documents inside (visible when open) */}
        {isOpen && (
          <g className="animate-fadeIn">
            <rect x="10" y="22" width="12" height="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="10" y="26" width="16" height="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="10" y="30" width="14" height="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="10" y="34" width="10" height="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}
        
        {/* Glow effect on hover */}
        <rect
          x="4"
          y="14"
          width="40"
          height="28"
          rx="4"
          fill="none"
          className={`opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
            isOpen ? 'stroke-green-400' : 'stroke-white'
          }`}
          strokeWidth="2"
        />
      </svg>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 0.8;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </button>
  );
};

export default BriefcaseIcon;