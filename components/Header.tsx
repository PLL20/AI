import React from 'react';

const SettingsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


interface HeaderProps {
    onToggleSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSettings }) => {
  return (
    <header className="text-center relative py-2">
      <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 py-2"
          style={{ filter: 'drop-shadow(0 0 10px rgba(100, 200, 255, 0.3))' }}
      >
        斗篷
      </h1>
      <p className="mt-1 text-lg text-gray-400/80">您的专属 AI 伴侣</p>
      <button 
        onClick={onToggleSettings}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 rounded-full hover:bg-white/10"
        aria-label="打开设置"
        >
        <SettingsIcon className="w-7 h-7" />
      </button>
    </header>
  );
};