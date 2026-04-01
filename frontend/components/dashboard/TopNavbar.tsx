'use client';

import { 
  Search, 
  Bell, 
  Plus, 
  Command,
  Infinity,
  Zap,
  LayoutGrid
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopNavbar() {
  const router = useRouter();

  return (
    <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence Nodes (⌘ K)"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all font-medium tracking-tight shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Status</span>
            <span className="text-[9px] text-gray-600 font-medium uppercase tracking-[0.2em] flex items-center gap-1.5 mt-0.5">
               <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Synchronized
            </span>
          </div>
        </div>

        <div className="h-10 w-px bg-white/5 mx-2"></div>

        <div className="flex items-center gap-3">
          <button className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-lg shadow-black">
            <Bell className="w-4 h-4" />
          </button>
          <button 
            onClick={() => router.push('/notes/new')}
            className="flex items-center gap-3 h-12 px-6 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all shadow-xl shadow-white/10"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Capture Node</span>
          </button>
        </div>
      </div>
    </header>
  );
}
