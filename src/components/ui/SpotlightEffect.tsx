import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const SpotlightEffect = () => {
  const { theme } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring animation for the light movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // Different light colors for dark/light mode
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const lightColor = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)';

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      ${lightColor},
      transparent 80%
    )
  `;

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ background }}
    />
  );
};
