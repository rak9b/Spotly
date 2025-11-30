import React from 'react';
import { ThreeDCard } from '../ui/ThreeDCard';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  data?: number[];
  icon?: React.ElementType;
  color?: 'indigo' | 'green' | 'amber' | 'rose';
  tooltip?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  change, 
  trend, 
  data = [10, 15, 12, 20, 18, 25, 22], 
  icon: Icon,
  color = 'indigo',
  tooltip
}: KPICardProps) => {
  const chartData = data.map((val, i) => ({ value: val, i }));
  
  const colors = {
    indigo: { text: 'text-indigo-600', bg: 'bg-indigo-50', stroke: '#4f46e5', fill: '#e0e7ff' },
    green: { text: 'text-green-600', bg: 'bg-green-50', stroke: '#16a34a', fill: '#dcfce7' },
    amber: { text: 'text-amber-600', bg: 'bg-amber-50', stroke: '#d97706', fill: '#fef3c7' },
    rose: { text: 'text-rose-600', bg: 'bg-rose-50', stroke: '#e11d48', fill: '#ffe4e6' },
  };

  const theme = colors[color];

  return (
    <ThreeDCard className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10" depth={5}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            {tooltip && (
              <div className="group relative">
                <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block z-10">
                  {tooltip}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            )}
          </div>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`rounded-xl p-3 ${theme.bg} dark:bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${theme.text} dark:text-opacity-90`} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
          {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : trend === 'down' ? <ArrowDownRight className="h-4 w-4" /> : null}
          <span>{Math.abs(change)}%</span>
          <span className="text-gray-400 font-normal ml-1">vs last month</span>
        </div>
        
        <div className="h-10 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.stroke} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={theme.stroke} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={theme.stroke} 
                strokeWidth={2} 
                fill={`url(#gradient-${title})`} 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ThreeDCard>
  );
};
