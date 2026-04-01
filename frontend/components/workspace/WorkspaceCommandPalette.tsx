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
  ArrowRight,
  Folder
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkspaceCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WorkspaceCommandPalette({ open, onOpenChange }: WorkspaceCommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ctrl+K to toggle command palette
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
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-xl animate-in fade-in duration-200" onClick={() => onOpenChange(false)}>
      <div className="w-full max-w-xl animate-in zoom-in-95 duration-200 px-4" onClick={(e) => e.stopPropagation()}>
        <Command 
          className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl overflow-hidden focus-within:ring-1 ring-white/20 transition-all backdrop-blur-2xl"
        >
          <div className="flex items-center border-b border-white/5 px-4">
            <Search className="w-5 h-5 text-white/20 mr-3" />
            <Command.Input 
              placeholder="Search workspace or jump to..." 
              className="flex-1 bg-transparent py-4 text-sm text-white focus:outline-none placeholder:text-white/20 uppercase tracking-widest font-bold"
            />
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="py-8 text-center text-[10px] font-bold uppercase tracking-widest text-white/20">
                No results found.
            </Command.Empty>

            <Command.Group heading={<span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] px-3 py-2 block">Quick Actions</span>}>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/notes/new'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/[0.05] aria-selected:bg-white/[0.05] text-white/40 aria-selected:text-white transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/20 group-hover:text-white group-aria-selected:text-white group-aria-selected:border-white/20 transition-all">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Create New Note</span>
                <span className="ml-auto text-[9px] font-black text-white/20 bg-white/5 px-2 py-1 rounded border border-white/5">CTRL + N</span>
              </Command.Item>
              
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/assistant'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/[0.05] aria-selected:bg-white/[0.05] text-white/40 aria-selected:text-white transition-all group mt-1"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/20 group-hover:text-white group-aria-selected:text-white group-aria-selected:border-white/20 transition-all">
                    <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Ask AI Assistant</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] px-3 py-2 block mt-4">Navigation</span>}>
              {[
                { name: 'Workspace', icon: Plus, href: '/app' },
                { name: 'Notes', icon: FileText, href: '/notes' },
                { name: 'Knowledge Graph', icon: Share2, href: '/graph' },
                { name: 'Files', icon: Folder, href: '/files' },
                { name: 'BrainKit Tools', icon: Zap, href: '/brainkit' },
                { name: 'Settings', icon: Settings, href: '/settings' },
              ].map((item) => (
                <Command.Item 
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/[0.03] aria-selected:bg-white/[0.05] text-white/30 aria-selected:text-white transition-all group mt-1"
                >
                    <item.icon className="w-4 h-4 text-white/20 group-hover:text-white group-aria-selected:text-white transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                    <ArrowRight className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 -translate-x-2 group-hover:translate-x-0 group-aria-selected:translate-x-0 transition-all text-white/40" />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="border-t border-white/5 p-3 bg-white/[0.02] flex flex-wrap items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/10">
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 min-w-[20px] text-center">↑</kbd><kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 min-w-[20px] text-center">↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-center">↵</kbd> select</span>
            </div>
            <span className="flex items-center gap-1"><kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 min-w-[20px] text-center">esc</kbd> close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
