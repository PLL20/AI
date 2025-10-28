import React from 'react';
import { Settings } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  onConsolidate: () => void;
  onClose: () => void;
  isLoading: boolean;
}

const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings, onConsolidate, onClose, isLoading }) => {
    
  const handleSettingsChange = (field: keyof Settings, value: any) => {
    setSettings({ ...settings, [field]: Number(value) });
  };
    
  return (
    <div 
      className="fixed inset-0 bg-black/70 z-10 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800/90 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-xl border border-gray-700 p-6 space-y-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <CloseIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              对话设置
          </h2>

          {/* Eroticism Index */}
          <div className="space-y-3">
              <label htmlFor="eroticism-index" className="flex justify-between font-medium text-gray-300">
                  <span>色情指数</span>
                  <span className="font-bold text-cyan-400">{settings.eroticismIndex}%</span>
              </label>
              <input
                  type="range"
                  id="eroticism-index"
                  min="10"
                  max="100"
                  step="5"
                  value={settings.eroticismIndex}
                  onChange={(e) => handleSettingsChange('eroticismIndex', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  disabled={isLoading}
              />
          </div>

          {/* Context Memory */}
           <div className="space-y-3">
              <label htmlFor="context-memory" className="flex justify-between font-medium text-gray-300">
                  <span>上下文记忆</span>
                   <span className="font-bold text-cyan-400">{settings.contextMemory} 条</span>
              </label>
              <input
                  type="range"
                  id="context-memory"
                  min="2"
                  max="100"
                  step="2"
                  value={settings.contextMemory}
                  onChange={(e) => handleSettingsChange('contextMemory', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  disabled={isLoading}
              />
          </div>
          
          {/* Consolidate History */}
          <div className="border-t border-gray-700/50 pt-6">
              <button
                  onClick={onConsolidate}
                  disabled={isLoading}
                  className="w-full p-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isLoading ? '处理中...' : '整合历史记录'}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                  将当前对话总结为摘要，并开启新话题，可用于避免上下文过长。
              </p>
          </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};