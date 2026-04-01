'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  PenTool, 
  GraduationCap, 
  Microscope, 
  Code2, 
  FileText, 
  Quote, 
  Clock, 
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import BentoCard from './BentoCard';

const tools = [
  { name: 'Humanizer', icon: PenTool, href: '/brainkit/writing', desc: 'Make AI text sound human' },
  { name: 'Paraphraser', icon: FileText, href: '/brainkit/writing', desc: 'Rephrase any content' },
  { name: 'Flashcards', icon: GraduationCap, href: '/brainkit/study', desc: 'AI-generated study cards' },
  { name: 'Focus Timer', icon: Clock, href: '/brainkit/study', desc: 'Pomodoro intelligence' },
  { name: 'PDF Decoder', icon: Microscope, href: '/brainkit/research', desc: 'Analyze documents' },
  { name: 'Citation', icon: Quote, href: '/brainkit/research', desc: 'Auto-format references' },
  { name: 'JSON Format', icon: Code2, href: '/brainkit/dev', desc: 'Parse & beautify JSON' },
  { name: 'Code Review', icon: Zap, href: '/brainkit/dev', desc: 'Neural code analysis' },
];

export default function BrainKitLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      {/* Dashboard Tile */}
      <BentoCard
        className="col-span-2 row-span-1"
        title="BrainKit"
        subtitle="Smarter Production"
        icon={Zap}
        onClick={handleOpen}
      >
        <div className="mt-6 flex flex-col gap-4">
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            8 specialized neural tools for writing, research, study, and development.
          </p>
          {/* Mini tool icons preview */}
          <div className="flex flex-wrap gap-3">
            {tools.slice(0, 4).map((tool) => (
              <div
                key={tool.name}
                className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-gray-600 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <tool.icon className="w-3.5 h-3.5" />
              </div>
            ))}
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-gray-700 text-[9px] font-bold flex items-center px-3">
              +4 more
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            className="flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest w-fit group py-3 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all shadow-sm mt-1"
          >
            Launch Workspace <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </BentoCard>

      {/* Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100]"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 m-auto w-[92%] max-w-3xl h-fit max-h-[90vh] bg-black border border-white/10 rounded-[3rem] p-10 z-[101] shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white text-black shadow-xl shadow-white/10">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">BrainKit Intelligence</h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Select a neural tool to activate
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-2xl border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tool Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(tool.href);
                    }}
                    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/25 hover:bg-white/[0.06] transition-all cursor-pointer shadow-sm shadow-black"
                  >
                    <div className="p-4 rounded-2xl bg-white/5 text-gray-500 group-hover:bg-white group-hover:text-black transition-all duration-300 mb-4 shadow-sm">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wide leading-tight">{tool.name}</span>
                    <span className="text-[9px] text-gray-600 font-medium mt-1.5 leading-relaxed group-hover:text-gray-400 transition-colors">{tool.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
