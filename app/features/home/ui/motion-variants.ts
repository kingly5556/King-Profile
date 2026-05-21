import type { Transition, Variants } from "framer-motion";

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.85,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 26,
  mass: 0.9,
};

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSoft,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

export const navItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};

/** First paint / legacy — prefer viewportScroll for scroll reveals */
export const viewportOnce = { once: true as const, margin: "-12% 0px -8% 0px" };

/** Scroll down: trigger when a slice of the element crosses the viewport */
export const viewportScroll = {
  once: true as const,
  amount: 0.28,
  margin: "0px 0px -10% 0px",
};

/** Reveal when scrolling back up (subtle replay) — use sparingly */
export const viewportScrollReplay = {
  once: false as const,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
};
