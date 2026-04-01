'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Wrench, 
  Bot, 
  FolderOpen, 
  Network, 
  Upload,
  Search,
  Command as CommandIcon,
  X,
  Sparkles,
  Wand2,
  Copy,
  Timer,
  FileBox,
  Quote,
  Braces,
  Code
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import SpatialNode from '@/components/workspace/SpatialNode';
import { cn } from '@/lib/utils';

const tools = [
  { name: 'Humanizer', icon: Wand2, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'Paraphraser', icon: Sparkles, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'Flashcards', icon: Copy, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'Focus Timer', icon: Timer, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'PDF Summarizer', icon: FileBox, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'Citation Generator', icon: Quote, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'JSON Formatter', icon: Braces, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
  { name: 'Code Formatter', icon: Code, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit' },
];

const nodes = [
  { id: 'files', label: 'Files', sub: 'STORAGE', icon: Upload, accent: 'white', pos: { x: 0, y: -260 }, href: '/files' },
  { id: 'note', label: 'New Note', sub: 'EDITOR', icon: Plus, accent: 'white', pos: { x: -380, y: -20 }, href: '/notes/new' },
  { id: 'brainkit', label: 'Launch BrainKit', sub: 'UTILITIES', icon: Wrench, accent: 'white', pos: { x: 380, y: -20 }, href: null },
  { id: 'projects', label: 'Projects', sub: 'WORKSPACES', icon: FolderOpen, accent: 'white', pos: { x: -350, y: 240 }, href: '/projects' },
  { id: 'ai', label: 'Ask AI Assistant', sub: 'NEURAL', icon: Bot, accent: 'white', pos: { x: 0, y: 300 }, href: '/assistant' },
  { id: 'graph', label: 'Knowledge Graph', sub: 'CONNECTIONS', icon: Network, accent: 'white', pos: { x: 350, y: 240 }, href: '/graph' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function CommandCenterPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [brainKitOpen, setBrainKitOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNodeClick = (node: typeof nodes[0]) => {
    if (node.id === 'brainkit') { setBrainKitOpen(true); return; }
    if (node.href) router.push(node.href);
  };

  const firstName = user?.name?.split(' ')[0] || 'friend';

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* BrainKit Overlay */}
      <AnimatePresence>
        {brainKitOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setBrainKitOpen(false)}
              className="absolute top-10 right-10 p-3 rounded-full bg-white/5 text-white/40 hover:text-white transition-all border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white tracking-tighter mb-4 uppercase">BrainKit Tools</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Power up your productivity with AI-driven utilities.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              {tools.map((tool, i) => (
                <motion.button
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setBrainKitOpen(false); router.push(tool.href); }}
                  className="p-8 bg-white/[0.03] rounded-3xl border border-white/10 hover:border-white/40 flex flex-col items-center gap-4 transition-all group shadow-2xl backdrop-blur-xl"
                >
                  <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110", tool.bg)}>
                    <tool.icon className={cn("w-7 h-7", tool.color)} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{tool.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrative Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 text-center pointer-events-none select-none"
      >
        <p className="text-white/40 font-bold tracking-[0.4em] uppercase mb-4 text-[10px]">
          Second Brain
        </p>
        <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tighter mb-10 leading-[1.05]">
          What do you want<br />to work on today?
        </h1>
        
        <div className="flex items-center justify-center gap-4 mt-8">
            <div className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full flex items-center gap-2.5 backdrop-blur-md">
                <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white font-sans">Ctrl</kbd>
                    <span className="text-white/30 text-[10px]">+</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white font-sans">K</kbd>
                </div>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none">to search</span>
            </div>
            
            <div className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full flex items-center gap-2.5 backdrop-blur-md">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white font-sans">/</kbd>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none">to talk to AI</span>
            </div>
        </div>
      </motion.div>

      {/* Spatial Canvas */}
      <motion.div 
        animate={{ 
          x: -mousePos.x, 
          y: -mousePos.y,
        }}
        className="absolute inset-0 z-10"
      >
        {nodes.map((node, i) => (
          <SpatialNode
            key={node.id}
            id={node.id}
            label={node.label}
            sub={node.sub}
            icon={node.icon}
            accentColor={node.accent}
            position={node.pos}
            onClick={() => handleNodeClick(node)}
            delay={0.2 + i * 0.1}
          />
        ))}
      </motion.div>

      {/* Ambient background interaction - White Premium */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-white/[0.03] rounded-full blur-[180px] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] opacity-30" />
      </div>

      {/* Minimal Bottom Info */}
      <div className="absolute bottom-12 left-12 z-50">
        <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Workspace Active</p>
            <p className="text-xs text-white/50 font-medium tracking-wide">Monochrome Network Synced</p>
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 z-50 flex items-center gap-6">
        <button onClick={() => router.push('/settings')} className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase font-semibold">Settings</button>
        <button onClick={() => {/* logout logic */}} className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase font-semibold">Logout</button>
      </div>
    </div>
  );
}

