
-- Create a table to store editable content sections for the website
CREATE TABLE public.website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE, -- e.g., 'hero', 'services', 'about', 'contact'
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to SELECT content
CREATE POLICY "Authenticated can read content"
  ON public.website_content
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow all authenticated users to INSERT content (prototype, tighten later)
CREATE POLICY "Authenticated can insert content"
  ON public.website_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow all authenticated users to UPDATE content (prototype, tighten later)
CREATE POLICY "Authenticated can update content"
  ON public.website_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow all authenticated users to DELETE content (prototype, tighten later)
CREATE POLICY "Authenticated can delete content"
  ON public.website_content
  FOR DELETE
  TO authenticated
  USING (true);
