
-- Create API keys management table
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key_name TEXT NOT NULL,
  api_key TEXT NOT NULL,
  service_type TEXT NOT NULL, -- openai, stripe, twilio, etc
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Super admins can manage API keys" 
  ON public.api_keys 
  FOR ALL 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Create function to update API key usage
CREATE OR REPLACE FUNCTION public.update_api_key_usage(key_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.api_keys 
  SET 
    usage_count = COALESCE(usage_count, 0) + 1,
    last_used_at = now(),
    updated_at = now()
  WHERE id = key_id;
END;
$$;

-- Add trigger for updated_at
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
