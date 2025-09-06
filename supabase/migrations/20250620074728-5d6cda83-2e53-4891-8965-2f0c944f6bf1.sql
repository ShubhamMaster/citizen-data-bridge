
-- Create interns table
CREATE TABLE public.interns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intern_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  internship_year INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  verification_token UUID UNIQUE DEFAULT gen_random_uuid(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create admin_users table for session management
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  last_login TIMESTAMPTZ,
  session_token UUID,
  session_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create function to generate unique intern IDs
CREATE OR REPLACE FUNCTION generate_intern_id(year INTEGER)
RETURNS TEXT AS $$
DECLARE
  sequence_num INTEGER;
  intern_id TEXT;
BEGIN
  -- Get the next sequence number for the year
  SELECT COALESCE(MAX(CAST(SUBSTRING(intern_id FROM 7) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM interns 
  WHERE internship_year = year;
  
  -- Format as IN{year}{6-digit sequence}
  intern_id := 'IN' || year::TEXT || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN intern_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for interns (public can verify, admins can manage)
CREATE POLICY "Allow public verification lookup"
  ON public.interns
  FOR SELECT
  USING (verification_token IS NOT NULL);

CREATE POLICY "Allow admin full access to interns"
  ON public.interns
  FOR ALL
  USING (true);

-- Create policies for admin users
CREATE POLICY "Allow admin self-management"
  ON public.admin_users
  FOR ALL
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_interns_year ON public.interns(internship_year);
CREATE INDEX idx_interns_verification_token ON public.interns(verification_token);
CREATE INDEX idx_interns_status ON public.interns(status);
CREATE INDEX idx_admin_users_session_token ON public.admin_users(session_token);
CREATE INDEX idx_admin_users_email ON public.admin_users(email);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_interns_updated_at
  BEFORE UPDATE ON public.interns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
