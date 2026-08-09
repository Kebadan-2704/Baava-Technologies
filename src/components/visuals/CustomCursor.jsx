import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverRect, setHoverRect] = useState(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device, we don't want cursor on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      if (!isHovering) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-magnetic]');
      if (target) {
        const rect = target.getBoundingClientRect();
        setIsHovering(true);
        setHoverRect(rect);
        // Snap to center of the target
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      } else {
        setIsHovering(false);
        setHoverRect(null);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide native cursor when hovering magnetic elements
    document.body.style.cursor = isHovering ? 'none' : 'auto';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isHovering, cursorX, cursorY]);

  // If we are hovering a magnetic element, the cursor expands to encompass it
  const size = isHovering && hoverRect 
    ? { width: hoverRect.width + 12, height: hoverRect.height + 12 } 
    : { width: 16, height: 16 };
    
  const borderRadius = 999;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size.width,
        height: size.height,
        borderRadius,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: isHovering ? 0.2 : 1,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    />
  );
}
