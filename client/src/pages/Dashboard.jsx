import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, File, MessageSquare, Plus } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (!user) return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-textSecondary">Here's an overview of your Second Brain.</p>
          </div>
          <button onClick={handleLogout} className="text-sm bg-card hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/5 transition-colors">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/notes" className="glass-panel p-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Notes</h3>
            <p className="text-sm text-gray-400">Manage your thoughts, ideas, and captured knowledge.</p>
          </Link>

          <Link to="/documents" className="glass-panel p-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <File size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Documents</h3>
            <p className="text-sm text-gray-400">PDFs, links, and external resources stored securely.</p>
          </Link>
          
          <Link to="/chat" className="glass-panel p-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all group relative overflow-hidden">
             {/* Glow effect specific to chat */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Chat</h3>
            <p className="text-sm text-gray-400">Query your entire knowledge base using intelligent search.</p>
          </Link>
        </div>

        <div className="mt-12 glass-panel p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <Link to="/notes" className="flex items-center gap-1 text-sm text-accent hover:text-white transition-colors">
              <Plus size={16} /> New Note
            </Link>
          </div>
          <div className="text-center py-12 text-textSecondary border border-dashed border-white/10 rounded-xl">
            You haven't created any knowledge items yet.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
