import React, { useState } from 'react';
import { Search, SlidersHorizontal, Map, Grid } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/EventCard';
import { MapCluster } from '../components/map/MapCluster';
import { MOCK_EVENTS } from '../data/mock';
import { Event } from '../types';

export const Explore = () => {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explore Experiences</h1>
            <p className="text-sm text-gray-500">Found {MOCK_EVENTS.length} results near you</p>
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-64"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setView('grid')}
                className={`flex items-center gap-1 rounded px-3 py-1 text-sm font-medium transition-colors ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                 <Grid className="h-3 w-3" /> Grid
              </button>
              <button
                onClick={() => setView('map')}
                className={`flex items-center gap-1 rounded px-3 py-1 text-sm font-medium transition-colors ${view === 'map' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
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
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {['Food & Drink', 'Art & Culture', 'Nature', 'Nightlife', 'Sports'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                 <input type="range" min="0" max="500" className="w-full accent-indigo-600" />
                 <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$500+</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Language</h3>
              <div className="space-y-2">
                {['English', 'Spanish', 'French', 'Japanese'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {MOCK_EVENTS.map((event) => (
                        <EventCard key={event.id} event={event as Event} />
                    ))}
                    {MOCK_EVENTS.map((event) => (
                        <EventCard key={`${event.id}-duplicate`} event={{...event, id: `${event.id}-duplicate`} as Event} />
                    ))}
                    </div>
                    
                    <div className="mt-10 flex justify-center">
                        <Button variant="outline">Load More</Button>
                    </div>
                </>
            ) : (
                <MapCluster events={MOCK_EVENTS as Event[]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
