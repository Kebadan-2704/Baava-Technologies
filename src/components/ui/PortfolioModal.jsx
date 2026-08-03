import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BarChart3, Database, ShieldCheck } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

const CASE_STUDIES = [
  {
    id: 1,
    client: 'Global Automotive OEM',
    title: 'SAP S/4HANA Migration & Data Sync',
    metric: '+45%',
    metricLabel: 'Supply Chain Efficiency',
    icon: Database,
    description: 'Executed a flawless legacy data migration to SAP S/4HANA for a Tier-1 automotive manufacturer, reducing real-time sync latency from 24 hours to sub-second.',
    color: '#1e78ec',
    visual: 'radial-gradient(circle at 80% 20%, rgba(30,120,236,0.15) 0%, transparent 50%)'
  },
  {
    id: 2,
    client: 'Aerospace Defense Contractor',
    title: 'BOM Lifecycle Automation',
    metric: '99.9%',
    metricLabel: 'Revision Accuracy',
    icon: ShieldCheck,
    description: 'Implemented an automated Bill of Materials tracking system with strict ECO version control, ensuring zero-defect compliance for military-grade manufacturing.',
    color: '#0e8d6d',
    visual: 'radial-gradient(circle at 20% 80%, rgba(14,141,109,0.15) 0%, transparent 50%)'
  },
  {
    id: 3,
    client: 'European Logistics Hub',
    title: 'RPA Invoice Processing',
    metric: '-80%',
    metricLabel: 'Manual Processing Time',
    icon: BarChart3,
    description: 'Deployed intelligent RPA bots to handle 50,000+ monthly vendor invoices, eliminating human data entry errors and accelerating procurement cycles.',
    color: '#f59e0b',
    visual: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 70%)'
  }
];

export default function PortfolioModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        uiSounds.clickClose();
      }
      if (e.key === 'ArrowRight' && isOpen) nextSlide();
      if (e.key === 'ArrowLeft' && isOpen) prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    uiSounds.hover();
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    uiSounds.hover();
  };

  const activeCase = CASE_STUDIES[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => { onClose(); uiSounds.clickClose(); }}
            className="absolute inset-0 bg-black/60 backdrop-blur-lg"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[80vh] min-h-[500px] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
            style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}
          >
            {/* Header */}
            <div className="relative p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div>
                <h2 className="text-lg font-bold font-display" style={{ color: 'var(--color-text-primary)' }}>
                  Enterprise Case Studies
                </h2>
                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-tertiary)' }}>
                  Demonstrated ROI & Technical Architecture
                </p>
              </div>
              <button
                onClick={() => { onClose(); uiSounds.clickClose(); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            </div>

            {/* Carousel Content */}
            <div className="flex-1 relative flex overflow-hidden" style={{ background: 'var(--color-surface)' }}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col md:flex-row"
                >
                  {/* Left: Data & Metric */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-r" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: `${activeCase.color}15` }}>
                      <activeCase.icon className="w-5 h-5" style={{ color: activeCase.color }} />
                    </div>
                    
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                      Client: {activeCase.client}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-extrabold leading-tight mb-4" style={{ color: 'var(--color-text-primary)' }}>
                      {activeCase.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                      {activeCase.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      <p className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter" style={{ color: activeCase.color }}>
                        {activeCase.metric}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-primary)' }}>
                        {activeCase.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Right: Abstract Pictorial Representation */}
                  <div className="w-full md:w-1/2 bg-steel-950 flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: activeCase.visual }}>
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    
                    {/* Glowing Data Nodes (Abstract Architecture) */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="relative z-10 w-48 h-48 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))' }}
                    >
                      <div className="absolute top-[-10px] left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]" />
                      <div className="absolute bottom-4 right-2 w-2 h-2 bg-white rounded-full opacity-50" />
                      <div className="absolute bottom-12 left-[-5px] w-2.5 h-2.5 bg-white rounded-full opacity-80" />
                      
                      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ border: `2px solid ${activeCase.color}50` }}>
                         <div className="w-12 h-12 rounded-full" style={{ background: activeCase.color, boxShadow: `0 0 40px ${activeCase.color}` }} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute bottom-6 right-6 md:right-[50%] md:translate-x-1/2 flex items-center gap-4 z-20">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {CASE_STUDIES.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/30'}`} />
                  ))}
                </div>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
