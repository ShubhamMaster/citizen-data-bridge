
-- Add a new column for mobile number to scheduled_calls
ALTER TABLE public.scheduled_calls
ADD COLUMN mobile TEXT;

