import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Menu, X, MapPin, User as UserIcon, LogOut, Compass, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Safe access for profile data
  const userName = user?.profile?.firstName || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.profile?.avatarUrl;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">LocalGuide<span className="text-indigo-600 dark:text-indigo-400">.ai</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link to="/explore" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              Explore
            </Link>
            
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center gap-3">
                  <Link to="/settings" className="flex items-center gap-2 group">
                    <span className="text-sm text-gray-700 group-hover:text-indigo-600 dark:text-gray-200 dark:group-hover:text-indigo-400 transition-colors">Hi, {userName}</span>
                    {userAvatar ? (
                      <img src={userAvatar} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 group-hover:ring-2 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                          {userName[0]}
                      </div>
                    )}
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login?role=guide" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                  Become a Guide
                </Link>
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Link
                to="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
              >
                <Compass className="h-5 w-5" /> Explore
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
                  >
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
                  >
                    <Settings className="h-5 w-5" /> Settings
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      {userAvatar && <img src={userAvatar} alt="Profile" className="h-8 w-8 rounded-full object-cover" />}
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{userName}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-5 w-5" /> Log out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login?role=guide"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
                  >
                    Become a Guide
                  </Link>
                  <div className="mt-4 flex flex-col gap-2 px-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">Log in</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center">Sign up</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
