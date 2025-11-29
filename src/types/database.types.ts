// This file matches the PostgreSQL schema defined in backend/db/schema.sql
// It allows the frontend to have type safety when communicating with the backend.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'tourist' | 'guide' | 'host' | 'admin'
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          role?: 'tourist' | 'guide' | 'host' | 'admin'
          is_active?: boolean
        }
        Update: {
          email?: string
          password_hash?: string
          is_active?: boolean
          last_login?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          languages: string[] // JSONB
          interests: string[] // JSONB
          location_city: string | null
          rating_avg: number
          rating_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          languages?: string[]
          interests?: string[]
          location_city?: string | null
        }
        Update: {
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          languages?: string[]
          interests?: string[]
          location_city?: string | null
        }
      }
      events: {
        Row: {
          id: string
          host_id: string
          title: string
          description: string | null
          itinerary: Json | null
          city: string
          start_time: string
          end_time: string
          min_participants: number
          max_participants: number
          current_participants: number
          price_cents: number
          currency: string
          status: 'draft' | 'open' | 'full' | 'cancelled' | 'completed'
          visibility: 'public' | 'private'
          images: string[] // JSONB
          created_at: string
          updated_at: string
        }
        Insert: {
          host_id: string
          title: string
          description?: string | null
          city: string
          start_time: string
          end_time: string
          price_cents: number
          max_participants: number
          images?: string[]
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'draft' | 'open' | 'full' | 'cancelled' | 'completed'
          current_participants?: number
        }
      }
      bookings: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          seats: number
          total_price_cents: number
          currency: string
          payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          event_id: string
          user_id: string
          seats: number
          total_price_cents: number
          currency?: string
          status?: 'pending' | 'confirmed'
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          payment_intent_id?: string | null
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance_cents: number
          currency: string
          version: number
          updated_at: string
        }
      }
    }
  }
}
