
-- Create upcoming_events table for Innovation Lab events
CREATE TABLE public.upcoming_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  image_url TEXT,
  register_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.upcoming_events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public information)
CREATE POLICY "Allow public read access to upcoming events" 
  ON public.upcoming_events 
  FOR SELECT 
  USING (true);

-- Create policy for admin insert/update/delete access
CREATE POLICY "Allow admin full access to upcoming events" 
  ON public.upcoming_events 
  FOR ALL 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Insert some sample upcoming events for testing
INSERT INTO public.upcoming_events (title, date, description, image_url, register_link) VALUES
('Smart City Hackathon 2024', '2024-03-15', '48-hour hackathon focused on solving urban challenges with technology', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', '/contact/sales'),
('Healthcare Innovation Challenge', '2024-04-10', 'Monthly challenge to develop healthcare solutions using AI and IoT', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80', '/contact/sales'),
('Student Internship Program Application', '2024-05-01', 'Applications open for summer internship program', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', '/careers/internships'),
('AI Research Symposium', '2024-06-20', 'Annual symposium showcasing latest AI research and developments', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', '/contact/sales');
