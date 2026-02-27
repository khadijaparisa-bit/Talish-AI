
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { generateAIHelp } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  context: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m your Infinity Assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await generateAIHelp(input, context);
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: response || 'No response received.', 
      timestamp: new Date() 
    }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col transition-all ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold text-sm">Infinity AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded">
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
