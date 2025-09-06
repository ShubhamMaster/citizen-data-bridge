-- Critical Security Fixes

-- 1. Enable RLS on website_case_studies table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'website_case_studies') THEN
        ALTER TABLE public.website_case_studies ENABLE ROW LEVEL SECURITY;
        
        -- Add policies for website_case_studies
        DROP POLICY IF EXISTS "Public can read case studies" ON public.website_case_studies;
        DROP POLICY IF EXISTS "Super admins can manage case studies" ON public.website_case_studies;
        
        CREATE POLICY "Public can read case studies" 
        ON public.website_case_studies 
        FOR SELECT 
        USING (true);
        
        CREATE POLICY "Super admins can manage case studies" 
        ON public.website_case_studies 
        FOR ALL 
        USING (has_role(auth.uid(), 'super_admin'::user_role));
    END IF;
END $$;

-- 2. Fix Privilege Escalation - Secure role updates
-- Drop existing problematic policies and create secure ones
DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Users can only view their own profile but cannot update their role
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Super admins can view all profiles
CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Super admins can update profiles (including roles)
CREATE POLICY "Super admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Users can update their own profile BUT NOT their role
CREATE POLICY "Users can update own profile except role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id AND OLD.role = NEW.role);

-- 3. Improve OTP security - reduce expiry time and add cleanup
-- Update OTP generation function to use 5 minutes instead of 10
CREATE OR REPLACE FUNCTION public.generate_otp(p_user_id uuid, p_otp_type text, p_email text, p_expires_minutes integer DEFAULT 5)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  otp_code TEXT;
  existing_count INTEGER;
BEGIN
  -- Rate limiting: Check if user has generated more than 3 OTPs in last 15 minutes
  SELECT COUNT(*) INTO existing_count
  FROM public.otp_verifications 
  WHERE user_id = p_user_id 
    AND otp_type = p_otp_type 
    AND created_at > now() - interval '15 minutes';
    
  IF existing_count >= 3 THEN
    RAISE EXCEPTION 'Too many OTP requests. Please wait before requesting again.';
  END IF;
  
  -- Invalidate any existing OTPs for this user and type
  UPDATE public.otp_verifications 
  SET verified = true 
  WHERE user_id = p_user_id 
    AND otp_type = p_otp_type 
    AND verified = false;
  
  -- Generate 6-digit OTP
  otp_code := LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  
  -- Insert new OTP record
  INSERT INTO public.otp_verifications (
    user_id, otp_code, otp_type, email, expires_at
  ) VALUES (
    p_user_id, otp_code, p_otp_type, p_email, 
    now() + (p_expires_minutes || ' minutes')::interval
  );
  
  RETURN otp_code;
END;
$function$;

-- 4. Improve OTP verification to invalidate after use
CREATE OR REPLACE FUNCTION public.verify_otp(p_user_id uuid, p_otp_code text, p_otp_type text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  is_valid BOOLEAN := false;
  otp_record RECORD;
BEGIN
  -- Check if OTP is valid and not expired
  SELECT * INTO otp_record
  FROM public.otp_verifications 
  WHERE user_id = p_user_id 
    AND otp_code = p_otp_code 
    AND otp_type = p_otp_type 
    AND verified = false 
    AND expires_at > now()
  FOR UPDATE;
  
  IF FOUND THEN
    -- Mark OTP as verified (invalidates it)
    UPDATE public.otp_verifications 
    SET verified = true 
    WHERE id = otp_record.id;
    
    is_valid := true;
  END IF;
  
  RETURN is_valid;
END;
$function$;

-- 5. Fix database function search paths
CREATE OR REPLACE FUNCTION public.update_login_stats(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, required_role user_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = required_role
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role::TEXT INTO user_role
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_role, 'user');
END;
$function$;

-- 6. Add security logging function
CREATE OR REPLACE FUNCTION public.log_security_event(p_user_id uuid, p_event_type text, p_details jsonb DEFAULT NULL, p_ip_address text DEFAULT NULL)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.admin_logs (
    admin_id, action, table_name, new_data, ip_address, user_agent
  ) VALUES (
    p_user_id, 'SECURITY_EVENT: ' || p_event_type, 'security_events', 
    jsonb_build_object('event_type', p_event_type, 'details', p_details), 
    p_ip_address, 'System'
  );
END;
$function$;