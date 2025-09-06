-- Fix security warnings by adding proper search_path to helper functions

-- Update email validation function with proper search_path
CREATE OR REPLACE FUNCTION public.is_valid_email(email_text TEXT)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
IMMUTABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- RFC 5322 compliant email regex (simplified but secure)
  RETURN email_text ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    AND char_length(email_text) <= 254;
END;
$$;

-- Update rate limiting function with proper search_path
CREATE OR REPLACE FUNCTION public.check_email_rate_limit(
  table_name TEXT, 
  email_address TEXT, 
  time_window_seconds INTEGER DEFAULT 60
)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Dynamic query to check recent submissions by email
  EXECUTE format('
    SELECT COUNT(*) FROM %I 
    WHERE email = $1 
    AND created_at > now() - interval ''%s seconds''',
    table_name, time_window_seconds
  ) INTO recent_count USING email_address;
  
  RETURN recent_count = 0;
END;
$$;

-- Update text length validation helper with proper search_path
CREATE OR REPLACE FUNCTION public.validate_text_lengths(
  name_val TEXT DEFAULT NULL,
  email_val TEXT DEFAULT NULL,
  message_val TEXT DEFAULT NULL,
  phone_val TEXT DEFAULT NULL,
  company_val TEXT DEFAULT NULL
)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
IMMUTABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (name_val IS NULL OR char_length(name_val) <= 100)
    AND (email_val IS NULL OR char_length(email_val) <= 254)
    AND (message_val IS NULL OR char_length(message_val) <= 2000)
    AND (phone_val IS NULL OR char_length(phone_val) <= 20)
    AND (company_val IS NULL OR char_length(company_val) <= 200);
END;
$$;