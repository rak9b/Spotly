import React from 'react';
import { Users, AlertTriangle, DollarSign, Activity, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnalyticsChart } from './AnalyticsChart';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">12,345</p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Platform Revenue</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">$45.2k</p>
                    </div>
                    <div className="rounded-full bg-green-100 p-3 text-green-600">
                        <DollarSign className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pending KYC</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">24</p>
                    </div>
                    <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                        <Activity className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Flagged Content</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">5</p>
                    </div>
                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Platform Growth Chart */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <h3 className="mb-6 text-lg font-bold text-gray-900">Platform Growth</h3>
                <AnalyticsChart />
            </div>

            {/* Moderation Queue */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">Moderation Queue</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { id: 1, type: 'Review', content: 'This tour was terrible and the guide was rude...', flag: 'Harassment', user: 'user_123' },
                        { id: 2, type: 'Listing', content: 'Cheap Rolex watches tour...', flag: 'Spam', user: 'host_99' },
                        { id: 3, type: 'Profile', content: 'Inappropriate avatar image detected.', flag: 'NSFW', user: 'guide_55' },
                    ].map((item) => (
                        <div key={item.id} className="p-6 flex items-start justify-between hover:bg-gray-50">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="warning">{item.type}</Badge>
                                    <span className="text-xs font-bold text-red-600">{item.flag}</span>
                                </div>
                                <p className="text-sm text-gray-900 font-medium mb-1">{item.content}</p>
                                <p className="text-xs text-gray-500">Reported by System • User: {item.user}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};
