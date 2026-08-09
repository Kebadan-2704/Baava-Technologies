import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function SupportFlow() {
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
            <linearGradient id="supGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e78ec" stopOpacity="0.8" />
            </linearGradient>
            <filter id="supGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <path id="supPath" d="M220 220 L 700 220" />
            <path id="timelinePath" d="M0 0 L 260 0" />
          </defs>

          {/* Left: Incoming Ticket */}
          <g transform="translate(60, 150)">
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#faf9f7" stroke="#d5dae3" strokeWidth="2" />
            
            <circle cx="80" cy="50" r="25" fill="#ef4444" opacity="0.1" />
            <path d="M 80 35 L 80 55 M 80 65 L 80 67" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            
            <rect x="20" y="90" width="120" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            <rect x="20" y="110" width="80" height="8" rx="4" fill="#d5dae3" opacity="0.6" />
            
            <text x="80" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#515e7b" letterSpacing="0.05em" fontFamily="Inter, sans-serif">CRITICAL ISSUE</text>
          </g>

          {/* Connection Line */}
          <line x1="220" y1="220" x2="700" y2="220" stroke="#d5dae3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          {/* Center: SLA Timeline & Processing */}
          <g transform="translate(330, 100)">
            {/* SLA Timer */}
            <rect x="0" y="0" width="260" height="60" rx="30" fill="#faf9f7" stroke="#8b5cf6" strokeWidth="2" />
            <rect x="0" y="0" width="260" height="60" rx="30" fill="#8b5cf6" opacity="0.05" />
            
            {/* Progress Bar inside Timer */}
            <rect x="20" y="30" width="220" height="6" rx="3" fill="#d5dae3" />
            <rect x="20" y="30" width="180" height="6" rx="3" fill="#8b5cf6" filter="url(#supGlow)">
              <animate attributeName="width" values="0; 220; 0" dur="4s" repeatCount="indefinite" />
            </rect>
            
            <text x="130" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fill="#8b5cf6" letterSpacing="0.1em" fontFamily="Inter, sans-serif">SLA TIMER: 14 MINS</text>
            
            {/* Processing Node */}
            <g transform="translate(130, 120)">
              <circle cx="0" cy="0" r="50" fill="#22272f" stroke="url(#supGrad)" strokeWidth="3" filter="url(#supGlow)" />
              <circle cx="0" cy="0" r="35" fill="#8b5cf6" opacity="0.1" />
              {/* Agent Headset Icon */}
              <path d="M-15 0 C-15 -15, 15 -15, 15 0" fill="none" stroke="white" strokeWidth="3" />
              <circle cx="-15" cy="5" r="5" fill="white" />
              <circle cx="15" cy="5" r="5" fill="white" />
              <path d="M15 10 C15 20, 5 20, 5 20" fill="none" stroke="white" strokeWidth="2" />
              
              {/* Radar pulse */}
              <circle cx="0" cy="0" r="50" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="50;70;50" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          
          {/* Moving Ticket */}
          <g>
            <rect width="24" height="24" rx="12" fill="#8b5cf6" filter="url(#supGlow)">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;0.5;0.5;1" keyTimes="0;0.3;0.7;1" calcMode="linear"><mpath href="#supPath" /></animateMotion>
            </rect>
            <path d="M 9 12 L 12 15 L 16 9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;0.5;0.5;1" keyTimes="0;0.3;0.7;1" calcMode="linear"><mpath href="#supPath" /></animateMotion>
            </path>
          </g>

          {/* Right: Resolved */}
          <g transform="translate(700, 150)">
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#faf9f7" stroke="#0e8d6d" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="140" rx="10" fill="#0e8d6d" opacity="0.05" />
            
            <circle cx="80" cy="60" r="30" fill="#0e8d6d" opacity="0.1" />
            <circle cx="80" cy="60" r="30" fill="none" stroke="#0e8d6d" strokeWidth="3" />
            <path d="M 65 60 L 75 70 L 95 50" fill="none" stroke="#0e8d6d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="4s" repeatCount="indefinite" />
            </path>
            
            <text x="80" y="120" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0e8d6d" letterSpacing="0.1em" fontFamily="Inter, sans-serif">RESOLVED</text>
          </g>

        </svg>
      </motion.div>
    </motion.div>
  );
}
