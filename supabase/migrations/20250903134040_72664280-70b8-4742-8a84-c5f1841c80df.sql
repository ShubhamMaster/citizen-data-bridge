-- Fix security vulnerabilities identified in security review

-- 1. Secure website_visits table - remove public read access
DROP POLICY IF EXISTS "Allow select website visit (public)" ON public.website_visits;

-- Only allow super admins to read website visit data
CREATE POLICY "Super admins can read website visits"
  ON public.website_visits
  FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Keep insert policy for logging visits (edge function needs this)
-- The existing "Allow insert website visit (public)" policy remains

-- 2. Add search_path to database functions for security
CREATE OR REPLACE FUNCTION public.validate_text_lengths(name_val text DEFAULT NULL::text, email_val text DEFAULT NULL::text, message_val text DEFAULT NULL::text, phone_val text DEFAULT NULL::text, company_val text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN (name_val IS NULL OR char_length(name_val) <= 100)
    AND (email_val IS NULL OR char_length(email_val) <= 254)
    AND (message_val IS NULL OR char_length(message_val) <= 2000)
    AND (phone_val IS NULL OR char_length(phone_val) <= 20)
    AND (company_val IS NULL OR char_length(company_val) <= 200);
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_valid_email(email_text text)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- RFC 5322 compliant email regex (simplified but secure)
  RETURN email_text ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    AND char_length(email_text) <= 254;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_email_rate_limit(table_name text, email_address text, time_window_seconds integer DEFAULT 60)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;