import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { User, Event } from '../types';
import { MapPin, Globe, MessageCircle, ShieldCheck, Star, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/EventCard';
import { Badge } from '../components/ui/Badge';
import { MOCK_EVENTS } from '../data/mock';

export const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<User['profile'] | null>(null);
  const [listings, setListings] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // In a real app, fetch by ID. Using mock for now.
      const user = await api.profiles.get(id || 'p1');
      setProfile(user);
      // Mock listings for this user
      setListings(MOCK_EVENTS as unknown as Event[]);
      setLoading(false);
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!profile) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Cover */}
      <div className="h-64 w-full bg-gradient-to-r from-indigo-600 to-purple-700" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar Profile Info */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="relative -mt-16 mb-6 flex justify-center">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.displayName} 
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                />
                <div className="absolute bottom-2 right-1/3 rounded-full bg-white p-1 shadow-sm">
                    <ShieldCheck className="h-6 w-6 text-teal-500" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{profile.displayName}</h1>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {profile.location}
                </p>
              </div>

              <div className="flex justify-center gap-4 mb-8 border-b border-gray-100 pb-8">
                 <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">124</div>
                    <div className="text-xs text-gray-500">Reviews</div>
                 </div>
                 <div className="text-center px-4 border-x border-gray-100">
                    <div className="text-xl font-bold text-gray-900">4.9</div>
                    <div className="text-xs text-gray-500">Rating</div>
                 </div>
                 <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">3</div>
                    <div className="text-xs text-gray-500">Years</div>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.languages.map(lang => (
                            <Badge key={lang} variant="outline">{lang}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-gray-400" /> Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.interests.map(int => (
                            <Badge key={int} variant="default">{int}</Badge>
                        ))}
                    </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" /> Contact Host
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             {/* Bio */}
             <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-600 leading-relaxed">
                    {profile.bio || "Hi there! I love showing people around my city."}
                </p>
             </div>

             {/* Listings */}
             <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Active Listings</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {listings.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
             </div>

             {/* Reviews Preview */}
             <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="h-10 w-10 rounded-full" alt="Reviewer" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Traveler {i}</h4>
                                        <p className="text-xs text-gray-500">June 2024</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400">
                                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                "Absolutely amazing experience! Highly recommended for anyone visiting the city."
                            </p>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
