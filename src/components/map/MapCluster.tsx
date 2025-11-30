import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../../types';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapClusterProps {
  events: Event[];
}

export const MapCluster = ({ events }: MapClusterProps) => {
  const center: [number, number] = [35.6762, 139.6503];

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-inner">
      <MapContainer center={center} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {events.map((event) => {
            // Use event location or fallback
            const position: [number, number] = event.location 
                ? [event.location.lat, event.location.lng] 
                : [35.6762, 139.6503];

            return (
                <Marker key={event.id} position={position}>
                    <Popup>
                        <div className="w-48">
                            <img src={event.images[0]} className="h-24 w-full rounded-lg object-cover mb-2" alt={event.title} />
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{event.title}</h3>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-indigo-600 font-bold text-xs">
                                    {formatCurrency(event.priceCents, event.currency)}
                                </span>
                                <div className="flex items-center text-xs text-yellow-500">
                                    <Star className="h-3 w-3 fill-current" /> {event.host?.ratingAvg || 5.0}
                                </div>
                            </div>
                            <Link to={`/event/${event.id}`} className="mt-2 block w-full rounded bg-indigo-600 py-1 text-center text-xs font-bold text-white hover:bg-indigo-700">
                                View Details
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            );
        })}
      </MapContainer>
    </div>
  );
};
