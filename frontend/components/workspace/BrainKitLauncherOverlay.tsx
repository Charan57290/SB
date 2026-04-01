'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Wand2, 
  Sparkles, 
  Copy, 
  Timer, 
  FileBox, 
  Quote, 
  Code, 
  Braces,
  Settings,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const tools = [
  { name: 'Humanizer', icon: Wand2 },
  { name: 'Paraphraser', icon: Sparkles },
  { name: 'Flashcards', icon: Copy },
  { name: 'Focus Timer', icon: Timer },
  { name: 'PDF Summarizer', icon: FileBox },
  { name: 'Citation Generator', icon: Quote },
  { name: 'JSON Formatter', icon: Braces },
  { name: 'Code Formatter', icon: Code },
];

export default function BrainKitLauncherOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] bg-[#000000]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
        >
          {/* Close button */}
          <motion.button 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all hover:rotate-90 hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Zap className="w-3 h-3"/> Neural Extensions
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">Launch BrainKit</h2>
            <p className="text-xl text-white/40 font-medium max-w-lg mx-auto leading-relaxed">
                Select a neural tool to enhance your cognitive workflow.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full max-w-5xl"
          >
            {tools.map((tool, index) => (
              <motion.button
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.04 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.08] hover:border-white/30 shadow-2xl transition-all group overflow-hidden relative"
                onClick={() => {
                  onClose();
                  router.push('/brainkit');
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" />
                <div className="p-5 rounded-2xl mb-5 bg-white/[0.05] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <span className="font-bold text-white/80 text-sm tracking-wide z-10 group-hover:text-white">{tool.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex items-center gap-10 opacity-20"
          >
            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Global Status</span>
                <span className="text-xs text-white font-medium tracking-wide">Ready for input</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Key</span>
                <span className="text-xs text-white font-medium tracking-wide">Alt + T</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

