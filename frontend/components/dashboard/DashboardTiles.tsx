'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  MessageSquare, 
  Share2, 
  FolderKanban, 
  Clock, 
  HardDrive,
  Plus,
  ArrowUpRight,
  Send,
  Play,
  RotateCcw,
  Activity
} from 'lucide-react';
import BentoCard from './BentoCard';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export function NotesTile() {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        const sorted = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 2);
        setNotes(sorted);
      } catch (err) {
        console.error('Failed to fetch notes for dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <BentoCard 
      title="Intelligence Nodes" 
      subtitle="Recent Research"
      icon={FileText}
      className="col-span-3 row-span-2"
      onClick={() => router.push('/notes')}
    >
      <div className="mt-6 space-y-4">
        {loading ? (
             <div className="flex flex-col gap-3">
                 {[1, 2].map(i => (
                    <div key={i} className="h-20 w-full bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse"></div>
                 ))}
             </div>
        ) : notes.length > 0 ? (
          notes.map(note => (
            <div key={note.id} className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group/note cursor-pointer shadow-sm shadow-black">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">System / Node</p>
                <p className="text-sm font-semibold text-white group-hover/note:text-white transition-colors truncate max-w-[200px] leading-snug">{note.title}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1.5 opacity-60">
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/note:bg-white group-hover/note:text-black transition-all">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 rounded-[2.5rem] border border-dashed border-white/5 text-center bg-white/[0.01]">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest italic">No Nodes Detected</p>
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); router.push('/notes/new'); }}
          className="w-full mt-4 py-4 rounded-3xl border border-dashed border-white/10 text-gray-600 text-[10px] font-semibold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-3 bg-white/[0.01]"
        >
          <Plus className="w-4 h-4" /> Quick Capture Node
        </button>
      </div>
    </BentoCard>
  );
}

export function AssistantTile() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleQuickSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      router.push(`/assistant?q=${encodeURIComponent(query)}`);
  };

  return (
    <BentoCard 
      title="Neural Assistant" 
      subtitle="AI Processor"
      icon={MessageSquare}
      className="col-span-3 row-span-1"
      onClick={() => router.push('/assistant')}
    >
      <form className="flex gap-3 mt-6" onClick={(e) => e.stopPropagation()} onSubmit={handleQuickSend}>
        <div className="relative flex-1">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your brain anything..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-700 font-medium"
            />
        </div>
        <button type="submit" className="px-5 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all shadow-xl shadow-white/5 font-bold text-[10px] uppercase tracking-widest">
          Send
        </button>
      </form>
    </BentoCard>
  );
}

export function ProjectsTile() {
  const router = useRouter();
  return (
    <BentoCard 
      title="Projects" 
      subtitle="Active Workspace"
      icon={FolderKanban}
      className="col-span-2 row-span-1"
      onClick={() => router.push('/projects')}
    >
      <div className="mt-6 flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-12 h-12 rounded-2xl border-2 border-black bg-white flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-white/5">P{i}</div>
        ))}
        <div className="w-12 h-12 rounded-2xl border-2 border-black bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-600 tracking-tighter shadow-lg">+4</div>
      </div>
    </BentoCard>
  );
}

export function GraphTile() {
  const router = useRouter();
  return (
    <BentoCard 
      title="Neural Map" 
      subtitle="Knowledge Graph"
      icon={Share2}
      className="col-span-2 row-span-1"
      onClick={() => router.push('/graph')}
    >
      <div className="mt-6 flex items-center justify-center h-20">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/[0.02] animate-pulse border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.7)] group-hover:scale-125 transition-transform duration-500"></div>
        </div>
      </div>
    </BentoCard>
  );
}

export function TimerTile() {
  return (
    <BentoCard 
      title="Focus" 
      subtitle="Pomodoro"
      icon={Clock}
      className="col-span-1 row-span-1"
    >
      <div className="mt-6 text-center">
        <p className="text-3xl font-bold text-white tracking-tight tabular-nums">25:00</p>
        <div className="flex justify-center gap-4 mt-4">
          <Play className="w-5 h-5 text-gray-500 hover:text-white hover:scale-110 transition-all cursor-pointer" />
          <RotateCcw className="w-5 h-5 text-gray-700 hover:text-white transition-all cursor-pointer" />
        </div>
      </div>
    </BentoCard>
  );
}

export function FilesTile() {
  const router = useRouter();
  return (
    <BentoCard 
      title="Vault" 
      subtitle="Recent Files"
      icon={HardDrive}
      className="col-span-1 row-span-1"
      onClick={() => router.push('/files')}
    >
      <div className="mt-8 flex flex-col gap-3">
        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-white w-0 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
        </div>
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">0.00 GB / 10 GB</p>
      </div>
    </BentoCard>
  );
}
