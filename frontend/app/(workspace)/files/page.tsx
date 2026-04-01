'use client';

import React from 'react';
import { Folder, Upload, File, MoreVertical, Search } from 'lucide-react';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion } from 'framer-motion';

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="Files" />

      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Files</h1>
            <p className="text-white/40 mt-2 font-medium tracking-wide uppercase text-[10px]">Manage your documents and local intelligence assets.</p>
          </div>
          
          <button 
      className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-gray-200 shadow-2xl shadow-white/5"
    >
      <Upload className="w-4 h-4" />
      Upload Data
    </button>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-10">
            <div className="relative group flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                <input
                    type="text"
                    placeholder="Search files..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                />
            </div>
        </div>

        {/* Empty State / Grid Placeholder */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] border-dashed flex flex-col items-center justify-center p-12 backdrop-blur-sm"
        >
            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 mb-6">
                <Folder className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">No files indexed yet</h3>
            <p className="text-white/30 text-center max-w-sm mb-8 leading-relaxed text-xs font-medium uppercase tracking-wide">
                Connect your local storage or drag and drop files here to start mapping your knowledge base.
            </p>
            <button className="px-8 py-3 bg-white/[0.04] border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-white/[0.08] hover:text-white transition-all">
                Browse Local Storage
            </button>
        </motion.div>
      </div>
    </div>
  );
}
