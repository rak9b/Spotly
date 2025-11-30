import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MorphButton } from '../ui/MorphButton';
import { Sparkles, MapPin, Star, Search } from 'lucide-react';
import { TRANSITION_SLOW, fadeInUp, staggerContainer } from '../../lib/motion';

export const Hero3D = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smooth parallax effects using springs for better physics feel
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleCard = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.8]), springConfig);

  return (
    <div ref={ref} className="relative min-h-[90vh] w-full overflow-hidden bg-gray-900 perspective-1000">
      {/* Background Layer (Furthest) */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Landscape"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* 3D Floating Elements (Middle Layer) - Simulated Depth Planes */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Floating Card 1 - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, y: 0, rotateY: -15 }}
          transition={{ ...TRANSITION_SLOW, delay: 0.5 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), scale: scaleCard }}
          className="absolute top-[15%] right-[10%] hidden lg:block preserve-3d"
        >
          <div className="w-64 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" className="h-10 w-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              <div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Alex T.</div>
                <div className="text-xs text-white/70">Just booked Tokyo!</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />)}
            </div>
            {/* Depth Element */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 -z-10 transform translate-z-[-20px] scale-95 opacity-50" />
          </div>
        </motion.div>

        {/* Floating Card 2 - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, y: 0, rotateY: 15 }}
          transition={{ ...TRANSITION_SLOW, delay: 0.7 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), scale: scaleCard }}
          className="absolute bottom-[20%] left-[5%] hidden lg:block preserve-3d"
        >
           <div className="w-56 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
            <div className="flex items-center gap-2 text-white mb-2">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span className="font-bold text-sm group-hover:text-indigo-300 transition-colors">Hidden Gem Found</span>
            </div>
            <div className="h-24 rounded-lg bg-gray-800/50 overflow-hidden relative shadow-inner">
               <img src="https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=400&q=80" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors cursor-default">
              <Sparkles className="h-4 w-4 text-indigo-300 animate-pulse" />
              <span>AI-Powered Travel Companion</span>
            </div>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-lg">
            Discover the world <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-teal-300 animate-gradient-x">
              like a local
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl leading-relaxed drop-shadow-md">
            Connect with verified guides, join exclusive events, and let our AI plan your perfect itinerary in seconds.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/explore">
              <MorphButton size="lg" className="min-w-[180px]" icon={<Search className="h-4 w-4" />}>
                Start Exploring
              </MorphButton>
            </Link>
            <Link to="/register?role=guide">
              <button className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900">
                Become a Guide
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient Overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50 to-transparent z-20 pointer-events-none" />
    </div>
  );
};
