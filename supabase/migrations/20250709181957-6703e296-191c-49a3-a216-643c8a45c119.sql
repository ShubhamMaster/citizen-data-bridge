
-- Create company_project table for projects data
CREATE TABLE public.company_project (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sierra_nexus_partner table for partners
CREATE TABLE public.sierra_nexus_partner (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  min_partner INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leadership_team table for team members
CREATE TABLE public.leadership_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  preference_number INTEGER DEFAULT 999,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create investment_inquiries table for investor forms
CREATE TABLE public.investment_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  investment_amount TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create join_lab_forms table for innovation lab applications
CREATE TABLE public.join_lab_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  interest_area TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create event_registrations table for event registrations
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.upcoming_events(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create collaboration_requests table for R&D collaboration
CREATE TABLE public.collaboration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  collaboration_type TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_submissions table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  inquiry_type TEXT DEFAULT 'general',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.company_project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sierra_nexus_partner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.join_lab_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and insert
CREATE POLICY "Allow public read access to company_project" ON public.company_project FOR SELECT USING (true);
CREATE POLICY "Allow public read access to sierra_nexus_partner" ON public.sierra_nexus_partner FOR SELECT USING (true);
CREATE POLICY "Allow public read access to leadership_team" ON public.leadership_team FOR SELECT USING (true);

-- Allow public insert for form submissions
CREATE POLICY "Allow public insert to investment_inquiries" ON public.investment_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to join_lab_forms" ON public.join_lab_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to event_registrations" ON public.event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to collaboration_requests" ON public.collaboration_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Admin access for managing content
CREATE POLICY "Allow admin full access to company_project" ON public.company_project FOR ALL USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin full access to sierra_nexus_partner" ON public.sierra_nexus_partner FOR ALL USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin full access to leadership_team" ON public.leadership_team FOR ALL USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Admin read access for form submissions
CREATE POLICY "Allow admin read access to investment_inquiries" ON public.investment_inquiries FOR SELECT USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin read access to join_lab_forms" ON public.join_lab_forms FOR SELECT USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin read access to event_registrations" ON public.event_registrations FOR SELECT USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin read access to collaboration_requests" ON public.collaboration_requests FOR SELECT USING (has_role(auth.uid(), 'super_admin'::user_role));
CREATE POLICY "Allow admin read access to contact_submissions" ON public.contact_submissions FOR SELECT USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Insert sample data for testing
INSERT INTO public.company_project (title, description, image_url, link) VALUES
('Smart Village Platform', 'Empowering rural communities with digital solutions for education, health, and governance.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80', '/projects/smart-village'),
('CivicOne Portal', 'A unified portal bringing together city services for citizens and administrators.', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80', '/projects/civic-one'),
('HealthBridge', 'Seamless health information exchange and patient engagement system.', 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80', '/projects/health-bridge'),
('Urban Data Insight', 'Data analytics platform for smarter urban planning and traffic management.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', '/projects/urban-data'),
('NGO Impact Tracker', 'A suite for NGOs to measure, showcase, and increase their social impact.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', '/projects/impact-tracker');

INSERT INTO public.sierra_nexus_partner (name, image_url, description, min_partner) VALUES
('CityHealth', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=160&q=80', 'Healthcare technology partner', 1),
('CivicOne', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=160&q=80', 'Digital governance solutions', 1),
('GlobalReach', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=160&q=80', 'Global technology partner', 1),
('OpenGov', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=160&q=80', 'Open government initiative', 1);

INSERT INTO public.leadership_team (name, role, description, image_url, preference_number) VALUES
('Sarah Johnson', 'CEO & Founder', 'Visionary leader with 15+ years in civic technology and digital transformation.', 'https://images.unsplash.com/photo-1494790108755-2616b612b829?auto=format&fit=crop&w=300&q=80', 1),
('Michael Chen', 'CTO', 'Technology expert specializing in AI solutions and scalable platform architecture.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', 2),
('Dr. Priya Sharma', 'Head of Research', 'Leading researcher in civic technology with PhD in Computer Science.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80', 3),
('David Rodriguez', 'Head of Operations', 'Operations expert ensuring smooth delivery and client satisfaction.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 4);
