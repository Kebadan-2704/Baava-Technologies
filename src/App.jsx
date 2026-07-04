import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe2, ArrowUpRight, Check } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import DocumentationAnimation from './components/DocumentationAnimation';
import BackgroundPapers from './components/BackgroundPapers';
import ParticleNetwork from './components/ParticleNetwork';
import { EngineeringIcon, BookkeepingIcon, StudentIcon, InventoryIcon } from './components/ServiceIcons';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 70,
    }
  }
};


// Extracted to prevent App from re-rendering 60fps and freezing the main thread
const MouseGlow = memo(() => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-60"
      style={{
        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(38, 167, 224, 0.08), transparent 80%)`
      }}
    />
  );
});

// Service card with custom SVG illustration
function ServiceCard({ icon: IconComponent, title, description, color, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center p-2 md:p-5 bg-white/50 backdrop-blur-md rounded-xl md:rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1.5 group h-full relative overflow-hidden"
    >
      {/* Subtle color glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)` }}
      />
      
      {/* SVG Icon */}
      <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mb-1.5 md:mb-3 group-hover:scale-110 transition-transform duration-500">
        <IconComponent size={48} className="w-full h-full" />
      </div>
      
      <h3 className="relative z-10 text-[8px] md:text-sm font-black text-slate-700 uppercase tracking-wide md:tracking-widest mb-0.5 md:mb-2 leading-tight md:leading-normal">{title}</h3>
      <p className="relative z-10 text-[6px] md:text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
        {description}
      </p>
    </motion.div>
  );
}

function App() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('Info@baavatech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative h-[100dvh] w-full bg-gradient-to-br from-slate-50 via-[#f0f7fb] to-[#e1f0f8] text-slate-800 overflow-hidden flex flex-col font-sans">
      <CustomCursor />
      
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <BackgroundPapers />
        <ParticleNetwork />
      </div>

      {/* Subtle Blue Glow following mouse */}
      <MouseGlow />

      {/* TOP BAR: Small Logo (left) + Status Badge (right) */}
      <div className="relative z-50 w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 pt-3 md:pt-5">
        {/* Logo — small, corner placement */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 md:gap-4 relative group"
        >
          <div className="relative overflow-hidden rounded-md md:rounded-lg animate-float-logo">
            <img 
              src="/logo.png" 
              alt="Baava Tech Logo" 
              className="h-[28px] md:h-[40px] w-auto object-contain pointer-events-none" 
            />
            {/* The Sweeping Cinematic Light Glare ("Video Effect") */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-md md:rounded-lg">
              <div className="absolute top-0 bottom-0 w-[250%] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center border-l border-slate-300/50 pl-4 h-8">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Enterprise Support</span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">Seamless Support Across Borders</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 md:gap-4"
        >
          {/* Email Contact Button (Top Right) */}
          <a 
            href="mailto:Info@baavatech.com"
            className="group hidden md:flex items-center gap-2 md:gap-2.5 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-white hover:border-[#26a7e0]/40 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#26a7e0] transition-colors" />
            <span className="text-xs font-extrabold text-slate-600 group-hover:text-[#26a7e0] transition-colors">Info@baavatech.com</span>
          </a>

          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 md:gap-2.5 bg-white/80 backdrop-blur-md border border-slate-200/60 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] cursor-default">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">System Operational</span>
          </div>
        </motion.div>
      </div>

      {/* Main Full-Screen Content Layout */}
      <motion.div 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
        className="relative z-20 w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-between py-2 md:py-4 px-2 md:px-6 flex-1"
      >

        {/* MIDDLE: Documentation Animation Box */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center my-1 md:my-2">
          <DocumentationAnimation />
        </motion.div>

        {/* SERVICE CARDS — 4 modules with SVG illustrations */}
        <motion.div variants={itemVariants} className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 my-2 md:my-6 px-1 md:px-6 z-20">
          <ServiceCard 
            icon={EngineeringIcon}
            title="Engineering"
            description="Hardware & electronics engineering documentation and support services."
            color="#26a7e0"
            delay={0}
          />
          <ServiceCard 
            icon={BookkeepingIcon}
            title="Bookkeeping & Invoices"
            description="Financial records, billing, and invoice processing with multi-currency support."
            color="#10b981"
            delay={0.1}
          />
          <ServiceCard 
            icon={StudentIcon}
            title="Students"
            description="Student records, biodata management, and academic documentation."
            color="#8b5cf6"
            delay={0.2}
          />
          <ServiceCard 
            icon={InventoryIcon}
            title="Inventory"
            description="Component tracking, stock management, and usage monitoring."
            color="#84cc16"
            delay={0.3}
          />
        </motion.div>

        {/* BOTTOM: Contact & Global Support Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1.5 md:gap-3 mt-auto pb-2 md:pb-0">
          
          {/* Global Support Text — improved wording */}
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Globe2 className="w-3.5 h-3.5 text-[#26a7e0] animate-[spin_12s_linear_infinite]" />
            <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold text-slate-400">Seamless Support Across Borders</span>
          </div>

          {/* Clean Contact Email Button (Click to Copy) */}
          <a 
            href="mailto:Info@baavatech.com" 
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className={`group relative inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white border border-slate-200 shadow-sm transition-all duration-300 ${copied ? 'border-emerald-200 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.2)] scale-105' : 'hover:border-[#26a7e0]/40 hover:shadow-[0_15px_40px_-10px_rgba(38,167,224,0.15)]'}`}
          >
            <div className={`w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${copied ? 'bg-emerald-100' : 'bg-slate-50 group-hover:bg-[#26a7e0]/10'}`}>
              {copied ? (
                <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" />
              ) : (
                <Mail className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400 group-hover:text-[#26a7e0] transition-colors" />
              )}
            </div>
            <span className={`text-sm md:text-lg font-bold tracking-tight transition-colors duration-300 ${copied ? 'text-emerald-600' : 'text-slate-700 group-hover:text-[#26a7e0]'}`}>
              {copied ? 'Copied to clipboard!' : 'Info@baavatech.com'}
            </span>
            {!copied && <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-300 group-hover:text-[#26a7e0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            
            {/* Cinematic Button Sweep */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-full">
              <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>
          </a>

          {/* Micro Corporate Footer */}
          <div className="mt-2 text-center pointer-events-none pb-2">
            <p className="text-[9px] md:text-[10px] text-slate-400/80 font-medium tracking-wide uppercase font-mono mb-1">
              &copy; {new Date().getFullYear()} Baava Tech | Enterprise Secure Workflows
            </p>
            <p className="text-[8px] text-slate-400/50 uppercase tracking-widest font-mono">
              Karur, Tamil Nadu, IN • Operations Center
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;
