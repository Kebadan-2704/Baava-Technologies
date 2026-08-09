import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, X, ChevronRight, Sparkles, FolderKanban, Factory, Plane, Truck, Cpu, Droplets } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import { uiSounds } from '../../utils/sounds';
import ContactModal from '../ui/ContactModal';
import PortfolioModal from '../ui/PortfolioModal';

/* ── Mini SVG Service Icons (inline, professional) ── */
const ServiceIcon = ({ type, size = 16, color }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case 'erp': return (
      <svg {...props}><rect x="3" y="3" width="18" height="18" rx="3" opacity="0.2" fill={color} /><rect x="3" y="3" width="18" height="7" rx="3" opacity="0.3" fill={color} /><line x1="7" y1="14" x2="11" y2="14" opacity="0.5" /><line x1="7" y1="17" x2="14" y2="17" opacity="0.3" /><circle cx="18" cy="15" r="2.5" opacity="0.4" fill={color} /></svg>
    );
    case 'rpa': return (
      <svg {...props}><rect x="7" y="10" width="10" height="10" rx="2" opacity="0.15" fill={color} /><rect x="8" y="4" width="8" height="7" rx="2" opacity="0.25" fill={color} /><circle cx="10" cy="7.5" r="1" fill={color} opacity="0.6" /><circle cx="14" cy="7.5" r="1" fill={color} opacity="0.6" /><line x1="6" y1="14" x2="3" y2="14" opacity="0.3" /><line x1="18" y1="14" x2="21" y2="14" opacity="0.3" /></svg>
    );
    case 'data': return (
      <svg {...props}><rect x="4" y="2" width="16" height="12" rx="2" opacity="0.15" fill={color} /><line x1="7" y1="6" x2="13" y2="6" opacity="0.4" /><line x1="7" y1="9" x2="16" y2="9" opacity="0.25" /><rect x="5" y="16" width="14" height="6" rx="1.5" opacity="0.1" fill={color} /><rect x="7" y="18" width="3" height="2" rx="0.5" opacity="0.2" fill={color} /><rect x="11" y="18" width="3" height="2" rx="0.5" opacity="0.15" fill={color} /></svg>
    );
    case 'support': return (
      <svg {...props}><path d="M6 13C6 9.5 9 6 12 6C15 6 18 9.5 18 13" opacity="0.3" /><rect x="4" y="12" width="4" height="6" rx="2" opacity="0.2" fill={color} /><rect x="16" y="12" width="4" height="6" rx="2" opacity="0.2" fill={color} /><path d="M18 17C18 19 16 21 14 21" opacity="0.25" /><circle cx="14" cy="21" r="1.5" opacity="0.2" fill={color} /></svg>
    );
    case 'supply': return (
      <svg {...props}><rect x="2" y="9" width="6" height="7" rx="1.5" opacity="0.15" fill={color} /><rect x="9" y="9" width="6" height="7" rx="1.5" opacity="0.15" fill={color} /><rect x="16" y="9" width="6" height="7" rx="1.5" opacity="0.15" fill={color} /><line x1="8" y1="12.5" x2="9" y2="12.5" opacity="0.5" /><line x1="15" y1="12.5" x2="16" y2="12.5" opacity="0.5" /><path d="M5 9V6" opacity="0.3" /><path d="M4 7.5L5 5.5L6 7.5" opacity="0.3" /></svg>
    );
    case 'docs': return (
      <svg {...props}><rect x="5" y="2" width="12" height="20" rx="2" opacity="0.1" fill={color} /><line x1="5" y1="8" x2="17" y2="8" opacity="0.15" /><line x1="5" y1="14" x2="17" y2="14" opacity="0.15" /><rect x="9" y="4.5" width="4" height="2" rx="1" opacity="0.3" fill={color} /><rect x="8" y="10" width="6" height="1.5" rx="0.5" opacity="0.2" fill={color} /><rect x="8" y="16" width="5" height="1.5" rx="0.5" opacity="0.2" fill={color} /></svg>
    );
    case 'bom': return (
      <svg {...props}><circle cx="12" cy="5" r="3" opacity="0.15" fill={color} /><path d="M12 8V11" opacity="0.25" /><path d="M12 11H6" opacity="0.25" /><path d="M12 11H18" opacity="0.25" /><rect x="3" y="12" width="6" height="5" rx="1" opacity="0.1" fill={color} /><rect x="15" y="12" width="6" height="5" rx="1" opacity="0.1" fill={color} /><path d="M9 14A3 3 0 0 0 6 17" opacity="0.2" /></svg>
    );
    default: return null;
  }
};

const SERVICES = [
  { id: 'erp', iconType: 'erp', label: 'ERP Integration', fullTitle: 'Digital Transformation & ERP Integration', desc: 'Enterprise system modernization, legacy migration, and real-time data synchronization across SAP, Oracle, NetSuite & Dynamics.', color: '#1e78ec', isERP: true,
    erpDetail: {
      platforms: ['SAP S/4HANA', 'Oracle NetSuite', 'Microsoft Dynamics', 'Custom API'],
      capabilities: ['Legacy Data Migration', 'Real-Time Sync', 'Multi-System Integration', 'Process Automation'],
    }
  },
  { id: 'rpa', iconType: 'rpa', label: 'Automation', fullTitle: 'Automation (RPA & AI)', desc: 'Robotic process automation and AI-driven workflows — reduce manual effort by 80% with intelligent document processing and predictive analytics.', color: '#0e8d6d' },
  { id: 'data', iconType: 'data', label: 'Data Entry', fullTitle: 'Technical Data Entry', desc: 'High-accuracy technical data input with structured validation protocols, quality checkpoints, and direct database population — 99.9% accuracy.', color: '#515e7b' },
  { id: 'support', iconType: 'support', label: 'Tech Support', fullTitle: 'Baseline Customer Technical Support', desc: 'L1/L2 support operations with SLA-driven response times, ticketing management, escalation protocols, and compliance reporting.', color: '#8b5cf6' },
  { id: 'supply', iconType: 'supply', label: 'Supply Chain', fullTitle: 'Supply Chain & Procurement Support', desc: 'Procurement lifecycle optimization — from purchase order processing and vendor management to logistics coordination and inventory tracking.', color: '#f59e0b' },
  { id: 'docs', iconType: 'docs', label: 'Doc Management', fullTitle: 'Document Management', desc: 'Enterprise document lifecycle — version control, digital archiving, compliance-ready documentation with role-based access permissions.', color: '#1e78ec' },
  { id: 'bom', iconType: 'bom', label: 'BOM Lifecycle', fullTitle: 'BOM Lifecycle Management', desc: 'Bill of Materials tracking from design to production — revision control, engineering change orders (ECOs), and multi-level BOM structures.', color: '#84cc16' },
];

const INDUSTRIES = [
  { icon: Factory, label: 'Manufacturing' },
  { icon: Plane, label: 'Aerospace' },
  { icon: Truck, label: 'Logistics' },
  { icon: Cpu, label: 'Technology' },
  { icon: Droplets, label: 'Energy' },
];

/* Premium shimmer CTA */
function ShimmerCTA({ onClick, children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(56,152,247,0.35), transparent 80%)`;

  return (
    <motion.button
      data-magnetic
      onClick={onClick}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-steel-950 via-steel-900 to-steel-950 text-white text-[11px] md:text-[13px] font-bold rounded-full shadow-[0_0_30px_rgba(30,120,236,0.2)] hover:shadow-[0_0_40px_rgba(30,120,236,0.4)] transition-all duration-500 overflow-hidden cursor-pointer"
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
    </motion.button>
  );
}

export default function HeroContent({ 
  activeService, 
  setActiveService,
  isContactOpen,
  setIsContactOpen,
  isPortfolioOpen,
  setIsPortfolioOpen
}) {
  // Local state removed, handled by App.jsx

  // Escape key to close detail panel
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
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
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
      className="flex flex-col h-full w-full text-center lg:text-left relative z-20 justify-between"
    >
      <div>
        {/* Headline — renders instantly */}
      <motion.h1 variants={itemVars} className="font-display text-[clamp(1.6rem,3.5vw+0.5rem,2.8rem)] font-extrabold leading-[1.08] tracking-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Engineering-Grade{' '}
        <span className="relative inline-block whitespace-nowrap">
          <span className="gradient-text inline-block">Operations.</span>
          <motion.svg 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
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
        Delivered.
      </motion.h1>

      {/* Detail panel - Fixed height container to prevent layout shifts */}
      <div className="min-h-[180px] md:min-h-[160px] flex items-center justify-center lg:justify-start w-full relative my-2">
        <AnimatePresence mode="wait">
          {active && active.isERP ? (
            <motion.div
              key="erp-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full rounded-xl overflow-hidden glass-panel relative"
            >
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${active.color}10, transparent)` }} />
              <div className="p-3 relative z-10 text-left">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ServiceIcon type={active.iconType} size={16} color={active.color} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: active.color }}>{active.fullTitle}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveService(null); uiSounds.clickClose(); }} 
                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors flex-shrink-0" 
                    aria-label="Close service detail"
                  >
                    <X className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                  </button>
                </div>
                <p className="text-[12px] leading-relaxed mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>{active.desc}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {active.erpDetail.platforms.map((p, i) => (
                      <span
                        key={p}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold"
                        style={{ background: 'var(--color-surface-elevated)', border: `1px solid ${active.color}20`, color: 'var(--color-text-primary)' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full p-3 rounded-xl relative glass-panel overflow-hidden text-left"
            >
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${active.color}10, transparent)` }} />
              <button 
                onClick={() => { setActiveService(null); uiSounds.clickClose(); }} 
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors" 
                aria-label="Close service detail"
              >
                <X className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <ServiceIcon type={active.iconType} size={16} color={active.color} />
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: active.color }}>{active.fullTitle}</p>
              </div>
              <p className="text-[12px] leading-relaxed pr-4" style={{ color: 'var(--color-text-secondary)' }}>{active.desc}</p>
            </motion.div>
          ) : (
            <motion.p
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[13px] md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0 absolute inset-0 flex items-center justify-center lg:justify-start"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              From digital transformation to BOM lifecycle management — we become the operational backbone your engineering teams need.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      </div>
      
      <motion.div variants={itemVars} className="mb-3 flex justify-center lg:justify-start w-full mt-2 lg:mt-0 relative z-20">
        <ShimmerCTA onClick={() => setIsContactOpen(true)}>
          Explore Operations Hub
        </ShimmerCTA>
      </motion.div>

      {/* Service Chips & Bottom Actions Wrapper */}
      <div className="w-full">
        <motion.div variants={itemVars} className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 mb-2 items-center gap-1.5 lg:gap-2 justify-start scrollbar-hide w-full" style={{ scrollSnapType: 'x mandatory' }}>
          {SERVICES.map((svc, i) => (
            <Magnetic key={svc.id} strength={20}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleServiceClick(svc.id)}
                onMouseEnter={() => uiSounds.hover()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer text-left group flex-shrink-0"
                style={{
                  background: activeService === svc.id ? `${svc.color}15` : 'var(--color-surface-elevated)',
                  border: `1px solid ${activeService === svc.id ? `${svc.color}40` : 'var(--color-border-subtle)'}`,
                  boxShadow: activeService === svc.id
                    ? `0 2px 12px ${svc.color}25, 0 0 20px ${svc.color}15`
                    : 'var(--shadow-sm)',
                  scrollSnapAlign: 'start'
                }}
                aria-pressed={activeService === svc.id}
                aria-label={`${svc.label} service`}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon type={svc.iconType} size={14} color={activeService === svc.id ? svc.color : 'var(--color-text-secondary)'} />
                </span>
                <span
                  className="text-[11px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                  style={{ color: activeService === svc.id ? svc.color : 'var(--color-text-secondary)' }}
                >
                  {svc.label}
                </span>
              </motion.button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Industries We Serve */}
        <motion.div variants={itemVars} className="flex items-center gap-4 mb-0 overflow-hidden border-t pt-3 mt-1" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <span className="text-[11px] font-bold uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>Industries</span>
          <div className="flex items-center gap-4 flex-wrap">
            {INDUSTRIES.map((ind) => (
              <div key={ind.label} className="flex items-center gap-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <ind.icon className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
                <span className="text-[11px] font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{ind.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Removed CTA from here, moved to header as per plan to save space */}

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PortfolioModal isOpen={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} />
    </motion.div>
  );
}
