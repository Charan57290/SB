import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      const parsed = JSON.parse(userInfo);
      setToken(parsed.token);
      fetchChatHistory(parsed.token);
    }
  }, [navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatHistory = async (jwtToken) => {
    try {
      const { data } = await axios.get('/api/chat', {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      // Flatten history into array of messages
      const formatted = [];
      data.forEach(item => {
        formatted.push({ id: item._id + '-q', role: 'user', content: item.question });
        formatted.push({ id: item._id + '-a', role: 'ai', content: item.answer });
      });
      setMessages(formatted);
    } catch (err) {
      console.error('Failed to fetch chat history');
    }
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newQuestion = question;
    setQuestion('');
    
    // Add optimistic user message
    const optimisticId = Date.now().toString();
    setMessages(prev => [...prev, { id: optimisticId, role: 'user', content: newQuestion }]);
    setLoading(true);

    try {
      const { data } = await axios.post('/api/chat', { question: newQuestion }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => [...prev, { id: data._id + '-a', role: 'ai', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err-' + optimisticId, role: 'ai', content: "Error communicating with AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-6 px-6 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col h-[calc(100vh-8rem)] glass-panel relative overflow-hidden">
        {/* Ambient glow behind chat */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="p-4 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-white font-semibold">Second Brain AI</h2>
            <p className="text-xs text-gray-400">Ask anything about your stored knowledge</p>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <Bot size={48} className="text-white/20 mb-4" />
              <h3 className="text-xl text-white font-medium mb-2">How can I help you today?</h3>
              <p className="text-textSecondary max-w-md">I can retrieve information from your notes, summarize documents, or help you connect ideas.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-white/20 text-white'}`}>
                  {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm md:text-base ${
                  msg.role === 'user' 
                    ? 'bg-white/5 border border-white/20 text-white rounded-tr-sm' 
                    : 'bg-white/5 border border-white/10 text-white rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-neon/20 text-neon">
                <Bot size={16} />
              </div>
              <div className="max-w-[80%] rounded-2xl px-5 py-4 bg-card border border-white/10 text-textSecondary rounded-tl-sm flex gap-1">
                <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-white/10 bg-background/50 backdrop-blur-md z-10">
          <form onSubmit={handleAsk} className="relative">
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-full pl-5 pr-12 py-3.5 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all"
              placeholder="Ask a question about your knowledge..."
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !question.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-colors"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
