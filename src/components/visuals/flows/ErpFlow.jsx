import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function ErpFlow() {
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
            <linearGradient id="erpGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e78ec" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0e8d6d" stopOpacity="0.8" />
            </linearGradient>
            <filter id="erpGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            {/* Sync Paths */}
            <path id="syncPath1" d="M180 120 C 300 120, 350 220, 460 220" />
            <path id="syncPath2" d="M180 220 L 460 220" />
            <path id="syncPath3" d="M180 320 C 300 320, 350 220, 460 220" />
            <path id="syncPathOut" d="M460 220 L 740 220" />
          </defs>

          {/* Left: Legacy Systems */}
          <g transform="translate(40, 0)">
            {/* SAP */}
            <g transform="translate(0, 90)">
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#faf9f7" stroke="#d5dae3" strokeWidth="1.5" />
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#1e78ec" opacity="0.05" />
              <text x="70" y="35" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e78ec" fontFamily="Inter, sans-serif">SAP S/4HANA</text>
            </g>
            {/* Oracle */}
            <g transform="translate(0, 190)">
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#faf9f7" stroke="#d5dae3" strokeWidth="1.5" />
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#ef4444" opacity="0.05" />
              <text x="70" y="35" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ef4444" fontFamily="Inter, sans-serif">ORACLE</text>
            </g>
            {/* Dynamics */}
            <g transform="translate(0, 290)">
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#faf9f7" stroke="#d5dae3" strokeWidth="1.5" />
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#0e8d6d" opacity="0.05" />
              <text x="70" y="35" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0e8d6d" fontFamily="Inter, sans-serif">MS DYNAMICS</text>
            </g>
          </g>

          {/* Connection Lines & Data Packets */}
          <use href="#syncPath1" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#syncPath2" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#syncPath3" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <use href="#syncPathOut" stroke="#1e78ec" strokeWidth="3" opacity="0.4" />

          {/* Packets */}
          {[1, 2, 3].map(i => (
            <g key={i}>
              <circle r="4" fill="#1e78ec" filter="url(#erpGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`}><mpath href="#syncPath1" /></animateMotion>
              </circle>
              <circle r="4" fill="#ef4444" filter="url(#erpGlow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.3}s`}><mpath href="#syncPath2" /></animateMotion>
              </circle>
              <circle r="4" fill="#0e8d6d" filter="url(#erpGlow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.5}s`}><mpath href="#syncPath3" /></animateMotion>
              </circle>
            </g>
          ))}
          
          {/* Output Packets */}
          {[1, 2, 3, 4, 5].map(i => (
            <circle key={`out-${i}`} r="5" fill="#1e78ec" filter="url(#erpGlow)">
              <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`}><mpath href="#syncPathOut" /></animateMotion>
            </circle>
          ))}

          {/* Center: Baava Tech API Bridge */}
          <g transform="translate(380, 140)">
            <rect x="0" y="0" width="160" height="160" rx="30" fill="#22272f" stroke="url(#erpGrad)" strokeWidth="3" filter="url(#erpGlow)" opacity="0.9" />
            <circle cx="80" cy="80" r="40" fill="#1e78ec" opacity="0.1" />
            <circle cx="80" cy="80" r="40" fill="none" stroke="#1e78ec" strokeWidth="2" strokeDasharray="4 4">
              <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="10s" repeatCount="indefinite" />
            </circle>
            <text x="80" y="85" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" letterSpacing="0.1em" fontFamily="Inter, sans-serif">API BRIDGE</text>
          </g>

          {/* Right: Modern Cloud Database */}
          <g transform="translate(740, 120)">
            <path d="M0 40 C 0 20, 140 20, 140 40 L 140 160 C 140 180, 0 180, 0 160 Z" fill="#faf9f7" stroke="#1e78ec" strokeWidth="2" />
            <path d="M0 40 C 0 60, 140 60, 140 40" fill="none" stroke="#1e78ec" strokeWidth="2" opacity="0.3" />
            <path d="M0 80 C 0 100, 140 100, 140 80" fill="none" stroke="#1e78ec" strokeWidth="2" opacity="0.3" />
            <path d="M0 120 C 0 140, 140 140, 140 120" fill="none" stroke="#1e78ec" strokeWidth="2" opacity="0.3" />
            <rect x="0" y="20" width="140" height="160" fill="#1e78ec" opacity="0.05" />
            <text x="70" y="105" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e78ec" fontFamily="Inter, sans-serif">CLOUD</text>
            <text x="70" y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e78ec" fontFamily="Inter, sans-serif">DATA LAKE</text>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
