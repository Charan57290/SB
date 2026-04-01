'use client';

import React from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  FileText, 
  Zap, 
  MessageSquare, 
  Share2, 
  Settings, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    command();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => onOpenChange(false)}>
      <div className="w-full max-w-xl animate-in zoom-in-95 duration-200 px-4" onClick={(e) => e.stopPropagation()}>
        <Command 
          className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden focus-within:ring-1 ring-white/20 transition-all backdrop-blur-2xl"
        >
          <div className="flex items-center border-b border-white/5 px-6">
            <Search className="w-5 h-5 text-white/20 mr-4" />
            <Command.Input 
              placeholder="Search or jump to..." 
              className="flex-1 bg-transparent py-5 text-sm text-white focus:outline-none placeholder:text-white/10 uppercase tracking-widest font-black"
            />
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-4 scrollbar-hide">
            <Command.Empty className="py-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                No neural nodes found matching this query.
            </Command.Empty>

            <Command.Group heading={<span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] px-4 py-2 block">Quick Actions</span>}>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/notes/new'))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/[0.05] aria-selected:bg-white/[0.05] text-white/30 aria-selected:text-white transition-all group"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/20 group-hover:text-white group-aria-selected:text-white group-aria-selected:border-white/20 transition-all">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Create New Intelligence Node</span>
                <span className="ml-auto text-[9px] font-black text-white/10 tracking-[0.2em] uppercase">Ctrl + N</span>
              </Command.Item>
              
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/assistant'))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/[0.05] aria-selected:bg-white/[0.05] text-white/30 aria-selected:text-white transition-all group mt-1"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/20 group-hover:text-white group-aria-selected:text-white group-aria-selected:border-white/20 transition-all">
                    <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Ask Neural Assistant</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] px-4 py-2 block mt-6">Navigation</span>}>
              {[
                { name: 'Workspace Dashboard', icon: Plus, href: '/dashboard' },
                { name: 'Research Notes', icon: FileText, href: '/notes' },
                { name: 'Knowledge Graph', icon: Share2, href: '/graph' },
                { name: 'BrainKit Tools', icon: Zap, href: '/brainkit' },
                { name: 'System Settings', icon: Settings, href: '/settings' },
              ].map((item) => (
                <Command.Item 
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/[0.03] aria-selected:bg-white/[0.05] text-white/20 aria-selected:text-white transition-all group mt-1 border-l border-white/5"
                >
                    <item.icon className="w-4 h-4 text-white/10 group-hover:text-white group-aria-selected:text-white transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                    <ArrowRight className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 -translate-x-2 group-hover:translate-x-0 group-aria-selected:translate-x-0 transition-all" />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="border-t border-white/5 p-4 flex items-center justify-between text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">
            <div className="flex gap-4">
                <span>↑↓ navigate</span>
                <span>enter select</span>
            </div>
            <span>esc close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
