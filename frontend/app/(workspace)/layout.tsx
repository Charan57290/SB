'use client';

import React from 'react';
import WorkspaceCommandPalette from '@/components/workspace/WorkspaceCommandPalette';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  useKeyboardShortcuts(() => setCommandPaletteOpen(true));

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <WorkspaceCommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      
      {/* Premium Background Asset - Neural Network Monochrome */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-screen overflow-hidden"
        style={{
          backgroundImage: 'url("/images/bg-monochrome.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Global Ambient Glow - Monochrome Premium */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="w-[85%] h-[85%] bg-white/[0.04] rounded-full blur-[180px] opacity-40" />
        <div className="absolute w-[65%] h-[65%] bg-white/[0.02] rounded-full blur-[150px] opacity-30" />
      </div>

      <main className="relative z-10 w-full h-full">
        {children}
      </main>
    </div>
  );
}

