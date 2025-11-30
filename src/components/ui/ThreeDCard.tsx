import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  depth?: number; // How strong the 3D effect is
  glare?: boolean; // Whether to show a glare effect
}

export const ThreeDCard = ({ 
  children, 
  className, 
  onClick,
  depth = 15,
  glare = true
}: ThreeDCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position relative to center (from -0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Calculate rotation based on mouse position
  // Moving mouse right (positive x) -> rotate Y positive (tilt right edge back)
  // Moving mouse down (positive y) -> rotate X negative (tilt bottom edge back)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [`${depth}deg`, `-${depth}deg`]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [`-${depth}deg`, `${depth}deg`]);
  
  // Glare effect opacity and position
  const glareOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.4]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Calculate position relative to center
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative transition-all duration-200 ease-out", className)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {/* Content Container with Z-index lift */}
        <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
          {children}
        </div>

        {/* Glare Overlay */}
        {glare && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden mix-blend-overlay"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${50 + x.get() * 100}% ${50 + y.get() * 100}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`,
              transform: "translateZ(1px)" // Sit slightly above content
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
