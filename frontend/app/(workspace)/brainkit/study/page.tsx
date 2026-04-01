'use client';

import { GraduationCap, BookOpen, Brain, Zap, Plus, Clock } from 'lucide-react';

export default function StudyToolsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto relative z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white mb-2 uppercase">Learning Intelligence Hub</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Convert notes into active recall assets using neural spacing.</p>
        </div>
        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-3 h-3" />
          Neural Engine Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Flashcard Generator Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition-all group overflow-hidden relative backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all"></div>
          <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white/40 w-fit mb-6 shadow-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Flashcard Generator</h3>
          <p className="text-white/30 text-xs font-medium mb-8 leading-relaxed uppercase tracking-wide">
            Extract key concepts from your notes and generate deck of flashcards for active recall.
          </p>
          <button className="w-full bg-white text-black font-bold py-3 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
            Generate from Workspace
          </button>
        </div>

        {/* Quiz Generator */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition-all group overflow-hidden relative backdrop-blur-xl">
          <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white/40 w-fit mb-6 shadow-2xl">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Neural Quizzer</h3>
          <p className="text-white/30 text-xs font-medium mb-8 leading-relaxed uppercase tracking-wide">
            Custom quizzes generated from your intelligence nodes. Supports MCQ and open response.
          </p>
          <button className="w-full border border-white/20 hover:border-white/40 text-white font-bold py-3 rounded-2xl text-[10px] uppercase tracking-widest transition-all">
            Build Quiz Session
          </button>
        </div>

        {/* Study Timer Widget */}
        <div className="bg-white text-black rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl shadow-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.1),transparent_70%)]"></div>
          <div className="p-3 rounded-2xl bg-black/10 text-black w-fit mb-6 relative z-10">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-black mb-1 relative z-10 uppercase tracking-tighter">Deep Work Timer</h3>
          <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest mb-6 relative z-10">Optimized Pomodoro session</p>
          <div className="text-5xl font-black text-black tracking-tighter mb-8 relative z-10">25:00</div>
          <button className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10">
            IGNITE SESSION
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-10 backdrop-blur-md">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Space Repetition System</h3>
          <p className="text-xs text-white/40 font-medium leading-loose max-w-lg mb-8 uppercase tracking-wide">
            Our system automatically tracks which notes you're forgetting and schedules review sessions using the SuperMemo algorithm.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/20"></div>
              ))}
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/20 mt-1.5">+ 242 other students studying now</p>
          </div>
        </div>
        <div className="w-full md:w-64 bg-white/[0.03] rounded-3xl p-6 border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">NEXT DUE SESSION</span>
            <Plus className="w-3 h-3 text-white/20" />
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-white uppercase truncate">Architecture Theory</p>
              <p className="text-[9px] font-bold text-white/40 mt-1 uppercase tracking-widest">Due Today</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 opacity-50">
              <p className="text-[10px] font-bold text-white uppercase truncate">Quantum Mechanics</p>
              <p className="text-[9px] font-bold text-white/20 mt-1 uppercase tracking-widest">Tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
