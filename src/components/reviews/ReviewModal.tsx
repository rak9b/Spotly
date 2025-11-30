import React, { useState } from 'react';
import { Star, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { ThreeDCard } from '../ui/ThreeDCard';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export const ReviewModal = ({ isOpen, onClose, eventName }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Review submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <ThreeDCard className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" depth={15}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Review Experience</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500 mb-2">How was your experience at</p>
            <h4 className="font-bold text-gray-900 text-lg mb-4">{eventName}</h4>
            
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star 
                    className={`h-8 w-8 ${star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Tell us what you liked..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                <ImageIcon className="h-4 w-4" />
                <span>Add photos</span>
            </div>

            <Button type="submit" className="w-full" disabled={rating === 0}>
              Submit Review
            </Button>
          </div>
        </form>
      </ThreeDCard>
    </div>
  );
};
