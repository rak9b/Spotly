import { 
  User, 
  Event, 
  Booking, 
  AITripPlanRequest,
  Transaction,
  Review,
  ChatThread,
  ChatMessage,
  Wallet,
  Notification,
  AnalyticsOverview
} from '../types';
import { AIResponse } from '../types/ai.types';
import { MOCK_EVENTS, MOCK_USER } from '../data/mock';
import { SSML_TEMPLATES } from '../lib/ai-config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- Auth & User ---
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
      return {
        ...MOCK_USER,
        id: `u_${provider}_${Math.floor(Math.random() * 1000)}`,
        email: `alex@${provider}.com`,
        profile: {
            ...MOCK_USER.profile!,
            fullName: `Alex (${provider})`,
            avatarUrl: provider === 'google' 
                ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
        },
        isActive: true
      };
    },
    logout: async () => {
      await delay(500);
    },
    resetPassword: async (email: string) => {
      await delay(1000);
      return { success: true, message: "Reset link sent" };
    }
  },

  profiles: {
    get: async (id: string) => {
      await delay(300);
      return MOCK_USER.profile;
    },
    update: async (id: string, data: any) => {
      await delay(500);
      return { ...MOCK_USER.profile, ...data };
    },
    uploadAvatar: async (file: File) => {
      await delay(1000);
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    }
  },

  // --- KYC & Verification ---
  kyc: {
    submit: async (data: FormData) => {
      await delay(1500);
      return { status: 'pending', verificationId: 'kyc_123' };
    },
    status: async (id: string) => {
      await delay(500);
      return { status: 'verified', submittedAt: new Date().toISOString() };
    }
  },

  // --- Events & Listings ---
  events: {
    list: async (filters?: any): Promise<Event[]> => {
      await delay(600);
      // Simulate filtering
      if (filters?.query) {
        const q = filters.query.toLowerCase();
        return MOCK_EVENTS.filter(e => 
          e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q)
        );
      }
      return MOCK_EVENTS;
    },
    get: async (id: string): Promise<Event | undefined> => {
      await delay(300);
      return MOCK_EVENTS.find(e => e.id === id);
    },
    create: async (data: any): Promise<Event> => {
      await delay(1000);
      const newEvent: Event = { 
        id: crypto.randomUUID(),
        hostId: MOCK_USER.id,
        host: MOCK_USER.profile,
        title: data.title,
        description: data.description,
        city: data.city,
        location: { lat: 35.6762, lng: 139.6503 }, 
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
      return newEvent;
    },
    update: async (id: string, data: Partial<Event>) => {
        await delay(800);
        return { ...MOCK_EVENTS[0], ...data };
    },
    delete: async (id: string) => {
        await delay(500);
        return { success: true };
    },
    uploadImage: async (id: string, file: File) => {
        await delay(1500);
        return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
    }
  },

  // --- Search ---
  search: {
    suggestions: async (query: string) => {
        await delay(200);
        return ["Tokyo Food Tour", "Paris Art Walk", "New York Jazz"];
    },
    nearby: async (lat: number, lng: number, radius: number) => {
        await delay(600);
        return MOCK_EVENTS.slice(0, 2); // Mock nearby events
    }
  },

  // --- Bookings ---
  bookings: {
    create: async (data: any): Promise<Booking> => {
      await delay(1200);
      return {
        id: crypto.randomUUID(),
        eventId: data.event_id,
        userId: data.user_id,
        seats: data.seats,
        status: 'confirmed',
        totalCents: 5000 * data.seats,
        currency: 'USD',
        createdAt: new Date().toISOString()
      };
    },
    list: async (): Promise<Booking[]> => {
      await delay(800);
      return [
          {
              id: 'b1',
              eventId: 'e1',
              event: MOCK_EVENTS[0],
              userId: 'u1',
              status: 'confirmed',
              seats: 2,
              totalCents: 17000,
              currency: 'USD',
              createdAt: '2024-06-01T10:00:00Z'
          }
      ];
    },
    update: async (id: string, status: string) => {
        await delay(500);
        return { success: true, status };
    }
  },

  // --- Payments ---
  payments: {
    createIntent: async (bookingId: string, amount: number) => {
        await delay(1000);
        return { clientSecret: "pi_mock_secret_12345", amount };
    },
    confirm: async (paymentIntentId: string) => {
        await delay(1500);
        return { status: "succeeded" };
    }
  },

  // --- Wallet ---
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
      return { success: true, txId: 'tx_new_withdraw' };
    },
    topup: async (amountCents: number) => {
        await delay(1000);
        return { success: true, clientSecret: "pi_topup_123" };
    }
  },

  // --- Reviews ---
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
      return [
          { id: 'r1', reviewerId: 'u99', rating: 5, comment: "Amazing experience!", createdAt: '2024-01-01', bookingId: 'b99' }
      ];
    }
  },

  // --- Chat ---
  chat: {
    listThreads: async (): Promise<ChatThread[]> => {
      await delay(500);
      return [
          { id: 't1', participants: [MOCK_USER.profile!, MOCK_EVENTS[0].host!], updatedAt: new Date().toISOString() }
      ];
    },
    getMessages: async (threadId: string): Promise<ChatMessage[]> => {
      await delay(300);
      return [
          { id: 'm1', threadId, senderId: 'u2', content: "Hello! Looking forward to the tour.", createdAt: new Date().toISOString() }
      ];
    },
    sendMessage: async (threadId: string, content: string) => {
      await delay(300);
      return { id: crypto.randomUUID(), content, createdAt: new Date().toISOString() };
    },
    translate: async (messageId: string, targetLang: string) => {
        await delay(500);
        return { translatedText: "Hola! Espero con ansias el tour." };
    }
  },

  // --- Notifications ---
  notifications: {
      list: async (): Promise<Notification[]> => {
          await delay(400);
          return [
              { id: 'n1', userId: 'u1', type: 'booking_confirmed', title: 'Booking Confirmed', message: 'Your trip to Tokyo is set!', isRead: false, createdAt: new Date().toISOString() }
          ];
      },
      markRead: async (id: string) => {
          await delay(200);
          return { success: true };
      },
      push: async (userId: string, message: string) => {
          await delay(500);
          return { success: true };
      }
  },

  // --- Analytics ---
  analytics: {
      getOverview: async (): Promise<AnalyticsOverview> => {
          await delay(800);
          return {
              totalRevenue: 45200,
              totalBookings: 124,
              totalViews: 5430,
              conversionRate: 2.4,
              revenueSeries: [
                  { date: '2024-01', amount: 5000 },
                  { date: '2024-02', amount: 7500 },
                  { date: '2024-03', amount: 12000 },
              ]
          };
      }
  },

  // --- QR Code ---
  qr: {
      generate: async (bookingId: string) => {
          await delay(500);
          return { qrCode: `localguide:booking:${bookingId}`, url: `https://localguide.ai/verify/${bookingId}` };
      },
      scan: async (code: string) => {
          await delay(800);
          return { valid: true, bookingId: 'b1', guestName: 'Alex Traveler' };
      }
  },

  // --- Admin ---
  admin: {
      getFlags: async () => {
          await delay(600);
          return [
              { id: 'f1', entityType: 'review', reason: 'Spam', status: 'pending' }
          ];
      },
      resolveFlag: async (id: string, action: string) => {
          await delay(500);
          return { success: true };
      }
  },

  // --- AI ---
  ai: {
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
