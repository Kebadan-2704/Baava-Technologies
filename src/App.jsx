import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe2, ArrowUpRight } from 'lucide-react';
import ParticleNetwork from './components/ParticleNetwork';
import CustomCursor from './components/CustomCursor';
import ScrambleText from './components/ScrambleText';
import MagneticButton from './components/MagneticButton';
import TiltCard from './components/TiltCard';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 80,
      delay: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 15,
      stiffness: 100,
    }
  }
};

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#020205] text-white overflow-hidden flex flex-col items-center justify-center selection:bg-brand-500/30 selection:text-brand-300 font-sans" style={{ perspective: '1000px' }}>
      
      {/* 4.3 Custom Cursor Component */}
      <CustomCursor />

      {/* 6.3 Background Noise Overlay */}
      <div className="absolute inset-0 bg-noise z-10 pointer-events-none" />

      {/* 6.12 Interactive Particle Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen">
        <ParticleNetwork />
      </div>

      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* 6.12 Dynamic Mouse Spotlight Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-60 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(38, 167, 224, 0.08), transparent 80%)`
        }}
      />

      {/* 6.2 & 6.4 Animated Gradient Orbs */}
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-brand-500/10 to-transparent blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent blur-[140px] pointer-events-none z-0"
      />

      {/* Main Floating Glassmorphic Container wrapped in 3D TiltCard (3.5 & 3.12) */}
      <TiltCard className="relative z-20 flex flex-col items-center justify-center rounded-[2.5rem] max-w-xl md:max-w-2xl w-[90%] bg-white/[0.01] border border-white/[0.06] backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] text-center overflow-hidden">
        
        {/* Animated 5.1 Luxury Border Sheen Sweep */}
        <div className="border-sheen-container">
          <div className="border-sheen-line" />
        </div>

        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full h-full flex flex-col items-center justify-center space-y-10 p-10 md:p-16 rounded-[2.5rem]"
        >
        
        {/* Sleek Corner Accent Lines (Awwwards details) */}
        <div className="absolute top-8 left-8 w-4 h-[1px] bg-white/20" />
        <div className="absolute top-8 left-8 w-[1px] h-4 bg-white/20" />
        <div className="absolute bottom-8 right-8 w-4 h-[1px] bg-white/20" />
        <div className="absolute bottom-8 right-8 w-[1px] h-4 bg-white/20" />

        {/* 2.5 Scramble Text Brand Title */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-3 cursor-default">
          <h1 className="text-5xl sm:text-7xl tracking-tight font-sans">
            <span className="font-extrabold text-white">
              <ScrambleText text="Baava" duration={600} className="font-extrabold" />
            </span>{' '}
            <span className="text-brand-400/90 font-light tracking-wide">
              <ScrambleText text="Tech" duration={800} className="font-light" />
            </span>
          </h1>
          <motion.div 
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
             className="h-[1px] w-20 bg-gradient-to-r from-transparent via-brand-400 to-transparent mt-2" 
          />
        </motion.div>

        {/* Interactive Global Badge with Scramble */}
        <motion.div variants={itemVariants}>
          <div className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] cursor-default">
            <div className="relative flex items-center justify-center">
              <Globe2 className="w-4 h-4 text-brand-400 animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-0 bg-brand-400 rounded-full blur-md opacity-30 animate-pulse" />
            </div>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors duration-300 font-mono">
              <ScrambleText text="Globally Can Support" duration={1000} />
            </span>
            {/* 5.1 Shine Sweep Effect */}
            <motion.div 
              animate={{ x: ["-100%", "250%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />
          </div>
        </motion.div>

        {/* 5.3 Magnetic Contact CTA Link */}
        <motion.div variants={itemVariants} className="pt-4">
          <MagneticButton as="a" href="mailto:Info@baavatech.com" className="block">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-4 px-8 py-4.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-brand-500/10 hover:border-brand-500/30 hover:shadow-[0_0_50px_rgba(38,167,224,0.15)] transition-all duration-500"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 group-hover:bg-brand-500 group-hover:border-brand-400 group-hover:shadow-[0_0_20px_rgba(38,167,224,0.4)] transition-all duration-500">
                <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 group-hover:text-brand-300/80 transition-colors font-mono">
                  Get In Touch
                </span>
                <span className="text-lg sm:text-xl font-light tracking-[0.03em] text-white/80 group-hover:text-white transition-colors font-sans">
                  Info@baavatech.com
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 ml-4" />
            </motion.div>
          </MagneticButton>
        </motion.div>

        </motion.div>
      </TiltCard>
    </div>
  );
}

export default App;
