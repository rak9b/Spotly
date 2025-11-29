import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { MapPin, User, Compass, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'guide' ? 'guide' : 'tourist';
  const [selectedRole, setSelectedRole] = useState<'tourist' | 'guide'>(initialRole);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration then login
    login(selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <MapPin className="h-7 w-7" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[600px]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
          
          {/* Role Selection */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div 
              onClick={() => setSelectedRole('tourist')}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedRole === 'tourist' 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {selectedRole === 'tourist' && (
                <div className="absolute top-2 right-2 rounded-full bg-indigo-600 p-0.5 text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className={`mb-2 h-10 w-10 rounded-lg flex items-center justify-center ${selectedRole === 'tourist' ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900">Tourist</h3>
              <p className="text-xs text-gray-500 mt-1">I want to discover and book experiences.</p>
            </div>

            <div 
              onClick={() => setSelectedRole('guide')}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedRole === 'guide' 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {selectedRole === 'guide' && (
                <div className="absolute top-2 right-2 rounded-full bg-indigo-600 p-0.5 text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className={`mb-2 h-10 w-10 rounded-lg flex items-center justify-center ${selectedRole === 'guide' ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900">Guide / Host</h3>
              <p className="text-xs text-gray-500 mt-1">I want to host tours and earn money.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" required placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or register with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">Facebook</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
