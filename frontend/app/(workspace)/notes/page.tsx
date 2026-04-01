'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, FileText, Tag as TagIcon, Calendar, MoreVertical, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion } from 'framer-motion';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get(`/notes?userId=${user?.id}`);
        setNotes(response.data);
      } catch { console.error('Failed to fetch notes'); }
      finally { setLoading(false); }
    };
    if (user?.id) fetchNotes();
  }, [user?.id]);

  const newNoteBtn = (
    <button 
      onClick={() => router.push('/notes/new')}
      className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-gray-200 shadow-2xl shadow-white/5"
    >
      <Plus className="w-4 h-4" />
      Create Note
    </button>
  );

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="Notes" actions={newNoteBtn} />

      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Notes</h1>
          <p className="text-white/40 mt-2 font-medium tracking-wide uppercase text-[10px]">Capture and organise your thoughts.</p>
        </motion.div>

        {/* Search */}
        <div className="relative group max-w-sm mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all placeholder:text-white/20"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            <div className="col-span-full h-48 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
            </div>
          ) : notes.length === 0 ? (
            <div className="col-span-full h-64 flex flex-col items-center justify-center text-white/20 gap-4">
              <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-white/20">
                <FileText className="w-8 h-8" />
              </div>
              <p className="font-bold text-white/20 uppercase tracking-widest text-[10px]">No notes yet.</p>
              <button onClick={() => router.push('/notes/new')} className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white underline underline-offset-4">Create your first note →</button>
            </div>
          ) : (
            notes
              .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
              .map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  onClick={() => router.push(`/notes/${note.id}`)}
                  className="group bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-white/5 transition-all cursor-pointer flex flex-col h-[200px] backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/40 group-hover:text-white group-hover:border-white/30 transition-all"><FileText className="w-4 h-4" /></div>
                    <button className="text-white/20 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-white/90 transition-colors line-clamp-1 mb-1 uppercase tracking-tight">{note.title}</h3>
                  <p className="text-xs text-white/40 line-clamp-2 mb-auto font-medium leading-relaxed">{note.content?.replace(/<[^>]*>?/gm, '')}</p>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
                    <div className="flex gap-1.5">
                      {note.tags?.slice(0, 2).map((tag: any) => (
                        <span key={tag.id} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.05] text-[9px] font-bold uppercase tracking-widest text-white/30"><TagIcon className="w-2.5 h-2.5" />{tag.name}</span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/20"><Calendar className="w-3 h-3" />{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
