
-- Create missing tables for investment inquiries and project inquiries

-- Investment inquiries table (if it doesn't exist with proper structure)
CREATE TABLE IF NOT EXISTS public.investment_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  investment_amount TEXT,
  investment_type TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT,
  budget_range TEXT,
  timeline TEXT,
  project_description TEXT NOT NULL,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for investment inquiries
ALTER TABLE public.investment_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read access to investment_inquiries" 
  ON public.investment_inquiries
  FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow public insert to investment_inquiries" 
  ON public.investment_inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin update investment_inquiries" 
  ON public.investment_inquiries
  FOR UPDATE
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow admin delete investment_inquiries" 
  ON public.investment_inquiries
  FOR DELETE
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Add RLS policies for project inquiries
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read access to project_inquiries" 
  ON public.project_inquiries
  FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow public insert to project_inquiries" 
  ON public.project_inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin update project_inquiries" 
  ON public.project_inquiries
  FOR UPDATE
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Allow admin delete project_inquiries" 
  ON public.project_inquiries
  FOR DELETE
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Add trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at if they don't exist
DROP TRIGGER IF EXISTS update_investment_inquiries_updated_at ON public.investment_inquiries;
CREATE TRIGGER update_investment_inquiries_updated_at
    BEFORE UPDATE ON public.investment_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_inquiries_updated_at ON public.project_inquiries;
CREATE TRIGGER update_project_inquiries_updated_at
    BEFORE UPDATE ON public.project_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
