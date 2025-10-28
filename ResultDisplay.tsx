
import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedText: string;
}

const Loader: React.FC = () => (
    <div className="flex justify-center items-center py-8">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-gray-700 rounded-full animate-spin"></div>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, generatedText }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
          <p className="font-bold">发生错误</p>
          <p>{error}</p>
        </div>
      );
    }
    if (generatedText) {
      return (
        <div className="prose prose-invert prose-lg max-w-none p-6 bg-gray-800/50 rounded-lg whitespace-pre-wrap">
          {generatedText}
        </div>
      );
    }
    return (
      <div className="text-center text-gray-500 py-12">
        <p>您的创意杰作将在此处显现...</p>
      </div>
    );
  };

  return <div className="mt-8 min-h-[200px]">{renderContent()}</div>;
};
