
-- Phase 1: Database Cleanup & Consolidation
-- Merge AI consultation into regular consultation and create email history table

-- First, migrate data from ai_consultation_requests to consultation_requests
INSERT INTO consultation_requests (
  name, email, phone, company, message, created_at, consultation_type, service_type
)
SELECT 
  name, 
  email, 
  phone, 
  organization as company,
  COALESCE(message, '') || 
  CASE 
    WHEN current_challenges IS NOT NULL THEN ' | Current Challenges: ' || current_challenges 
    ELSE '' 
  END ||
  CASE 
    WHEN ai_use_case IS NOT NULL THEN ' | AI Use Case: ' || ai_use_case 
    ELSE '' 
  END as message,
  created_at,
  'technical' as consultation_type,
  'AI Consultation' as service_type
FROM ai_consultation_requests;

-- Drop the ai_consultation_requests table
DROP TABLE ai_consultation_requests;

-- Create email history table for tracking all emails
CREATE TABLE public.email_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  form_type TEXT,
  form_data JSONB,
  template_used TEXT,
  error_details TEXT,
  message_id TEXT,
  provider TEXT DEFAULT 'brevo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on email_history table
ALTER TABLE public.email_history ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access to email history
CREATE POLICY "Super admins can manage email history" 
  ON public.email_history 
  FOR ALL 
  USING (has_role(auth.uid(), 'super_admin'::user_role));

-- Create policy for system to insert email history
CREATE POLICY "System can insert email history" 
  ON public.email_history 
  FOR INSERT 
  WITH CHECK (true);

-- Add trigger to update updated_at column
CREATE TRIGGER update_email_history_updated_at 
  BEFORE UPDATE ON public.email_history 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();
