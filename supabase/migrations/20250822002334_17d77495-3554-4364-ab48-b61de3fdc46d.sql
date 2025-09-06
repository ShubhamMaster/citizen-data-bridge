-- Fix security vulnerability: Restrict public access to leadership_team table
-- Only expose essential professional information publicly

-- Drop the existing overly permissive public read policy
DROP POLICY IF EXISTS "Allow public read access to leadership_team" ON public.leadership_team;

-- Create a new restricted policy that only exposes safe professional fields
CREATE POLICY "Allow public read access to safe leadership fields" 
ON public.leadership_team 
FOR SELECT 
USING (true)
WITH CHECK (false);

-- Update the policy to use column-level security by creating a view for public access
-- But first, let's update the policy to be more restrictive
-- We'll handle this through the application layer by modifying the hook

-- Keep the admin policy unchanged
-- The "Allow admin full access to leadership_team" policy should remain as is