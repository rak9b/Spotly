import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Map, Grid, Mic, MicOff, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/EventCard';
import { MapCluster } from '../components/map/MapCluster';
import { MOCK_EVENTS } from '../data/mock';
import { Event } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeech';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const Explore = () => {
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported 
  } = useSpeechRecognition();

  // Update search query in real-time as user speaks
  useEffect(() => {
    if (isListening && transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript, isListening]);

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
      if (!transcript) {
        toast.info("Didn't catch that. Try again?");
      }
    } else {
      resetTranscript();
      setSearchQuery(''); // Clear previous search to show listening state
      startListening();
      toast.info("Listening...", { duration: 2000 });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    resetTranscript();
    if (isListening) stopListening();
  };

  // Filter logic
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.city.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-8 pb-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Experiences</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Found {filteredEvents.length} results {searchQuery && `for "${searchQuery}"`}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={isListening ? "Listening..." : "Search events, cities..."}
                className={`h-10 w-full rounded-lg border ${isListening ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'} pl-9 pr-20 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-72 dark:text-white dark:placeholder:text-gray-500 transition-all`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                {isSupported && (
                  <button 
                    onClick={handleVoiceSearch}
                    className={`p-1.5 rounded-full transition-all duration-300 ${isListening ? 'text-white bg-red-500 animate-pulse shadow-md' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700'}`}
                    title="Voice Search"
                  >
                    {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
            </div>

            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
              <button
                onClick={() => setView('grid')}
                className={`flex items-center gap-1 rounded px-3 py-1 text-sm font-medium transition-colors ${view === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
              >
                 <Grid className="h-3 w-3" /> Grid
              </button>
              <button
                onClick={() => setView('map')}
                className={`flex items-center gap-1 rounded px-3 py-1 text-sm font-medium transition-colors ${view === 'map' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
              >
                <Map className="h-3 w-3" /> Map
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
              <div className="space-y-2">
                {['Food & Drink', 'Art & Culture', 'Nature', 'Nightlife', 'Sports'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-800" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
              <div className="space-y-2">
                 <input type="range" min="0" max="500" className="w-full accent-indigo-600" />
                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>$0</span>
                    <span>$500+</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Language</h3>
              <div className="space-y-2">
                {['English', 'Spanish', 'French', 'Japanese'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-800" />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid / Map */}
          <div className="lg:col-span-3">
            {view === 'grid' ? (
                <>
                    <AnimatePresence mode="popLayout">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.length > 0 ? (
                          filteredEvents.map((event) => (
                            <motion.div
                              key={event.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <EventCard event={event} />
                            </motion.div>
                          ))
                        ) : (
                          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
                              <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No experiences found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filters.</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={clearSearch}
                            >
                              Clear Search
                            </Button>
                          </div>
                        )}
                      </div>
                    </AnimatePresence>
                    
                    {filteredEvents.length > 0 && (
                      <div className="mt-10 flex justify-center">
                          <Button variant="outline">Load More</Button>
                      </div>
                    )}
                </>
            ) : (
                <MapCluster events={filteredEvents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
