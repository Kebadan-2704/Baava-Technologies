import React from 'react';
import { motion } from 'framer-motion';

const CUBES = [
  { id: 'erp', x: 60, y: 60, z: 20, size: 85, color: '#0ea5e9', delay: 0, label: 'ERP' },
  { id: 'rpa', x: 190, y: 130, z: 40, size: 100, color: '#3b82f6', delay: 0.5, label: 'RPA' },
  { id: 'data', x: -30, y: 180, z: 60, size: 75, color: '#06b6d4', delay: 1, label: 'DATA' },
  { id: 'support', x: 90, y: 260, z: 30, size: 90, color: '#2563eb', delay: 0.2, label: 'SUP' },
  { id: 'supply', x: 230, y: -10, z: 50, size: 70, color: '#0284c7', delay: 0.8, label: 'SCM' },
  { id: 'docs', x: -50, y: 50, z: 10, size: 65, color: '#0369a1', delay: 1.2, label: 'DOC' },
  { id: 'bom', x: 270, y: 240, z: 70, size: 85, color: '#0284c7', delay: 0.6, label: 'BOM' },
];

const Cube = ({ x, y, z, size, color, delay, label, activeService, id }) => {
  const isActive = activeService === id || !activeService;
  
  return (
    <motion.div
      initial={{ z: z - 150, opacity: 0 }}
      animate={{ 
        z: isActive ? [z, z + 20, z] : z - 10, 
        opacity: isActive ? 1 : 0.2 
      }}
      transition={{ 
        duration: 4, 
        repeat: isActive ? Infinity : 0, 
        ease: "easeInOut", 
        delay: delay 
      }}
      className="absolute"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top Face */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{
          background: isActive ? `linear-gradient(135deg, #38bdf8 0%, ${color} 100%)` : '#1e293b',
          transform: `translateZ(${size}px)`,
          border: `1px solid ${isActive ? '#bae6fd' : '#334155'}`,
          boxShadow: isActive ? `inset 0 0 30px rgba(255,255,255,0.4)` : 'none'
        }}
      >
        <span 
          className="text-white font-black tracking-widest transition-opacity duration-700" 
          style={{ 
            transform: 'rotateZ(45deg) rotateX(-60deg)',
            fontSize: size * 0.25,
            opacity: isActive ? 0.9 : 0.2
          }}
        >
          {label}
        </span>
      </div>
      
      {/* Front Face (Bottom in 2D space before rotation) */}
      <div 
        className="absolute top-full left-0 w-full transition-all duration-700"
        style={{
          height: size,
          background: isActive ? `linear-gradient(to bottom, ${color} 0%, #0f172a 100%)` : '#0f172a',
          transform: `rotateX(-90deg)`,
          transformOrigin: "top",
          borderLeft: `1px solid ${isActive ? '#38bdf850' : '#1e293b'}`,
          borderRight: `1px solid ${isActive ? '#38bdf850' : '#1e293b'}`,
        }}
      />
      
      {/* Right Face (Right in 2D space before rotation) */}
      <div 
        className="absolute top-0 left-full h-full transition-all duration-700"
        style={{
          width: size,
          background: isActive ? `linear-gradient(to right, ${color} 0%, #020617 100%)` : '#020617',
          transform: `rotateY(90deg)`,
          transformOrigin: "left",
          borderTop: `1px solid ${isActive ? '#38bdf850' : '#1e293b'}`,
          borderBottom: `1px solid ${isActive ? '#38bdf850' : '#1e293b'}`,
        }}
      />
    </motion.div>
  );
};

export default function IsometricHub({ activeService }) {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center relative overflow-hidden bg-[#030712]">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-sky-500/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Isometric Container */}
      <motion.div 
        initial={{ rotateX: 60, rotateZ: -45, scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {CUBES.map((cube) => (
          <Cube key={cube.id} {...cube} activeService={activeService} />
        ))}
      </motion.div>
      
      {/* Decorative Text */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <p className="text-sky-400 font-bold text-[10px] tracking-[0.2em] uppercase mb-1 opacity-80">
          Core Infrastructure
        </p>
        <p className="text-white font-display text-xl tracking-tight font-black">
          Enterprise Stack
        </p>
      </div>
    </div>
  );
}
