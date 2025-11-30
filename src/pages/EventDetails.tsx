import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Event } from '../types';
import { MapPin, Clock, Users, Star, ShieldCheck, MessageCircle, Share2, Heart, Calendar as CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';
import { Badge } from '../components/ui/Badge';
import { formatCurrency, formatDate } from '../lib/utils';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { motion } from 'framer-motion';
import { fadeInUp } from '../lib/motion';
import { toast } from 'sonner';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const data = await api.events.get(id);
        if (data) {
            setEvent(data);
            if(data.startTime) setSelectedDate(new Date(data.startTime));
        }
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate) {
      toast.error("Please select a date for your booking.");
      return;
    }

    setBookingState('loading');
    // Simulate API call
    await api.bookings.create({
        event_id: event?.id,
        user_id: 'current_user_id',
        seats: guests
    });
    
    setBookingState('success');
    toast.success("Booking Confirmed!", {
      description: `You're going to ${event?.title} on ${selectedDate.toLocaleDateString()}`
    });
    setTimeout(() => setBookingState('idle'), 3000);
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;
  if (!event) return <div>Event not found</div>;

  const serviceFeeCents = 500; // $5.00
  const totalPriceCents = (event.priceCents * guests) + serviceFeeCents;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Image Gallery */}
      <div className="relative h-[60vh] w-full bg-gray-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={event.images[0]} 
          alt={event.title} 
          className="h-full w-full object-cover opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="absolute bottom-0 left-0 w-full p-6 md:p-10"
        >
           <div className="mx-auto max-w-7xl">
             <Badge className="mb-4 bg-white/20 text-white backdrop-blur-md border-none hover:bg-white/30">{event.status}</Badge>
             <h1 className="text-3xl font-bold text-white md:text-5xl max-w-3xl leading-tight drop-shadow-lg">{event.title}</h1>
             <div className="mt-4 flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{event.city}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{event.host?.ratingAvg || 5.0}</span> 
                    <span className="text-white/60 underline decoration-white/30 underline-offset-4">({event.host?.ratingCount || 0} reviews)</span>
                </div>
             </div>
           </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <Clock className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Date</div>
                        <div className="text-sm text-gray-500">{formatDate(event.startTime)}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <Users className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Group Size</div>
                        <div className="text-sm text-gray-500">Max {event.maxParticipants}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <MessageCircle className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Languages</div>
                        <div className="text-sm text-gray-500">{event.host?.languages?.join(', ') || 'English'}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <CalendarIcon className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Status</div>
                        <div className="text-sm text-gray-500 capitalize">{event.status}</div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this experience</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
            </section>

            <hr className="border-gray-100" />

            {/* Host Profile */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet your host</h2>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative">
                        <img src={event.host?.avatarUrl} alt={event.host?.fullName} className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg" />
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                            <ShieldCheck className="h-5 w-5 text-teal-500" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.host?.fullName}</h3>
                        <p className="text-gray-500 mb-4 text-sm">Joined in 2023 • {event.host?.ratingCount} Reviews</p>
                        <p className="text-gray-600 mb-4">
                           {event.host?.bio || "Hi! I'm a local expert who loves showing travelers the hidden spots of my city."}
                        </p>
                        <MotionButton variant="outline">Contact Host</MotionButton>
                    </div>
                </div>
            </section>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <span className="text-3xl font-bold text-gray-900">{formatCurrency(event.priceCents, event.currency)}</span>
                        <span className="text-gray-500"> / person</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{event.host?.ratingAvg}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    {/* Date Selection */}
                    <div className="relative">
                        <div 
                            className="rounded-xl border border-gray-200 p-3 cursor-pointer hover:border-indigo-500 transition-colors"
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-gray-400" />
                                {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
                            </div>
                        </div>
                        {isDatePickerOpen && (
                            <div className="absolute top-full left-0 z-50 mt-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date);
                                        setIsDatePickerOpen(false);
                                    }}
                                    disabled={{ before: new Date() }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Guest Selection */}
                    <div className="rounded-xl border border-gray-200 p-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Guests</label>
                        <select 
                            className="w-full bg-transparent font-medium text-gray-900 focus:outline-none"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <MotionButton 
                  size="lg" 
                  className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200"
                  onClick={handleBooking}
                  isLoading={bookingState === 'loading'}
                  isSuccess={bookingState === 'success'}
                  successText="Booking Confirmed!"
                >
                    Reserve Now
                </MotionButton>
                
                <p className="text-center text-xs text-gray-500">You won't be charged yet.</p>
                
                <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span className="underline decoration-gray-300 decoration-dashed underline-offset-2">{formatCurrency(event.priceCents, event.currency)} x {guests}</span>
                        <span>{formatCurrency(event.priceCents * guests, event.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="underline decoration-gray-300 decoration-dashed underline-offset-2">Service fee</span>
                        <span>{formatCurrency(serviceFeeCents, event.currency)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-4 border-t border-gray-100 text-base">
                        <span>Total</span>
                        <span>{formatCurrency(totalPriceCents, event.currency)}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};
