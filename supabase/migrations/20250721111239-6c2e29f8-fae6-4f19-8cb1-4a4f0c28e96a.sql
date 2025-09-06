
-- Phase 1: Database Schema Enhancement
-- Add login_status column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS login_status TEXT DEFAULT 'logout';

-- Create admin_logs table for tracking all admin actions
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create otp_verifications table for OTP-based authentication
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  otp_code TEXT NOT NULL,
  otp_type TEXT NOT NULL, -- 'login', 'password_reset', 'sensitive_action'
  email TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add session management fields to profiles table if not already present
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS session_token TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS session_expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE;

-- Enable RLS on new tables
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_logs
CREATE POLICY "Super admins can manage admin logs" 
  ON public.admin_logs 
  FOR ALL 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Create policies for otp_verifications
CREATE POLICY "Super admins can manage OTP verifications" 
  ON public.otp_verifications 
  FOR ALL 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

CREATE POLICY "Users can view their own OTP verifications" 
  ON public.otp_verifications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert OTP verifications" 
  ON public.otp_verifications 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON public.admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON public.admin_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_user_id ON public.otp_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_otp_code ON public.otp_verifications(otp_code);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_expires_at ON public.otp_verifications(expires_at);
CREATE INDEX IF NOT EXISTS idx_profiles_login_status ON public.profiles(login_status);
CREATE INDEX IF NOT EXISTS idx_profiles_session_token ON public.profiles(session_token);

-- Create function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_otp()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.otp_verifications 
  WHERE expires_at < now();
END;
$$;

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_admin_id UUID,
  p_action TEXT,
  p_table_name TEXT DEFAULT NULL,
  p_record_id TEXT DEFAULT NULL,
  p_old_data JSONB DEFAULT NULL,
  p_new_data JSONB DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_logs (
    admin_id, action, table_name, record_id, 
    old_data, new_data, ip_address, user_agent
  ) VALUES (
    p_admin_id, p_action, p_table_name, p_record_id, 
    p_old_data, p_new_data, p_ip_address, p_user_agent
  );
END;
$$;

-- Create function to generate OTP
CREATE OR REPLACE FUNCTION public.generate_otp(
  p_user_id UUID,
  p_otp_type TEXT,
  p_email TEXT,
  p_expires_minutes INTEGER DEFAULT 10
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  otp_code TEXT;
BEGIN
  -- Generate 6-digit OTP
  otp_code := LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  
  -- Insert OTP record
  INSERT INTO public.otp_verifications (
    user_id, otp_code, otp_type, email, expires_at
  ) VALUES (
    p_user_id, otp_code, p_otp_type, p_email, 
    now() + (p_expires_minutes || ' minutes')::interval
  );
  
  RETURN otp_code;
END;
$$;

-- Create function to verify OTP
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_user_id UUID,
  p_otp_code TEXT,
  p_otp_type TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_valid BOOLEAN := false;
BEGIN
  -- Check if OTP is valid and not expired
  UPDATE public.otp_verifications 
  SET verified = true 
  WHERE user_id = p_user_id 
    AND otp_code = p_otp_code 
    AND otp_type = p_otp_type 
    AND verified = false 
    AND expires_at > now();
  
  GET DIAGNOSTICS is_valid = ROW_COUNT;
  
  RETURN is_valid > 0;
END;
$$;

-- Create function to update login status
CREATE OR REPLACE FUNCTION public.update_login_status(
  p_user_id UUID,
  p_status TEXT,
  p_session_token TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    login_status = p_status,
    session_token = p_session_token,
    session_expires_at = CASE 
      WHEN p_status = 'login' THEN now() + interval '2 hours'
      ELSE NULL
    END,
    last_activity = now(),
    last_login = CASE 
      WHEN p_status = 'login' THEN now()
      ELSE last_login
    END
  WHERE id = p_user_id;
END;
$$;
