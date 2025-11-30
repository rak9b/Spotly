import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  depth?: number;
  glare?: boolean;
  enableTilt?: boolean;
  spotlight?: boolean;
  spotlightColor?: string;
}

export const ThreeDCard = ({ 
  children, 
  className, 
  onClick,
  // Default tilt to false as per request "system does NOT move away"
  enableTilt = false,
  spotlight = true,
  spotlightColor = "rgba(255, 255, 255, 0.1)"
}: ThreeDCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { current: el } = ref;
    if (!el) return;
    
    const { left, top } = el.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "group relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Spotlight Effect */}
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                ${spotlightColor},
                transparent 80%
              )
            `,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
};
