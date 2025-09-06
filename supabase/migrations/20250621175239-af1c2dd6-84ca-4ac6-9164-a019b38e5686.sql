
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('super_admin', 'admin', 'user');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  today_login_count INTEGER DEFAULT 0,
  last_login_date DATE
);

-- Create admin_sessions table for session tracking
CREATE TABLE public.admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create recycle_bin table for soft deletes
CREATE TABLE public.recycle_bin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_table TEXT NOT NULL,
  original_id TEXT NOT NULL,
  data JSONB NOT NULL,
  deleted_by UUID REFERENCES auth.users(id),
  deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  can_restore BOOLEAN DEFAULT true
);

-- Update interns table to add missing fields
ALTER TABLE public.interns 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Remote',
ADD COLUMN IF NOT EXISTS resume_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
ADD COLUMN IF NOT EXISTS mentor_assigned TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Add soft delete columns to other tables
ALTER TABLE public.scheduled_calls ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE public.scheduled_calls ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

ALTER TABLE public.salary_inquiries ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE public.salary_inquiries ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Enable RLS on new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycle_bin ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'user'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update login stats
CREATE OR REPLACE FUNCTION public.update_login_stats(user_id UUID)
RETURNS VOID AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
BEGIN
  UPDATE public.profiles 
  SET 
    last_login = NOW(),
    login_count = COALESCE(login_count, 0) + 1,
    today_login_count = CASE 
      WHEN last_login_date = today_date THEN COALESCE(today_login_count, 0) + 1
      ELSE 1
    END,
    last_login_date = today_date,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  SELECT role INTO user_role_result
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_role_result, 'user'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Super admins can update profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Super admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'super_admin'::user_role));

-- Create RLS policies for admin_sessions
CREATE POLICY "Users can view their own sessions" ON public.admin_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all sessions" ON public.admin_sessions
  FOR SELECT USING (public.has_role(auth.uid(), 'super_admin'::user_role));

-- Create RLS policies for recycle_bin
CREATE POLICY "Super admins can manage recycle bin" ON public.recycle_bin
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'::user_role));

-- Update existing table policies to respect soft deletes
DROP POLICY IF EXISTS "Allow admin full access to interns" ON public.interns;
CREATE POLICY "Super admins can manage interns" ON public.interns
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'::user_role));

-- Insert super admin user (this will be handled in the application)
-- We'll create this through the application signup flow

-- Create function for soft delete
CREATE OR REPLACE FUNCTION public.soft_delete_record(
  table_name TEXT,
  record_id TEXT,
  user_id UUID
)
RETURNS VOID AS $$
DECLARE
  record_data JSONB;
  sql_query TEXT;
BEGIN
  -- Get the record data before deletion
  sql_query := format('SELECT row_to_json(t.*) FROM %I t WHERE id = %L', table_name, record_id);
  EXECUTE sql_query INTO record_data;
  
  -- Insert into recycle bin
  INSERT INTO public.recycle_bin (original_table, original_id, data, deleted_by)
  VALUES (table_name, record_id, record_data, user_id);
  
  -- Mark as deleted in original table
  sql_query := format('UPDATE %I SET is_deleted = true, deleted_at = NOW() WHERE id = %L', table_name, record_id);
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for all tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.admin_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.recycle_bin REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recycle_bin;
