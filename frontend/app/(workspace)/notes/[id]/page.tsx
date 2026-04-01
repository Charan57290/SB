'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, Sparkles } from 'lucide-react';
import TiptapEditor from '@/components/notes/TiptapEditor';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion } from 'framer-motion';

export default function NoteEditorPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('New Document');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (id && id !== 'new') {
      api.get('/notes').then(r => {
        const note = r.data.find((n: any) => n.id === id);
        if (note) { setTitle(note.title); setContent(note.content); }
      }).catch(() => {});
    }
  }, [id]);

  const handleSave = useCallback(async () => {
    if (!title.trim() || status === 'saving') return;
    setStatus('saving');
    try {
      if (id === 'new') {
        const r = await api.post('/notes', { title, content });
        router.push(`/notes/${r.data.id}`);
      } else {
        await api.put(`/notes/${id}`, { title, content });
      }
      setStatus('saved');
      setLastSaved(new Date().toLocaleTimeString());
      setTimeout(() => setStatus('idle'), 3000);
    } catch { setStatus('error'); }
  }, [id, title, content, router, status]);

  useEffect(() => {
    const onSave = () => handleSave();
    window.addEventListener('workspace:save', onSave);
    return () => window.removeEventListener('workspace:save', onSave);
  }, [handleSave]);

  const saveBtn = (
    <button
      onClick={handleSave}
      className={cn(
        'flex items-center gap-2 h-10 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-white/5',
        status === 'saved' ? 'bg-white/10 text-white/40' : 'bg-white text-black hover:bg-gray-200'
      )}
    >
      {status === 'saving' ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
      {status === 'saving' ? 'Synchronizing…' : status === 'saved' ? 'Synchronized' : 'Execute Save'}
    </button>
  );

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title={title || 'Neutral Node'} backLabel="Nodes" backHref="/notes" actions={saveBtn} />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Title input */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Neural identifier…"
          className="text-4xl md:text-6xl font-black bg-transparent border-none text-white focus:outline-none placeholder:text-white/5 mb-4 w-full uppercase tracking-tighter"
        />
        <div className="flex items-center gap-3 mb-12">
          <span className={cn('w-2 h-2 rounded-full transition-all duration-500', status === 'saved' ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/10')} />
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            {status === 'saving' ? 'Synapse Active…' : status === 'saved' ? `Node verified at ${lastSaved}` : 'Ready for cognitive input'}
          </span>
        </div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex-1 min-h-[60vh]"
        >
          <TiptapEditor content={content} onChange={setContent} />
        </motion.div>
      </div>
    </div>
  );
}
