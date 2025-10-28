import React from 'react';
import { PartnerType } from '../types';
import { PARTNER_OPTIONS } from '../constants';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  partnerType: PartnerType;
  setPartnerType: (type: PartnerType) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const SendIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
    </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  partnerType,
  setPartnerType,
  onSendMessage,
  isLoading,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="pt-4 pb-2">
      <div className="mb-3">
          <label htmlFor="partner-type" className="sr-only">选择伴侣类型</label>
          <select
            id="partner-type"
            value={partnerType}
            onChange={(e) => setPartnerType(e.target.value as PartnerType)}
            className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 appearance-none text-white"
            style={{
                background: 'url(\'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\') no-repeat right 1rem center/12px 12px, #1f2937'
            }}
            disabled={isLoading}
          >
            {PARTNER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
      </div>
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border-2 border-transparent focus-within:border-cyan-600 transition-colors">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="在这里输入您的消息..."
            className="w-full max-h-36 p-2 text-base bg-transparent border-none rounded-lg focus:ring-0 resize-none text-gray-100 placeholder-gray-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-200 ease-in-out transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            aria-label="发送消息"
          >
            <SendIcon className="w-5 h-5" />
          </button>
      </form>
    </div>
  );
};