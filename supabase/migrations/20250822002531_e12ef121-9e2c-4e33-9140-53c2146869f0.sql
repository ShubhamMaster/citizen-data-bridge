-- Add missing two_fa_enabled column to profiles table
-- The current table has twoFactorEnabled but code expects two_fa_enabled  
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS two_fa_enabled boolean DEFAULT false;

-- Copy data from twoFactorEnabled to two_fa_enabled if it exists
UPDATE public.profiles SET two_fa_enabled = "twoFactorEnabled" WHERE "twoFactorEnabled" IS NOT NULL;

-- Drop the old camelCase column to maintain consistency
ALTER TABLE public.profiles DROP COLUMN IF EXISTS "twoFactorEnabled";