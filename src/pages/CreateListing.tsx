import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { MapPin, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { ThreeDCard } from '../components/ui/ThreeDCard';

export const CreateListing = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Check for ID to enable Edit Mode
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    priceDollars: '', // Input as dollars, convert to cents on submit
    currency: 'USD',
    startTime: '',
    maxParticipants: '',
    images: [] as string[],
    itinerary: [{ title: '', description: '', time: '' }]
  });

  // Fetch existing data if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchListing = async () => {
        try {
          const event = await api.events.get(id);
          if (event) {
            setFormData({
              title: event.title,
              description: event.description || '',
              city: event.city || '',
              priceDollars: (event.priceCents / 100).toFixed(2),
              currency: event.currency,
              startTime: event.startTime || '',
              maxParticipants: event.maxParticipants?.toString() || '',
              images: event.images || [],
              itinerary: event.itinerary || []
            });
          }
        } catch (error) {
          toast.error("Failed to load listing details.");
          navigate('/dashboard');
        }
      };
      fetchListing();
    }
  }, [isEditMode, id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Convert price to cents for API
      const priceCents = Math.round(parseFloat(formData.priceDollars) * 100);
      
      // Mock API call - in real app, distinguish between create (POST) and update (PATCH)
      await api.events.create({
        ...formData,
        price_cents: priceCents,
        max_participants: Number(formData.maxParticipants),
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'] // Mock image
      });
      
      toast.success(isEditMode ? 'Listing updated successfully!' : 'Listing created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update listing' : 'Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Listing' : 'Create a New Listing'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEditMode ? 'Update your experience details.' : 'Share your expertise with the world.'}
          </p>
        </div>

        {/* Disable tilt on forms */}
        <ThreeDCard className="rounded-xl bg-white dark:bg-gray-900 p-8 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10" depth={5} enableTilt={false}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Listing Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="e.g., Hidden Jazz Bars of Tokyo" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description"
                    name="description"
                    rows={4}
                    className="flex w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white dark:placeholder:text-gray-500"
                    placeholder="Describe the experience..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="city" 
                      name="city" 
                      className="pl-9"
                      placeholder="e.g., Tokyo"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceDollars">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input 
                        id="priceDollars" 
                        name="priceDollars" 
                        type="number" 
                        className="pl-9"
                        placeholder="50.00"
                        value={formData.priceDollars}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Group Size</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input 
                        id="maxParticipants" 
                        name="maxParticipants" 
                        type="number" 
                        className="pl-9"
                        placeholder="10"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end pt-6">
              {step === 1 ? (
                <Button type="submit" isLoading={isLoading}>
                  {isEditMode ? 'Update Listing' : 'Publish Listing'}
                </Button>
              ) : null}
            </div>
          </form>
        </ThreeDCard>
      </div>
    </div>
  );
};
