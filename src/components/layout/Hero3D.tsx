import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MotionButton } from '../ui/MotionButton';
import { Sparkles, MapPin, Star } from 'lucide-react';
import { TRANSITION_SLOW, fadeInUp, staggerContainer } from '../../lib/motion';

export const Hero3D = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Mouse move parallax (simulated 3D)
  // In a real production app, we'd attach mouse listeners. 
  // For this demo, we'll stick to scroll parallax to keep it performant and clean.

  return (
    <div ref={ref} className="relative min-h-[85vh] w-full overflow-hidden bg-gray-900">
      {/* Background Layer (Furthest) */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-gray-900/60 to-gray-900 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Landscape"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* 3D Floating Elements (Middle Layer) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Floating Card 1 */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...TRANSITION_SLOW, delay: 0.5 }}
          className="absolute top-[15%] right-[10%] hidden lg:block"
        >
          <div className="w-64 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" className="h-10 w-10 rounded-full border-2 border-white" alt="User" />
              <div>
                <div className="text-sm font-bold text-white">Alex T.</div>
                <div className="text-xs text-white/70">Just booked Tokyo!</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />)}
            </div>
          </div>
        </motion.div>

        {/* Floating Card 2 */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...TRANSITION_SLOW, delay: 0.7 }}
          className="absolute bottom-[20%] left-[5%] hidden lg:block"
        >
           <div className="w-56 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 text-white mb-2">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span className="font-bold text-sm">Hidden Gem Found</span>
            </div>
            <div className="h-24 rounded-lg bg-gray-800/50 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=400&q=80" className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Layer (Closest) */}
      <div className="relative z-20 flex h-full flex-col justify-center px-4 pt-32 sm:px-6 lg:px-8">
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/20 shadow-lg">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              <span>AI-Powered Travel Companion</span>
            </div>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-sm">
            Discover the world <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-teal-300">
              like a local
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl leading-relaxed">
            Connect with verified guides, join exclusive events, and let our AI plan your perfect itinerary in seconds.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/explore">
              <MotionButton size="lg" className="min-w-[160px] bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-900/20">
                Start Exploring
              </MotionButton>
            </Link>
            <Link to="/register?role=guide">
              <MotionButton size="lg" variant="outline" className="min-w-[160px] border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                Become a Guide
              </MotionButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient Overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50 to-transparent z-20" />
    </div>
  );
};
