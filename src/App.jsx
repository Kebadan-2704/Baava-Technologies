import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe2, ArrowUpRight, Check } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import DocumentationAnimation from './components/DocumentationAnimation';
import ParticleNetwork from './components/ParticleNetwork';

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

// Extracted to prevent App from re-rendering 60fps and freezing the video
const MouseGlow = memo(() => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
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

// Extracted Video Player to guarantee it mounts once and plays perfectly
const PremiumVideo = memo(() => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <video 
      ref={videoRef}
      src="/mp__Your_video_is_ready_.mp4" 
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-24 md:h-36 object-cover rounded-[1.25rem] group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none" 
    />
  );
});

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
      
      {/* Animated Particle Network Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <ParticleNetwork />
      </div>
      
      {/* Subtle Blue Glow following mouse */}
      <MouseGlow />

      {/* Live System Status Badge (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-2 md:gap-2.5 bg-white/80 backdrop-blur-md border border-slate-200/60 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] cursor-default scale-90 md:scale-100 origin-top-right"
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
        
        {/* TOP: Premium Video Logo */}
        <motion.div variants={itemVariants} className="flex flex-col items-center select-none w-full max-w-2xl mt-4">
          <div className="relative w-full p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_50px_-15px_rgba(38,167,224,0.15)] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(38,167,224,0.25)] group">
            <PremiumVideo />
            <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-slate-900/5 pointer-events-none" />
          </div>
        </motion.div>

        {/* MIDDLE: Documentation Animation Box */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center my-2">
          <DocumentationAnimation />
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
