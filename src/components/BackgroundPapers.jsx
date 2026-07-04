import React, { memo, useMemo } from 'react';

const BackgroundPapers = memo(() => {
  // Generate subtle geometric elements for professional look
  const geometricElements = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 10 + (i % 4) * 25,
      y: 15 + Math.floor(i / 4) * 55,
      size: 80 + Math.random() * 60,
      rotation: Math.random() * 30 - 15,
      opacity: 0.02 + Math.random() * 0.02,
      delay: i * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle gradient washes — corporate feel */}
      <div className="absolute top-[-15%] left-[-8%] w-[55%] h-[70%] bg-gradient-to-br from-[#26a7e0]/10 via-[#7dd3fc]/4 to-transparent rounded-full animate-pulse-slow blur-[140px]" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[45%] h-[70%] bg-gradient-to-tl from-[#10b981]/8 via-[#34d399]/3 to-transparent rounded-full animate-pulse-slow blur-[140px]" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[40%] bg-gradient-to-bl from-[#8b5cf6]/5 to-transparent rounded-full animate-pulse-slow blur-[120px]" style={{ animationDelay: '2s' }} />
      
      {/* Professional Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
        }}
      />

      {/* Secondary finer grid — gives depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '1.25rem 1.25rem',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 65%)'
        }}
      />

      {/* Circuit board traces — horizontal flowing lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal structured lines */}
        <line x1="0" y1="25%" x2="35%" y2="25%" stroke="#26a7e0" strokeWidth="0.5" opacity="0.06" />
        <line x1="35%" y1="25%" x2="38%" y2="28%" stroke="#26a7e0" strokeWidth="0.5" opacity="0.06" />
        <line x1="38%" y1="28%" x2="65%" y2="28%" stroke="#26a7e0" strokeWidth="0.5" opacity="0.06" />
        
        <line x1="60%" y1="70%" x2="100%" y2="70%" stroke="#10b981" strokeWidth="0.5" opacity="0.05" />
        <line x1="60%" y1="70%" x2="57%" y2="73%" stroke="#10b981" strokeWidth="0.5" opacity="0.05" />
        <line x1="40%" y1="73%" x2="57%" y2="73%" stroke="#10b981" strokeWidth="0.5" opacity="0.05" />

        <line x1="0" y1="50%" x2="15%" y2="50%" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.04" />
        <line x1="80%" y1="40%" x2="100%" y2="40%" stroke="#84cc16" strokeWidth="0.5" opacity="0.04" />

        {/* Small node dots at intersections */}
        <circle cx="35%" cy="25%" r="2" fill="#26a7e0" opacity="0.08" />
        <circle cx="65%" cy="28%" r="2" fill="#26a7e0" opacity="0.06" />
        <circle cx="60%" cy="70%" r="2" fill="#10b981" opacity="0.07" />
        <circle cx="40%" cy="73%" r="2" fill="#10b981" opacity="0.05" />
        <circle cx="15%" cy="50%" r="2" fill="#8b5cf6" opacity="0.05" />
        <circle cx="80%" cy="40%" r="2" fill="#84cc16" opacity="0.05" />
      </svg>

      {/* Subtle geometric shapes — professional structured feel */}
      {geometricElements.map((el) => (
        <div
          key={`geo-${el.id}`}
          className="absolute rounded-xl border animate-pulse-slow"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: `rotate(${el.rotation}deg)`,
            borderColor: `rgba(38, 167, 224, ${el.opacity})`,
            animationDelay: `${el.delay}s`,
            animationDuration: '12s',
          }}
        />
      ))}

      {/* Small professional diamond accents */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`diamond-${i}`}
          className="absolute animate-pulse-slow"
          style={{
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
            left: `${8 + Math.random() * 84}%`,
            top: `${8 + Math.random() * 84}%`,
            transform: 'rotate(45deg)',
            background: i % 3 === 0 ? 'rgba(38, 167, 224, 0.08)' : i % 3 === 1 ? 'rgba(16, 185, 129, 0.06)' : 'rgba(139, 92, 246, 0.05)',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
          }}
        />
      ))}

      {/* Subtle corner accents for structured framing */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#26a7e0]/[0.06] rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#26a7e0]/[0.06] rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#26a7e0]/[0.06] rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#26a7e0]/[0.06] rounded-br-lg" />
    </div>
  );
});

export default BackgroundPapers;
