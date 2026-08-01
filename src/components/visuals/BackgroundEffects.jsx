import React, { useEffect, useRef } from 'react';

export function FloatingDot({ x, y, size, color, delay }) {
  return (
    <div
      className="absolute rounded-full animate-drift pointer-events-none"
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: `${10 + Math.random() * 8}s`,
        filter: 'blur(0.5px)',
      }}
    />
  );
}

export default function BackgroundEffects() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        // High-performance direct DOM manipulation to avoid React state re-renders
        spotlightRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(56, 152, 247, 0.06), transparent 40%)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Mouse Tracking Spotlight */}
      <div ref={spotlightRef} className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
        backgroundSize: '5rem 5rem',
        maskImage: 'radial-gradient(ellipse at 55% 45%, black 25%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 55% 45%, black 25%, transparent 70%)',
      }} />
      
      {/* Gradient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-gradient-to-br from-brand-200/12 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[45%] bg-gradient-to-tl from-accent-200/10 to-transparent rounded-full blur-[100px]" />
      
      {/* Floating dots */}
      {[
        { x: 8, y: 15, size: 5, color: 'rgba(56,152,247,0.25)', delay: 0 },
        { x: 92, y: 25, size: 4, color: 'rgba(26,174,134,0.2)', delay: 2 },
        { x: 15, y: 75, size: 6, color: 'rgba(139,92,246,0.15)', delay: 4 },
        { x: 88, y: 70, size: 4, color: 'rgba(56,152,247,0.15)', delay: 1 },
        { x: 50, y: 10, size: 3, color: 'rgba(132,204,22,0.2)', delay: 3 },
      ].map((p, i) => <FloatingDot key={i} {...p} />)}
    </div>
  );
}
