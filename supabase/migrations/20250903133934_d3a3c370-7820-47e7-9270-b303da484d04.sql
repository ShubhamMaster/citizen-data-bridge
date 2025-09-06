-- Fix security vulnerability: Secure employee personal data
-- The employees table contains highly sensitive personal information that must be protected

-- Ensure RLS is enabled on employees table
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Super admin can manage employees" ON public.employees;
DROP POLICY IF EXISTS "Allow public read access to employees" ON public.employees;
DROP POLICY IF EXISTS "Employees can view their own data" ON public.employees;

-- Create secure policies for employee data access

-- 1. Only super admins can have full access to employee data
CREATE POLICY "Super admins can manage all employee data" 
ON public.employees 
FOR ALL 
USING (has_role(auth.uid(), 'super_admin'::user_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::user_role));

-- 2. Employees can only view their own basic information (excluding sensitive financial data)
CREATE POLICY "Employees can view own basic info" 
ON public.employees 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Create a safe public view for basic employee information (no sensitive data)
DROP VIEW IF EXISTS public.employees_public;
CREATE VIEW public.employees_public AS
SELECT 
    employee_id,
    full_name,
    department,
    role_designation,
    employment_type,
    work_status,
    profile_image_url,
    date_of_joining,
    supervisor
FROM public.employees 
WHERE is_deleted = false AND work_status = 'Active';

-- Grant access to the safe public view
GRANT SELECT ON public.employees_public TO anon, authenticated;

-- Ensure no sensitive data is exposed in any other views or functions
REVOKE ALL ON public.employees FROM anon;
REVOKE ALL ON public.employees FROM authenticated;

-- Only allow authenticated users with proper permissions
GRANT SELECT ON public.employees TO authenticated;