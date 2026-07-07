'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, X, Brain } from 'lucide-react';
import api from '@/lib/api';

export default function FlashcardGenerator({ onClose }: { onClose: () => void }) {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<'question' | 'mcq'>('question');
  const [cards, setCards] = useState<{ q: string, a: string, options?: string[] }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlashcards = async (existing: string[] = []) => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await api.post('/brainkit/study/flashcards', {
        topic,
        format,
        existingQuestions: existing
      });
      if (res.data.cards) {
        setCards(prev => [...prev, ...res.data.cards]);
      }
    } catch (error) {
      console.error('Failed to generate flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    setCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    fetchFlashcards([]);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 150);
  };

  const handleLoadMore = () => {
    const existing = cards.map(c => c.q);
    fetchFlashcards(existing);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {cards.length === 0 && !isLoading && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white/40">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-2 uppercase">Neural Flashcards</h2>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-10">
              Enter a topic to generate your first set of 10 flashcards.
            </p>
            <div className="max-w-md mx-auto relative">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. React Hooks, Thermodynamics" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 mb-4"
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
              
              <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                 <button 
                   onClick={() => setFormat('question')}
                   className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${format === 'question' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                 >
                   Standard
                 </button>
                 <button 
                   onClick={() => setFormat('mcq')}
                   className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${format === 'mcq' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                 >
                   MCQ
                 </button>
              </div>

              <button 
                onClick={handleStart}
                disabled={!topic.trim()}
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 disabled:opacity-50 transition-all"
              >
                Generate {format === 'mcq' ? 'MCQ Deck' : 'Flashcard Deck'}
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-8 h-8 text-white/40 animate-spin mb-4" />
            <p className="text-xs font-bold text-white uppercase tracking-widest animate-pulse">
              Synthesizing Flashcards...
            </p>
          </div>
        )}

        {cards.length > 0 && !isLoading && currentIndex < cards.length && (
          <div className="flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                Card {currentIndex + 1} of {cards.length}
              </span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                {topic}
              </span>
            </div>

            <div 
              className="flex-1 perspective-1000 cursor-pointer relative"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Question) */}
                <div 
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center backface-hidden overflow-y-auto"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex flex-col items-center w-full my-auto py-2">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-4">Question</p>
                    <h3 className={`font-bold text-white tracking-tight leading-snug w-full max-w-2xl ${cards[currentIndex].options ? 'text-lg md:text-xl mb-6' : 'text-2xl md:text-3xl mb-4'}`}>
                      {cards[currentIndex].q}
                    </h3>
                    
                    {cards[currentIndex].options && (
                      <div className="w-full max-w-xl flex flex-col gap-2 mb-6">
                        {cards[currentIndex].options.map((opt, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-medium text-white/90 text-left w-full shadow-sm">
                            <span className="font-bold text-white mr-3">{String.fromCharCode(65 + i)}.</span> {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="mt-auto pt-4 text-[9px] text-white/20 uppercase tracking-widest font-bold">
                    Click to flip
                  </p>
                </div>

                {/* Back (Answer) */}
                <div 
                  className="absolute inset-0 bg-white text-black rounded-3xl p-6 md:p-8 flex flex-col items-center text-center backface-hidden overflow-y-auto"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                >
                  <div className="flex flex-col items-center w-full my-auto py-2">
                    <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-6">Answer</p>
                    <p className="text-xl md:text-2xl font-bold text-black leading-relaxed max-w-2xl">
                      {cards[currentIndex].a}
                    </p>
                  </div>
                  <p className="mt-auto pt-4 text-[9px] text-black/20 uppercase tracking-widest font-bold">
                    Click to flip back
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNext}
                className="bg-white/10 border border-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {cards.length > 0 && !isLoading && currentIndex >= cards.length && (
          <div className="text-center py-16">
             <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-2 uppercase">Batch Complete!</h2>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-10">
              You've studied {cards.length} cards on {topic}.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={onClose}
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Close
              </button>
              <button 
                onClick={handleLoadMore}
                className="bg-white text-black px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                Generate 10 More
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
