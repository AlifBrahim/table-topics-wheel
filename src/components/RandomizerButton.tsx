import React from 'react';
import Image from 'next/image';

interface RandomizerButtonProps {
  isRandomizing: boolean;
  onClick: () => void;
}

const RandomizerButton: React.FC<RandomizerButtonProps> = ({ isRandomizing, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isRandomizing}
      className={`group relative p-4 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-lg cursor-pointer ${
        isRandomizing ? 'animate-spin cursor-not-allowed opacity-70' : ''
      }`}
      aria-label={isRandomizing ? "Randomizing..." : "Pick random card"}
    >
      <div className={`w-12 h-12 flex items-center justify-center ${isRandomizing ? 'animate-pulse' : ''}`}>
        <Image
          src="/Button_Icon_Green.svg"
          alt="Randomize"
          width={48}
          height={48}
          className="drop-shadow-lg"
        />
      </div>
      
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
          isRandomizing ? 'animate-ping' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 0, 0.4) 0%, transparent 70%)',
        }}
      />
      
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </button>
  );
};

export default RandomizerButton;