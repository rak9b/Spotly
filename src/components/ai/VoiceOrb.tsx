import React from 'react';
import { motion } from 'framer-motion';

interface VoiceOrbProps {
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export const VoiceOrb = ({ state }: VoiceOrbProps) => {
  // Define colors and animations based on state
  const variants = {
    idle: {
      scale: [1, 1.1, 1],
      opacity: 0.5,
      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // Indigo to Purple
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    listening: {
      scale: [1, 1.2, 1],
      opacity: 0.8,
      background: "linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)", // Red/Rose (Recording)
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    processing: {
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
      opacity: 0.9,
      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", // Amber (Thinking)
      borderRadius: ["50%", "40%", "50%"],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    speaking: {
      scale: [1, 1.5, 1],
      opacity: 1,
      background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)", // Blue to Cyan
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  // Outer glow rings
  const ringVariants = {
    idle: { scale: 1.2, opacity: 0 },
    listening: { scale: [1, 2], opacity: [0.5, 0], transition: { duration: 2, repeat: Infinity } },
    processing: { scale: 1.1, opacity: 0.2 },
    speaking: { scale: [1, 2.5], opacity: [0.6, 0], transition: { duration: 1.2, repeat: Infinity } }
  };

  return (
    <div className="relative flex items-center justify-center h-40 w-40">
      {/* Outer Ripples */}
      <motion.div
        variants={ringVariants}
        animate={state}
        className="absolute inset-0 rounded-full bg-current opacity-20"
        style={{ color: state === 'listening' ? '#ef4444' : state === 'speaking' ? '#3b82f6' : '#6366f1' }}
      />
      <motion.div
        variants={ringVariants}
        animate={state}
        transition={{ delay: 0.4, ...ringVariants[state as keyof typeof ringVariants].transition }}
        className="absolute inset-0 rounded-full bg-current opacity-20"
        style={{ color: state === 'listening' ? '#ef4444' : state === 'speaking' ? '#3b82f6' : '#6366f1' }}
      />

      {/* Core Orb */}
      <motion.div
        variants={variants}
        animate={state}
        className="relative h-24 w-24 rounded-full shadow-2xl blur-sm"
      />
      
      {/* Inner Highlight */}
      <div className="absolute h-20 w-20 rounded-full bg-white/20 blur-md" />
    </div>
  );
};
