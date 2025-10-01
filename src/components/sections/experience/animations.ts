import type { Variants } from 'framer-motion';

export const PULSING_ANIMATION = {
  animate: {
    scale: [1, 1.2, 1],
    boxShadow: [
      "0 0 0 0 rgba(125, 211, 252, 0.4)",
      "0 0 0 4px rgba(125, 211, 252, 0)",
      "0 0 0 0 rgba(125, 211, 252, 0)"
    ]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut" as const
  }
};

export const DOT_PULSING_ANIMATION = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(125, 211, 252, 0.7)",
      "0 0 0 10px rgba(125, 211, 252, 0)",
      "0 0 0 0 rgba(125, 211, 252, 0)"
    ]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut" as const
  }
};

export const ROTATING_ANIMATION = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.1, 1]
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "linear" as const
  }
};

export const GLOW_ANIMATION = {
  animate: {
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.1, 1]
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

export const CARD_HOVER_ANIMATION = {
  whileHover: {
    y: -12,
    scale: 1.03,
    boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
  },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
};

export const ACHIEVEMENT_HOVER_ANIMATION = {
  whileHover: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
  },
  whileTap: {
    y: -2,
    scale: 0.98,
    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.2)"
  }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 }
};

