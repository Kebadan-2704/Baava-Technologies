import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function SupplyChainFlow() {
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
            <linearGradient id="scGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e78ec" stopOpacity="0.8" />
            </linearGradient>
            <filter id="scGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            <path id="scPath1" d="M 220 220 L 360 220" />
            <path id="scPath2" d="M 540 220 L 680 220" />
          </defs>

          {/* Left: Purchase Order */}
          <g transform="translate(60, 150)">
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#faf9f7" stroke="#d5dae3" strokeWidth="2" />
            
            <path d="M 50 30 L 110 30 M 50 50 L 110 50 M 50 70 L 80 70" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <rect x="40" y="90" width="80" height="20" rx="4" fill="#f59e0b" opacity="0.2" />
            
            <text x="80" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">PURCHASE ORDER</text>
          </g>

          {/* Connection Lines & Packets */}
          <use href="#scPath1" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#scPath2" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          {/* Packets */}
          <g>
            <circle r="4" fill="#f59e0b" filter="url(#scGlow)">
              <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#scPath1" /></animateMotion>
            </circle>
            <circle r="4" fill="#f59e0b" filter="url(#scGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="1s"><mpath href="#scPath1" /></animateMotion>
            </circle>
            
            <circle r="4" fill="#1e78ec" filter="url(#scGlow)">
              <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#scPath2" /></animateMotion>
            </circle>
            <circle r="4" fill="#1e78ec" filter="url(#scGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="1s"><mpath href="#scPath2" /></animateMotion>
            </circle>
          </g>

          {/* Center: Vendor Verification */}
          <g transform="translate(360, 130)">
            <circle cx="90" cy="90" r="70" fill="#22272f" stroke="url(#scGrad)" strokeWidth="3" filter="url(#scGlow)" opacity="0.9" />
            <circle cx="90" cy="90" r="50" fill="#f59e0b" opacity="0.1" />
            
            {/* Vendor Shield/Check */}
            <path d="M 90 40 L 120 55 L 120 85 C 120 110, 90 130, 90 130 C 90 130, 60 110, 60 85 L 60 55 Z" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 75 85 L 85 95 L 105 70" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="4s" repeatCount="indefinite" />
            </path>
            
            <text x="90" y="180" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" letterSpacing="0.1em" fontFamily="Inter, sans-serif">VENDOR VERIFIED</text>
            
            {/* Pulsing rings */}
            <circle cx="90" cy="90" r="70" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="70;90;70" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Right: Inventory Synced */}
          <g transform="translate(680, 110)">
            <rect x="0" y="0" width="180" height="220" rx="10" fill="#faf9f7" stroke="#1e78ec" strokeWidth="2" />
            <rect x="0" y="0" width="180" height="220" rx="10" fill="#1e78ec" opacity="0.05" />
            
            {/* Grid of boxes (Inventory) */}
            <g transform="translate(30, 30)">
              {[0, 1, 2].map(row => (
                <g key={row} transform={`translate(0, ${row * 50})`}>
                  {[0, 1, 2].map(col => (
                    <rect key={col} x={col * 45} y="0" width="30" height="30" rx="4" fill="#1e78ec" opacity={(row*3+col) % 4 === 0 ? "0.8" : "0.2"} />
                  ))}
                </g>
              ))}
            </g>
            
            <text x="90" y="195" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e78ec" letterSpacing="0.1em" fontFamily="Inter, sans-serif">INVENTORY SYNCED</text>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
