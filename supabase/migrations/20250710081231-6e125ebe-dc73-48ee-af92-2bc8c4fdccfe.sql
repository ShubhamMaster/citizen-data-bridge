
-- Create consultation_requests table for general consultations
CREATE TABLE IF NOT EXISTS public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT,
  message TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create AI consultation requests table
CREATE TABLE IF NOT EXISTS public.ai_consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  ai_use_case TEXT,
  current_challenges TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create SaaS project requests table
CREATE TABLE IF NOT EXISTS public.saas_project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_idea TEXT NOT NULL,
  target_users TEXT,
  key_features TEXT,
  budget_range TEXT,
  timeline TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create technical consultations table
CREATE TABLE IF NOT EXISTS public.technical_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  technical_requirements TEXT NOT NULL,
  current_system TEXT,
  integration_needs TEXT,
  timeline TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create partners inquiries table
CREATE TABLE IF NOT EXISTS public.partners_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  partnership_type TEXT,
  proposal_details TEXT,
  website TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add additional columns to company_project table for detailed project information
ALTER TABLE public.company_project 
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS full_description TEXT,
ADD COLUMN IF NOT EXISTS technologies_used TEXT[],
ADD COLUMN IF NOT EXISTS team_size INTEGER,
ADD COLUMN IF NOT EXISTS duration_months INTEGER,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS project_status TEXT DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS key_features TEXT[],
ADD COLUMN IF NOT EXISTS challenges_solved TEXT[],
ADD COLUMN IF NOT EXISTS impact_metrics JSONB,
ADD COLUMN IF NOT EXISTS project_gallery JSONB;

-- Create RLS policies for new tables
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saas_project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public insert and admin read for consultation_requests
CREATE POLICY "Allow public insert to consultation_requests" 
  ON consultation_requests FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to consultation_requests" 
  ON consultation_requests FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Allow public insert and admin read for ai_consultation_requests
CREATE POLICY "Allow public insert to ai_consultation_requests" 
  ON ai_consultation_requests FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to ai_consultation_requests" 
  ON ai_consultation_requests FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Allow public insert and admin read for saas_project_requests
CREATE POLICY "Allow public insert to saas_project_requests" 
  ON saas_project_requests FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to saas_project_requests" 
  ON saas_project_requests FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Allow public insert and admin read for technical_consultations
CREATE POLICY "Allow public insert to technical_consultations" 
  ON technical_consultations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to technical_consultations" 
  ON technical_consultations FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Allow public insert and admin read for partners_inquiries
CREATE POLICY "Allow public insert to partners_inquiries" 
  ON partners_inquiries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin read access to partners_inquiries" 
  ON partners_inquiries FOR SELECT 
  USING (has_role(auth.uid(), 'super_admin'::user_role));
