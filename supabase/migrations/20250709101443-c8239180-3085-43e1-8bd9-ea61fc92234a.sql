
-- Insert a test admin user into the profiles table
-- First, we need to insert into auth.users (this is handled by Supabase Auth)
-- But we can insert directly into profiles for testing

INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@test.com',
  'Test Admin',
  'super_admin',
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Note: Since we're using Supabase Auth, we'll need to create the actual auth user
-- through the sign-up process or admin API, but this gives us the profile structure
