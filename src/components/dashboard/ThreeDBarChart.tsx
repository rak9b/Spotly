import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface DataPoint {
  label: string;
  value: number;
  color: 'indigo' | 'purple' | 'pink' | 'teal' | 'blue';
}

const data: DataPoint[] = [
  { label: 'Mon', value: 450, color: 'indigo' },
  { label: 'Tue', value: 620, color: 'purple' },
  { label: 'Wed', value: 850, color: 'pink' },
  { label: 'Thu', value: 580, color: 'indigo' },
  { label: 'Fri', value: 920, color: 'teal' },
  { label: 'Sat', value: 1200, color: 'blue' },
  { label: 'Sun', value: 750, color: 'indigo' },
];

// Static map to ensure Tailwind detects these classes
const colorMap = {
  indigo: {
    front: 'from-indigo-400 to-indigo-600',
    side: 'bg-indigo-800',
    top: 'bg-indigo-300'
  },
  purple: {
    front: 'from-purple-400 to-purple-600',
    side: 'bg-purple-800',
    top: 'bg-purple-300'
  },
  pink: {
    front: 'from-pink-400 to-pink-600',
    side: 'bg-pink-800',
    top: 'bg-pink-300'
  },
  teal: {
    front: 'from-teal-400 to-teal-600',
    side: 'bg-teal-800',
    top: 'bg-teal-300'
  },
  blue: {
    front: 'from-blue-400 to-blue-600',
    side: 'bg-blue-800',
    top: 'bg-blue-300'
  }
};

export const ThreeDBarChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="relative h-[400px] w-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl overflow-hidden perspective-1000">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Weekly Revenue</h3>
          <p className="text-sm text-gray-400">Real-time earnings overview</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-indigo-500" /> Events
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-teal-500" /> Tours
          </div>
        </div>
      </div>

      {/* 3D Chart Container */}
      <div className="flex h-[250px] items-end justify-between gap-4 px-4 perspective-1000">
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          const colors = colorMap[item.color];

          return (
            <div
              key={index}
              className="group relative flex h-full w-full flex-col justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-xl"
                  >
                    {formatCurrency(item.value)}
                    <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Bar Construction */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
                className="relative w-full preserve-3d"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(20deg)' }}
              >
                {/* Front Face */}
                <div 
                  className={cn(
                    "absolute inset-0 z-10 rounded-sm bg-gradient-to-b opacity-90 transition-all duration-300 group-hover:brightness-110",
                    colors.front
                  )}
                />
                
                {/* Side Face (Depth) */}
                <div 
                  className={cn(
                    "absolute inset-0 z-0 w-[20px] origin-left -translate-x-full rotate-y-90 opacity-60",
                    colors.side
                  )}
                  style={{ height: '100%', transform: 'rotateY(-90deg) translateZ(0px) translateX(-100%)', width: '15px' }}
                />

                {/* Top Face */}
                <div 
                  className={cn(
                    "absolute top-0 h-[15px] w-full origin-bottom -translate-y-full rotate-x-90 opacity-100",
                    colors.top
                  )}
                  style={{ transform: 'rotateX(90deg) translateZ(0px) translateY(100%)' }}
                />
              </motion.div>

              {/* Label */}
              <div className="mt-4 text-center text-xs font-medium text-gray-400 transition-colors group-hover:text-white">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Lines (Background) */}
      <div className="absolute inset-0 -z-10 flex flex-col justify-between p-8 pt-24 pb-12 opacity-10 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-px w-full bg-white" />
        ))}
      </div>
    </div>
  );
};
