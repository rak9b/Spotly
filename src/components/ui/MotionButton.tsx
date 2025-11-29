import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2, Check } from 'lucide-react';
import { TRANSITION_MEDIUM } from '../../lib/motion';

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, isSuccess, successText = "Success", children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
      secondary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm',
      outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    // Determine background color based on state for smooth transition
    const getBgColor = () => {
      if (isSuccess) return 'bg-green-600 hover:bg-green-700';
      return variants[variant];
    };

    return (
      <motion.button
        ref={ref as any}
        layout
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50',
          !isSuccess && variants[variant], // Apply variant styles only if not success (success overrides)
          isSuccess && 'bg-green-600 text-white',
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props as any}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={TRANSITION_MEDIUM}
              className="absolute flex items-center justify-center"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={TRANSITION_MEDIUM}
              className="flex items-center gap-2"
            >
              <Check className="h-5 w-5" />
              <span>{successText}</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={TRANSITION_MEDIUM}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";
