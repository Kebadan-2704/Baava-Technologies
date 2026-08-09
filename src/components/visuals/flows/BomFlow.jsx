import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function BomFlow() {
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
            <linearGradient id="bomGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0e8d6d" stopOpacity="0.8" />
            </linearGradient>
            <filter id="bomGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            <path id="bomPath1" d="M 220 220 L 320 220" />
            <path id="bomPath2" d="M 520 220 L 700 220" />
          </defs>

          {/* Left: Engineering Change Order (ECO) */}
          <g transform="translate(60, 150)">
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#faf9f7" stroke="#d5dae3" strokeWidth="2" />
            <path d="M 40 40 L 60 20 L 80 40 Z" fill="#84cc16" opacity="0.3" />
            <path d="M 50 30 L 70 30 L 70 60 L 50 60 Z" fill="#84cc16" opacity="0.8" />
            
            <rect x="30" y="80" width="100" height="6" rx="3" fill="#d5dae3" />
            <rect x="30" y="100" width="60" height="6" rx="3" fill="#d5dae3" />
            
            <text x="80" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">ENGINEERING CHANGE</text>
          </g>

          {/* Connection Lines */}
          <use href="#bomPath1" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#bomPath2" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          <circle r="5" fill="#84cc16" filter="url(#bomGlow)">
            <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#bomPath1" /></animateMotion>
          </circle>
          <circle r="5" fill="#84cc16" filter="url(#bomGlow)">
            <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#bomPath2" /></animateMotion>
          </circle>

          {/* Center: BOM Tree Branching */}
          <g transform="translate(320, 80)">
            <rect x="0" y="0" width="200" height="280" rx="16" fill="#22272f" stroke="url(#bomGrad)" strokeWidth="3" filter="url(#bomGlow)" opacity="0.9" />
            
            <g transform="translate(100, 40)">
              {/* Top Node */}
              <circle cx="0" cy="0" r="20" fill="#84cc16" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="800" fill="white">V2</text>
              
              {/* Lines */}
              <line x1="0" y1="20" x2="0" y2="60" stroke="#84cc16" strokeWidth="2" />
              <line x1="-60" y1="60" x2="60" y2="60" stroke="#84cc16" strokeWidth="2" />
              <line x1="-60" y1="60" x2="-60" y2="90" stroke="#84cc16" strokeWidth="2" />
              <line x1="0" y1="60" x2="0" y2="90" stroke="#84cc16" strokeWidth="2" />
              <line x1="60" y1="60" x2="60" y2="90" stroke="#84cc16" strokeWidth="2" />
              
              {/* Sub Nodes */}
              <circle cx="-60" cy="100" r="15" fill="#515e7b" />
              <circle cx="0" cy="100" r="15" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="100" r="15" fill="#515e7b" />
              
              {/* Level 3 Lines */}
              <line x1="0" y1="115" x2="0" y2="150" stroke="#84cc16" strokeWidth="2" />
              <line x1="-30" y1="150" x2="30" y2="150" stroke="#84cc16" strokeWidth="2" />
              <line x1="-30" y1="150" x2="-30" y2="170" stroke="#84cc16" strokeWidth="2" />
              <line x1="30" y1="150" x2="30" y2="170" stroke="#84cc16" strokeWidth="2" />
              
              {/* Level 3 Nodes */}
              <circle cx="-30" cy="180" r="10" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="30" cy="180" r="10" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Right: Revision Synced */}
          <g transform="translate(700, 150)">
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#faf9f7" stroke="#84cc16" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#84cc16" opacity="0.05" />
            
            <circle cx="80" cy="60" r="30" fill="#84cc16" opacity="0.1" />
            <circle cx="80" cy="60" r="30" fill="none" stroke="#84cc16" strokeWidth="3" />
            
            <text x="80" y="65" textAnchor="middle" fontSize="16" fontWeight="800" fill="#84cc16" fontFamily="Inter, sans-serif">v3.2</text>
            
            <text x="80" y="120" textAnchor="middle" fontSize="11" fontWeight="800" fill="#84cc16" letterSpacing="0.1em" fontFamily="Inter, sans-serif">REVISION SYNCED</text>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
