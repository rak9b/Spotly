import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Badge } from './ui/Badge';
import { formatCurrency } from '../lib/utils';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  // Safe access for potentially missing host data in partial mocks
  const hostName = event.host?.displayName || 'Unknown Host';
  const hostAvatar = event.host?.avatarUrl || '';
  const reviewCount = event.host?.reviewCount || 0;

  return (
    <Link to={`/event/${event.id}`} className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.images?.[0] || ''}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur-sm font-semibold shadow-sm">
            {event.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
           <Badge className="bg-indigo-600 text-white border-none">
            {event.type === 'event' ? 'Event' : 'Tour'}
           </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-gray-900">{event.rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <MapPin className="h-3 w-3" />
            {event.locationName}
          </div>
        </div>

        <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {event.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Max {event.maxGroupSize}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <img src={hostAvatar} alt={hostName} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-sm text-gray-600 truncate max-w-[100px]">{hostName}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-indigo-600">{formatCurrency(event.price, event.currency)}</span>
            <span className="text-xs text-gray-500">/person</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
