import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function DataEntryFlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0 w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px] flex items-center justify-center relative perspective-[1200px] lg:pl-8 xl:pl-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] bg-gradient-to-br from-brand-200/10 via-transparent to-steel-200/10 rounded-full blur-[60px]" />
      </div>
      
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full max-h-full relative z-10"
      >
        <svg viewBox="0 0 920 440" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ transform: 'translateZ(20px)' }}>
          <defs>
            <linearGradient id="dataGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#515e7b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e78ec" stopOpacity="0.8" />
            </linearGradient>
            <filter id="dataGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            <path id="dataIn1" d="M160 120 L 380 200" />
            <path id="dataIn2" d="M160 220 L 380 220" />
            <path id="dataIn3" d="M160 320 L 380 240" />
            
            <path id="dataOut" d="M540 220 L 740 220" />
          </defs>

          {/* Left: Messy Data */}
          <g transform="translate(40, 100)">
            <text x="60" y="-10" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8593ae" letterSpacing="0.05em" fontFamily="Inter, sans-serif">MESSY DATA</text>
            {[
              {x: 10, y: 10, w: 40, c: '#ef4444'}, {x: 60, y: 30, w: 60, c: '#84cc16'}, {x: 20, y: 50, w: 50, c: '#f59e0b'},
              {x: 0, y: 80, w: 70, c: '#8b5cf6'}, {x: 80, y: 100, w: 30, c: '#0e8d6d'}, {x: 10, y: 120, w: 90, c: '#1e78ec'},
              {x: 30, y: 150, w: 40, c: '#f59e0b'}, {x: 70, y: 170, w: 50, c: '#ef4444'}, {x: 20, y: 200, w: 80, c: '#84cc16'}
            ].map((block, i) => (
              <rect key={i} x={block.x} y={block.y} width={block.w} height="12" rx="3" fill={block.c} opacity="0.6">
                <animate attributeName="x" values={`${block.x};${block.x + (i%2===0?10:-10)};${block.x}`} dur={`${2+i*0.5}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>

          {/* Connection Lines & Data Packets */}
          <use href="#dataIn1" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#dataIn2" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#dataIn3" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          
          <use href="#dataOut" stroke="#515e7b" strokeWidth="3" opacity="0.4" />

          {/* Incoming Packets */}
          {[1, 2].map(i => (
            <g key={`in-${i}`}>
              <circle r="4" fill="#ef4444">
                <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`}><mpath href="#dataIn1" /></animateMotion>
              </circle>
              <circle r="4" fill="#84cc16">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.5}s`}><mpath href="#dataIn2" /></animateMotion>
              </circle>
              <circle r="4" fill="#f59e0b">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.9}s`}><mpath href="#dataIn3" /></animateMotion>
              </circle>
            </g>
          ))}
          
          {/* Outgoing Packets (Clean) */}
          {[1, 2, 3, 4].map(i => (
            <rect key={`out-${i}`} width="8" height="8" rx="2" fill="#515e7b" filter="url(#dataGlow)">
              <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.4}s`}><mpath href="#dataOut" /></animateMotion>
            </rect>
          ))}

          {/* Center: Funnel / Quality Checkpoint */}
          <g transform="translate(380, 100)">
            <path d="M 0 0 L 160 0 L 110 240 L 50 240 Z" fill="#22272f" stroke="url(#dataGrad)" strokeWidth="3" filter="url(#dataGlow)" opacity="0.9" />
            
            {/* Grid graphic inside funnel */}
            <g transform="translate(40, 40)" opacity="0.3">
              <line x1="0" y1="0" x2="80" y2="0" stroke="white" strokeWidth="1" />
              <line x1="10" y1="40" x2="70" y2="40" stroke="white" strokeWidth="1" />
              <line x1="20" y1="80" x2="60" y2="80" stroke="white" strokeWidth="1" />
            </g>
            
            <circle cx="80" cy="120" r="40" fill="#515e7b" opacity="0.1" />
            <circle cx="80" cy="120" r="30" fill="none" stroke="#515e7b" strokeWidth="2" strokeDasharray="4 4">
              <animateTransform attributeName="transform" type="rotate" from="360 80 120" to="0 80 120" dur="8s" repeatCount="indefinite" />
            </circle>
            
            <rect x="25" y="105" width="110" height="30" rx="15" fill="#515e7b" />
            <text x="80" y="125" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" letterSpacing="0.05em" fontFamily="Inter, sans-serif">99.9% ACCURACY</text>
            
            <text x="80" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#8593ae" letterSpacing="0.1em" fontFamily="Inter, sans-serif">QUALITY CHECK</text>
          </g>

          {/* Right: Perfect Grid Output */}
          <g transform="translate(740, 100)">
            <text x="70" y="-10" textAnchor="middle" fontSize="11" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">STRUCTURED DATA</text>
            <rect x="0" y="0" width="140" height="240" rx="8" fill="#faf9f7" stroke="#515e7b" strokeWidth="2" />
            <rect x="0" y="0" width="140" height="240" rx="8" fill="#515e7b" opacity="0.05" />
            
            <g transform="translate(10, 20)">
              {/* Header row */}
              <rect x="0" y="0" width="120" height="20" rx="4" fill="#515e7b" opacity="0.8" />
              {/* Data rows */}
              {[1, 2, 3, 4, 5, 6].map(i => (
                <g key={i} transform={`translate(0, ${i * 32})`}>
                  <rect x="0" y="0" width="120" height="24" rx="4" fill="white" stroke="#d5dae3" strokeWidth="1" />
                  <rect x="8" y="8" width="30" height="8" rx="2" fill="#515e7b" opacity="0.3" />
                  <rect x="46" y="8" width="40" height="8" rx="2" fill="#515e7b" opacity="0.5" />
                  <rect x="94" y="8" width="18" height="8" rx="2" fill="#515e7b" opacity="0.8" />
                  
                  {/* Sweep animation over row */}
                  <rect x="0" y="0" width="4" height="24" fill="#515e7b" filter="url(#dataGlow)" opacity="0.5">
                    <animate attributeName="x" values="0; 116; 0" dur={`${2+i*0.2}s`} repeatCount="indefinite" />
                  </rect>
                </g>
              ))}
            </g>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
