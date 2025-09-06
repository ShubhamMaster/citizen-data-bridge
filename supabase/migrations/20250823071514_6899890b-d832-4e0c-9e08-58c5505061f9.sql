-- Add required fields to profiles table for password reset and 2FA
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS reset_token text,
ADD COLUMN IF NOT EXISTS reset_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS password_reset_status text DEFAULT 'not_reset',
ADD COLUMN IF NOT EXISTS two_fa_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS two_fa_verified boolean DEFAULT false;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_reset_token ON public.profiles(reset_token) WHERE reset_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_two_fa_enabled ON public.profiles(two_fa_enabled) WHERE two_fa_enabled = true;