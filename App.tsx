import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ChatDisplay } from './components/ChatDisplay';
import { SettingsPanel } from './components/SettingsPanel';
import { generateStream, summarizeHistory } from './services/geminiService';
import { PartnerType, ChatMessage, Settings } from './types';
import { PARTNER_OPTIONS } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [partnerType, setPartnerType] = useState<PartnerType>(PARTNER_OPTIONS[0]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    eroticismIndex: 50,
    contextMemory: 12,
  });

  // Effect to initialize or reset chat when partner type or settings change
  useEffect(() => {
    setError(null);
    setChatHistory([]);
    setIsLoading(true);
    
    const startConversation = async () => {
      try {
        const stream = await generateStream(partnerType, settings, [], "你好");
        let fullText = '';
        for await (const chunk of stream) {
            fullText += chunk.text;
        }
        setChatHistory([{ sender: 'ai', text: fullText.trim() }]);
      } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('发生未知错误');
          }
      } finally {
          setIsLoading(false);
      }
    };
    startConversation();
  }, [partnerType, settings]);

  const handleSendMessage = useCallback(async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    setError(null);
    setIsLoading(true);

    const newUserMessage: ChatMessage = { sender: 'user', text: trimmedPrompt };
    const currentChat = [...chatHistory, newUserMessage];
    setChatHistory(currentChat);
    setPrompt('');
    
    setChatHistory(prev => [...prev, { sender: 'ai', text: '' }]);

    const memoryLimit = settings.contextMemory > 0 ? settings.contextMemory : currentChat.length;
    const context = currentChat.slice(-memoryLimit);

    try {
      const stream = await generateStream(partnerType, settings, context, trimmedPrompt);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { sender: 'ai', text: fullText };
          return newHistory;
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发生未知错误';
      setError(errorMessage);
      setChatHistory(prev => prev.slice(0, -1)); 
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, chatHistory, partnerType, settings]);
  
  const handleConsolidateHistory = useCallback(async () => {
    if (isLoading || chatHistory.length < 2) {
      alert("对话内容过少，无法进行整合。");
      return;
    }
    
    const confirmation = window.confirm("确定要整合当前对话记录吗？这将清空现有对话，并由 AI 生成一段摘要作为新对话的开始。");
    if (!confirmation) return;

    setIsLoading(true);
    setError(null);
    try {
      const summary = await summarizeHistory(partnerType, chatHistory);
      setChatHistory([{ sender: 'ai', text: summary }]);
      setShowSettings(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '整合失败');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatHistory, partnerType]);

  return (
    <div className="min-h-screen flex flex-col items-center p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full" style={{height: 'calc(100vh - 2rem)'}}>
        <Header onToggleSettings={() => setShowSettings(s => !s)} />
        <main className="mt-4 flex-grow flex flex-col min-h-0">
          <ChatDisplay
            isLoadingInitial={isLoading && chatHistory.length === 0}
            isStreaming={isLoading && chatHistory.length > 0}
            error={error}
            chatHistory={chatHistory}
          />
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            partnerType={partnerType}
            setPartnerType={setPartnerType}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </main>
      </div>
      {showSettings && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          onConsolidate={handleConsolidateHistory}
          onClose={() => setShowSettings(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;