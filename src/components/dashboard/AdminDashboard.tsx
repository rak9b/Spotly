import React, { useState } from 'react';
import { Users, AlertTriangle, DollarSign, Activity, Check, X, Search, Shield, BarChart2, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnalyticsChart } from './AnalyticsChart';
import { ThreeDCard } from '../ui/ThreeDCard';
import { KPICard } from './KPICard';
import { MOCK_USER, MOCK_EVENTS } from '../../data/mock';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings'>('overview');

  return (
    <div className="space-y-8">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Users" value="12,345" change={12} trend="up" color="indigo" icon={Users} />
        <KPICard title="Platform Revenue" value="$45.2k" change={8.5} trend="up" color="green" icon={DollarSign} />
        <KPICard title="Pending KYC" value="24" change={-5} trend="down" color="amber" icon={Shield} />
        <KPICard title="Flagged Content" value="5" change={2} trend="up" color="rose" icon={AlertTriangle} tooltip="Content flagged by AI moderation requiring review." />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {['overview', 'users', 'listings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab 
              ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <ThreeDCard className="rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 h-full" depth={5}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Platform Growth</h3>
                  <p className="text-sm text-gray-500">User acquisition and revenue trends</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Users</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-green-500"></div> Revenue</span>
                </div>
              </div>
              <AnalyticsChart />
            </ThreeDCard>
          </div>

          {/* Anomaly Feed / System Health */}
          <div className="space-y-8">
             <ThreeDCard className="rounded-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 overflow-hidden" depth={5}>
                <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity className="h-5 w-5 text-rose-500" /> Anomaly Feed
                    </h3>
                    <Badge variant="warning">3 New</Badge>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[300px] overflow-y-auto">
                    {[
                        { id: 1, type: 'Fraud', msg: 'High velocity transactions detected for User #8823', time: '2m ago', severity: 'high' },
                        { id: 2, type: 'System', msg: 'API Latency spike in region us-east-1', time: '15m ago', severity: 'medium' },
                        { id: 3, type: 'Content', msg: 'Multiple reports on Listing #442', time: '1h ago', severity: 'low' },
                    ].map((item) => (
                        <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    item.severity === 'high' ? 'bg-red-100 text-red-700' : 
                                    item.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 
                                    'bg-blue-100 text-blue-700'
                                }`}>{item.type}</span>
                                <span className="text-xs text-gray-400">{item.time}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item.msg}</p>
                        </div>
                    ))}
                </div>
             </ThreeDCard>

             <ThreeDCard className="rounded-3xl bg-indigo-900 text-white p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-indigo-300" /> System Health
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-indigo-200">API Uptime</span>
                                <span className="font-bold text-green-400">99.99%</span>
                            </div>
                            <div className="h-2 bg-indigo-950 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[99.9%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-indigo-200">Database Load</span>
                                <span className="font-bold text-amber-400">45%</span>
                            </div>
                            <div className="h-2 bg-indigo-950 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[45%]" />
                            </div>
                        </div>
                    </div>
                </div>
             </ThreeDCard>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <ThreeDCard className="rounded-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 overflow-hidden" depth={5}>
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Management</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white w-64"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {[MOCK_USER, {...MOCK_USER, id: 'u2', email: 'guide@example.com', role: 'guide', profile: { ...MOCK_USER.profile, fullName: 'Kenji Sato' }}].map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={user.profile?.avatarUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.profile?.fullName}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={user.role === 'guide' ? 'success' : 'default'}>{user.role}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[10%]" />
                                        </div>
                                        <span className="text-xs text-gray-500">Low</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Ban</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ThreeDCard>
      )}
    </div>
  );
};
