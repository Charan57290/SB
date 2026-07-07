'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, Sparkles, BrainCircuit, X } from 'lucide-react';
import TiptapEditor from '@/components/notes/TiptapEditor';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

export default function NoteEditorPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiContext, setAiContext] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      api.get(`/notes/${id}`).then(r => {
        const note = r.data;
        if (note) { setTitle(note.title); setContent(note.content); }
      }).catch(() => {});
    }
  }, [id]);

  // AI Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (title.trim() && title.length > 2) {
        setAiLoading(true);
        api.get(`/notes/context?title=${encodeURIComponent(title)}`)
          .then(res => setAiContext(res.data))
          .catch(() => setAiContext(null))
          .finally(() => setAiLoading(false));
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [title]);

  const user = useAuthStore((state) => state.user);

  const handleSave = useCallback(async () => {
    if (status === 'saving') return;
    setStatus('saving');
    const finalTitle = title.trim() ? title : 'Untitled Note';
    try {
      if (id === 'new') {
        const userId = user?.userId || user?.id || null;
        const r = await api.post('/notes', { title: finalTitle, content, userId });
        router.push(`/notes/${r.data.id}`);
      } else {
        await api.put(`/notes/${id}`, { title: finalTitle, content });
      }
      setStatus('saved');
      setLastSaved(new Date().toLocaleTimeString());
      setTimeout(() => setStatus('idle'), 3000);
    } catch { setStatus('error'); }
  }, [id, title, content, router, status, user]);

  useEffect(() => {
    const onSave = () => handleSave();
    window.addEventListener('workspace:save', onSave);
    
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('workspace:save', onSave);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleSave]);

  // Auto-Save
  useEffect(() => {
    if (status === 'saving' || status === 'saved') return;
    const handler = setTimeout(() => {
      if (title.trim() || content.trim() !== '<p></p>') {
        handleSave();
      }
    }, 3000);
    return () => clearTimeout(handler);
  }, [title, content, handleSave]);

  const saveBtn = (
    <div className="flex z-50 items-center gap-4">
      <button
        onClick={handleSave}
        className={cn(
          'flex items-center gap-2 h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm',
          status === 'saved' ? 'bg-slate-100 text-slate-400' : 'bg-black text-white hover:bg-slate-800'
        )}
      >
        {status === 'saving' ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
        {status === 'saving' ? 'Synchronizing…' : status === 'saved' ? 'Synchronized' : 'Execute Save'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col relative z-20">
      <MinimalTopNav title={title || 'Neutral Node'} backLabel="Nodes" backHref="/notes" actions={saveBtn} lightTheme={true} />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Title input */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Neural identifier…"
          className="text-4xl md:text-6xl font-black bg-transparent border-none text-slate-900 focus:outline-none placeholder:text-slate-200 mb-4 w-full uppercase tracking-tighter"
        />
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-3 pr-4 border-r border-slate-100 border-dashed">
            <span className={cn('w-2 h-2 rounded-full transition-all duration-500', status === 'saved' ? 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.1)]' : 'bg-slate-200')} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {status === 'saving' ? 'Synapse Active…' : status === 'saved' ? `Node verified at ${lastSaved}` : 'Ready for cognitive input'}
            </span>
          </div>
          
          {/* AI Discovery UI Block */}
          {aiLoading && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50/50 rounded-full border border-indigo-100">
               <BrainCircuit className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">AI Analyzing Topic...</span>
            </div>
          )}
          {aiContext && !aiLoading && (
            <button 
              onMouseEnter={() => setAiPanelOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors relative group cursor-help"
            >
               <BrainCircuit className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Hover for AI Insights</span>
               {aiContext.imageUrl && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white animate-bounce"></span>}
            </button>
          )}
        </div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex-1 min-h-[60vh] text-slate-800"
        >
          <TiptapEditor content={content} onChange={setContent} />
        </motion.div>
      </div>

      {/* AI Context Overlay */}
      <AnimatePresence>
        {aiPanelOpen && aiContext && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onMouseLeave={() => setAiPanelOpen(false)}
            className="fixed top-24 right-8 w-80 bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-100 overflow-hidden z-[100]"
          >
            {aiContext.imageUrl ? (
              <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                <img src={aiContext.imageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button onClick={() => setAiPanelOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ) : (
               <div className="h-12 flex justify-end p-4">
                 <button onClick={() => setAiPanelOpen(false)} className="p-1.5 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-4 h-4" /></button>
               </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">AI Context</span>
              </div>
              <h4 className="font-bold text-slate-900 uppercase tracking-tight mb-3 line-clamp-2 leading-tight">{aiContext.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{aiContext.definition}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
