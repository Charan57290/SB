import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      const parsed = JSON.parse(userInfo);
      setToken(parsed.token);
      fetchNotes(parsed.token);
    }
  }, [navigate]);

  const fetchNotes = async (jwtToken) => {
    try {
      const { data } = await axios.get('/api/notes', {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/notes', { 
        title, 
        content, 
        tags: tags.split(',').map(tag => tag.trim()) 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes([data, ...notes]);
      setTitle('');
      setContent('');
      setTags('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Form */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus size={20} className="text-white" /> Create Note
            </h2>
            {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-sm text-textSecondary mb-1.5">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-textSecondary mb-1.5">Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent h-32 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-textSecondary mb-1.5">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
                  placeholder="react, api, tasks"
                />
              </div>
              <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Save Note
              </button>
            </form>
          </div>
        </div>

        {/* Notes Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Your Database</h2>
          {notes.length === 0 ? (
            <div className="text-textSecondary py-8 text-center border border-dashed border-white/10 rounded-xl">
              No notes found. Create one.
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="glass-panel p-6 flex flex-col group relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors">{note.title}</h3>
                  <button onClick={() => handleDelete(note._id)} className="text-textSecondary hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-textSecondary text-sm mb-4 whitespace-pre-wrap">{note.content}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {note.tags.map((tag, i) => (
                    tag && <span key={i} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-md border border-white/10">{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Notes;
