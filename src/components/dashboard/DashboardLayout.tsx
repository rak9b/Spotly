import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Map, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  ShieldAlert, 
  Wallet, 
  Users,
  BarChart3,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../layout/ThemeToggle';
import { Button } from '../ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const role = user?.role || 'tourist';

  const navItems = {
    tourist: [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
      { icon: Calendar, label: 'My Trips', path: '/dashboard/trips' },
      { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
      { icon: Map, label: 'Explore', path: '/explore' },
    ],
    guide: [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
      { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
      { icon: Briefcase, label: 'My Listings', path: '/dashboard/listings' },
      { icon: Wallet, label: 'Earnings', path: '/dashboard/wallet' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
      { icon: Users, label: 'Users', path: '/dashboard/users' },
      { icon: ShieldAlert, label: 'Moderation', path: '/dashboard/moderation' },
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    ],
    host: [ // Fallback for host same as guide for now
       { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
       { icon: Briefcase, label: 'Listings', path: '/dashboard/listings' },
    ]
  };

  const currentNavItems = navItems[role as keyof typeof navItems] || navItems.tourist;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Map className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline">LocalGuide.ai</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-9 w-64 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white"
              />
            </div>
            
            <ThemeToggle />
            
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

            <div className="flex items-center gap-3">
              <img 
                src={user?.profile?.avatarUrl || "https://via.placeholder.com/40"} 
                alt="Profile" 
                className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900 dark:text-white">{user?.profile?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="flex-1 space-y-1 px-4 py-6">
            {currentNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' 
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Settings className="h-5 w-5 text-gray-400" />
              Settings
            </Link>
            <button
              onClick={logout}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl lg:hidden"
              >
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <nav className="space-y-1 px-4 py-6">
                  {currentNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <item.icon className="h-5 w-5 text-gray-400" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-4 border-t border-gray-200 dark:border-gray-800" />
                  <Link
                    to="/settings"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Settings className="h-5 w-5 text-gray-400" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsSidebarOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
