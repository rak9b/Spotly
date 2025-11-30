import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (role: UserRole) => {
    // In a real app, we would call api.auth.login(credentials)
    // Here we simulate it and override the role for demo purposes
    try {
        const userData = await api.auth.login({});
        setUser({ ...userData, role });
        toast.success(`Welcome back, ${userData.profile?.fullName}!`);
    } catch (error) {
        toast.error("Login failed. Please try again.");
    }
  };

  const loginWithProvider = async (provider: 'google' | 'facebook') => {
    try {
        const userData = await api.auth.loginWithProvider(provider);
        setUser(userData);
        toast.success(`Welcome back, ${userData.profile?.fullName}!`);
    } catch (error) {
        console.error(error);
        toast.error(`Failed to login with ${provider}`);
        throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("You have been logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithProvider, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
