import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200/80 shimmer",
        variant === 'circular' && "rounded-full",
        variant === 'text' && "rounded-md h-4",
        variant === 'rectangular' && "rounded-lg",
        className
      )}
      {...props}
    />
  );
};
