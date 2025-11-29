-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For location_coords
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For hashing if needed internally

-- 1. USERS TABLE
CREATE TYPE user_role AS ENUM ('tourist', 'guide', 'host', 'admin');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'tourist',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 2. PROFILES TABLE
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    languages JSONB DEFAULT '[]'::jsonb, -- e.g., ["en", "es"]
    interests JSONB DEFAULT '[]'::jsonb, -- e.g., ["hiking", "food"]
    location_city VARCHAR(100),
    location_coords GEOGRAPHY(POINT, 4326),
    rating_avg FLOAT DEFAULT 0.0,
    rating_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_profiles_user_id UNIQUE (user_id)
);

CREATE INDEX idx_profiles_location ON profiles USING GIST (location_coords);
CREATE INDEX idx_profiles_interests ON profiles USING GIN (interests);

-- 3. GUIDE VERIFICATION (KYC)
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');

CREATE TABLE guide_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status verification_status DEFAULT 'pending',
    kyc_doc_url_encrypted TEXT NOT NULL, -- S3 URL (Client-side encrypted or SSE)
    kyc_hash VARCHAR(255), -- For integrity check
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT uq_guide_verifications_user_id UNIQUE (user_id)
);

-- 4. EVENTS / LISTINGS
CREATE TYPE event_status AS ENUM ('draft', 'open', 'full', 'cancelled', 'completed');
CREATE TYPE event_visibility AS ENUM ('public', 'private');

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    itinerary JSONB, -- Structured day-by-day plan
    city VARCHAR(100) NOT NULL,
    location_coords GEOGRAPHY(POINT, 4326),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    min_participants INT DEFAULT 1,
    max_participants INT NOT NULL,
    current_participants INT DEFAULT 0,
    price_cents INT NOT NULL, -- Stored in cents
    currency CHAR(3) DEFAULT 'USD',
    status event_status DEFAULT 'draft',
    visibility event_visibility DEFAULT 'public',
    images JSONB DEFAULT '[]'::jsonb,
    search_vector TSVECTOR, -- Full text search
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for Events
CREATE INDEX idx_events_host ON events(host_id);
CREATE INDEX idx_events_city_start ON events(city, start_time);
CREATE INDEX idx_events_location ON events USING GIST (location_coords);
CREATE INDEX idx_events_search ON events USING GIN (search_vector);

-- Trigger to update search_vector on insert/update
CREATE FUNCTION events_search_trigger() RETURNS trigger AS $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.city,'')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON events FOR EACH ROW EXECUTE PROCEDURE events_search_trigger();

-- 5. BOOKINGS
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'refunded');

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id),
    user_id UUID NOT NULL REFERENCES users(id),
    status booking_status DEFAULT 'pending',
    seats INT DEFAULT 1,
    total_price_cents INT NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    payment_intent_id VARCHAR(255), -- Stripe/Gateway ID
    idempotency_key VARCHAR(255), -- Prevent double booking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bookings_event_status ON bookings(event_id, status);
CREATE INDEX idx_bookings_user ON bookings(user_id);

-- 6. PAYMENTS
CREATE TYPE payment_gateway AS ENUM ('stripe', 'sslcommerz', 'bkash');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded');

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    gateway payment_gateway NOT NULL,
    gateway_charge_id VARCHAR(255),
    amount_cents INT NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    meta_data JSONB, -- Gateway specific response
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE UNIQUE INDEX idx_payments_gateway_charge ON payments(gateway_charge_id);

-- 7. WALLETS & TRANSACTIONS
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    balance_cents BIGINT DEFAULT 0,
    currency CHAR(3) DEFAULT 'USD',
    version INT DEFAULT 1, -- Optimistic locking
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_wallets_user_id UNIQUE (user_id)
);

CREATE TYPE transaction_type AS ENUM ('topup', 'payout', 'refund', 'commission', 'booking_payment');

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    type transaction_type NOT NULL,
    amount_cents INT NOT NULL, -- Positive for credit, negative for debit
    balance_after BIGINT NOT NULL,
    reference_id UUID, -- Can link to booking_id or payment_id
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);

-- 8. REVIEWS
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id), -- Verified stay/tour
    event_id UUID REFERENCES events(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    host_id UUID NOT NULL REFERENCES users(id), -- The guide being reviewed
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_event ON reviews(event_id);
CREATE INDEX idx_reviews_host ON reviews(host_id);

-- 9. AI ACTIVITY LOGS
CREATE TYPE ai_endpoint AS ENUM ('planner', 'recommendation', 'assistant', 'moderation');

CREATE TABLE ai_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id), -- Nullable for anon
    endpoint ai_endpoint NOT NULL,
    input_payload JSONB,
    output_payload JSONB,
    tokens_used INT,
    cost_estimated_cents FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. MODERATION FLAGS
CREATE TYPE flag_severity AS ENUM ('low', 'medium', 'high');
CREATE TYPE flag_entity_type AS ENUM ('user', 'listing', 'review');

CREATE TABLE moderation_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type flag_entity_type NOT NULL,
    entity_id UUID NOT NULL,
    flagged_by UUID REFERENCES users(id), -- or NULL if system
    reason TEXT,
    severity flag_severity DEFAULT 'low',
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. AUDIT LOGS (Security)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL, -- e.g., 'kyc_approved', 'refund_processed'
    target_type VARCHAR(50),
    target_id UUID,
    ip_address INET,
    user_agent TEXT,
    meta_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
