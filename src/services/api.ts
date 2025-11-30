import { 
  User, 
  Event, 
  Booking, 
  AITripPlanRequest,
  Transaction,
  Review,
  ChatThread,
  ChatMessage,
  Wallet
} from '../types';
import { AIResponse } from '../types/ai.types';
import { MOCK_EVENTS, MOCK_USER } from '../data/mock';
import { SSML_TEMPLATES } from '../lib/ai-config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    register: async (data: any): Promise<User> => {
      await delay(1000);
      return { ...MOCK_USER, ...data, isActive: true };
    },
    login: async (credentials: any): Promise<User> => {
      await delay(800);
      return { ...MOCK_USER, isActive: true };
    },
    loginWithProvider: async (provider: 'google' | 'facebook'): Promise<User> => {
      await delay(1000);
      // Simulate a user object returned from a social provider
      return {
        ...MOCK_USER,
        id: `u_${provider}_${Math.floor(Math.random() * 1000)}`,
        email: `alex@${provider}.com`,
        profile: {
            ...MOCK_USER.profile!,
            fullName: `Alex (${provider})`,
            // Use different avatars to show the difference
            avatarUrl: provider === 'google' 
                ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
        },
        isActive: true
      };
    },
    logout: async () => {
      await delay(500);
    }
  },

  profiles: {
    get: async (id: string) => {
      await delay(300);
      return MOCK_USER.profile;
    },
    update: async (id: string, data: any) => {
      await delay(500);
      // In a real app, we would merge data
      return { ...MOCK_USER.profile, ...data };
    },
    uploadAvatar: async (file: File) => {
      await delay(1000);
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    }
  },

  kyc: {
    submit: async (data: FormData) => {
      await delay(1500);
      return { status: 'pending', verificationId: 'kyc_123' };
    },
    status: async (id: string) => {
      await delay(500);
      return { status: 'verified' };
    }
  },

  events: {
    // GET /api/v1/events
    list: async (filters?: any): Promise<Event[]> => {
      await delay(600);
      return MOCK_EVENTS;
    },
    // GET /api/v1/events/{id}
    get: async (id: string): Promise<Event | undefined> => {
      await delay(300);
      return MOCK_EVENTS.find(e => e.id === id);
    },
    // POST /api/v1/events
    create: async (data: any): Promise<Event> => {
      await delay(1000);
      // Map snake_case from form to camelCase for frontend entity
      const newEvent: Event = { 
        id: crypto.randomUUID(),
        hostId: MOCK_USER.id,
        host: MOCK_USER.profile,
        title: data.title,
        description: data.description,
        city: data.city,
        location: { lat: 35.6762, lng: 139.6503 }, // Mock location
        startTime: data.startTime,
        endTime: data.endTime,
        priceCents: data.price_cents,
        currency: data.currency || 'USD',
        minParticipants: 1,
        maxParticipants: data.max_participants,
        status: 'open',
        visibility: 'public',
        images: data.images || [],
        itinerary: data.itinerary || [],
        createdAt: new Date().toISOString(),
      };
      // In a real app, this would be saved to DB
      return newEvent;
    }
  },

  bookings: {
    // POST /api/v1/bookings
    create: async (data: any): Promise<Booking> => {
      await delay(1200);
      return {
        id: crypto.randomUUID(),
        eventId: data.event_id,
        userId: data.user_id,
        seats: data.seats,
        status: 'confirmed',
        totalCents: 5000 * data.seats, // Mock calc
        currency: 'USD',
        createdAt: new Date().toISOString()
      };
    },
    list: async (): Promise<Booking[]> => {
      await delay(800);
      return []; // Return mock bookings
    }
  },

  wallet: {
    get: async (): Promise<Wallet> => {
      await delay(500);
      return MOCK_USER.wallet!;
    },
    transactions: async (): Promise<Transaction[]> => {
      await delay(600);
      return [
        { id: 'tx1', walletId: 'w1', type: 'payment', amountCents: -5000, balanceAfter: 10000, status: 'completed', createdAt: '2024-06-01T10:00:00Z', reference: 'Booking #123' },
        { id: 'tx2', walletId: 'w1', type: 'topup', amountCents: 15000, balanceAfter: 15000, status: 'completed', createdAt: '2024-05-20T10:00:00Z' }
      ];
    },
    withdraw: async (amountCents: number) => {
      await delay(1000);
      return { success: true, txId: 'tx_new' };
    }
  },

  reviews: {
    submit: async (data: any): Promise<Review> => {
      await delay(800);
      return {
        id: crypto.randomUUID(),
        reviewerId: MOCK_USER.id,
        ...data,
        createdAt: new Date().toISOString()
      };
    },
    list: async (guideId: string): Promise<Review[]> => {
      await delay(600);
      return [];
    }
  },

  chat: {
    listThreads: async (): Promise<ChatThread[]> => {
      await delay(500);
      return [];
    },
    getMessages: async (threadId: string): Promise<ChatMessage[]> => {
      await delay(300);
      return [];
    },
    sendMessage: async (threadId: string, content: string) => {
      await delay(300);
      return { id: crypto.randomUUID(), content, createdAt: new Date().toISOString() };
    }
  },

  ai: {
    // POST /api/v1/ai/planner
    generatePlan: async (req: AITripPlanRequest) => {
      await delay(3000);
      return {
        destination: req.destination,
        itinerary: [
          { day: 1, activities: [{ title: 'Arrival', time: '14:00', description: 'Check-in' }] },
          { day: 2, activities: [{ title: 'City Tour', time: '10:00', description: 'Guided walk' }] }
        ]
      };
    },
    // POST /api/v1/ai/assistant
    chat: async (message: string): Promise<AIResponse> => {
      await delay(1000);
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('plan') || lowerMsg.includes('trip')) {
        return {
          reply_text: "I've generated a trip plan for you.",
          ssml: SSML_TEMPLATES.itinerary_summary('Tokyo', 3),
          cards: [{
            type: 'itinerary_summary',
            data: { destination: 'Tokyo', days: 3, highlights: ['Food Tour', 'Shrine'] }
          }],
          confidence_score: 0.95
        };
      }
      
      if (lowerMsg.includes('book') || lowerMsg.includes('ticket')) {
         return {
            reply_text: "I found a great event matching your request.",
            cards: [{
               type: 'event',
               data: MOCK_EVENTS[0]
            }],
            confidence_score: 0.9
         };
      }
      
      // Default
      return {
        reply_text: "I can help you find local experiences. Try asking about 'Food tours in Tokyo' or 'Plan a trip'.",
        confidence_score: 0.8
      };
    }
  }
};
