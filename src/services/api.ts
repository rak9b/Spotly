import { 
  User, 
  Event, 
  Booking, 
  Review, 
  PaymentIntent, 
  AITripPlanRequest,
  UserRole 
} from '../types';
import { MOCK_EVENTS, MOCK_USER } from '../data/mock';

// This service layer mimics the REST API surface defined in your prompt.
// In a real app, these would be axios/fetch calls to your backend.

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    register: async (data: any): Promise<User> => {
      await delay(1000);
      return { ...MOCK_USER, ...data };
    },
    login: async (credentials: any): Promise<User> => {
      await delay(800);
      return MOCK_USER;
    },
    logout: async () => {
      await delay(200);
    },
    verifyToken: async () => {
      await delay(500);
      return MOCK_USER;
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
    getWallet: async () => {
      await delay(400);
      return MOCK_USER.wallet;
    }
  },

  events: {
    list: async (filters?: any): Promise<Event[]> => {
      await delay(600);
      return MOCK_EVENTS as unknown as Event[];
    },
    get: async (id: string): Promise<Event | undefined> => {
      await delay(300);
      return MOCK_EVENTS.find(e => e.id === id) as unknown as Event;
    },
    create: async (data: any): Promise<Event> => {
      await delay(1000);
      return { ...data, id: Math.random().toString() };
    },
    update: async (id: string, data: any) => {
      await delay(500);
    },
    delete: async (id: string) => {
      await delay(500);
    }
  },

  bookings: {
    create: async (data: any): Promise<Booking> => {
      await delay(1200);
      return {
        id: Math.random().toString(),
        status: 'confirmed',
        paymentStatus: 'succeeded',
        ...data
      };
    },
    list: async (role: UserRole): Promise<Booking[]> => {
      await delay(800);
      return []; 
    },
    updateStatus: async (id: string, status: string) => {
      await delay(500);
    }
  },

  payments: {
    createIntent: async (amount: number, currency: string): Promise<PaymentIntent> => {
      await delay(1000);
      return {
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        amount,
        currency,
        clientSecret: 'secret_' + Math.random().toString(36),
        provider: 'stripe'
      };
    }
  },

  ai: {
    generatePlan: async (req: AITripPlanRequest) => {
      await delay(3000);
      // Mock response matching the schema
      return {
        destination: req.destination,
        itinerary: [
          { day: 1, activities: [{ title: 'Arrival & Check-in', time: '14:00', description: 'Settle into your hotel.' }, { title: 'Dinner', time: '19:00', description: 'Local cuisine experience.' }] },
          { day: 2, activities: [{ title: 'City Tour', time: '10:00', description: 'Guided walking tour.' }, { title: 'Museum Visit', time: '14:00', description: 'Explore local history.' }] },
          { day: 3, activities: [{ title: 'Nature Walk', time: '09:00', description: 'Hiking in nearby trails.' }, { title: 'Shopping', time: '16:00', description: 'Souvenir hunting.' }] }
        ]
      };
    },
    chat: async (message: string) => {
      await delay(1000);
      return "I can help you find the best local experiences based on your preferences. Try asking about food tours in Tokyo!";
    },
    moderateContent: async (text: string) => {
      await delay(200);
      return { flagged: false };
    }
  }
};
