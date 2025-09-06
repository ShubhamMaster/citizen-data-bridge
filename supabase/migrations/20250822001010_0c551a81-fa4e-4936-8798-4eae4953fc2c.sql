-- Step 1: Create Helper Functions for Security

-- Email validation function
CREATE OR REPLACE FUNCTION public.is_valid_email(email_text TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- RFC 5322 compliant email regex (simplified but secure)
  RETURN email_text ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    AND char_length(email_text) <= 254;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Rate limiting function for email-based submissions
CREATE OR REPLACE FUNCTION public.check_email_rate_limit(
  table_name TEXT, 
  email_address TEXT, 
  time_window_seconds INTEGER DEFAULT 60
)
RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Text length validation helper
CREATE OR REPLACE FUNCTION public.validate_text_lengths(
  name_val TEXT DEFAULT NULL,
  email_val TEXT DEFAULT NULL,
  message_val TEXT DEFAULT NULL,
  phone_val TEXT DEFAULT NULL,
  company_val TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (name_val IS NULL OR char_length(name_val) <= 100)
    AND (email_val IS NULL OR char_length(email_val) <= 254)
    AND (message_val IS NULL OR char_length(message_val) <= 2000)
    AND (phone_val IS NULL OR char_length(phone_val) <= 20)
    AND (company_val IS NULL OR char_length(company_val) <= 200);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Step 2: Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Allow public insert to contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public insert to investment_inquiries" ON investment_inquiries;
DROP POLICY IF EXISTS "Allow public insert to technical_consultations" ON technical_consultations;
DROP POLICY IF EXISTS "Allow public insert salary inquiries" ON salary_inquiries;
DROP POLICY IF EXISTS "Allow public insert to scheduled_calls" ON scheduled_calls;
DROP POLICY IF EXISTS "Allow public insert to collaboration_requests" ON collaboration_requests;
DROP POLICY IF EXISTS "Allow public insert to join_lab_forms" ON join_lab_forms;
DROP POLICY IF EXISTS "Allow public insert to event_registrations" ON event_registrations;
DROP POLICY IF EXISTS "Allow public insert to internship_applications" ON internship_applications;
DROP POLICY IF EXISTS "Allow public insert to consultation_requests" ON consultation_requests;
DROP POLICY IF EXISTS "Allow public insert to saas_project_requests" ON saas_project_requests;
DROP POLICY IF EXISTS "Allow public insert support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Allow public insert to applications" ON applications;
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Users insert their own inquiries" ON partners_inquiries;

-- Step 3: Create Secure INSERT Policies for Public Form Tables

-- Contact Submissions Policy
CREATE POLICY "Secure insert contact_submissions" ON contact_submissions
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('contact_submissions', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
);

-- Investment Inquiries Policy
CREATE POLICY "Secure insert investment_inquiries" ON investment_inquiries
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('investment_inquiries', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND investment_type IS NOT NULL
);

-- Technical Consultations Policy
CREATE POLICY "Secure insert technical_consultations" ON technical_consultations
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, NULL, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('technical_consultations', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND technical_requirements IS NOT NULL
  AND char_length(technical_requirements) <= 2000
);

-- Salary Inquiries Policy
CREATE POLICY "Secure insert salary_inquiries" ON salary_inquiries
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, additional_info, phone)
  AND is_valid_email(email)
  AND check_email_rate_limit('salary_inquiries', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND department IS NOT NULL
);

-- Scheduled Calls Policy
CREATE POLICY "Secure insert scheduled_calls" ON scheduled_calls
FOR INSERT WITH CHECK (
  validate_text_lengths(name, NULL, reason, mobile)
  AND name IS NOT NULL 
  AND date IS NOT NULL
  AND time IS NOT NULL
  AND reason IS NOT NULL
  AND char_length(reason) <= 500
);

-- Collaboration Requests Policy
CREATE POLICY "Secure insert collaboration_requests" ON collaboration_requests
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message, phone, organization)
  AND is_valid_email(email)
  AND check_email_rate_limit('collaboration_requests', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
);

-- Join Lab Forms Policy
CREATE POLICY "Secure insert join_lab_forms" ON join_lab_forms
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message, phone, organization)
  AND is_valid_email(email)
  AND check_email_rate_limit('join_lab_forms', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
);

-- Event Registrations Policy
CREATE POLICY "Secure insert event_registrations" ON event_registrations
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, NULL, phone)
  AND is_valid_email(email)
  AND check_email_rate_limit('event_registrations', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND event_id IS NOT NULL
);

-- Internship Applications Policy
CREATE POLICY "Secure insert internship_applications" ON internship_applications
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, skills, NULL, college)
  AND is_valid_email(email)
  AND check_email_rate_limit('internship_applications', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
);

-- Consultation Requests Policy
CREATE POLICY "Secure insert consultation_requests" ON consultation_requests
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('consultation_requests', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
);

-- SaaS Project Requests Policy
CREATE POLICY "Secure insert saas_project_requests" ON saas_project_requests
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, NULL, NULL, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('saas_project_requests', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND project_idea IS NOT NULL
  AND char_length(project_idea) <= 2000
);

-- Support Tickets Policy
CREATE POLICY "Secure insert support_tickets" ON support_tickets
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, NULL, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('support_tickets', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND issue_type IS NOT NULL
  AND subject IS NOT NULL
  AND description IS NOT NULL
  AND char_length(subject) <= 200
  AND char_length(description) <= 2000
);

-- Applications Policy (Job Applications)
CREATE POLICY "Secure insert applications" ON applications
FOR INSERT WITH CHECK (
  job_id IS NOT NULL
  AND application_data IS NOT NULL
  AND (application_data->>'name') IS NOT NULL
  AND (application_data->>'email') IS NOT NULL
  AND is_valid_email(application_data->>'email')
  AND char_length(application_data->>'name') <= 100
  AND char_length(application_data->>'email') <= 254
);

-- Contact Messages Policy
CREATE POLICY "Secure insert contact_messages" ON contact_messages
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, message)
  AND is_valid_email(email)
  AND check_email_rate_limit('contact_messages', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND message IS NOT NULL
);

-- Step 4: Fix Partners Inquiries Policy (User-specific table)
-- First, check if user_id column exists, if not we'll work with the current structure
CREATE POLICY "Secure insert partners_inquiries" ON partners_inquiries
FOR INSERT WITH CHECK (
  validate_text_lengths(name, email, proposal_details, phone, company)
  AND is_valid_email(email)
  AND check_email_rate_limit('partners_inquiries', email, 60)
  AND name IS NOT NULL 
  AND email IS NOT NULL
  AND company IS NOT NULL
  -- Note: This table uses 'id' field for user association, keeping current logic
  -- but adding proper validation. Consider adding user_id column in future.
);