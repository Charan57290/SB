'use client';

import { useRouter } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';
import MinimalTopNav from '@/components/workspace/MinimalTopNav';
import { Wand2, Sparkles, Copy, Timer, FileBox, Quote, Braces, Code, Terminal } from 'lucide-react';

const tools = [
  { name: 'Humanizer', icon: Wand2, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/writing' },
  { name: 'Paraphraser', icon: Sparkles, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/writing' },
  { name: 'Flashcards', icon: Copy, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/study' },
  { name: 'Pomodoro', icon: Timer, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/study' },
  { name: 'PDF Summarizer', icon: FileBox, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/pdf-summarizer' },
  { name: 'Citation Generator', icon: Quote, color: 'text-white/60', bg: 'bg-white/5', href: '/brainkit/research' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};

export default function BrainKitPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-20">
      <MinimalTopNav title="BrainKit" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">BrainKit Tools</h1>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] max-w-md mx-auto">Supercharge your thinking with AI-powered utilities.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {tools.map((tool) => (
            <motion.button
              key={tool.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(tool.href)}
              className="flex flex-col items-center gap-6 p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/10 hover:border-white/40 hover:shadow-2xl hover:shadow-white/5 transition-all group backdrop-blur-xl"
            >
              <div className={`p-5 rounded-2xl ${tool.bg} transition-transform group-hover:scale-110 border border-white/5 group-hover:border-white/20`}>
                <tool.icon className={`w-8 h-8 ${tool.color} group-hover:text-white transition-colors`} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors text-center">{tool.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
