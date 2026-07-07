'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, File, MessageSquare, ArrowRight, Wrench, Network, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const MODULES = [
  {
    id: 'notes',
    title: 'Knowledge Base',
    subtitle: 'Notes',
    description: 'A lightning-fast, connected editor for capturing thoughts, organizing knowledge, and expanding your intellect.',
    link: '/notes',
    icon: <FileText size={20} />
  },
  {
    id: 'documents',
    title: 'Documents',
    subtitle: 'Storage',
    description: 'Securely store and connect external resources, links, and PDFs straight into your second brain context.',
    link: '/storage',
    icon: <File size={20} />
  },
  {
    id: 'chat',
    title: 'AI Architect',
    subtitle: 'AI Chat',
    description: 'Converse directly with your entire knowledge base. Extract profound insights with hyper-intelligent search.',
    link: '/assistant',
    icon: <MessageSquare size={20} />
  },
  {
    id: 'brainkit',
    title: 'Brain Kit',
    subtitle: 'Workspaces',
    description: 'Advanced productivity tools and modular workspace orchestrations perfectly tailored for your cognitive workflow.',
    link: '/brainkit',
    icon: <Wrench size={20} />
  },
  {
    id: 'graph',
    title: 'Knowledge Graph',
    subtitle: 'Network',
    description: 'Beautifully visualize the invisible connections between your thoughts in an interactive, organic nodular web.',
    link: '/graph',
    icon: <Network size={20} />
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Pipelines',
    description: 'Transform scattered ideas and connected knowledge into structured, actionable deliverables with laser-focus.',
    link: '/projects',
    icon: <FolderKanban size={20} />
  }
];

export default function MetalabDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [activeModule, setActiveModule] = useState(MODULES[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout?.();
    router.push('/');
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const active = MODULES.find(m => m.id === activeModule) || MODULES[0];
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <div className="w-full h-screen overflow-hidden bg-transparent font-sans relative selection:bg-white/30 text-white">
      {/* Background is now handled by layout.tsx */}

      {/* Top Left Logo Area */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference">
        <Link href="/" className="text-2xl text-white font-medium tracking-tight" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
          Second Brain<span className="text-white/40">.</span>
        </Link>
      </div>

      {/* Top Right User Info & Logout */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-6 mix-blend-difference">
        <span className="text-white/80 text-sm font-light uppercase tracking-widest hidden md:block">
          {firstName}
        </span>
        <button 
          onClick={handleLogout} 
          className="text-sm bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-full font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Mobile Top Horizontal Navigation */}
      <div className="md:hidden fixed top-24 left-0 w-full overflow-x-auto scrollbar-hide px-6 flex gap-2 z-50">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`
              relative px-5 py-2.5 rounded-full flex-shrink-0 flex items-center gap-2 transition-all duration-300 text-[10px] uppercase font-bold tracking-widest
              ${activeModule === mod.id ? 'text-white' : 'text-white/40 bg-white/5'}
            `}
          >
            {activeModule === mod.id && (
              <motion.div 
                layoutId="active-pill-mobile"
                className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full border border-white/10"
              />
            )}
            <span className="relative z-10">{mod.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Desktop Left Vertical Pill Navigation */}
      <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`
              relative px-6 py-3.5 rounded-full flex items-center gap-3 transition-all duration-300 text-sm tracking-wide
              ${activeModule === mod.id ? 'text-white' : 'text-white/40 hover:text-white/80 bg-white/5'}
            `}
            style={{ fontWeight: 350 }}
          >
            {activeModule === mod.id && (
              <motion.div 
                layoutId="active-pill"
                className="absolute inset-0 bg-[rgba(186,186,186,0.15)] backdrop-blur-xl rounded-full border border-white/10"
                initial={false}
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{mod.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Main Dynamic Showcase Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center text-center max-w-5xl w-full px-6 md:px-8 relative z-10"
          >
            <div className="mb-4 md:mb-8 flex items-center gap-3 bg-white/5 px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-xl border border-white/10 text-white/70">
              {active.icon}
              <span className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] font-semibold">{active.id} module</span>
            </div>
            
            <h1 
              className="text-[3.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-[0.95] md:leading-[0.9] text-white font-normal mb-6 md:mb-8 max-w-[95vw] sm:max-w-[90vw] whitespace-normal sm:whitespace-nowrap"
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.04em' }}
            >
              {active.title}
            </h1>
            
            <p className="text-base md:text-2xl text-white/50 font-light max-w-2xl mb-10 md:mb-14 leading-relaxed mix-blend-lighten pointer-events-auto px-4 md:px-0">
              {active.description}
            </p>
            
            <Link 
              href={active.link}
              className="group pointer-events-auto relative flex items-center justify-center gap-4 bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Launch {active.subtitle}</span>
              <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-2" size={20} />
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

