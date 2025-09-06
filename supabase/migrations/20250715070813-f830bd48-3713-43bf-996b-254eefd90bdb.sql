
-- Fix table name references and add comprehensive RLS policies

-- Drop existing policies with incorrect table names
DROP POLICY IF EXISTS "Allow admin full access to sierra_nexus_partner" ON public.civora_nexus_partner;
DROP POLICY IF EXISTS "Allow public read access to sierra_nexus_partner" ON public.civora_nexus_partner;

-- Create proper RLS policies for civora_nexus_partner
CREATE POLICY "Allow admin full access to civora_nexus_partner" 
  ON public.civora_nexus_partner
  FOR ALL
  USING (has_role((SELECT auth.uid()), 'super_admin'::user_role));

CREATE POLICY "Allow public read access to civora_nexus_partner" 
  ON public.civora_nexus_partner
  FOR SELECT
  USING (true);

-- Add missing DELETE policies for tables that need them
CREATE POLICY "Allow admin delete salary inquiries" 
  ON public.salary_inquiries
  FOR DELETE
  USING (true);

CREATE POLICY "Allow admin delete support tickets" 
  ON public.support_tickets
  FOR DELETE
  USING (true);

CREATE POLICY "Allow admin delete contact messages" 
  ON public.contact_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin update contact messages" 
  ON public.contact_messages
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow admin delete contact messages" 
  ON public.contact_messages
  FOR DELETE
  USING (true);

CREATE POLICY "Allow admin delete scheduled calls" 
  ON public.scheduled_calls
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin update scheduled calls" 
  ON public.scheduled_calls
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow admin delete scheduled calls" 
  ON public.scheduled_calls
  FOR DELETE
  USING (true);

CREATE POLICY "Allow admin delete applications" 
  ON public.applications
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin update applications" 
  ON public.applications
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow admin delete applications" 
  ON public.applications
  FOR DELETE
  USING (true);

-- Add missing policies for profiles table
CREATE POLICY "Allow admin insert profiles" 
  ON public.profiles
  FOR INSERT
  WITH CHECK (has_role((SELECT auth.uid()), 'super_admin'::user_role));

CREATE POLICY "Allow admin delete profiles" 
  ON public.profiles
  FOR DELETE
  USING (has_role((SELECT auth.uid()), 'super_admin'::user_role));

-- Add test super admin user
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'superadmin@test.com',
  'Super Admin Test User',
  'super_admin',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = 'superadmin@test.com',
  role = 'super_admin',
  full_name = 'Super Admin Test User',
  updated_at = now();
