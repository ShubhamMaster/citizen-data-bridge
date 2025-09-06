
-- Fix Investment Inquiries table - Add missing investment_type column
ALTER TABLE investment_inquiries 
ADD COLUMN investment_type TEXT;

-- Update Innovation Lab Applications table to match the form fields
ALTER TABLE innovation_lab_applications 
ADD COLUMN organization TEXT,
ADD COLUMN role TEXT,
ADD COLUMN experience_level TEXT NOT NULL DEFAULT 'beginner',
ADD COLUMN areas_of_interest TEXT[] DEFAULT '{}',
ADD COLUMN project_idea TEXT,
ADD COLUMN collaboration_interest TEXT,
ADD COLUMN availability TEXT,
ADD COLUMN linkedin_profile TEXT,
ADD COLUMN portfolio_url TEXT,
ADD COLUMN additional_info TEXT;

-- Rename existing columns to match form
ALTER TABLE innovation_lab_applications 
RENAME COLUMN idea_description TO project_idea_old;

-- Update the table structure to be consistent
ALTER TABLE innovation_lab_applications 
ALTER COLUMN project_idea SET NOT NULL;

-- Remove old columns that are no longer needed
ALTER TABLE innovation_lab_applications 
DROP COLUMN IF EXISTS background,
DROP COLUMN IF EXISTS skills,
DROP COLUMN IF EXISTS project_idea_old;

-- Fix consultation requests table to handle empty date strings better
ALTER TABLE consultation_requests 
ALTER COLUMN preferred_date DROP NOT NULL;
