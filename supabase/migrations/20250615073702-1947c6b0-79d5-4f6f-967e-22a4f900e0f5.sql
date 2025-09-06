
-- Create a table to log website visits
CREATE TABLE public.website_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  path TEXT NOT NULL,
  user_agent TEXT,
  device_brand TEXT,
  device_model TEXT,
  device_type TEXT,
  os_name TEXT,
  browser_name TEXT,
  ip_address TEXT,
  city TEXT,
  region TEXT,
  country TEXT
);

-- Allow anyone to insert a website visit
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert website visit (public)" 
  ON public.website_visits
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to select website visits (admin dashboard)
CREATE POLICY "Allow select website visit (public)" 
  ON public.website_visits
  FOR SELECT
  USING (true);
