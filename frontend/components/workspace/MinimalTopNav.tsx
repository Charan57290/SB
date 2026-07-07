'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Command } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MinimalTopNavProps {
  title: string;
  backLabel?: string;
  backHref?: string;
  onCommandPalette?: () => void;
  actions?: React.ReactNode;
  lightTheme?: boolean;
}

export default function MinimalTopNav({ 
  title, 
  backLabel = 'Home', 
  backHref = '/app',
  actions,
  lightTheme = false
}: MinimalTopNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-14 px-5 md:px-8 backdrop-blur-md border-b",
        lightTheme ? "bg-white/90 border-slate-200" : "bg-[#0f172a]/90 border-slate-800/50"
      )}
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className={cn("flex items-center gap-1.5 transition-colors text-sm font-medium", lightTheme ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white")}
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        <span className={lightTheme ? "text-slate-300" : "text-slate-700"}>/</span>
        <span className={cn("font-semibold text-sm", lightTheme ? "text-slate-900" : "text-white")}>{title}</span>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <Link
          href="/app"
           className={cn("hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all border", lightTheme ? "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300" : "bg-slate-800/80 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600")}
        >
          <Command className="w-3 h-3" />
          <kbd className="text-xs">⌘K</kbd>
        </Link>
      </div>
    </motion.header>
  );
}
