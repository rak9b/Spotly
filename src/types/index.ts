export type UserRole = 'tourist' | 'guide' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

// --- Core Entities ---

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  profile: Profile;
  verification?: GuideVerification; // For guides
  wallet?: Wallet;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  languages: string[];
  interests: string[];
  location?: string;
  phoneNumber?: string;
  isPublic: boolean;
}

export interface GuideVerification {
  id: string;
  userId: string;
  documentUrl: string;
  documentType: 'passport' | 'id_card' | 'license';
  status: VerificationStatus;
  submittedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

// --- Wallet & Payments ---

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'earning';
  status: PaymentStatus;
  referenceId?: string; // Booking ID or External Payment ID
  createdAt: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  clientSecret: string;
  provider: 'stripe' | 'sslcommerz' | 'bkash';
}

// --- Events & Listings ---

export interface Event {
  id: string;
  hostId: string;
  host: Profile; // Expanded for UI
  title: string;
  description: string;
  type: 'event' | 'tour';
  category: string;
  
  // Location
  locationName: string;
  coordinates?: { lat: number; lng: number };
  meetingPoint: string;
  
  // Details
  images: string[];
  price: number;
  currency: string;
  duration: string; // ISO 8601 duration or string description
  maxGroupSize: number;
  
  // Schedule
  startDate: string;
  endDate?: string;
  isRecurring: boolean;
  
  // Stats
  rating: number;
  reviewCount: number;
  
  // Metadata
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  itinerary: ItineraryItem[];
  createdAt: string;
}

export interface ItineraryItem {
  order: number;
  time?: string;
  title: string;
  description: string;
  locationName?: string;
  coordinates?: { lat: number; lng: number };
}

// --- Bookings ---

export interface Booking {
  id: string;
  eventId: string;
  event: Event; // Expanded for UI
  userId: string;
  user: Profile; // Expanded for UI
  
  date: string;
  guests: number;
  totalPrice: number;
  currency: string;
  
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  
  createdAt: string;
  updatedAt: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  bookingId: string;
  eventId: string;
  authorId: string;
  author: Profile;
  
  rating: number; // 1-5
  comment: string;
  images?: string[];
  
  createdAt: string;
}

// --- AI Services ---

export interface AIActivityLog {
  id: string;
  userId: string;
  action: 'trip_plan' | 'chat' | 'recommendation';
  inputContext: any; // JSON
  outputResult: any; // JSON
  createdAt: string;
}

export interface AITripPlanRequest {
  destination: string;
  dates: { from: string; to: string };
  budget: 'budget' | 'moderate' | 'luxury';
  interests: string[];
  travelers: number;
}
