import React, { useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════
   Network Particle Canvas — Engineering tech feel
   Floating connected nodes that drift and link
   ═══════════════════════════════════════ */

function NetworkCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  const initParticles = useCallback((w, h) => {
    const count = Math.min(Math.floor((w * h) / 25000), 40);
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const connectionDist = 120;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(102, 117, 148, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102, 117, 148, ${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ═══════════════════════════════════════
   Mouse Spotlight
   ═══════════════════════════════════════ */
function MouseSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(30, 120, 236, 0.03), transparent 40%)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={spotlightRef} className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300" />;
}

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <MouseSpotlight />
      
      {/* Network particle canvas */}
      <NetworkCanvas />
      
      {/* Gradient blobs — warm steel */}
      <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-gradient-to-br from-brand-200/8 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[40%] h-[50%] bg-gradient-to-tl from-steel-200/8 to-transparent rounded-full blur-[100px]" />
      <div className="absolute top-[40%] right-[20%] w-[20%] h-[25%] bg-gradient-to-bl from-accent-200/5 to-transparent rounded-full blur-[80px]" />
    </div>
  );
}
