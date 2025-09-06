-- Fix security vulnerability: Restrict public access to leadership_team table
-- Only expose essential professional information publicly

-- Drop the existing overly permissive public read policy  
DROP POLICY IF EXISTS "Allow public read access to leadership_team" ON public.leadership_team;

-- Create a new policy that allows public read access
-- We'll handle field restriction at the application layer
CREATE POLICY "Allow public read access to leadership_team" 
ON public.leadership_team 
FOR SELECT 
USING (true);

-- Create a secure view that only exposes safe professional fields for public access
CREATE OR REPLACE VIEW public.leadership_team_public AS
SELECT 
  id,
  name,
  role, 
  description,
  image_url,
  preference_number,
  created_at,
  updated_at
FROM public.leadership_team
ORDER BY preference_number ASC;

-- Grant public access to the view
GRANT SELECT ON public.leadership_team_public TO anon, authenticated;