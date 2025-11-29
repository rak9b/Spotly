-- Sample Seed Data for Development

-- 1. Users
INSERT INTO users (id, email, password_hash, role) VALUES
('u0000000-0000-0000-0000-000000000001', 'alex@example.com', 'hashed_secret', 'tourist'),
('u0000000-0000-0000-0000-000000000002', 'kenji@example.com', 'hashed_secret', 'guide'),
('u0000000-0000-0000-0000-000000000003', 'maria@example.com', 'hashed_secret', 'guide');

-- 2. Profiles
INSERT INTO profiles (user_id, full_name, location_city, languages, interests, rating_avg, rating_count) VALUES
('u0000000-0000-0000-0000-000000000001', 'Alex Traveler', 'New York', '["English"]', '["Food", "Photography"]', 0, 0),
('u0000000-0000-0000-0000-000000000002', 'Kenji Sato', 'Tokyo', '["English", "Japanese"]', '["Music", "History"]', 4.9, 124),
('u0000000-0000-0000-0000-000000000003', 'Maria Gonzalez', 'Mexico City', '["English", "Spanish"]', '["Food", "Culture"]', 4.8, 89);

-- 3. Events
INSERT INTO events (id, host_id, title, description, city, start_time, end_time, price_cents, max_participants, images, status) VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'u0000000-0000-0000-0000-000000000002',
    'Hidden Jazz Bars of Tokyo',
    'Experience the vibrant underground jazz scene.',
    'Tokyo',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '2 days 3 hours',
    8500, -- $85.00
    6,
    '["https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=800&q=80"]',
    'open'
),
(
    'e0000000-0000-0000-0000-000000000002',
    'u0000000-0000-0000-0000-000000000003',
    'Street Food Walk in Mexico City',
    'Taste the best tacos and tamales.',
    'Mexico City',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '5 days 4 hours',
    4500, -- $45.00
    10,
    '["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"]',
    'open'
);

-- 4. Wallets
INSERT INTO wallets (user_id, balance_cents) VALUES
('u0000000-0000-0000-0000-000000000001', 15000), -- $150.00
('u0000000-0000-0000-0000-000000000002', 245000), -- $2450.00
('u0000000-0000-0000-0000-000000000003', 120000); -- $1200.00
