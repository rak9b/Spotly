import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { api } from '../services/api';
import { toast } from 'sonner';
import { User, Mail, MapPin, Globe, Camera, ShieldCheck, UploadCloud } from 'lucide-react';

export const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'verification'>('profile');
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    displayName: user?.profile?.displayName || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (user?.profile?.id) {
        await api.profiles.update(user.profile.id, formData);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile, security, and verification.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-200">
            <button 
                onClick={() => setActiveTab('profile')}
                className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Profile
            </button>
            {user?.role === 'guide' && (
                <button 
                    onClick={() => setActiveTab('verification')}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'verification' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Verification (KYC)
                </button>
            )}
        </div>

        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          
          {activeTab === 'profile' ? (
            <>
                {/* Profile Header */}
                <div className="relative h-32 overflow-hidden rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="absolute -bottom-12 left-8">
                    <div className="relative">
                        <img 
                        src={user?.profile?.avatarUrl || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                        />
                        <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-sm hover:bg-gray-50 text-gray-600 border border-gray-200">
                        <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-8 pt-16 pb-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            className="pl-9" 
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input 
                        id="displayName" 
                        name="displayName" 
                        value={formData.displayName} 
                        onChange={handleChange} 
                        placeholder="How you appear to others"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            disabled 
                            className="pl-9 bg-gray-50 text-gray-500" 
                        />
                        </div>
                    </div>
                    </div>

                    {/* Bio & Location */}
                    <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                        id="bio" 
                        name="bio" 
                        rows={4}
                        className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        placeholder="Tell us a bit about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                        />
                        <p className="text-xs text-gray-500">Brief description for your profile.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                            id="location" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleChange} 
                            className="pl-9" 
                            placeholder="City, Country"
                            />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label>Languages</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <div className="flex h-10 w-full items-center rounded-lg border border-gray-300 bg-white px-3 pl-9 text-sm text-gray-500">
                            English, Spanish (Mock)
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
                    <Button type="button" variant="ghost">Cancel</Button>
                    <Button type="submit" isLoading={isLoading}>Save Changes</Button>
                    </div>
                </form>
            </>
          ) : (
            /* Verification Tab */
            <div className="p-8">
                <div className="mb-8 flex items-center gap-4 rounded-xl bg-blue-50 p-4 text-blue-700">
                    <ShieldCheck className="h-6 w-6" />
                    <div>
                        <h3 className="font-bold">Identity Verification Required</h3>
                        <p className="text-sm">To host tours, you must verify your identity. Your data is encrypted and secure.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Document Type</Label>
                        <select className="w-full rounded-lg border border-gray-300 p-2.5 text-sm">
                            <option>Passport</option>
                            <option>National ID Card</option>
                            <option>Driver's License</option>
                        </select>
                    </div>

                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <UploadCloud className="h-6 w-6 text-gray-500" />
                        </div>
                        <h4 className="font-bold text-gray-900">Upload Front Side</h4>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                    </div>

                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <UploadCloud className="h-6 w-6 text-gray-500" />
                        </div>
                        <h4 className="font-bold text-gray-900">Upload Back Side</h4>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={() => toast.success("Documents submitted for review!")}>
                            Submit for Verification
                        </Button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
