-- Critical Security Fixes - Drop existing policies first

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "User can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

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

-- 2. Create secure RLS policies for profiles
-- Users can view their own profile
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

-- Super admins can insert profiles
CREATE POLICY "Super admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'super_admin'::user_role));

-- 3. Improve OTP security - reduce expiry time and add rate limiting
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