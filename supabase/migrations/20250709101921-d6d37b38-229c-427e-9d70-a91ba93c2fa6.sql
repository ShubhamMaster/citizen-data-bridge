
-- Insert test admin user into admin_users table
-- Password hash for 'TestAdmin123!' using bcrypt
INSERT INTO public.admin_users (
  id,
  name,
  email,
  password_hash,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Test Admin',
  'admin@test.com',
  '$2b$10$rQvM1Q7ZxJ.kJ8vN2H4qCOX8F7yYzN5hK9wL2P3mT6vA8eR9gQ1Ke',
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  updated_at = now();
