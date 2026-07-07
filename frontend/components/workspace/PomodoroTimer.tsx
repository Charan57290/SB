'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Square, Play, RotateCcw, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side
    audioRef.current = new Audio('/alarm.mp3');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const playAlarm = () => {
      if (!audioRef.current) return;
      let count = 0;
      const audio = audioRef.current;
      
      audio.onended = () => {
        count++;
        if (count < 4) {
          audio.currentTime = 0;
          audio.play().catch(e => console.error("Error playing audio", e));
        } else {
          audio.onended = null;
        }
      };
      
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Error playing audio", e));
    };

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      playAlarm();
      
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setTimeLeft(nextIsBreak ? BREAK_TIME : WORK_TIME);
      setIsActive(false); // Pause when switching modes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const toggleMode = () => {
    setIsActive(false);
    const nextIsBreak = !isBreak;
    setIsBreak(nextIsBreak);
    setTimeLeft(nextIsBreak ? BREAK_TIME : WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const adjustTime = (amount: number) => {
    setTimeLeft(prev => Math.max(60, prev + amount)); // Minimum 1 min
  };

  return (
    <div className={`rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group transition-colors duration-500 ${isBreak ? 'bg-white/90 text-black' : 'bg-white text-black'}`}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isBreak ? 'bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_70%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.1),transparent_70%)]'}`}></div>
      
      <div className="flex w-full justify-between items-start mb-6 relative z-10">
         <button 
          onClick={toggleMode}
          className="text-[9px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
         >
           SWITCH TO {isBreak ? 'WORK' : 'BREAK'}
         </button>
         <button 
          onClick={resetTimer}
          className="text-black/40 hover:text-black transition-colors"
          title="Reset Timer"
         >
           <RotateCcw className="w-4 h-4" />
         </button>
      </div>

      <div className="p-3 rounded-2xl bg-black/10 text-black w-fit mb-4 relative z-10">
        <Clock className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-black mb-1 relative z-10 uppercase tracking-tighter">
        {isBreak ? 'Neural Rest' : 'Pomodoro Timer'}
      </h3>
      <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest mb-6 relative z-10">
        {isBreak ? 'Short Break Session' : 'Pomodoro Session'}
      </p>

      <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
        {!isActive && (
          <button onClick={() => adjustTime(-5 * 60)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-black/50 hover:text-black">
            <Minus className="w-5 h-5" />
          </button>
        )}
        <motion.div 
          key={timeLeft}
          initial={{ opacity: 0.8, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-black tracking-tighter tabular-nums"
        >
          {formatTime(timeLeft)}
        </motion.div>
        {!isActive && (
          <button onClick={() => adjustTime(5 * 60)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-black/50 hover:text-black">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      <button 
        onClick={toggleTimer}
        className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10 flex items-center justify-center gap-2"
      >
        {isActive ? (
          <>
            <Square className="w-3 h-3 fill-white" />
            PAUSE SESSION
          </>
        ) : (
          <>
            <Play className="w-3 h-3 fill-white" />
            {timeLeft < (isBreak ? BREAK_TIME : WORK_TIME) ? 'RESUME SESSION' : 'IGNITE SESSION'}
          </>
        )}
      </button>
    </div>
  );
}
