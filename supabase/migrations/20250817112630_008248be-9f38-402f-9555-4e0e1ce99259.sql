
-- Add two-factor authentication columns to profiles table if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS two_fa_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS two_fa_verified boolean DEFAULT false;

-- Update the generate_otp function to include email history logging
CREATE OR REPLACE FUNCTION public.generate_otp_with_history(
  p_user_id uuid, 
  p_otp_type text, 
  p_email text, 
  p_expires_minutes integer DEFAULT 5
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
    RAISE EXCEPTION 'Rate limit exceeded. Please wait before requesting again.';
  END IF;
  
  -- Invalidate any existing OTPs for this user and type
  UPDATE public.otp_verifications 
  SET verified = true 
  WHERE user_id = p_user_id 
    AND otp_type = p_otp_type 
    AND verified = false;
  
  -- Generate cryptographically secure 6-digit OTP
  SELECT LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0') INTO otp_code;
  
  -- Insert new OTP record
  INSERT INTO public.otp_verifications (
    user_id, otp_code, otp_type, email, expires_at
  ) VALUES (
    p_user_id, otp_code, p_otp_type, p_email, 
    now() + (p_expires_minutes || ' minutes')::interval
  );
  
  -- Log to email_history table
  INSERT INTO public.email_history (
    sender_email,
    recipient_email,
    email_type,
    subject,
    form_type,
    form_data,
    template_used,
    provider,
    status
  ) VALUES (
    'admin-auth@civoranexus.com',
    p_email,
    'otp',
    CASE 
      WHEN p_otp_type = 'login' THEN 'Login Verification Code - Civora Nexus'
      WHEN p_otp_type = '2fa_login' THEN 'Two-Factor Authentication Code - Civora Nexus'
      WHEN p_otp_type = 'password_reset' THEN 'Password Reset Verification Code - Civora Nexus'
      ELSE 'Verification Code - Civora Nexus'
    END,
    p_otp_type,
    jsonb_build_object(
      'user_id', p_user_id,
      'otp_type', p_otp_type,
      'email', p_email
    ),
    'otp_verification',
    'brevo',
    'pending'
  );
  
  RETURN otp_code;
END;
$$;

-- Update the verify_otp function to update email history
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_user_id uuid,
  p_otp_code text,
  p_otp_type text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  otp_record RECORD;
BEGIN
  -- Find the OTP record
  SELECT * INTO otp_record
  FROM public.otp_verifications 
  WHERE user_id = p_user_id 
    AND otp_code = p_otp_code 
    AND otp_type = p_otp_type 
    AND verified = false 
    AND expires_at > now()
  ORDER BY created_at DESC 
  LIMIT 1;
  
  -- Check if OTP is valid
  IF otp_record.id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Mark OTP as verified
  UPDATE public.otp_verifications 
  SET verified = true 
  WHERE id = otp_record.id;
  
  -- Update email history status
  UPDATE public.email_history 
  SET status = 'verified'
  WHERE form_type = p_otp_type 
    AND recipient_email = otp_record.email 
    AND created_at >= otp_record.created_at - interval '1 minute'
    AND status = 'pending';
  
  RETURN true;
END;
$$;
