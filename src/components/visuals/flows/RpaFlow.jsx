import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function RpaFlow() {
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
            <linearGradient id="rpaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0e8d6d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e78ec" stopOpacity="0.8" />
            </linearGradient>
            <filter id="rpaGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="scanBeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e8d6d" stopOpacity="0" />
              <stop offset="80%" stopColor="#0e8d6d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0e8d6d" stopOpacity="0.8" />
            </linearGradient>
            
            <path id="rpaPath1" d="M220 220 L 380 220" />
            <path id="rpaPath2" d="M540 220 L 700 220" />
          </defs>

          {/* Left: Unstructured Document */}
          <g transform="translate(60, 100)">
            <rect x="0" y="0" width="160" height="220" rx="10" fill="#faf9f7" stroke="#d5dae3" strokeWidth="2" />
            <path d="M 0 0 L 40 0 L 40 40 Z" fill="#d5dae3" opacity="0.3" />
            <rect x="20" y="60" width="120" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <rect x="20" y="80" width="90" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <rect x="20" y="100" width="110" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <rect x="20" y="130" width="80" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <rect x="20" y="150" width="100" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <text x="80" y="250" textAnchor="middle" fontSize="12" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">RAW INPUT</text>
            
            {/* Scanning Beam */}
            <g>
              <rect x="10" y="0" width="140" height="40" fill="url(#scanBeam)">
                <animate attributeName="y" values="30; 180; 30" dur="3s" repeatCount="indefinite" />
              </rect>
              <line x1="10" y1="40" x2="150" y2="40" stroke="#0e8d6d" strokeWidth="2" filter="url(#rpaGlow)">
                <animate attributeName="y1" values="70; 220; 70" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="70; 220; 70" dur="3s" repeatCount="indefinite" />
              </line>
            </g>
          </g>

          {/* Connection Lines & Data Packets */}
          <use href="#rpaPath1" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#rpaPath2" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          {/* Packets */}
          {[1, 2, 3].map(i => (
            <g key={i}>
              <circle r="4" fill="#0e8d6d" filter="url(#rpaGlow)">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.5}s`}><mpath href="#rpaPath1" /></animateMotion>
              </circle>
              <circle r="5" fill="#0e8d6d" filter="url(#rpaGlow)">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.4}s`}><mpath href="#rpaPath2" /></animateMotion>
              </circle>
            </g>
          ))}

          {/* Center: AI Bot Node */}
          <g transform="translate(380, 140)">
            <circle cx="80" cy="80" r="70" fill="#22272f" stroke="url(#rpaGrad)" strokeWidth="3" filter="url(#rpaGlow)" opacity="0.9" />
            <circle cx="80" cy="80" r="50" fill="#0e8d6d" opacity="0.1" />
            
            {/* Robot Face/Eyes */}
            <rect x="50" y="60" width="60" height="30" rx="15" fill="#111" stroke="#0e8d6d" strokeWidth="2" />
            <circle cx="65" cy="75" r="4" fill="#0e8d6d" filter="url(#rpaGlow)">
              <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.1;0.2" />
            </circle>
            <circle cx="95" cy="75" r="4" fill="#0e8d6d" filter="url(#rpaGlow)">
              <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.1;0.2" />
            </circle>
            
            <text x="80" y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" letterSpacing="0.1em" fontFamily="Inter, sans-serif">AI EXTRACTION</text>
            
            {/* Pulsing rings */}
            <circle cx="80" cy="80" r="70" fill="none" stroke="#0e8d6d" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="70;90;70" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Right: Structured Output */}
          <g transform="translate(700, 100)">
            <rect x="0" y="0" width="160" height="220" rx="10" fill="#faf9f7" stroke="#0e8d6d" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="220" rx="10" fill="#0e8d6d" opacity="0.05" />
            
            <text x="80" y="40" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0e8d6d" letterSpacing="0.1em" fontFamily="Inter, sans-serif">STRUCTURED</text>
            
            <g transform="translate(20, 60)">
              {[0, 1, 2, 3].map(i => (
                <g key={i} transform={`translate(0, ${i * 35})`}>
                  <rect x="0" y="0" width="120" height="24" rx="4" fill="white" stroke="#d5dae3" strokeWidth="1" />
                  <rect x="10" y="8" width="20" height="8" rx="2" fill="#0e8d6d" opacity="0.8" />
                  <rect x="40" y="10" width="60" height="4" rx="2" fill="#515e7b" opacity="0.4" />
                </g>
              ))}
            </g>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
