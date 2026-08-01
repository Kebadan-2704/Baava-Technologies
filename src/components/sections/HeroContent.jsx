import React from 'react';
import { motion } from 'framer-motion';
import { EngineeringIcon, BookkeepingIcon, StudentIcon, InventoryIcon } from '../ServiceIcons';
import ShimmerButton from '../ui/ShimmerButton';

export default function HeroContent() {
  // Stagger variants for the cinematic reveal
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex-shrink-0 w-full lg:w-[320px] xl:w-[380px] text-center lg:text-left py-8 lg:py-0"
    >
      {/* Badge */}
      <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-4 md:mb-6">
        <div className="w-2 h-2 rounded-full bg-accent-500 animate-gentle-pulse" />
        <span className="text-[10px] md:text-xs font-bold text-brand-700 uppercase tracking-[0.1em]">Fulfilment Partner</span>
      </motion.div>

      {/* Headline */}
      <motion.h1 variants={itemVars} className="font-display text-[clamp(2rem,4vw+1rem,3.2rem)] font-extrabold text-brand-950 leading-[1.08] tracking-tight mb-4 md:mb-6 transition-colors duration-500">
        We fulfil your{' '}
        <span className="relative inline-block">
          <span className="gradient-text drop-shadow-[0_0_15px_rgba(56,152,247,0.3)]">back-office</span>
          <svg className="absolute -bottom-0.5 left-0 w-full opacity-80" viewBox="0 0 200 8" fill="none">
            <path d="M2 6C50 2 150 2 198 6" stroke="url(#heroUnderline)" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="heroUnderline" x1="0" y1="0" x2="200" y2="0">
                <stop offset="0%" stopColor="#1e78ec" />
                <stop offset="100%" stopColor="#1aae86" />
              </linearGradient>
            </defs>
          </svg>
        </span>{' '}
        operations.
      </motion.h1>

      {/* Sub-headline */}
      <motion.p variants={itemVars} className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-8 max-w-md mx-auto lg:mx-0 transition-colors duration-500">
        Not just a vendor — we become an extension of your team. Engineering, bookkeeping, student records & inventory — fulfilled.
      </motion.p>

      {/* CTA */}
      <motion.div variants={itemVars} className="flex items-center gap-3 justify-center lg:justify-start">
        <ShimmerButton href="mailto:Info@baavatech.com">
          Get Started
        </ShimmerButton>
      </motion.div>

      {/* Mini service badges */}
      <motion.div variants={itemVars} className="flex flex-wrap items-center gap-2 mt-6 md:mt-8 justify-center lg:justify-start">
        {[
          { Icon: EngineeringIcon, label: 'Engineering', color: '#3898f7' },
          { Icon: BookkeepingIcon, label: 'Bookkeeping', color: '#1aae86' },
          { Icon: StudentIcon, label: 'Students', color: '#8b5cf6' },
          { Icon: InventoryIcon, label: 'Inventory', color: '#84cc16' },
        ].map(svc => (
          <div key={svc.label} data-magnetic className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel hover:scale-105 transition-transform duration-300 cursor-default">
            <svc.Icon size={18} className="w-[18px] h-[18px]" />
            <span className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wider transition-colors duration-500">{svc.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
