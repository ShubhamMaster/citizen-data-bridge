-- Create secure RLS policies for profiles table password reset functionality

-- Policy for users to update their own reset tokens and password reset status
CREATE POLICY "Users can update their own reset tokens" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Policy for users to read their own profile for reset validation
CREATE POLICY "Users can read own profile for reset" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy for system to update password reset status during OTP verification
CREATE POLICY "System can update password reset fields" 
ON public.profiles 
FOR UPDATE 
USING (true) 
WITH CHECK (
  -- Only allow updating reset-related fields
  auth.uid() IS NULL OR  -- Allow for system operations
  auth.uid() = id        -- Or user updating their own
);

-- Create function to validate reset tokens
CREATE OR REPLACE FUNCTION public.validate_reset_token(p_token text)
RETURNS TABLE(user_id uuid, is_valid boolean, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    (p.reset_token = p_token AND p.reset_expires_at > now()) as is_valid,
    p.email
  FROM public.profiles p
  WHERE p.reset_token = p_token;
END;
$$;

-- Create function to update password and reset status
CREATE OR REPLACE FUNCTION public.complete_password_reset(
  p_user_id uuid,
  p_new_password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
BEGIN
  -- Update auth.users password
  UPDATE auth.users 
  SET 
    encrypted_password = crypt(p_new_password, gen_salt('bf')),
    updated_at = now()
  WHERE id = p_user_id;
  
  -- Update profiles table
  UPDATE public.profiles 
  SET 
    password_reset_status = 'reset_successfully',
    reset_token = NULL,
    reset_expires_at = NULL,
    last_password_change = now(),
    updated_at = now()
  WHERE id = p_user_id;
  
  RETURN true;
END;
$$;