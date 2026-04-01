import { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, Link as LinkIcon, Trash2, File } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
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
      fetchDocuments(parsed.token);
    }
  }, [navigate]);

  const fetchDocuments = async (jwtToken) => {
    try {
      const { data } = await axios.get('/api/documents', {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setDocuments(data);
    } catch (err) {
      setError('Failed to fetch documents');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/documents', { title, fileUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments([data, ...documents]);
      setTitle('');
      setFileUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload document');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (err) {
      setError('Failed to delete document');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none"></div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UploadCloud size={20} className="text-white" /> Add Resource
            </h2>
            {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm text-textSecondary mb-1.5">Document Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50"
                  placeholder="e.g. Q3 Research Paper"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-textSecondary mb-1.5">Link / URL</label>
                <input 
                  type="url" 
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50"
                  placeholder="https://..."
                  required
                />
              </div>
              <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors mt-2">
                Save to Brain
              </button>
            </form>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Linked Documents</h2>
          {documents.length === 0 ? (
            <div className="text-textSecondary py-8 text-center border border-dashed border-white/10 rounded-xl flex flex-col items-center gap-3">
              <LinkIcon size={32} className="text-white/20" />
              <span>No documents added yet. Link a resource.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc._id} className="glass-panel p-5 flex flex-col group relative overflow-hidden">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4">
                    <File size={20} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors truncate">{doc.title}</h3>
                  
                  <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-textSecondary text-sm mb-4 flex items-center gap-1 hover:text-white truncate mt-1">
                    <LinkIcon size={14} /> {doc.fileUrl}
                  </a>
                  
                  <div className="mt-auto flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-xs text-textSecondary">{new Date(doc.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => handleDelete(doc._id)} className="text-textSecondary hover:text-red-400 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Documents;
