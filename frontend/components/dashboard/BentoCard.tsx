'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BentoCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BentoCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  className,
  onClick 
}: BentoCardProps) => {
  return (
    <motion.div
      whileHover={onClick ? { y: -2, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={cn(
        "group relative bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500",
        onClick && "cursor-pointer hover:border-white/20 hover:bg-[#070707] active:scale-[0.99]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      {/* Background radial gradient for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 border border-white/5">
              <Icon size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase group-hover:text-white transition-colors">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {onClick && (
            <div className="opacity-0 group-hover:opacity-40 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          )}
        </div>
        
        {children}
      </div>

      {/* Subtle border shine effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </motion.div>
  );
};

export default BentoCard;
