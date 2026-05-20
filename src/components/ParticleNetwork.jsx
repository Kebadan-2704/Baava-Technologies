import { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const papersRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLORS = [
      { fill: 'rgba(38, 167, 224, 0.06)', stroke: 'rgba(38, 167, 224, 0.12)' },
      { fill: 'rgba(16, 185, 129, 0.05)', stroke: 'rgba(16, 185, 129, 0.10)' },
      { fill: 'rgba(139, 92, 246, 0.05)', stroke: 'rgba(139, 92, 246, 0.10)' },
      { fill: 'rgba(245, 158, 11, 0.04)', stroke: 'rgba(245, 158, 11, 0.08)' },
      { fill: 'rgba(99, 102, 241, 0.05)', stroke: 'rgba(99, 102, 241, 0.10)' },
    ];

    const PAPER_COUNT = 18;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    class Paper {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.w = Math.random() * 30 + 18;        // width 18–48
        this.h = this.w * (Math.random() * 0.4 + 1.1); // height slightly taller
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 0.3; // slow rotation
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -(Math.random() * 0.5 + 0.15); // gentle upward float
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.cornerRadius = 3;
        // "Content lines" on the paper
        this.lineCount = Math.floor(Math.random() * 3) + 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;

        // Wrap around edges
        if (this.y + this.h < -20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width + 40) this.x = -40;
        if (this.x < -40) this.x = canvas.width + 40;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        // Paper background
        const r = this.cornerRadius;
        ctx.beginPath();
        ctx.moveTo(-this.w / 2 + r, -this.h / 2);
        ctx.lineTo(this.w / 2 - r, -this.h / 2);
        ctx.quadraticCurveTo(this.w / 2, -this.h / 2, this.w / 2, -this.h / 2 + r);
        ctx.lineTo(this.w / 2, this.h / 2 - r);
        ctx.quadraticCurveTo(this.w / 2, this.h / 2, this.w / 2 - r, this.h / 2);
        ctx.lineTo(-this.w / 2 + r, this.h / 2);
        ctx.quadraticCurveTo(-this.w / 2, this.h / 2, -this.w / 2, this.h / 2 - r);
        ctx.lineTo(-this.w / 2, -this.h / 2 + r);
        ctx.quadraticCurveTo(-this.w / 2, -this.h / 2, -this.w / 2 + r, -this.h / 2);
        ctx.closePath();

        ctx.fillStyle = this.color.fill;
        ctx.fill();
        ctx.strokeStyle = this.color.stroke;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Content lines on paper
        const lineStartY = -this.h / 2 + this.h * 0.3;
        const lineSpacing = (this.h * 0.5) / this.lineCount;
        for (let i = 0; i < this.lineCount; i++) {
          const lw = this.w * (0.5 + Math.random() * 0.3);
          ctx.beginPath();
          ctx.moveTo(-lw / 2, lineStartY + i * lineSpacing);
          ctx.lineTo(lw / 2, lineStartY + i * lineSpacing);
          ctx.strokeStyle = this.color.stroke;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    const init = () => {
      resize();
      papersRef.current = Array.from({ length: PAPER_COUNT }, () => new Paper());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      papersRef.current.forEach((p) => {
        p.update();
        p.draw();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      papersRef.current.forEach((p) => {
        if (p.x > canvas.width) p.x = canvas.width * Math.random();
        if (p.y > canvas.height) p.y = canvas.height * Math.random();
      });
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleNetwork;
