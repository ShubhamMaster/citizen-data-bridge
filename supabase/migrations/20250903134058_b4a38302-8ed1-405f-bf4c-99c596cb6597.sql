-- Fix the security definer view issue
-- Remove the potentially unsafe view and create a properly secured one

-- Drop the current public view
DROP VIEW IF EXISTS public.employees_public;

-- Create a secure view without security definer issues
-- This view will only show non-sensitive employee information
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
    supervisor,
    created_at,
    updated_at
FROM public.employees 
WHERE is_deleted = false 
  AND work_status = 'Active'
  AND employee_id IS NOT NULL;

-- Enable RLS on the view
ALTER VIEW public.employees_public SET (security_invoker = on);

-- Create specific RLS policy for the public view
-- Only allow reading basic employee information for active employees
CREATE POLICY "Allow reading basic employee info from public view" 
ON public.employees_public 
FOR SELECT 
USING (true);

-- Grant appropriate permissions
REVOKE ALL ON public.employees_public FROM PUBLIC;
GRANT SELECT ON public.employees_public TO authenticated;
GRANT SELECT ON public.employees_public TO anon;