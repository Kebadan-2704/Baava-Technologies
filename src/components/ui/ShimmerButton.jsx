import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ShimmerButton({ href, children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      data-magnetic
      href={href}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-brand-950 text-white text-sm font-semibold rounded-full shadow-[0_0_20px_rgba(21,44,84,0.3)] hover:shadow-[0_0_25px_rgba(56,152,247,0.4)] transition-all overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              75px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 152, 247, 0.4),
              transparent 80%
            )
          `,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}
