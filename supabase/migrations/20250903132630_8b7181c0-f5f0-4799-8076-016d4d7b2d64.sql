-- Fix security vulnerability: Remove public access to sensitive leadership data
-- The leadership_team table contains sensitive personal information that should not be public

-- Remove the dangerous public read policy from leadership_team table
DROP POLICY IF EXISTS "Allow public read access to leadership_team" ON public.leadership_team;

-- Ensure leadership_team_public table has proper RLS (it should be safe for public access)
ALTER TABLE public.leadership_team_public ENABLE ROW LEVEL SECURITY;

-- Create a safe public read policy for leadership_team_public (contains only name, role, description, image_url)
DROP POLICY IF EXISTS "Allow public read access to leadership_team_public" ON public.leadership_team_public;
CREATE POLICY "Allow public read access to leadership_team_public" 
ON public.leadership_team_public 
FOR SELECT 
USING (true);

-- Ensure leadership_team_public is populated with safe data from leadership_team
-- This view will only expose safe fields for public consumption
CREATE OR REPLACE VIEW public.leadership_team_safe AS
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
ORDER BY preference_number ASC, name ASC;

-- Grant public access to the safe view
GRANT SELECT ON public.leadership_team_safe TO anon, authenticated;