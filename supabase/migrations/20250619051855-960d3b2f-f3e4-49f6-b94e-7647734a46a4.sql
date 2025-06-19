
-- Create table for salary inquiries (fixed reserved word issue)
CREATE TABLE public.salary_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  department TEXT NOT NULL,
  experience_years INTEGER,
  current_salary TEXT,
  expected_salary TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for technical support tickets
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  issue_type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  system_info TEXT,
  error_details TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.salary_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert and admin select/update
CREATE POLICY "Allow public insert salary inquiries"
  ON public.salary_inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin select salary inquiries"
  ON public.salary_inquiries
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin update salary inquiries"
  ON public.salary_inquiries
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public insert support tickets"
  ON public.support_tickets
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin select support tickets"
  ON public.support_tickets
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin update support tickets"
  ON public.support_tickets
  FOR UPDATE
  USING (true);

-- Add indexes for better performance
CREATE INDEX idx_salary_inquiries_status ON public.salary_inquiries(status);
CREATE INDEX idx_salary_inquiries_created_at ON public.salary_inquiries(created_at DESC);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON public.support_tickets(created_at DESC);
CREATE INDEX idx_support_tickets_priority ON public.support_tickets(priority);
