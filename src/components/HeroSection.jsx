import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// Orbiting service items around the hero visual
const ORBIT_ITEMS = [
  { label: 'Engineering', icon: '⚙️', color: '#3898f7', angle: 0 },
  { label: 'Bookkeeping', icon: '💵', color: '#1aae86', angle: 90 },
  { label: 'Students', icon: '🎓', color: '#8b5cf6', angle: 180 },
  { label: 'Inventory', icon: '📦', color: '#84cc16', angle: 270 },
];

function FloatingParticle({ delay, x, y, size, color }) {
  return (
    <div
      className="absolute rounded-full animate-drift pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: `${8 + Math.random() * 6}s`,
        filter: 'blur(1px)',
      }}
    />
  );
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background — Subtle gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-50/60 via-white to-accent-50/40" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-br from-brand-200/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[50%] bg-gradient-to-tr from-accent-200/15 to-transparent rounded-full blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        {[
          { delay: 0, x: 15, y: 20, size: 6, color: 'rgba(56,152,247,0.3)' },
          { delay: 2, x: 80, y: 30, size: 4, color: 'rgba(26,174,134,0.3)' },
          { delay: 4, x: 25, y: 70, size: 5, color: 'rgba(139,92,246,0.25)' },
          { delay: 1, x: 70, y: 65, size: 7, color: 'rgba(56,152,247,0.2)' },
          { delay: 3, x: 50, y: 15, size: 4, color: 'rgba(132,204,22,0.25)' },
          { delay: 5, x: 90, y: 50, size: 5, color: 'rgba(26,174,134,0.2)' },
        ].map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Content */}
      <div className="container-width relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          {/* Left — Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Overline */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-gentle-pulse" />
              <span className="text-overline text-brand-700 uppercase">Fulfilment Partner</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-display-sm sm:text-display-md lg:text-display-lg xl:text-display-xl text-brand-950 mb-6"
            >
              We fulfil your{' '}
              <span className="relative inline-block">
                <span className="gradient-text">back-office</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#1e78ec" />
                      <stop offset="100%" stopColor="#1aae86" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              operations.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              We don't just support your operations — we become an extension of your team. 
              Engineering, bookkeeping, student records, and inventory — fulfilled.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-950 text-white font-semibold rounded-full shadow-button hover:shadow-button-hover hover:bg-brand-900 transition-all duration-300"
              >
                Get Started
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-slate-600 font-semibold rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
              >
                View Services
              </a>
            </motion.div>
          </div>

          {/* Right — Orbital Visual */}
          <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-200/20 via-accent-200/10 to-brand-100/20 blur-2xl animate-gentle-pulse" />

            {/* Orbit rings */}
            <div className="absolute inset-6 sm:inset-8 lg:inset-10 rounded-full border border-dashed border-slate-200/60" />
            <div className="absolute inset-16 sm:inset-20 lg:inset-24 rounded-full border border-dashed border-slate-200/40" />

            {/* Center element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-glow-blue flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white/90 text-3xl sm:text-4xl lg:text-5xl font-display font-black">BT</div>
                    <div className="text-white/60 text-[8px] sm:text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.15em] mt-1">Portal</div>
                  </div>
                </div>
                {/* Pulsing ring */}
                <div className="absolute -inset-3 rounded-[28px] border-2 border-brand-400/20 animate-gentle-pulse" />
              </div>
            </div>

            {/* Orbiting items */}
            {ORBIT_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="absolute inset-0"
                style={{
                  animation: `orbit 24s linear infinite`,
                  animationDelay: `${i * -6}s`,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ animation: `orbit 24s linear infinite reverse`, animationDelay: `${i * -6}s` }}
                >
                  <div
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow duration-300"
                  >
                    <span className="text-sm sm:text-base">{item.icon}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
