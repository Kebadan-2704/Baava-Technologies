import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe2, ArrowUpRight, Check, Zap, MonitorSmartphone, Sparkles } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import DocumentationAnimation from './components/DocumentationAnimation';
import BackgroundPapers from './components/BackgroundPapers';

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

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#26a7e0]/10 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-sm md:text-base font-black text-slate-700 uppercase tracking-widest mb-3">{title}</h3>
      <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
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
    <div className="relative h-[100dvh] w-full bg-gradient-to-br from-slate-50 via-[#f0f7fb] to-[#e1f0f8] text-slate-800 overflow-x-hidden overflow-y-auto flex flex-col font-sans">
      <CustomCursor />
      
      {/* Background Floating Papers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <BackgroundPapers />
      </div>

      {/* Subtle Blue Glow following mouse */}
      <MouseGlow />

      {/* Live System Status Badge (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-2 md:gap-2.5 bg-white/80 backdrop-blur-md border border-slate-200/60 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] cursor-default scale-90 md:scale-100 origin-top-right animate-float-logo"
      >
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
          <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
        <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">System Operational</span>
      </motion.div>

      {/* Main Full-Screen Content Layout (Strictly 100dvh) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
        className="relative z-20 w-full flex-1 max-w-7xl mx-auto flex flex-col items-center justify-between py-4 md:py-6 px-4 md:px-6"
      >
        {/* TOP: Animated Logo Image */}
        <motion.div variants={itemVariants} className="flex flex-col items-center select-none w-full max-w-3xl mt-2 md:mt-4 relative z-20">
          <div className="relative w-full p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_50px_-15px_rgba(38,167,224,0.15)] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(38,167,224,0.3)] group">
            
            {/* The Logo with 3D Float */}
            <div className="animate-float-logo">
              <img 
                src="/logo.png" 
                alt="Baava Tech Logo" 
                className="w-full h-auto max-h-[160px] md:max-h-[220px] object-contain rounded-[1.25rem] group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none" 
              />
            </div>

            {/* The Sweeping Cinematic Light Glare */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[1.5rem]">
              <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>

            <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-slate-900/5 pointer-events-none z-20" />
          </div>
        </motion.div>

        {/* MIDDLE: Documentation Animation Box */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center my-2 mt-4 md:mt-6">
          <DocumentationAnimation />
        </motion.div>

        {/* FEATURES GRID */}
        <motion.div variants={itemVariants} className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-6 md:my-10 px-2 md:px-6 z-20">
          <FeatureCard 
            icon={<Zap className="w-5 h-5 text-[#26a7e0]" />}
            title="Zero-Lag Performance"
            description="Powered by hardware-accelerated CSS physics, our platform runs natively on your graphics card for a perfectly smooth, stutter-free experience on any device."
          />
          <FeatureCard 
            icon={<MonitorSmartphone className="w-5 h-5 text-[#26a7e0]" />}
            title="Responsive Perfection"
            description="Engineered to scale flawlessly. Whether viewing on a massive ultra-wide monitor or a mobile device, our workflows adapt perfectly to your exact environment."
          />
          <FeatureCard 
            icon={<Sparkles className="w-5 h-5 text-[#26a7e0]" />}
            title="High-End Aesthetics"
            description="Experience a million-dollar enterprise platform featuring glassmorphism elements, shimmering typography, and a clean, modern corporate color palette."
          />
        </motion.div>

        {/* BOTTOM: Contact & Global Support Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 md:gap-3 mt-auto pb-4 md:pb-0">
          
          {/* Global Support Text */}
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Globe2 className="w-3.5 h-3.5 text-[#26a7e0] animate-[spin_12s_linear_infinite]" />
            <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold text-slate-400">Globally can support</span>
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
          <div className="mt-2 text-center pointer-events-none">
            <p className="text-[9px] md:text-[10px] text-slate-400/80 font-medium tracking-wide uppercase font-mono">
              &copy; {new Date().getFullYear()} Bava Tech | Enterprise Secure Workflows
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;
