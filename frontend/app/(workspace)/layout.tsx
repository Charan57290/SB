'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutList, FileText, Bot, Network, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import WorkspaceCommandPalette from '@/components/workspace/WorkspaceCommandPalette';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === '/app';
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  useKeyboardShortcuts(() => setCommandPaletteOpen(true));

  return (
    <div className="flex h-screen bg-[#000000] text-[#FFFFFF] font-sans overflow-hidden selection:bg-white/20 relative">
      <WorkspaceCommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        {!isDashboard && <WorkspaceSidebar />}
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Universal Metalab Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src="/dashbg.mp4" type="video/mp4" />
        </video>

        {/* Global Ambient Glow - Monochrome Premium */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden flex items-center justify-center">
          <div className="w-[85%] h-[85%] bg-white/[0.04] rounded-full blur-[180px] opacity-40" />
        </div>

        <main className={cn(
          "flex-1 overflow-y-auto relative z-10 scrollbar-hide",
          !isDashboard && "pb-24 md:pb-0"
        )}>
          {children}
        </main>

        {/* Mobile Floating Bottom Bar */}
        {!isDashboard && (
          <div className="md:hidden fixed bottom-6 inset-x-6 z-[100] h-16 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-around px-4 shadow-2xl">
            {[
              { href: '/app', icon: LayoutList },
              { href: '/notes', icon: FileText },
              { href: '/assistant', icon: Bot },
              { href: '/graph', icon: Network },
              { href: '/storage', icon: Folder },
            ].map((item) => {
              const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "p-2.5 rounded-xl transition-all duration-300",
                    isActive ? "bg-white/10 text-white" : "text-white/30"
                  )}>
                    <item.icon className={cn("w-5 h-5", isActive && "scale-110")} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
