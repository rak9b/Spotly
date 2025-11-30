import { User, Event, Profile } from '../types';

const MOCK_PROFILE: Profile = {
  id: 'p1',
  userId: 'u1',
  fullName: 'Alex Traveler',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  bio: 'Love exploring hidden gems and local food.',
  languages: ['English'],
  interests: ['Food', 'Photography'],
  city: 'New York',
  ratingAvg: 5.0,
  ratingCount: 12,
  timezone: 'UTC'
};

export const MOCK_USER: User = {
  id: 'u1',
  email: 'alex@example.com',
  role: 'tourist',
  isActive: true,
  createdAt: '2023-01-01T00:00:00Z',
  profile: MOCK_PROFILE,
  wallet: {
    id: 'w1',
    userId: 'u1',
    balanceCents: 15000,
    currency: 'USD',
  }
};

const HOST_KENJI: Profile = {
  id: 'h1',
  userId: 'u2',
  fullName: 'Kenji Sato',
  avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
  languages: ['English', 'Japanese'],
  interests: ['Music', 'History'],
  city: 'Tokyo',
  ratingAvg: 4.9,
  ratingCount: 124,
  bio: 'Jazz musician and local historian.'
};

const HOST_MARIA: Profile = {
  id: 'h2',
  userId: 'u3',
  fullName: 'Maria Gonzalez',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  languages: ['English', 'Spanish'],
  interests: ['Food', 'Culture'],
  city: 'Mexico City',
  ratingAvg: 4.8,
  ratingCount: 89,
  bio: 'Culinary expert and street food lover.'
};

const HOST_ELENA: Profile = {
  id: 'h3',
  userId: 'u4',
  fullName: 'Elena Quispe',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  languages: ['English', 'Spanish', 'Quechua'],
  interests: ['Yoga', 'Nature'],
  city: 'Cusco',
  ratingAvg: 5.0,
  ratingCount: 42,
  bio: 'Spiritual guide and yoga instructor.'
};

const HOST_DAVID: Profile = {
  id: 'h4',
  userId: 'u5',
  fullName: 'David Chen',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  languages: ['English', 'Mandarin'],
  interests: ['Tech', 'Startups'],
  city: 'San Francisco',
  ratingAvg: 4.7,
  ratingCount: 210,
  bio: 'Tech entrepreneur and startup mentor.'
};

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    hostId: 'h1',
    host: HOST_KENJI,
    title: 'Hidden Jazz Bars of Tokyo',
    description: 'Experience the vibrant underground jazz scene of Tokyo with a local musician.',
    city: 'Tokyo',
    location: { lat: 35.6762, lng: 139.6503 },
    priceCents: 8500,
    currency: 'USD',
    startTime: '2025-06-15T19:00:00',
    minParticipants: 1,
    maxParticipants: 6,
    status: 'open',
    visibility: 'public',
    images: ['https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2023-01-01T00:00:00Z',
    itinerary: []
  },
  {
    id: 'e2',
    hostId: 'h2',
    host: HOST_MARIA,
    title: 'Street Food Walk in Mexico City',
    description: 'Taste the best tacos, tamales, and churros in the historic center.',
    city: 'Mexico City',
    location: { lat: 19.4326, lng: -99.1332 },
    priceCents: 4500,
    currency: 'USD',
    startTime: '2025-06-16T11:00:00',
    minParticipants: 1,
    maxParticipants: 10,
    status: 'open',
    visibility: 'public',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2023-01-02T00:00:00Z',
    itinerary: []
  },
  {
    id: 'e3',
    hostId: 'h3',
    host: HOST_ELENA,
    title: 'Sunrise Yoga at Machu Picchu',
    description: 'A once-in-a-lifetime spiritual experience.',
    city: 'Cusco',
    location: { lat: -13.1631, lng: -72.5450 },
    priceCents: 12000,
    currency: 'USD',
    startTime: '2025-06-20T05:30:00',
    minParticipants: 1,
    maxParticipants: 15,
    status: 'open',
    visibility: 'public',
    images: ['https://images.unsplash.com/photo-1518182170546-0766ba6f6a56?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2023-01-03T00:00:00Z',
    itinerary: []
  },
  {
    id: 'e4',
    hostId: 'h4',
    host: HOST_DAVID,
    title: 'Tech Startup Tour: Silicon Valley',
    description: 'Visit the garages where giants were born.',
    city: 'San Francisco',
    location: { lat: 37.7749, lng: -122.4194 },
    priceCents: 15000,
    currency: 'USD',
    startTime: '2025-07-01T09:00:00',
    minParticipants: 1,
    maxParticipants: 20,
    status: 'open',
    visibility: 'public',
    images: ['https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2023-01-04T00:00:00Z',
    itinerary: []
  }
];
