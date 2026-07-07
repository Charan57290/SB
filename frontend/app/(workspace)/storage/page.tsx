'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Folder, Upload, File, MoreVertical, Search, FileText, Image as ImageIcon, Download, Trash } from 'lucide-react';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export default function StoragePage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [usage, setUsage] = useState({ usedBytes: 0, limitBytes: 2147483648 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  const fetchFiles = async () => {
    try {
      const queryId = user?.userId || user?.id || '';
      
      const [docsRes, usageRes] = await Promise.all([
        api.get(`/documents?userId=${queryId}`),
        api.get(`/documents/usage?userId=${queryId}`)
      ]);
      
      setFiles(docsRes.data);
      if (usageRes.data) {
          setUsage(usageRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    if (user?.userId || user?.id) {
        formData.append('userId', user.userId || user.id);
    }

    try {
      await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchFiles(); // refresh list
    } catch (error: any) {
      if (error.response?.status === 403) {
          alert('Upload failed: Storage quota exceeded (2GB maximum).');
      } else {
          console.error('Upload failed:', error);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      await api.delete(`/documents/${id}`);
      setFiles(files.filter(f => f.id !== id));
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const filteredFiles = files.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));

  const renderFileIcon = (mimeType: string) => {
    if (!mimeType) return <File className="w-8 h-8 text-white/20" />;
    if (mimeType.includes('image')) return <ImageIcon className="w-8 h-8 text-white/40" />;
    if (mimeType.includes('pdf') || mimeType.includes('text')) return <FileText className="w-8 h-8 text-white/40" />;
    return <File className="w-8 h-8 text-white/20" />;
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Storage</h1>
            <p className="text-white/40 mt-2 font-medium tracking-wide uppercase text-[10px]">Manage your documents and local intelligence assets.</p>
            
            <div className="mt-8 flex flex-col gap-3 w-72">
               <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/30">
                  <span>Usage Limits</span>
                  <span className="text-white/60">{bytesToSize(usage.usedBytes)} / {bytesToSize(usage.limitBytes)}</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                      className="h-full bg-white transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                      style={{ width: `${Math.min((usage.usedBytes / usage.limitBytes) * 100, 100)}%` }}
                  />
               </div>
            </div>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-white text-black px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-gray-200 shadow-2xl shadow-white/5 disabled:opacity-50"
          >
            {uploading ? (
                 <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
            ) : <Upload className="w-4 h-4" />}
            {uploading ? 'Processing...' : 'Upload Data'}
          </button>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-12">
            <div className="relative group flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search files..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                />
            </div>
        </div>

        {/* Content */}
        {!loading && filteredFiles.length === 0 ? (
          <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-white/[0.02] border border-white/5 rounded-[3rem] border-dashed flex flex-col items-center justify-center p-16 backdrop-blur-sm"
          >
              <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/10 mb-8">
                  <Folder className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">No objects mapped</h3>
              <p className="text-white/20 text-center max-w-sm mb-10 leading-relaxed text-[10px] font-bold uppercase tracking-widest">
                  Connect your local storage or drag and drop files here to start mapping your knowledge base.
              </p>
              <button onClick={() => fileInputRef.current?.click()} className="px-10 py-4 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-white/5 hover:text-white transition-all">
                  Initialize Local Storage
              </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredFiles.map((file) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={file.id}
                  className="group relative bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.05] hover:border-white/30 transition-all cursor-pointer overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="w-16 h-16 rounded-[1.2rem] bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20">
                      {renderFileIcon(file.mimeType)}
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                         href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${file.fileUrl}`} 
                         download={file.title} 
                         target="_blank" 
                         rel="noreferrer"
                         className="p-2.5 text-white/20 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                         <Download className="w-4 h-4" />
                      </a>
                      <button 
                         onClick={() => handleDelete(file.id)}
                         className="p-2.5 text-white/20 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                         <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 truncate uppercase tracking-tight">{file.title}</h3>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                       <span className="text-white/40">{bytesToSize(file.sizeBytes || 0)}</span>
                       <span className="w-1 h-1 rounded-full bg-white/10" />
                       <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
