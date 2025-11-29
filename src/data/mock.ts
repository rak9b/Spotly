import { User, Event, Booking } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  email: 'alex@example.com',
  role: 'tourist',
  createdAt: '2023-01-01T00:00:00Z',
  profile: {
    id: 'p1',
    userId: 'u1',
    firstName: 'Alex',
    lastName: 'Traveler',
    displayName: 'Alex T.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    bio: 'Love exploring hidden gems and local food.',
    languages: ['English'],
    interests: ['Food', 'Photography'],
    isPublic: true,
    location: 'New York, USA'
  },
  wallet: {
    id: 'w1',
    userId: 'u1',
    balance: 150.00,
    currency: 'USD',
    transactions: []
  }
};

export const MOCK_EVENTS: Partial<Event>[] = [
  {
    id: 'e1',
    title: 'Hidden Jazz Bars of Tokyo',
    description: 'Experience the vibrant underground jazz scene of Tokyo with a local musician.',
    type: 'event',
    category: 'Nightlife',
    locationName: 'Tokyo, Japan',
    price: 85,
    currency: 'USD',
    duration: '3 hours',
    maxGroupSize: 6,
    rating: 4.9,
    reviewCount: 124,
    images: ['https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=800&q=80'],
    startDate: '2025-06-15T19:00:00', 
    host: {
      id: 'h1',
      userId: 'u2',
      firstName: 'Kenji',
      lastName: 'Sato',
      displayName: 'Kenji S.',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      languages: ['English', 'Japanese'],
      interests: ['Music', 'History'],
      isPublic: true,
      reviewCount: 124,
      rating: 4.9
    } as any
  },
  {
    id: 'e2',
    title: 'Street Food Walk in Mexico City',
    description: 'Taste the best tacos, tamales, and churros in the historic center.',
    type: 'tour',
    category: 'Food & Drink',
    locationName: 'Mexico City, Mexico',
    price: 45,
    currency: 'USD',
    duration: '4 hours',
    maxGroupSize: 10,
    rating: 4.8,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'],
    startDate: '2025-06-16T11:00:00',
    host: {
      id: 'h2',
      userId: 'u3',
      firstName: 'Maria',
      lastName: 'Gonzalez',
      displayName: 'Maria G.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      languages: ['English', 'Spanish'],
      interests: ['Food', 'Culture'],
      isPublic: true,
      reviewCount: 89,
      rating: 4.8
    } as any
  },
  {
    id: 'e3',
    title: 'Sunrise Yoga at Machu Picchu',
    description: 'A once-in-a-lifetime spiritual experience.',
    type: 'event',
    category: 'Wellness',
    locationName: 'Cusco, Peru',
    price: 120,
    currency: 'USD',
    duration: '2 hours',
    maxGroupSize: 15,
    rating: 5.0,
    reviewCount: 42,
    images: ['https://images.unsplash.com/photo-1518182170546-0766ba6f6a56?auto=format&fit=crop&w=800&q=80'],
    startDate: '2025-06-20T05:30:00',
    host: {
      id: 'h3',
      userId: 'u4',
      firstName: 'Elena',
      lastName: 'Quispe',
      displayName: 'Elena Q.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      languages: ['English', 'Spanish', 'Quechua'],
      interests: ['Yoga', 'Nature'],
      isPublic: true,
      reviewCount: 42,
      rating: 5.0
    } as any
  },
  {
    id: 'e4',
    title: 'Tech Startup Tour: Silicon Valley',
    description: 'Visit the garages where giants were born.',
    type: 'tour',
    category: 'Business',
    locationName: 'San Francisco, USA',
    price: 150,
    currency: 'USD',
    duration: '6 hours',
    maxGroupSize: 20,
    rating: 4.7,
    reviewCount: 210,
    images: ['https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'],
    startDate: '2025-07-01T09:00:00',
    host: {
      id: 'h4',
      userId: 'u5',
      firstName: 'David',
      lastName: 'Chen',
      displayName: 'David C.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      languages: ['English', 'Mandarin'],
      interests: ['Tech', 'Startups'],
      isPublic: true,
      reviewCount: 210,
      rating: 4.7
    } as any
  }
];
