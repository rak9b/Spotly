import React from 'react';
import { KPICard } from './KPICard';
import { ThreeDCard } from '../ui/ThreeDCard';
import { DollarSign, Users, TrendingUp, Check, X, MapPin, QrCode } from 'lucide-react';
import { MotionButton } from '../ui/MotionButton';
import { formatCurrency } from '../../lib/utils';

const REQUESTS = [
  { id: 1, user: 'Alice M.', type: 'Cash Out', amount: 5000, distance: '0.5km', time: '2m ago' },
  { id: 2, user: 'John D.', type: 'Cash In', amount: 2000, distance: '1.2km', time: '5m ago' },
  { id: 3, user: 'Sarah W.', type: 'Cash Out', amount: 10000, distance: '0.8km', time: '12m ago' },
];

export const AgentDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Daily Volume" value="$12,450" change={8.5} trend="up" color="indigo" icon={TrendingUp} />
        <KPICard title="Commission" value="$450.20" change={12} trend="up" color="green" icon={DollarSign} />
        <KPICard title="Active Users" value="142" change={-2} trend="down" color="amber" icon={Users} />
        <KPICard title="Pending Requests" value="3" change={0} trend="neutral" color="rose" icon={QrCode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Requests Queue */}
        <div className="lg:col-span-2">
          <ThreeDCard className="rounded-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live Requests</h3>
                <p className="text-sm text-gray-500">Real-time cash-in/out requests nearby</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {REQUESTS.map((req) => (
                <div key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${req.type === 'Cash In' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{req.type}</h4>
                      <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                        <span className="font-medium text-gray-900 dark:text-gray-300">{req.user}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.distance}</span>
                        <span>•</span>
                        <span>{req.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right mr-4">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(req.amount)}</p>
                      <p className="text-xs text-gray-500">Commission: {formatCurrency(req.amount * 0.02)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                      <MotionButton className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6">
                        <Check className="h-5 w-5 mr-2" /> Accept
                      </MotionButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ThreeDCard>
        </div>

        {/* Map / Location Status */}
        <div className="lg:col-span-1">
          <ThreeDCard className="h-full rounded-3xl bg-gray-900 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
               {/* Placeholder for map background */}
               <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
                 <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
               </svg>
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-bold text-lg">Agent Status</h3>
                  <p className="text-gray-400 text-sm">You are visible to users</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              </div>

              <div className="mt-auto space-y-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Location</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-400" />
                    Downtown, Sector 4
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Cash Balance</p>
                  <p className="font-bold text-xl">$15,000.00</p>
                </div>
                <MotionButton className="w-full bg-white text-gray-900 hover:bg-gray-100 border-none">
                  Go Offline
                </MotionButton>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </div>
    </div>
  );
};
