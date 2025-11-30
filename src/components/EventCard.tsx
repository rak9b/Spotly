import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Badge } from './ui/Badge';
import { formatCurrency } from '../lib/utils';
import { ThreeDCard } from './ui/ThreeDCard';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  // Safe access for potentially missing host data
  const hostName = event.host?.fullName || 'Unknown Host';
  const hostAvatar = event.host?.avatarUrl || '';
  const reviewCount = event.host?.ratingCount || 0;
  const rating = event.host?.ratingAvg || 5.0;

  return (
    <Link to={`/event/${event.id}`} className="block h-full">
      <ThreeDCard className="h-full rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={event.images?.[0] || ''}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 backdrop-blur-sm font-semibold shadow-sm">
              {event.city}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-b-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MapPin className="h-3 w-3" />
              {event.city}
            </div>
          </div>

          <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1">
            {event.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              3 hours
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Max {event.maxParticipants}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              {hostAvatar && <img src={hostAvatar} alt={hostName} className="h-6 w-6 rounded-full object-cover" />}
              <span className="text-sm text-gray-600 truncate max-w-[100px]">{hostName}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-indigo-600">{formatCurrency(event.priceCents, event.currency)}</span>
              <span className="text-xs text-gray-500">/person</span>
            </div>
          </div>
        </div>
      </ThreeDCard>
    </Link>
  );
};
