import { Database } from './database.types';

// Derived types from Database definition
export type UserRole = Database['public']['Tables']['users']['Row']['role'];
export type EventStatus = Database['public']['Tables']['events']['Row']['status'];
export type BookingStatus = Database['public']['Tables']['bookings']['Row']['status'];
export type PaymentStatus = Database['public']['Tables']['payments']['Row']['status'];
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// --- Core Entities ---

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  profile?: Profile;
  wallet?: Wallet;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  languages: string[];
  interests: string[];
  city?: string;
  location?: string; // Human readable location string
  coordinates?: { lat: number; lng: number }; // Geo coordinates
  ratingAvg: number;
  ratingCount: number;
  timezone?: string;
  isVerified?: boolean;
}

// --- Events & Listings ---

export interface Event {
  id: string;
  hostId: string;
  host?: Profile;
  
  title: string;
  description: string;
  itinerary: ItineraryItem[];
  
  city: string;
  location?: { lat: number; lng: number };
  locationName?: string; // Meeting point name
  
  startTime: string;
  endTime?: string;
  
  minParticipants: number;
  maxParticipants: number;
  
  priceCents: number;
  currency: string;
  
  status: EventStatus;
  visibility: 'public' | 'private';
  images: string[];
  
  createdAt: string;
}

export interface ItineraryItem {
  title: string;
  description: string;
  time?: string;
}

// --- Bookings ---

export interface Booking {
  id: string;
  eventId: string;
  event?: Event;
  userId: string;
  user?: Profile;
  
  status: BookingStatus;
  seats: number;
  totalCents: number;
  currency: string;
  paymentIntentId?: string;
  
  createdAt: string;
}

// --- Wallet & Transactions ---

export interface Wallet {
  id: string;
  userId: string;
  balanceCents: number;
  currency: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'topup' | 'payout' | 'refund' | 'commission' | 'payment';
  amountCents: number;
  balanceAfter: number;
  reference?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: Profile;
  guideId?: string;
  eventId?: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// --- Notifications ---

export interface Notification {
  id: string;
  userId: string;
  type: 'booking_request' | 'booking_confirmed' | 'payment_success' | 'system' | 'review';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

// --- Analytics ---

export interface AnalyticsOverview {
  totalRevenue: number;
  totalBookings: number;
  totalViews: number;
  conversionRate: number;
  revenueSeries: { date: string; amount: number }[];
}

// --- AI Types ---

export interface AITripPlanRequest {
  destination: string;
  dates: { from: string; to: string };
  budget: 'budget' | 'moderate' | 'luxury';
  interests: string[];
  travelers: number;
}

export interface AIActivityLog {
  id: string;
  userId: string;
  endpoint: 'planner' | 'recommend' | 'assistant' | 'moderation';
  input: any;
  output: any;
  costMeta: any;
  createdAt: string;
}

// --- Chat ---

export interface ChatThread {
  id: string;
  participants: Profile[];
  lastMessage?: ChatMessage;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  isTranslated?: boolean;
  originalContent?: string;
  createdAt: string;
}
