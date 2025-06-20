
-- Add additional fields to interns table
ALTER TABLE public.interns 
ADD COLUMN phone TEXT,
ADD COLUMN start_date DATE,
ADD COLUMN end_date DATE,
ADD COLUMN location TEXT DEFAULT 'Remote',
ADD COLUMN resume_url TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN portfolio_url TEXT,
ADD COLUMN mentor_assigned TEXT,
ADD COLUMN notes TEXT;

-- Update the status enum to include more options
ALTER TABLE public.interns 
ALTER COLUMN status SET DEFAULT 'pending';

-- Add check constraint for location
ALTER TABLE public.interns 
ADD CONSTRAINT interns_location_check 
CHECK (location IN ('Onsite', 'Remote', 'Hybrid'));

-- Add check constraint for status
ALTER TABLE public.interns 
ADD CONSTRAINT interns_status_check 
CHECK (status IN ('pending', 'verified', 'completed', 'terminated'));
