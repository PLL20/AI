import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatDisplayProps {
  isLoadingInitial: boolean;
  isStreaming: boolean;
  error: string | null;
  chatHistory: ChatMessage[];
}

const Loader: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-gray-700 rounded-full animate-spin"></div>
    </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 p-4">
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce"></div>
    </div>
);

export const ChatDisplay: React.FC<ChatDisplayProps> = ({ isLoadingInitial, isStreaming, error, chatHistory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isStreaming]);
  
  const renderContent = () => {
    if (isLoadingInitial) {
        return <Loader />;
    }
    
    if (error) {
      return (
        <div className="p-4 m-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
          <p className="font-bold">发生错误</p>
          <p>{error}</p>
        </div>
      );
    }
    
    if (chatHistory.length === 0) {
       return (
        <div className="flex-grow flex justify-center items-center text-center text-gray-500 p-12">
            <p>选择一个伴侣类型，开始对话吧。</p>
        </div>
       );
    }

    return (
      <>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex animate-new-message ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl whitespace-pre-wrap break-words ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-gray-700/80 text-gray-200 rounded-bl-none shadow-md'
              }`}
            >
              {msg.text || <span className="opacity-50">...</span>}
            </div>
          </div>
        ))}
        {isStreaming && (
           <div className="flex justify-start">
             <div className="bg-gray-700/80 rounded-2xl rounded-bl-none shadow-md">
                <TypingIndicator />
             </div>
           </div>
        )}
      </>
    );
  };

  return (
    <div 
        ref={scrollRef} 
        className="flex-grow bg-black/30 rounded-lg overflow-y-auto chat-display border border-gray-700/50"
    >
      <div className="p-4 space-y-4">
        {renderContent()}
      </div>
       <style>{`
        @keyframes new-message-animation {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-new-message {
          animation: new-message-animation 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};