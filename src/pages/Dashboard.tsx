import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_EVENTS } from '../data/mock';
import { Calendar, DollarSign, TrendingUp, Settings, Plus, Users, Star, Map } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/EventCard';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { ThreeDBarChart } from '../components/dashboard/ThreeDBarChart';
import { ThreeDDonutChart } from '../components/dashboard/ThreeDDonutChart';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { TicketModal } from '../components/booking/TicketModal';
import { BookingManagement } from '../components/booking/BookingManagement';
import { ReviewModal } from '../components/reviews/ReviewModal';
import { Badge } from '../components/ui/Badge';
import { Event } from '../types';
import { formatCurrency } from '../lib/utils';
import { ThreeDCard } from '../components/ui/ThreeDCard';

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Event | null>(null);
  const [reviewEvent, setReviewEvent] = useState<string | null>(null);

  if (!user) return null;

  const isGuide = user.role === 'guide';
  const isAdmin = user.role === 'admin';
  const userName = user.profile?.firstName || 'User';

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userName}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/settings">
                <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" /> Settings
                </Button>
            </Link>
            {isGuide && (
              <Link to="/create-listing">
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create Listing
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isAdmin ? (
            <AdminDashboard />
        ) : isGuide ? (
          <div className="space-y-8">
            {/* Guide Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ThreeDCard className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5" depth={5}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">$2,450</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3 text-green-600">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </ThreeDCard>
              
              <ThreeDCard className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5" depth={5}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Bookings</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">12</p>
                  </div>
                  <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">4 pending approval</div>
              </ThreeDCard>

              <ThreeDCard className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5" depth={5}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Guests</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">148</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">Across 5 events</div>
              </ThreeDCard>

              <ThreeDCard className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5" depth={5}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">4.9</p>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">Based on 124 reviews</div>
              </ThreeDCard>
            </div>

            {/* Booking Management Component */}
            <BookingManagement />

            {/* Guide Charts Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
               <ThreeDBarChart />
               <ThreeDDonutChart />
            </div>
            
            {/* Revenue Trends */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <h3 className="mb-6 text-lg font-bold text-gray-900">Revenue Trends (Area)</h3>
                <AnalyticsChart />
            </div>

            {/* Guide Listings */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Your Listings</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_EVENTS.slice(0, 3).map(event => (
                  <EventCard key={event.id} event={event as Event} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Tourist Dashboard */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Trips */}
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Trips</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img src={MOCK_EVENTS[0].images?.[0]} className="h-full w-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="success">Confirmed</Badge>
                        <span className="text-sm text-gray-500">In 2 days</span>
                      </div>
                      <h4 className="font-bold text-gray-900">{MOCK_EVENTS[0].title}</h4>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {MOCK_EVENTS[0].startTime?.split('T')[0]}</span>
                        <span className="flex items-center gap-1"><Map className="h-3 w-3" /> {MOCK_EVENTS[0].city}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTicket(MOCK_EVENTS[0] as Event)}>View Ticket</Button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img src={MOCK_EVENTS[2].images?.[0]} className="h-full w-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="default">Completed</Badge>
                        <span className="text-sm text-gray-500">Last week</span>
                      </div>
                      <h4 className="font-bold text-gray-900">{MOCK_EVENTS[2].title}</h4>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {MOCK_EVENTS[2].startTime?.split('T')[0]}</span>
                      </div>
                    </div>
                     <Button variant="outline" size="sm" onClick={() => setReviewEvent(MOCK_EVENTS[2].title || 'Event')}>Write Review</Button>
                  </div>
                </div>
              </div>

              {/* Saved Itineraries */}
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                 <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Saved AI Itineraries</h3>
                  <Button variant="ghost" size="sm">Create New</Button>
                </div>
                <div className="p-6 grid gap-4 sm:grid-cols-2">
                    <ThreeDCard className="rounded-lg border border-gray-200 p-4 hover:border-indigo-300 transition-colors cursor-pointer bg-white" depth={5}>
                        <div className="flex items-center justify-between mb-2">
                             <h4 className="font-bold text-gray-900">Tokyo Adventure</h4>
                             <span className="text-xs text-gray-500">5 Days</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Food, Anime, History</p>
                        <div className="flex -space-x-2 overflow-hidden">
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt=""/>
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt=""/>
                        </div>
                    </ThreeDCard>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
               <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                  <h3 className="font-bold text-gray-900 mb-4">Recommended for you</h3>
                  <div className="space-y-4">
                      {MOCK_EVENTS.slice(1,3).map(event => (
                          <div key={event.id} className="flex gap-3">
                              <img src={event.images?.[0]} className="h-16 w-16 rounded-lg object-cover" />
                              <div>
                                  <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{event.title}</h4>
                                  <p className="text-xs text-gray-500">{event.city}</p>
                                  <p className="text-xs font-semibold text-indigo-600 mt-1">{formatCurrency(event.priceCents, event.currency)}</p>
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Ticket Modal */}
        {selectedTicket && (
            <TicketModal 
                isOpen={!!selectedTicket} 
                onClose={() => setSelectedTicket(null)}
                event={selectedTicket}
                bookingId="bk_123456789"
                date={selectedTicket.startTime?.split('T')[0] || 'TBD'}
                guests={2}
            />
        )}

        {/* Review Modal */}
        <ReviewModal 
            isOpen={!!reviewEvent}
            onClose={() => setReviewEvent(null)}
            eventName={reviewEvent || ''}
        />
      </div>
    </div>
  );
};
