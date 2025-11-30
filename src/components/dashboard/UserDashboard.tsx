import React from 'react';
import { KPICard } from './KPICard';
import { ThreeDCard } from '../ui/ThreeDCard';
import { Wallet, CreditCard, Send, Plus, ArrowDownLeft, ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { MotionButton } from '../ui/MotionButton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/utils';

const SPENDING_DATA = [
  { date: '1', amount: 120 },
  { date: '5', amount: 350 },
  { date: '10', amount: 200 },
  { date: '15', amount: 450 },
  { date: '20', amount: 380 },
  { date: '25', amount: 600 },
  { date: '30', amount: 550 },
];

const TRANSACTIONS = [
  { id: 1, title: 'Tokyo Jazz Bar', date: 'Today, 8:30 PM', amount: -85, type: 'expense', icon: MapPin },
  { id: 2, title: 'Wallet Deposit', date: 'Yesterday', amount: 500, type: 'income', icon: ArrowDownLeft },
  { id: 3, title: 'Kyoto Temple Tour', date: 'Jun 12', amount: -120, type: 'expense', icon: MapPin },
];

export const UserDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section: Balance & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Wallet Card */}
        <div className="lg:col-span-2">
          <ThreeDCard className="h-full min-h-[240px] rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl relative overflow-hidden" depth={20} glare={true}>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-indigo-100 font-medium mb-1">Total Balance</p>
                  <h2 className="text-5xl font-bold tracking-tight">$2,450.00</h2>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <MotionButton className="flex-1 bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Deposit
                </MotionButton>
                <MotionButton className="flex-1 bg-indigo-500/40 text-white hover:bg-indigo-500/50 border border-white/20 backdrop-blur-md">
                  <Send className="mr-2 h-4 w-4" /> Send
                </MotionButton>
                <MotionButton className="flex-1 bg-indigo-500/40 text-white hover:bg-indigo-500/50 border border-white/20 backdrop-blur-md">
                  <ArrowDownLeft className="mr-2 h-4 w-4" /> Withdraw
                </MotionButton>
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* AI Insights Card */}
        <div className="lg:col-span-1">
          <ThreeDCard className="h-full rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 border-l-4 border-indigo-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">AI Insights</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              You've spent <strong>15% less</strong> on dining this week compared to last month. Great job sticking to your budget!
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                💡 Tip: Book your Kyoto trip now to save ~$40.
              </div>
            </div>
            <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              Ask Finance Assistant →
            </button>
          </ThreeDCard>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Monthly Spend" value="$1,204" change={12} trend="down" color="indigo" icon={CreditCard} />
        <KPICard title="Trips Taken" value="3" change={50} trend="up" color="green" icon={MapPin} />
        <KPICard title="Points Earned" value="850" change={5} trend="up" color="amber" icon={Sparkles} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Chart */}
        <div className="lg:col-span-2">
          <ThreeDCard className="rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Spending Analysis</h3>
              <select className="text-sm border-none bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1 text-gray-600 dark:text-gray-300 focus:ring-0 cursor-pointer">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPENDING_DATA}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(val: number) => [`$${val}`, 'Amount']}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ThreeDCard>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-1">
          <ThreeDCard className="h-full rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Activity</h3>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
            </div>
            <div className="space-y-6">
              {TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} group-hover:scale-110 transition-transform`}>
                      <tx.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{tx.title}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                    {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount * 100)}
                  </span>
                </div>
              ))}
            </div>
          </ThreeDCard>
        </div>
      </div>
    </div>
  );
};
