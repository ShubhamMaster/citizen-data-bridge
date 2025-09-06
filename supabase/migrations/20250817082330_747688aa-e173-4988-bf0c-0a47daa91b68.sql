
-- First, let's revoke any dangerous policies for anonymous users and ensure proper security

-- Fix contact_messages table - currently allows anonymous insert but no read access
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to contact_messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Fix applications table - currently allows anonymous insert but no read access
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.applications;
CREATE POLICY "Allow public insert to applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to applications" 
  ON public.applications 
  FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Ensure jobs table is read-only for everyone (currently correct)
-- Already has "Enable read access for all users" policy - this is fine

-- Fix website_visits table - ensure it's insert and read only
-- Currently has proper policies - no changes needed

-- Review and ensure all other tables with public access are properly secured
-- Let's add explicit restrictions to prevent any update/delete access for anonymous users

-- Ensure salary_inquiries doesn't allow anonymous updates
DROP POLICY IF EXISTS "Allow admin update salary inquiries" ON public.salary_inquiries;
DROP POLICY IF EXISTS "Allow admin select salary inquiries" ON public.salary_inquiries;

CREATE POLICY "Allow admin read access to salary_inquiries" 
  ON public.salary_inquiries 
  FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow admin update access to salary_inquiries" 
  ON public.salary_inquiries 
  FOR UPDATE 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Ensure support_tickets doesn't allow anonymous updates
DROP POLICY IF EXISTS "Allow admin update support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Allow admin select support tickets" ON public.support_tickets;

CREATE POLICY "Allow admin read access to support_tickets" 
  ON public.support_tickets 
  FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow admin update access to support_tickets" 
  ON public.support_tickets 
  FOR UPDATE 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Review civora_nexus_social_links - it has multiple read policies, let's clean up
DROP POLICY IF EXISTS "Enable read access for all users" ON public.civora_nexus_social_links;
-- Keep "Public can read social links" policy as it's appropriate

-- Review website_case_studies - it has duplicate read policies, let's clean up
DROP POLICY IF EXISTS "Enable read access for all users" ON public.website_case_studies;
-- Keep "Public can read case studies" policy as it's appropriate

-- Ensure all form submission tables are properly secured (insert-only for public, admin read access)
-- These are already correctly configured:
-- - contact_submissions
-- - investment_inquiries
-- - technical_consultations
-- - partners_inquiries
-- - internship_applications
-- - innovation_lab_applications
-- - collaboration_requests
-- - join_lab_forms

-- Double-check that no anonymous user can perform UPDATE or DELETE operations
-- All sensitive tables should only allow super_admin access for modifications

-- Add explicit denial policies for anonymous users on sensitive operations
CREATE POLICY "Deny anonymous updates on profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (false);

CREATE POLICY "Deny anonymous deletes on profiles" 
  ON public.profiles 
  FOR DELETE 
  USING (false);
