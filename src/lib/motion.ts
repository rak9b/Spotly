import { Variants } from 'framer-motion';

// --- Motion Tokens ---
// Duration: 120ms (fast), 240ms (medium), 360ms (slow)
// Easing: cubic-bezier(0.2, 0.9, 0.2, 1) -> "easeOutExpo" feel

export const TRANSITION_FAST = { duration: 0.12, ease: [0.2, 0.9, 0.2, 1] };
export const TRANSITION_MEDIUM = { duration: 0.24, ease: [0.2, 0.9, 0.2, 1] };
export const TRANSITION_SLOW = { duration: 0.36, ease: [0.2, 0.9, 0.2, 1] };

export const STAGGER_DELAY = 0.04; // 40ms

// --- Reusable Variants ---

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITION_MEDIUM
  }
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: TRANSITION_MEDIUM
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY
    }
  }
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0, boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: { 
    scale: 1.02, 
    y: -4, 
    boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: TRANSITION_MEDIUM
  }
};
