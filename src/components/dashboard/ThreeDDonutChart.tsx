import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { label: 'Events', value: 65, color: '#4f46e5', tailwindColor: 'bg-indigo-600' }, // Indigo
  { label: 'Tours', value: 35, color: '#14b8a6', tailwindColor: 'bg-teal-500' },   // Teal
];

export const ThreeDDonutChart = () => {
  // Calculate conic gradient string
  let currentAngle = 0;
  const gradientParts = data.map(item => {
    const start = currentAngle;
    const end = currentAngle + (item.value / 100) * 360;
    currentAngle = end;
    return `${item.color} ${start}deg ${end}deg`;
  });
  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

  return (
    <div className="relative h-[400px] w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900">Revenue Source</h3>
        <p className="text-sm text-gray-500">Breakdown by category</p>
      </div>

      <div className="flex h-[250px] items-center justify-center perspective-1000">
        {/* 3D Tilted Ring Container */}
        <motion.div
          initial={{ rotateX: 45, rotateZ: -30, opacity: 0 }}
          animate={{ rotateX: 40, rotateZ: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-48 w-48 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* The Donut (Top Face) */}
          <div 
            className="absolute inset-0 rounded-full shadow-2xl"
            style={{ 
              background: conicGradient,
              transform: 'translateZ(20px)',
            }}
          />
          
          {/* Inner Hole (to make it a donut) */}
          <div 
            className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-white"
            style={{ transform: 'translateZ(21px)' }}
          />

          {/* Simulated 3D Thickness (Layered shadows/elements) */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
             <div 
                key={i}
                className="absolute inset-0 rounded-full opacity-30"
                style={{ 
                    background: conicGradient,
                    transform: `translateZ(${20 - i * 2}px)`,
                    filter: 'brightness(0.7)'
                }}
             />
          ))}
          
          {/* Floating Label */}
          <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1 }}
             className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
             style={{ transform: 'translateZ(40px)' }}
          >
              <span className="text-xs font-bold text-gray-900">Total<br/>100%</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        {data.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${item.tailwindColor}`} />
            <span className="text-sm font-medium text-gray-600">{item.label} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
