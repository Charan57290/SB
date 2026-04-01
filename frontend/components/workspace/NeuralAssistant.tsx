'use client';

import { Bot, User, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useSearchParams } from 'next/navigation';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion } from 'framer-motion';

export default function NeuralAssistant() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I\'m your AI assistant. Ask me anything about your notes, ideas, or anything else.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) handleSend(initialQuery);
  }, [initialQuery]);

  const handleSend = async (override?: string) => {
    const messageContent = override || input;
    if (!messageContent.trim() || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: messageContent }]);
    setInput('');
    setLoading(true);
    try {
      const response = await api.post('/assistant/ask', { query: messageContent, userId: user?.id });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.result }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="AI Assistant" />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8 text-center">
          <div className="w-14 h-14 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-white/5 backdrop-blur-xl">
            <Bot className="w-7 h-7 text-white/60" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tighter uppercase">AI Assistant</h1>
          <p className="text-white/40 mt-2 font-bold uppercase tracking-widest text-[10px]">Powered by your Second Brain</p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2.5 rounded-xl border shrink-0 backdrop-blur-md transition-all ${m.role === 'assistant' ? 'bg-white/[0.03] border-white/10 text-white/40' : 'bg-white border-transparent text-black shadow-lg shadow-white/10'}`}>
                {m.role === 'assistant' ? <MessageSquare className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] px-5 py-4 rounded-2xl text-sm leading-relaxed backdrop-blur-xl shadow-2xl ${m.role === 'assistant' ? 'bg-white/[0.02] border border-white/5 text-white/70' : 'bg-white/10 border border-white/20 text-white font-medium'}`}>
                {m.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-white/40 animate-pulse">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10"><MessageSquare className="w-4 h-4" /></div>
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Thinking...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-3 focus-within:border-white/30 transition-all shadow-2xl">
          <input
            type="text"
            placeholder="Ask your Second Brain anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 px-3 text-sm font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-white text-black h-10 px-5 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
