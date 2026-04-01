'use client';

import { Share2 } from 'lucide-react';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { motion } from 'framer-motion';

export default function KnowledgeGraph() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="Knowledge Graph" />

      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 max-w-7xl mx-auto w-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase mb-2">Knowledge Graph</h1>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Visualise neural connections between your distributed ideas.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Neural Network Online
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex-1 bg-white/[0.03] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center overflow-hidden group shadow-2xl min-h-[60vh] backdrop-blur-3xl relative"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] transition-all duration-1000" />
          <Share2 className="w-20 h-20 text-white/10 mb-8 group-hover:scale-110 group-hover:text-white/20 transition-all duration-700" />
          <p className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Initializing Neural Graph...</p>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest max-w-sm text-center leading-relaxed">
            Linking synapses across all active intelligence nodes.
          </p>
          <div className="mt-12 flex gap-4 relative z-10">
            <button className="px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
              Filter Logic
            </button>
            <button className="px-8 py-3.5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-white/5 hover:bg-gray-200 transition-all">
              Map Synapses
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
