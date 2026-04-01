'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Command } from 'lucide-react';
import { motion } from 'framer-motion';

interface MinimalTopNavProps {
  title: string;
  backLabel?: string;
  backHref?: string;
  onCommandPalette?: () => void;
  actions?: React.ReactNode;
}

export default function MinimalTopNav({ 
  title, 
  backLabel = 'Home', 
  backHref = '/app',
  actions
}: MinimalTopNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 flex items-center justify-between h-14 px-5 md:px-8 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/50"
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-white font-semibold text-sm">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <Link
          href="/app"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-400 text-xs hover:text-white hover:border-slate-600 transition-all"
        >
          <Command className="w-3 h-3" />
          <kbd className="text-xs">⌘K</kbd>
        </Link>
      </div>
    </motion.header>
  );
}
