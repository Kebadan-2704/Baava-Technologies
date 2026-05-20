import React, { memo, useMemo } from 'react';

const DOC_COLORS = [
  '#26a7e0', '#10b981', '#8b5cf6', '#f59e0b', 
  '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
];

const BackgroundPapers = memo(() => {
  const bgPapers = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 25,
      scale: 0.8 + Math.random() * 1.5,
      rotationStart: Math.random() * 360,
      rotationEnd: Math.random() * 360 + (Math.random() > 0.5 ? 180 : -180),
      opacity: 0.15 + Math.random() * 0.25,
      color: DOC_COLORS[Math.floor(Math.random() * DOC_COLORS.length)],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Animated Gradient Mesh */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[100%] bg-gradient-to-br from-[#26a7e0]/20 via-[#7dd3fc]/5 to-transparent rounded-full animate-pulse-slow blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-gradient-to-tl from-[#10b981]/15 via-[#34d399]/5 to-transparent rounded-full animate-pulse-slow blur-[120px]" style={{ animationDelay: '3s' }} />
      
      {/* Architectural Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }}
      />

      {/* Floating Data Nodes */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-[#26a7e0] to-[#10b981] animate-float-node"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 15 + 15}s`,
            boxShadow: '0 0 10px rgba(38,167,224,0.5)'
          }}
        />
      ))}

      {/* The Floating Papers (CSS Accelerated) */}
      {bgPapers.map((p) => (
        <div
          key={`paper-${p.id}`}
          className="absolute bottom-[-20%] bg-white rounded-xl shadow-sm border border-slate-200/50 overflow-hidden animate-float-paper opacity-0"
          style={{
            width: 70 * p.scale,
            height: 90 * p.scale,
            left: `${p.x}%`,
            background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${p.color}15 100%)`,
            '--start-rot': `${p.rotationStart}deg`,
            '--end-rot': `${p.rotationEnd}deg`,
            '--max-opacity': p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          }}
        >
          {/* Colored accent bar on the paper */}
          <div className="absolute top-0 left-0 bottom-0 w-[4px]" style={{ background: p.color }} />
          
          {/* Subtle paper lines representing text */}
          <div className="w-full h-full pl-[15%] pr-[10%] py-[15%] flex flex-col gap-[12%] opacity-30">
            <div className="w-[85%] h-[5%] rounded-full bg-slate-300" />
            <div className="w-[65%] h-[5%] rounded-full bg-slate-300" />
            <div className="w-[90%] h-[5%] rounded-full bg-slate-300" />
            <div className="w-[50%] h-[5%] rounded-full bg-slate-300" />
            <div className="w-[75%] h-[5%] rounded-full bg-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
});

export default BackgroundPapers;
