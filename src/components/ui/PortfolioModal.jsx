import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BarChart3, Database, ShieldCheck, Clock, Users, Layers, Workflow } from 'lucide-react';
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
    techStack: ['SAP S/4HANA', 'ABAP', 'REST APIs', 'PostgreSQL'],
    timeline: '6 months',
    teamSize: '12 engineers',
    highlights: ['2.4M records migrated with zero data loss', 'Sub-second real-time synchronization', '$2.5M in annual IT savings'],
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
    techStack: ['Oracle PLM', 'Python', 'Kafka', 'MongoDB'],
    timeline: '8 months',
    teamSize: '8 engineers',
    highlights: ['Zero defects across 15,000+ components', '$1.2M saved in manufacturing rework', 'MIL-STD compliance verified'],
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
    techStack: ['UiPath', 'Power Automate', 'Azure OCR', 'SQL Server'],
    timeline: '4 months',
    teamSize: '6 engineers',
    highlights: ['50,000+ monthly invoices automated', '99.7% data extraction accuracy', 'Achieved ROI in under 3 months'],
  }
];

export default function PortfolioModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Close on Escape, arrow keys for navigation
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
          >
            {/* Header */}
            <div className="relative p-5 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div>
                <h2 id="portfolio-modal-title" className="text-lg font-bold font-display" style={{ color: 'var(--color-text-primary)' }}>
                  Enterprise Case Studies
                </h2>
                <p className="text-[11px] uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-tertiary)' }}>
                  Demonstrated ROI & Technical Architecture
                </p>
              </div>
              <button
                onClick={() => { onClose(); uiSounds.clickClose(); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                aria-label="Close case studies"
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
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center border-r overflow-y-auto" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: `${activeCase.color}15` }}>
                      <activeCase.icon className="w-5 h-5" style={{ color: activeCase.color }} />
                    </div>
                    
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                      Client: {activeCase.client}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-extrabold leading-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>
                      {activeCase.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                      {activeCase.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      <p className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter" style={{ color: activeCase.color }}>
                        {activeCase.metric}
                      </p>
                      <p className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-primary)' }}>
                        {activeCase.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Right: Structured Detail Dashboard */}
                  <div className="w-full md:w-1/2 bg-steel-950 flex flex-col justify-center relative overflow-hidden p-6 md:p-10">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    
                    <div className="relative z-10 space-y-5">
                      {/* Tech Stack */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="w-3.5 h-3.5 text-white/40" />
                          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Tech Stack</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeCase.techStack.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white/80 bg-white/8 border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Timeline & Team */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/8">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Timeline</p>
                          </div>
                          <p className="text-[16px] font-black text-white/90">{activeCase.timeline}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/8">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Users className="w-3 h-3 text-white/40" />
                            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Team</p>
                          </div>
                          <p className="text-[16px] font-black text-white/90">{activeCase.teamSize}</p>
                        </div>
                      </div>

                      {/* Key Results */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Workflow className="w-3.5 h-3.5 text-white/40" />
                          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Key Results</p>
                        </div>
                        <div className="space-y-2">
                          {activeCase.highlights.map((h, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: activeCase.color }} />
                              <p className="text-[12px] text-white/70 leading-relaxed">{h}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-[25%] flex items-center gap-4 z-20">
                <button 
                  onClick={prevSlide} 
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  aria-label="Previous case study"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {CASE_STUDIES.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => { setCurrentIndex(idx); uiSounds.hover(); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'scale-125' : 'opacity-40'}`}
                      style={{ background: idx === currentIndex ? activeCase.color : 'var(--color-text-tertiary)' }}
                      aria-label={`Go to case study ${idx + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextSlide} 
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  aria-label="Next case study"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
