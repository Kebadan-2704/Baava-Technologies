import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, X, ChevronRight, Sparkles, FolderKanban } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import { uiSounds } from '../../utils/sounds';
import ContactModal from '../ui/ContactModal';
import PortfolioModal from '../ui/PortfolioModal';

const SERVICES = [
  { id: 'erp', label: 'ERP Integration', fullTitle: 'Digital Transformation & ERP Integration', desc: 'Enterprise system modernization, legacy migration, and real-time data synchronization across SAP, Oracle, NetSuite & Dynamics.', color: '#1e78ec', emoji: '⚙️', isERP: true,
    erpDetail: {
      platforms: ['SAP S/4HANA', 'Oracle NetSuite', 'Microsoft Dynamics', 'Custom API'],
      capabilities: ['Legacy Data Migration', 'Real-Time Sync', 'Multi-System Integration', 'Process Automation'],
    }
  },
  { id: 'rpa', label: 'Automation', fullTitle: 'Automation (RPA & AI)', desc: 'Robotic process automation and AI-driven workflows — reduce manual effort by 80% with intelligent document processing and predictive analytics.', color: '#0e8d6d', emoji: '🤖' },
  { id: 'data', label: 'Data Entry', fullTitle: 'Technical Data Entry', desc: 'High-accuracy technical data input with structured validation protocols, quality checkpoints, and direct database population — 99.9% accuracy.', color: '#515e7b', emoji: '📋' },
  { id: 'support', label: 'Tech Support', fullTitle: 'Baseline Customer Technical Support', desc: 'L1/L2 support operations with SLA-driven response times, ticketing management, escalation protocols, and compliance reporting.', color: '#8b5cf6', emoji: '🎧' },
  { id: 'supply', label: 'Supply Chain', fullTitle: 'Supply Chain & Procurement Support', desc: 'Procurement lifecycle optimization — from purchase order processing and vendor management to logistics coordination and inventory tracking.', color: '#f59e0b', emoji: '🔗' },
  { id: 'docs', label: 'Doc Management', fullTitle: 'Document Management', desc: 'Enterprise document lifecycle — version control, digital archiving, compliance-ready documentation with role-based access permissions.', color: '#1e78ec', emoji: '📁' },
  { id: 'bom', label: 'BOM Lifecycle', fullTitle: 'BOM Lifecycle Management', desc: 'Bill of Materials tracking from design to production — revision control, engineering change orders (ECOs), and multi-level BOM structures.', color: '#84cc16', emoji: '🔧' },
];

/* Typewriter Effect Component */
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex === 0) {
      timeout = setTimeout(() => {
        setCurrentIndex(1);
        setDisplayText(text[0]);
      }, delay * 1000);
    } else if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 35); // Typing speed
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return <span>{displayText}</span>;
};

/* Premium shimmer CTA button */
function ShimmerCTA({ href, children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(56,152,247,0.35), transparent 80%)`;

  return (
    <motion.a
      data-magnetic
      href={href}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-steel-950 via-steel-900 to-steel-950 text-white text-xs md:text-sm font-bold rounded-full shadow-[0_0_30px_rgba(30,120,236,0.2)] hover:shadow-[0_0_40px_rgba(30,120,236,0.4)] transition-all duration-500 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[250%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine-sweep" />
      </div>
      <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-brand-500/40 via-accent-400/30 to-brand-500/40 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />

      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 opacity-60" />
        {children}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}

export default function HeroContent() {
  const [activeService, setActiveService] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Premium UX: Allow closing the detail panel with the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeService) {
        setActiveService(null);
        uiSounds.clickClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeService]);

  const handleServiceClick = (id) => {
    if (activeService === id) {
      setActiveService(null);
      uiSounds.clickClose();
    } else {
      setActiveService(id);
      uiSounds.clickOpen();
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 1.8 } // Delayed for loading screen
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const active = SERVICES.find(s => s.id === activeService);

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex-shrink-0 w-full lg:w-[420px] xl:w-[480px] text-center lg:text-left py-4 lg:py-0 relative z-20"
    >
      {/* Badge with pulse ring */}
      <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 relative" style={{ background: 'rgba(30, 120, 236, 0.06)', border: '1px solid rgba(30, 120, 236, 0.12)' }}>
        <div className="relative">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-accent-400 animate-ping" />
        </div>
        <span className="text-[9px] md:text-[10px] font-bold text-brand-700 uppercase tracking-[0.1em]">Engineering & Automation Partner</span>
      </motion.div>

      {/* Headline with Typewriter */}
      <motion.h1 variants={itemVars} className="font-display text-[clamp(1.6rem,3.5vw+0.5rem,2.8rem)] font-extrabold leading-[1.08] tracking-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>
        <TypewriterText text="Engineering-Grade" delay={2.0} />{' '}
        <span className="relative inline-block whitespace-nowrap">
          <motion.span 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="gradient-text inline-block"
          >
            Operations.
          </motion.span>
          <motion.svg 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ delay: 3.2, duration: 1, ease: "easeOut" }}
            className="absolute -bottom-0.5 left-0 w-full" viewBox="0 0 200 8" fill="none"
          >
            <path d="M2 6C50 2 150 2 198 6" stroke="url(#heroUnderline)" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="heroUnderline" x1="0" y1="0" x2="200" y2="0">
                <stop offset="0%" stopColor="#1e78ec" />
                <stop offset="100%" stopColor="#0e8d6d" />
              </linearGradient>
            </defs>
          </motion.svg>
        </span><br />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.5 }}
        >
          Delivered.
        </motion.span>
      </motion.h1>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && active.isERP ? (
          <motion.div
            key="erp-detail"
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 rounded-xl overflow-hidden shadow-lg"
            style={{ background: `${active.color}06`, border: `1px solid ${active.color}25`, backdropFilter: 'blur(8px)' }}
          >
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{active.emoji}</span>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: active.color }}>{active.fullTitle}</p>
                </div>
                <button 
                  onClick={() => { setActiveService(null); uiSounds.clickClose(); }} 
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors flex-shrink-0" 
                  aria-label="Close"
                >
                  <X className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>{active.desc}</p>
              <div className="mb-2">
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>Platforms We Integrate</p>
                <div className="flex flex-wrap gap-1.5">
                  {active.erpDetail.platforms.map((p, i) => (
                    <motion.span
                      key={p}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold"
                      style={{ background: 'var(--color-surface-elevated)', border: `1px solid ${active.color}20`, color: 'var(--color-text-primary)' }}
                    >
                      {p}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>Key Capabilities</p>
                <div className="grid grid-cols-2 gap-1">
                  {active.erpDetail.capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-2.5 h-2.5 flex-shrink-0" style={{ color: active.color }} />
                      <span className="text-[10px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mb-3 p-3 rounded-xl relative shadow-md"
            style={{ background: `${active.color}08`, border: `1px solid ${active.color}25`, backdropFilter: 'blur(8px)' }}
          >
            <button 
              onClick={() => { setActiveService(null); uiSounds.clickClose(); }} 
              className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors" 
              aria-label="Close"
            >
              <X className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{active.emoji}</span>
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: active.color }}>{active.fullTitle}</p>
            </div>
            <p className="text-[11px] leading-relaxed pr-4" style={{ color: 'var(--color-text-secondary)' }}>{active.desc}</p>
          </motion.div>
        ) : (
          <motion.p
            key="default"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-[13px] md:text-sm leading-relaxed mb-3 max-w-md mx-auto lg:mx-0"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            From digital transformation to BOM lifecycle management — we become the operational backbone your engineering teams need.
          </motion.p>
        )}
      </AnimatePresence>

      {/* 7 Service Chips — Wrapped in Magnetic */}
      <motion.div variants={itemVars} className="flex flex-wrap items-center gap-1.5 mb-4 justify-center lg:justify-start">
        {SERVICES.map((svc, i) => (
          <Magnetic key={svc.id} strength={20}>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleServiceClick(svc.id)}
              onMouseEnter={() => uiSounds.hover()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer text-left group"
              style={{
                background: activeService === svc.id ? `${svc.color}15` : 'var(--color-surface-elevated)',
                border: `1px solid ${activeService === svc.id ? `${svc.color}40` : 'var(--color-border-subtle)'}`,
                boxShadow: activeService === svc.id
                  ? `0 2px 12px ${svc.color}25, 0 0 20px ${svc.color}15`
                  : 'var(--shadow-sm)',
              }}
              aria-pressed={activeService === svc.id}
            >
              <span className="text-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{svc.emoji}</span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider transition-colors"
                style={{ color: activeService === svc.id ? svc.color : 'var(--color-text-secondary)' }}
              >
                {svc.label}
              </span>
            </motion.button>
          </Magnetic>
        ))}
      </motion.div>

      {/* Trusted By Ticker */}
      <motion.div variants={itemVars} className="flex items-center gap-4 mb-4 overflow-hidden border-t pt-3 mt-1" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <span className="text-[8px] font-bold uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>Trusted By</span>
        <div className="flex items-center gap-6 opacity-40 grayscale pointer-events-none text-xs font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
           <span>Microsoft</span>
           <span>SAP</span>
           <span>Boeing</span>
           <span>Siemens</span>
           <span>DHL</span>
        </div>
      </motion.div>

      {/* Premium CTAs — Wrapped in Magnetic */}
      <motion.div variants={itemVars} className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
        <Magnetic strength={30}>
          <button onClick={() => { setIsContactOpen(true); uiSounds.clickOpen(); }}>
            <ShimmerCTA href="#">
              Start Your Transformation
            </ShimmerCTA>
          </button>
        </Magnetic>
        
        <Magnetic strength={20}>
          <button 
            onClick={() => { setIsPortfolioOpen(true); uiSounds.clickOpen(); }}
            onMouseEnter={() => uiSounds.hover()}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300"
            style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-elevated)' }}
          >
            <FolderKanban className="w-3.5 h-3.5 opacity-70" />
            View Case Studies
          </button>
        </Magnetic>
      </motion.div>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PortfolioModal isOpen={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} />
    </motion.div>
  );
}
