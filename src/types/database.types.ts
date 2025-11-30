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
          password_hash: string | null // Not usually sent to frontend, but part of schema
          role: 'tourist' | 'guide' | 'host' | 'admin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash?: string
          role: 'tourist' | 'guide' | 'host' | 'admin'
          is_active?: boolean
        }
        Update: {
          email?: string
          role?: 'tourist' | 'guide' | 'host' | 'admin'
          is_active?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          languages: string[] | null // JSONB
          interests: string[] | null // JSONB
          city: string | null
          location: any | null // PostGIS Geography point
          rating_avg: number
          rating_count: number
          timezone: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          languages?: string[] | null
          interests?: string[] | null
          city?: string | null
          timezone?: string | null
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          languages?: string[] | null
          interests?: string[] | null
          city?: string | null
        }
      }
      events: {
        Row: {
          id: string
          host_id: string
          title: string
          description: string | null
          itinerary: Json | null
          city: string | null
          location: any | null // PostGIS
          start_time: string | null
          end_time: string | null
          min_participants: number
          max_participants: number | null
          price_cents: number
          currency: string
          status: 'draft' | 'open' | 'full' | 'cancelled' | 'completed'
          visibility: 'public' | 'private' | null
          images: string[] | null // JSONB
          created_at: string
          updated_at: string
        }
        Insert: {
          host_id: string
          title: string
          description?: string | null
          city?: string | null
          start_time?: string | null
          price_cents?: number
          currency?: string
          status?: 'draft' | 'open' | 'full' | 'cancelled' | 'completed'
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'draft' | 'open' | 'full' | 'cancelled' | 'completed'
          price_cents?: number
        }
      }
      bookings: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          seats: number
          total_cents: number | null
          currency: string | null
          payment_intent_id: string | null
          idempotency_key: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          event_id: string
          user_id: string
          seats?: number
          total_cents?: number
          status?: 'pending' | 'confirmed'
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          gateway: 'stripe' | 'sslcommerz' | 'bkash' | null
          gateway_charge_id: string | null
          amount_cents: number | null
          currency: string | null
          status: 'pending' | 'succeeded' | 'failed' | 'refunded' | null
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string
          guide_id: string | null
          booking_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
      }
      guide_verifications: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'verified' | 'rejected' | null
          kyc_doc_url: string | null
          kyc_hash: string | null
          submitted_at: string
          verified_at: string | null
        }
      }
    }
  }
}
