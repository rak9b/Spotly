import React from 'react';
import { Check, X, Clock, Calendar, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from 'sonner';
import { ThreeDCard } from '../ui/ThreeDCard';

// Mock bookings data for the guide dashboard
const MOCK_BOOKINGS = [
  { id: 1, event: 'Hidden Jazz Bars', guest: 'Sarah J.', date: '2024-07-15', guests: 2, status: 'pending', price: 170 },
  { id: 2, event: 'Tokyo Food Tour', guest: 'Mike T.', date: '2024-07-18', guests: 4, status: 'confirmed', price: 200 },
  { id: 3, event: 'Hidden Jazz Bars', guest: 'Elena R.', date: '2024-07-20', guests: 1, status: 'pending', price: 85 },
];

export const BookingManagement = () => {
  const handleAction = (id: number, action: 'accept' | 'reject') => {
    toast.success(`Booking ${action}ed successfully!`);
    // In a real app, this would update state/API
  };

  return (
    <ThreeDCard className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5" depth={5}>
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Booking Requests</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{booking.event}</h4>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {booking.guest} ({booking.guests} ppl)</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {booking.date}</span>
                </div>
                <div className="mt-2">
                    <span className="font-bold text-indigo-600">${booking.price}</span>
                    {booking.status === 'confirmed' && <Badge variant="success" className="ml-2">Confirmed</Badge>}
                </div>
              </div>
            </div>
            
            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    onClick={() => handleAction(booking.id, 'reject')}
                >
                  <X className="h-4 w-4 mr-1" /> Decline
                </Button>
                <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAction(booking.id, 'accept')}
                >
                  <Check className="h-4 w-4 mr-1" /> Accept
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ThreeDCard>
  );
};
