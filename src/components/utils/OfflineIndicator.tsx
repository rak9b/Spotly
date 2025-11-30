import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSITION_MEDIUM } from '../../lib/motion';

export const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={TRANSITION_MEDIUM}
          className="bg-gray-900 text-white overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 py-2 text-xs font-medium">
            <WifiOff className="h-3 w-3" />
            <span>You are currently offline. Some features may be limited.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
