import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function NumberCounter({ value, duration = 2, className }) {
  const [count, setCount] = useState("0");
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Extract numerical value and its prefix/suffix
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setCount(value);
      return;
    }
    
    const numString = numericMatch[0];
    const endValue = parseFloat(numString);
    const prefix = value.substring(0, value.indexOf(numString));
    const suffix = value.substring(value.indexOf(numString) + numString.length);
    
    if (inView) {
      const controls = animate(0, endValue, {
        duration: duration,
        ease: "easeOut",
        onUpdate(v) {
          // Keep decimals if the original had them
          const hasDecimals = numString.includes('.');
          const formattedNum = hasDecimals ? v.toFixed(1) : Math.round(v).toString();
          setCount(`${prefix}${formattedNum}${suffix}`);
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  // If the value couldn't be parsed into a number, just display the original value
  const isNumeric = /[\d.]+/.test(value);

  return (
    <motion.span ref={nodeRef} className={className}>
      {isNumeric ? count : value}
    </motion.span>
  );
}
