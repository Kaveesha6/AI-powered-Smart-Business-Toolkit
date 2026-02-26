import React, { useState } from 'react';

interface ChatBotButtonProps {
  onClick: () => void;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          Hi! I'm BBB, your business buddy! 🤖
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce hover:animate-none"
        aria-label="Open chatbot"
      >
        {/* Pulse Animation Ring */}
        <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
        
        {/* Robot Icon */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </div>

      </button>
    </div>
  );
};

export default ChatBotButton;