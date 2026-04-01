'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpatialNodeProps {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  onClick: () => void;
  accentColor: string;
  position: { x: number; y: number };
  delay?: number;
}

export default function SpatialNode({
  label,
  sub,
  icon: Icon,
  onClick,
  accentColor,
  position,
  delay = 0,
}: SpatialNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: position.x, y: position.y + 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: position.x, 
        y: [position.y - 2, position.y + 2, position.y - 2],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        x: { duration: 0.6, delay },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.5 
        } 
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Hover Glow Effect - White Premium */}
        <div 
          className="absolute inset-0 -z-10 blur-[45px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full w-24 h-24 bg-white/10 mx-auto"
        />

        {/* Node Icon - Monochrome Glassmorphism Tile */}
        <div className={cn(
          "w-20 h-20 rounded-[18px] bg-white/[0.05] backdrop-blur-md border border-white/[0.1] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]",
        )}>
          <Icon className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
        </div>

        {/* Label Container */}
        <div className="mt-4 text-center">
          <p className="text-[13px] font-bold text-[#FFFFFF] tracking-tight group-hover:text-white transition-colors">
            {label}
          </p>
          <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1 group-hover:text-white/60 transition-colors">
            {sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
