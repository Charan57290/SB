'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  LayoutList, 
  Network, 
  Folder, 
  Wrench, 
  Bot, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BrainKitLauncherOverlay from './BrainKitLauncherOverlay';

const navigation = [
  { name: 'Workspace', href: '/app', icon: LayoutList },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'Projects', href: '/projects', icon: LayoutList },
  { name: 'Knowledge Graph', href: '/graph', icon: Network },
  { name: 'Files', href: '/files', icon: Folder },
];

const bottomNavigation = [
  { name: 'AI Assistant', href: '/assistant', icon: Bot },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function WorkspaceSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isBrainKitOpen, setIsBrainKitOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-black/40 backdrop-blur-3xl text-white/40 w-60 border-r border-white/10 shadow-2xl relative z-50">
      <div className="flex items-center gap-4 px-6 h-20 border-b border-white/5">
        <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-white/5">
          SB
        </div>
        <span className="font-black text-white text-xs uppercase tracking-[0.3em] group-hover:text-white transition-colors">Second Brain</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1 scrollbar-hide">
        <div className="px-3 text-[9px] font-black tracking-[0.3em] text-white/10 uppercase mb-6">
          Core Modules
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-4 rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300',
                isActive
                  ? 'bg-white/5 text-white shadow-xl shadow-white/5 border border-white/10'
                  : 'hover:bg-white/[0.03] hover:text-white/80'
              )}
            >
              <item.icon className={cn('h-4 w-4 transition-all duration-300', isActive ? 'text-white' : 'text-white/20 group-hover:text-white/60')} />
              {item.name}
            </Link>
          );
        })}

        <div className="mt-10 mb-6 px-3 text-[9px] font-black tracking-[0.3em] text-white/10 uppercase">
          Intelligence
        </div>
        <button
          onClick={() => setIsBrainKitOpen(true)}
          className="w-full group flex items-center gap-4 rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.03] hover:text-white text-white/40"
        >
          <Wrench className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
          Launch BrainKit
        </button>
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1 bg-black/20">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-4 rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300',
                isActive
                  ? 'bg-white/5 text-white shadow-xl shadow-white/5 border border-white/10'
                  : 'hover:bg-white/[0.03] hover:text-white/80'
              )}
            >
              <item.icon className={cn('h-4 w-4 transition-all duration-300', isActive ? 'text-white' : 'text-white/20 group-hover:text-white/60')} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <BrainKitLauncherOverlay isOpen={isBrainKitOpen} onClose={() => setIsBrainKitOpen(false)} />
    </div>
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-black p-4 border-b border-white/10 relative z-50">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white font-black text-xs uppercase tracking-widest">
             SB
           </div>
           <span className="font-black text-white text-[10px] uppercase tracking-[0.3em]">Second Brain</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white/40 hover:text-white transition-colors">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-[70] transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </div>
    </>
  );
}
