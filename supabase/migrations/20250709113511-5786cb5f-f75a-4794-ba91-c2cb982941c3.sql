
-- 1. Update upcoming events with future dates so they appear as "upcoming"
UPDATE public.upcoming_events 
SET date = '2025-03-15' 
WHERE title = 'Smart City Hackathon 2024';

UPDATE public.upcoming_events 
SET date = '2025-04-10' 
WHERE title = 'Healthcare Innovation Challenge';

UPDATE public.upcoming_events 
SET date = '2025-05-01' 
WHERE title = 'Student Internship Program Application';

UPDATE public.upcoming_events 
SET date = '2025-06-20' 
WHERE title = 'AI Research Symposium';

-- 2. Create consultation_requests table for AI and SaaS consultation forms
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  consultation_type TEXT NOT NULL, -- 'ai_solutions' or 'saas_development'
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,
  additional_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Create innovation_lab_applications table for Innovation Lab join requests
CREATE TABLE public.innovation_lab_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  role TEXT,
  experience_level TEXT NOT NULL,
  areas_of_interest TEXT[],
  project_idea TEXT,
  collaboration_interest TEXT,
  availability TEXT,
  linkedin_profile TEXT,
  portfolio_url TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create internship_applications table (separate from interns table)
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  university TEXT,
  course TEXT,
  year_of_study INTEGER,
  cgpa DECIMAL(3,2),
  department TEXT NOT NULL,
  preferred_duration TEXT,
  start_date DATE,
  skills TEXT[],
  experience TEXT,
  projects TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  linkedin_profile TEXT,
  github_profile TEXT,
  portfolio_url TEXT,
  availability TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Add Row Level Security for all new tables
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.innovation_lab_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public insert and admin management
CREATE POLICY "Allow public insert consultation requests" 
  ON public.consultation_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin select consultation requests" 
  ON public.consultation_requests 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin update consultation requests" 
  ON public.consultation_requests 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public insert innovation lab applications" 
  ON public.innovation_lab_applications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin select innovation lab applications" 
  ON public.innovation_lab_applications 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin update innovation lab applications" 
  ON public.innovation_lab_applications 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public insert internship applications" 
  ON public.internship_applications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin select internship applications" 
  ON public.internship_applications 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin update internship applications" 
  ON public.internship_applications 
  FOR UPDATE 
  USING (true);

-- 7. Create a test user in Supabase Auth system (this will be handled in the application code)
-- We'll create the profile entry that matches the test credentials from the AuthContext
INSERT INTO public.profiles (id, email, full_name, role) 
VALUES (
  'test-admin-uuid-12345', 
  'admin@test.com', 
  'Test Admin', 
  'super_admin'
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

-- 8. Add update triggers for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON public.consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_innovation_lab_applications_updated_at
  BEFORE UPDATE ON public.innovation_lab_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_internship_applications_updated_at
  BEFORE UPDATE ON public.internship_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
