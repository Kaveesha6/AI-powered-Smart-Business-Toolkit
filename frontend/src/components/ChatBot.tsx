import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Matches your existing api.js exactly - { field, question }
// ✅ NEW: Includes Authorization header if user is logged in
const askQuestion = async (field: string, question: string) => {
  try {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ field, question }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { answer: 'Server error. Please try again later.' };
  }
};

// ✅ Matches your existing field icons exactly
const fieldIcons: Record<string, string> = {
  Marketing: '📢',
  Sales: '💼',
  Finance: '💰',
  Operations: '⚙️',
  'Idea Validation': '💡',
};

const fields = ['Marketing', 'Sales', 'Finance', 'Operations', 'Idea Validation'];

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [field, setField] = useState('Marketing');
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ✅ Auto greeting - same as your Chatbot.jsx
  useEffect(() => {
    setChatHistory([
      {
        id: '1',
        sender: 'bot',
        message: "Hello! I'm BizBuddy 🤖✨ Select a field and ask your business question.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: question,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);
    const currentQuestion = question;
    setQuestion('');

    // ✅ Call API exactly like your existing api.js
    const response = await askQuestion(field, currentQuestion);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      message: response.answer || "I'm sorry, I couldn't find a suitable answer.",
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-700 animate-in slide-in-from-bottom-4 fade-in-0 duration-300"
      style={{ height: 'calc(100vh - 140px)', maxHeight: '600px' }}
    >
      {/* ✅ Header - matches your gradient style */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-tight">BBB Assistant</h3>
            <p className="text-pink-100 text-xs">Your Business Buddy</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ✅ Field Selector - matches your Chatbot.jsx field buttons */}
      <div className="flex gap-1.5 px-3 py-2.5 flex-wrap flex-shrink-0 bg-gray-900 border-b border-gray-700">
        {fields.map((f) => (
          <button
            key={f}
            onClick={() => setField(f)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
              field === f
                ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-transparent border-gray-600 text-gray-400 hover:border-pink-500 hover:text-pink-400'
            }`}
          >
            {fieldIcons[f]} {f}
          </button>
        ))}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
          >
            {/* Bot Avatar */}
            {chat.sender === 'bot' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)' }}
              >
                🤖
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                chat.sender === 'user'
                  ? 'text-white rounded-2xl rounded-br-sm'
                  : 'text-white rounded-2xl rounded-bl-sm'
              }`}
              style={{
                background:
                  chat.sender === 'user'
                    ? 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)'
                    : '#F44336',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {chat.message}
              <div className="text-xs opacity-60 mt-1">
                {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Dots - matches your Chatbot.jsx */}
        {loading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)' }}
            >
              🤖
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
              style={{ background: '#F44336' }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Active Field Indicator */}
      <div className="px-4 py-1.5 bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <p className="text-xs text-gray-400">
          Active field:{' '}
          <span className="text-pink-400 font-semibold">
            {fieldIcons[field]} {field}
          </span>
        </p>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-gray-900 border-t border-gray-700 flex-shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask about ${field}... ✍️`}
            rows={1}
            className="flex-1 bg-gray-800 border border-gray-700 focus:border-pink-500 text-white placeholder-gray-500 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none transition-colors"
            style={{ minHeight: '42px', maxHeight: '100px' }}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!question.trim() || loading}
            className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            style={{
              background:
                !question.trim() || loading
                  ? '#4B5563'
                  : 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)',
            }}
          >
            {loading ? (
              <span>Thinking...</span>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;