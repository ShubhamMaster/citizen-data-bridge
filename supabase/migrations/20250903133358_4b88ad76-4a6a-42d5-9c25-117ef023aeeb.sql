-- Remove consultation and internship forms and their database tables

-- Drop consultation_requests table
DROP TABLE IF EXISTS public.consultation_requests CASCADE;

-- Drop internship_applications table  
DROP TABLE IF EXISTS public.internship_applications CASCADE;