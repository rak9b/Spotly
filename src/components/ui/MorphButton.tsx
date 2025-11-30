import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2, Check, ArrowRight } from 'lucide-react';
import { TRANSITION_MEDIUM } from '../../lib/motion';

interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  defaultText?: string;
  icon?: React.ReactNode;
}

export const MorphButton = ({ 
  className, 
  isLoading, 
  isSuccess, 
  successText = "Confirmed", 
  defaultText = "Submit",
  icon,
  children,
  ...props 
}: MorphButtonProps) => {
  return (
    <motion.button
      layout
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        "h-12 px-6 text-base shadow-lg shadow-indigo-500/20",
        isSuccess ? "bg-green-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700",
        className
      )}
      disabled={isLoading || isSuccess || props.disabled}
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
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={TRANSITION_MEDIUM}
            className="flex items-center gap-2"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <Check className="h-5 w-5 stroke-[3]" />
            </motion.div>
            <span>{successText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={TRANSITION_MEDIUM}
            className="flex items-center gap-2"
          >
            {children || defaultText}
            {icon || <ArrowRight className="h-4 w-4 opacity-80" />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
