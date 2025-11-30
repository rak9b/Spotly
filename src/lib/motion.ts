import { Variants } from 'framer-motion';

// --- Motion Tokens (Per Design Brief) ---

// Easing: cubic-bezier(0.2, 0.9, 0.2, 1) -> "easeOutExpo" feel
export const EASING_DEFAULT = [0.2, 0.9, 0.2, 1];

// Durations
export const DURATION_FAST = 0.12;   // 120ms - Micro-interactions (hover, tap)
export const DURATION_MEDIUM = 0.24; // 240ms - Small layout changes (dropdowns)
export const DURATION_SLOW = 0.36;   // 360ms - Large layout changes (page transitions, drawers)

// Stagger
export const STAGGER_DELAY = 0.04;   // 40ms

// Transitions
export const TRANSITION_FAST = { duration: DURATION_FAST, ease: EASING_DEFAULT };
export const TRANSITION_MEDIUM = { duration: DURATION_MEDIUM, ease: EASING_DEFAULT };
export const TRANSITION_SLOW = { duration: DURATION_SLOW, ease: EASING_DEFAULT };

// --- Reusable Variants ---

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: TRANSITION_MEDIUM 
  }
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: TRANSITION_MEDIUM 
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1
    }
  }
};

export const cardHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0, 
    boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)",
    transition: TRANSITION_FAST
  },
  hover: { 
    scale: 1.02, 
    y: -4, 
    boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: TRANSITION_FAST
  },
  tap: {
    scale: 0.98,
    y: 0,
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.05)",
    transition: TRANSITION_FAST
  }
};

export const slideInRight: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: TRANSITION_MEDIUM }
};

export const scaleIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};
