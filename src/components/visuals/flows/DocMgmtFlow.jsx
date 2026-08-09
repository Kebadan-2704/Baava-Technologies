import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function DocMgmtFlow() {
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
            <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e78ec" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#515e7b" stopOpacity="0.8" />
            </linearGradient>
            <filter id="docGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            <path id="docPath" d="M 220 220 L 700 220" />
          </defs>

          {/* Left: Scattered Documents */}
          <g transform="translate(60, 110)">
            {/* Paper 1 */}
            <g transform="rotate(-15, 80, 110)">
              <rect x="20" y="20" width="120" height="160" rx="4" fill="#faf9f7" stroke="#d5dae3" strokeWidth="2" />
              <rect x="40" y="50" width="80" height="6" rx="3" fill="#d5dae3" />
            </g>
            {/* Paper 2 */}
            <g transform="rotate(10, 80, 110)">
              <rect x="20" y="20" width="120" height="160" rx="4" fill="#f5f3f0" stroke="#d5dae3" strokeWidth="2" />
              <rect x="40" y="50" width="60" height="6" rx="3" fill="#d5dae3" />
            </g>
            {/* Paper 3 (Top) */}
            <g>
              <rect x="20" y="20" width="120" height="160" rx="4" fill="#fff" stroke="#1e78ec" strokeWidth="2" />
              <rect x="40" y="50" width="70" height="6" rx="3" fill="#1e78ec" opacity="0.3" />
              <rect x="40" y="70" width="50" height="6" rx="3" fill="#1e78ec" opacity="0.3" />
            </g>
            
            <text x="80" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">UNORGANIZED</text>
          </g>

          {/* Connection Line */}
          <line x1="220" y1="220" x2="700" y2="220" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          {/* Center: Secure Vault */}
          <g transform="translate(360, 120)">
            {/* Vault Server */}
            <rect x="0" y="0" width="200" height="200" rx="20" fill="#22272f" stroke="url(#docGrad)" strokeWidth="3" filter="url(#docGlow)" opacity="0.9" />
            
            {/* Server slots */}
            <g transform="translate(40, 60)">
              <rect x="0" y="0" width="120" height="20" rx="4" fill="#1e78ec" opacity="0.1" />
              <rect x="0" y="30" width="120" height="20" rx="4" fill="#1e78ec" opacity="0.1" />
              <rect x="0" y="60" width="120" height="20" rx="4" fill="#1e78ec" opacity="0.1" />
              
              <circle cx="10" cy="10" r="3" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="40" r="3" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="70" r="3" fill="#84cc16">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </g>
            
            {/* Lock Icon */}
            <g transform="translate(90, -25)">
              <circle cx="10" cy="25" r="15" fill="#22272f" stroke="#1e78ec" strokeWidth="2" />
              <rect x="3" y="22" width="14" height="12" rx="2" fill="#1e78ec" />
              <path d="M 6 22 C 6 16, 14 16, 14 22" fill="none" stroke="#1e78ec" strokeWidth="2" />
            </g>
            
            <text x="100" y="180" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" letterSpacing="0.1em" fontFamily="Inter, sans-serif">SECURE ARCHIVE</text>
          </g>
          
          {/* Moving Document Packets */}
          <g>
            <rect width="20" height="26" rx="2" fill="#faf9f7" stroke="#1e78ec" strokeWidth="2">
              <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#docPath" /></animateMotion>
            </rect>
            <rect width="20" height="26" rx="2" fill="#faf9f7" stroke="#1e78ec" strokeWidth="2">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#docPath" /></animateMotion>
            </rect>
          </g>

          {/* Right: Digital Index */}
          <g transform="translate(700, 130)">
            <rect x="0" y="0" width="160" height="180" rx="10" fill="#faf9f7" stroke="#1e78ec" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="180" rx="10" fill="#1e78ec" opacity="0.05" />
            
            <g transform="translate(20, 20)">
              {/* Folder List */}
              {[1, 2, 3, 4].map(i => (
                <g key={i} transform={`translate(0, ${i * 30 - 30})`}>
                  <path d="M 0 5 L 20 5 L 25 10 L 120 10 L 120 25 L 0 25 Z" fill="#1e78ec" opacity={0.3 + (i*0.1)} />
                  <rect x="30" y="15" width="40" height="4" rx="2" fill="#fff" opacity="0.8" />
                </g>
              ))}
            </g>
            
            <text x="80" y="160" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e78ec" letterSpacing="0.1em" fontFamily="Inter, sans-serif">INDEXED & COMPLIANT</text>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
