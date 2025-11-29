import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Event } from '../types';
import { MapPin, Clock, Users, Star, ShieldCheck, MessageCircle, Share2, Heart, Calendar as CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../lib/utils';
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
            if(data.startDate) setSelectedDate(new Date(data.startDate));
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBookingState('success');
    toast.success("Booking Confirmed!", {
      description: `You're going to ${event?.title} on ${selectedDate.toLocaleDateString()}`
    });
    // Reset after 3 seconds
    setTimeout(() => setBookingState('idle'), 3000);
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;
  if (!event) return <div>Event not found</div>;

  const serviceFee = 5;
  const totalPrice = (event.price * guests) + serviceFee;

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
             <Badge className="mb-4 bg-white/20 text-white backdrop-blur-md border-none hover:bg-white/30">{event.category}</Badge>
             <h1 className="text-3xl font-bold text-white md:text-5xl max-w-3xl leading-tight drop-shadow-lg">{event.title}</h1>
             <div className="mt-4 flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{event.locationName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{event.rating}</span> 
                    <span className="text-white/60 underline decoration-white/30 underline-offset-4">({event.host.reviewCount} reviews)</span>
                </div>
             </div>
           </div>
        </motion.div>
        
        <div className="absolute top-24 right-6 flex gap-3">
             <MotionButton variant="secondary" size="sm" className="rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border-none h-10 w-10 p-0">
                <Share2 className="h-4 w-4" />
             </MotionButton>
             <MotionButton variant="secondary" size="sm" className="rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border-none h-10 w-10 p-0">
                <Heart className="h-4 w-4" />
             </MotionButton>
        </div>
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
                        <div className="text-sm font-medium text-gray-900">Duration</div>
                        <div className="text-sm text-gray-500">{event.duration}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <Users className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Group Size</div>
                        <div className="text-sm text-gray-500">Up to {event.maxGroupSize}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <MessageCircle className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Languages</div>
                        <div className="text-sm text-gray-500">{event.host.languages.join(', ')}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <CalendarIcon className="h-6 w-6 text-indigo-600 mb-2" />
                        <div className="text-sm font-medium text-gray-900">Type</div>
                        <div className="text-sm text-gray-500 capitalize">{event.type}</div>
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
                        <img src={event.host.avatarUrl} alt={event.host.displayName} className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg" />
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                            <ShieldCheck className="h-5 w-5 text-teal-500" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.host.displayName}</h3>
                        <p className="text-gray-500 mb-4 text-sm">Joined in 2023 • {event.host.reviewCount} Reviews</p>
                        <p className="text-gray-600 mb-4">
                           {event.host.bio || "Hi! I'm a local expert who loves showing travelers the hidden spots of my city."}
                        </p>
                        <MotionButton variant="outline">Contact Host</MotionButton>
                    </div>
                </div>
            </section>
            
            <hr className="border-gray-100" />
            
            {/* AI Itinerary Preview */}
             <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Itinerary Preview</h2>
                </div>
                <div className="relative border-l-2 border-indigo-100 pl-8 space-y-10 ml-4">
                    <div className="relative">
                        <div className="absolute -left-[43px] flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white text-xs font-bold">1</div>
                        <h4 className="font-bold text-gray-900 text-lg">Meeting Point</h4>
                        <p className="text-gray-600">{event.meetingPoint || event.locationName}</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[43px] flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-200 text-indigo-700 text-xs font-bold">2</div>
                        <h4 className="font-bold text-gray-900 text-lg">Experience Highlight</h4>
                        <p className="text-gray-600">Main activity and exploration.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[43px] flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-200 text-indigo-700 text-xs font-bold">3</div>
                        <h4 className="font-bold text-gray-900 text-lg">Conclusion</h4>
                        <p className="text-gray-600">Wrap up and local recommendations.</p>
                    </div>
                </div>
            </section>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <span className="text-3xl font-bold text-gray-900">{formatCurrency(event.price, event.currency)}</span>
                        <span className="text-gray-500"> / person</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{event.rating}</span>
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
                        <span className="underline decoration-gray-300 decoration-dashed underline-offset-2">{formatCurrency(event.price, event.currency)} x {guests} guest{guests > 1 ? 's' : ''}</span>
                        <span>{formatCurrency(event.price * guests, event.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="underline decoration-gray-300 decoration-dashed underline-offset-2">Service fee</span>
                        <span>{formatCurrency(serviceFee, event.currency)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-4 border-t border-gray-100 text-base">
                        <span>Total</span>
                        <span>{formatCurrency(totalPrice, event.currency)}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};
