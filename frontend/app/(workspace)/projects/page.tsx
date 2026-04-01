'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderDown, Github, X, Plus } from 'lucide-react';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';

export default function ProjectsPage() {
  const [showGithubModal, setShowGithubModal] = useState(false);

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="Projects" />

      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 uppercase">
            Initialize Workspace
          </h1>
          <p className="text-white/40 font-medium tracking-wide prose uppercase text-[10px]">Connect external repositories or import local intelligence nodes.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Local Import Card */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative h-80 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-8 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/40 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500">
              <FolderDown className="w-10 h-10 text-white/40 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">Import Local Project</h2>
            <p className="text-white/30 text-center text-xs max-w-xs font-medium leading-relaxed">Upload folders directly from your local machine to securely map your codebase.</p>
          </motion.div>

          {/* GitHub Card */}
          <motion.div 
            onClick={() => setShowGithubModal(true)}
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative h-80 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-8 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/40 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500">
              <Github className="w-10 h-10 text-white/40 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">Connect to GitHub</h2>
            <p className="text-white/30 text-center text-xs max-w-xs font-medium leading-relaxed">Synchronize directly with your remote repositories for continuous intelligence updates.</p>
          </motion.div>
        </div>

        {/* GitHub Modal Overlay */}
        <AnimatePresence>
          {showGithubModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setShowGithubModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#000000] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-white/5 overflow-hidden"
              >
                <button 
                  onClick={() => setShowGithubModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <button 
                  className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-gray-200 shadow-2xl shadow-white/5"
                >
                  <Plus className="w-4 h-4" />
                  Construct Project
                </button>

                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Github className="w-8 h-8 text-white/80" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tighter mb-2 uppercase">Connect repository</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Provide credentials to map your GitHub workspace securely.</p>
                </div>

                <div className="space-y-4 relative z-10 mt-2">
                  <button onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'} className="w-full bg-white text-black hover:bg-gray-200 transition-all py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <Github className="w-5 h-5" />
                    Connect via GitHub
                  </button>
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">or</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <button onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'} className="w-full bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.07] text-white transition-all py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                       <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                       <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                       <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                       <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Connect via Google
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
