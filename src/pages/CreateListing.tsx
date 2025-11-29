import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { UploadCloud, Plus, Trash2, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';

export const CreateListing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Food & Drink',
    type: 'tour',
    locationName: '',
    price: '',
    currency: 'USD',
    duration: '',
    maxGroupSize: '',
    images: [] as string[],
    itinerary: [{ title: '', description: '', time: '' }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItineraryChange = (index: number, field: string, value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { title: '', description: '', time: '' }]
    }));
  };

  const removeItineraryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await api.events.create({
        ...formData,
        price: Number(formData.price),
        maxGroupSize: Number(formData.maxGroupSize),
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'] // Mock image
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

        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between px-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {s}
                </div>
                <span className="mt-2 text-xs text-gray-500">
                  {s === 1 ? 'Details' : s === 2 ? 'Itinerary' : 'Review'}
                </span>
              </div>
            ))}
            <div className="absolute left-0 right-0 top-4 -z-10 mx-auto h-0.5 w-1/2 bg-gray-100" />
          </div>

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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      name="category" 
                      className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option>Food & Drink</option>
                      <option>Art & Culture</option>
                      <option>Nature</option>
                      <option>Nightlife</option>
                      <option>Sports</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select 
                      name="type" 
                      className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="tour">Guided Tour</option>
                      <option value="event">Event / Workshop</option>
                    </select>
                  </div>
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
                  <Label htmlFor="locationName">Location / Meeting Point</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="locationName" 
                      name="locationName" 
                      className="pl-9"
                      placeholder="e.g., Shinjuku Station, North Exit"
                      value={formData.locationName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        className="pl-9"
                        placeholder="50"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input 
                        id="duration" 
                        name="duration" 
                        className="pl-9"
                        placeholder="3 hours"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxGroupSize">Group Size</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input 
                        id="maxGroupSize" 
                        name="maxGroupSize" 
                        type="number" 
                        className="pl-9"
                        placeholder="10"
                        value={formData.maxGroupSize}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Itinerary</h3>
                  <Button type="button" size="sm" variant="outline" onClick={addItineraryItem} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>
                </div>
                
                {formData.itinerary.map((item, index) => (
                  <div key={index} className="relative rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <button 
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                           <Label>Title</Label>
                           <Input 
                              value={item.title}
                              onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                              placeholder="e.g., Meet at Station"
                           />
                        </div>
                        <div>
                           <Label>Time</Label>
                           <Input 
                              value={item.time}
                              onChange={(e) => handleItineraryChange(index, 'time', e.target.value)}
                              placeholder="10:00 AM"
                           />
                        </div>
                      </div>
                      <div>
                         <Label>Description</Label>
                         <Input 
                            value={item.description}
                            onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                            placeholder="Brief details..."
                         />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="font-bold text-gray-900 mb-2">Summary</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formData.title}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                            <dd className="mt-1 text-sm text-gray-900">${formData.price}</dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formData.description}</dd>
                        </div>
                    </dl>
                </div>
                <p className="text-sm text-gray-500 text-center">
                    By clicking publish, you agree to our Host Terms and Conditions.
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit" isLoading={isLoading}>
                  Publish Listing
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
