import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { UploadCloud, Plus, Trash2, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { ThreeDCard } from '../components/ui/ThreeDCard';

export const CreateListing = () => {
  const navigate = useNavigate();
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
      
      await api.events.create({
        ...formData,
        price_cents: priceCents,
        max_participants: Number(formData.maxParticipants),
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80']
      });
      toast.success('Listing created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create a New Listing</h1>
          <p className="text-gray-600">Share your expertise with the world.</p>
        </div>

        <ThreeDCard className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5" depth={5}>
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
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
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
                  Publish Listing
                </Button>
              ) : null}
            </div>
          </form>
        </ThreeDCard>
      </div>
    </div>
  );
};
