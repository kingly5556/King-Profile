"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.15,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5 origin-left bg-linear-to-r from-accent-blue via-accent-purple to-accent-blue"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
