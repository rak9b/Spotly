import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { MapPin, Facebook, Globe } from 'lucide-react';
import { ThreeDCard } from '../components/ui/ThreeDCard';

export const Login = () => {
  const { login, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') === 'guide' ? 'guide' : 'tourist';
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await login(role);
        navigate('/dashboard');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    try {
        await loginWithProvider(provider);
        navigate('/dashboard');
    } finally {
        setSocialLoading(null);
    }
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
          {role === 'guide' ? 'Partner Login' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">create a new account</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ThreeDCard className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10" depth={10}>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 border"
                  defaultValue="alex@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 border"
                  defaultValue="password"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={() => handleSocialLogin('google')}
                isLoading={socialLoading === 'google'}
              >
                <Globe className="h-4 w-4" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={() => handleSocialLogin('facebook')}
                isLoading={socialLoading === 'facebook'}
              >
                <Facebook className="h-4 w-4" /> Facebook
              </Button>
            </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
};
