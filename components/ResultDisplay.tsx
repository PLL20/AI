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
    <div className="flex items-center space-x-2 p-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
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
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} p-2`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl whitespace-pre-wrap break-words ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text || <span className="opacity-50">...</span>}
            </div>
          </div>
        ))}
        {isStreaming && (
           <div className="flex justify-start">
             <TypingIndicator />
           </div>
        )}
      </>
    );
  };

  return (
    <div 
        ref={scrollRef} 
        className="flex-grow bg-gray-800/50 rounded-b-lg overflow-y-auto chat-display"
        style={{ minHeight: 'calc(100vh - 350px)' }}
    >
      <div className="p-4 space-y-2">
        {renderContent()}
      </div>
    </div>
  );
};
