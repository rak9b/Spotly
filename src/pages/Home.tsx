import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, Sparkles, Star, Search, CalendarCheck, Map as MapIcon } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';
import { EventCard } from '../components/EventCard';
import { MOCK_EVENTS } from '../data/mock';
import { motion } from 'framer-motion';
import { AIPlannerWidget } from '../components/ai/AIPlannerWidget';
import { Hero3D } from '../components/layout/Hero3D';
import { fadeInUp, staggerContainer } from '../lib/motion';
import { ThreeDCard } from '../components/ui/ThreeDCard';

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* 1. Immersive 3D Hero */}
      <Hero3D />

      {/* Mobile AI Widget (Negative Margin overlap) */}
      <section className="relative z-30 -mt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ThreeDCard className="rounded-2xl bg-white dark:bg-gray-900" depth={5}>
            <AIPlannerWidget />
          </ThreeDCard>
        </motion.div>
      </section>

      {/* 2. How It Works (New Section) */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your journey to authentic local experiences starts here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 -z-10" />

            {[
              { icon: Search, title: "1. Discover", desc: "Browse unique tours or ask our AI to plan your perfect trip." },
              { icon: CalendarCheck, title: "2. Book", desc: "Secure your spot instantly with verified local guides." },
              { icon: MapIcon, title: "3. Experience", desc: "Meet your guide and explore the city like a local." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-800 border-4 border-indigo-50 dark:border-gray-700 flex items-center justify-center mb-6 shadow-sm z-10">
                  <step.icon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Value Proposition */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Why Choose LocalGuide.ai</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We combine human expertise with AI precision for the perfect trip.</motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {[
              { icon: Globe, color: 'indigo', title: 'Authentic Local Experiences', text: 'Skip the tourist traps. Discover activities hosted by locals who know the city\'s secrets.' },
              { icon: Sparkles, color: 'teal', title: 'Smart AI Planning', text: 'Get personalized day-by-day itineraries tailored to your interests, budget, and pace instantly.' },
              { icon: ShieldCheck, color: 'rose', title: 'Verified & Safe', text: 'Book with confidence. All our guides go through a strict ID verification and background check process.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
              >
                <ThreeDCard className="h-full p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`mb-6 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 p-4 text-${item.color}-600 dark:text-${item.color}-400`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Popular Destinations */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Popular Destinations</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Explore the world's most exciting cities.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80', count: '120+ Events' },
              { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', count: '85+ Events' },
              { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80', count: '200+ Events' },
              { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', count: '150+ Events' },
            ].map((city) => (
              <Link key={city.name} to={`/explore?city=${city.name}`}>
                <ThreeDCard className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer">
                  <img src={city.image} alt={city.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 text-white transform transition-transform duration-300 group-hover:translate-x-2">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{city.count}</p>
                  </div>
                </ThreeDCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trending Events */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Trending Experiences</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Top-rated tours and events happening soon.</p>
            </div>
            <Link to="/explore" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 sm:block">
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link to="/explore">
              <MotionButton variant="outline" className="w-full">View all experiences</MotionButton>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-16">What Travelers Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Sarah J.", role: "Solo Traveler", text: "The AI itinerary was a game changer. It found a jazz bar I would never have discovered on my own!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
              { name: "Mike T.", role: "Foodie", text: "Kenji's tour in Tokyo was the highlight of my trip. He took us to places with no English menus—authentic and delicious.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
              { name: "Elena R.", role: "Digital Nomad", text: "I use this app in every city I visit to meet locals. The guides are professional and super friendly.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
            ].map((testimonial, i) => (
              <ThreeDCard key={i} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700" depth={5}>
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="relative overflow-hidden bg-indigo-600 py-24">
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Share your city with the world
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Become a guide, host events, and earn money doing what you love. Join our community of 10,000+ local experts.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/register?role=guide">
              <MotionButton size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 border-none">
                Become a Host
              </MotionButton>
            </Link>
            <Link to="/explore">
                <MotionButton size="lg" variant="outline" className="border-indigo-300 text-indigo-100 hover:bg-indigo-700 hover:text-white">
                    Explore Events
                </MotionButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
