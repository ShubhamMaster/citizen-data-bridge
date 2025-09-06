
-- Add "is_done" boolean column to scheduled_calls table, with default as false (not done)
ALTER TABLE public.scheduled_calls
ADD COLUMN is_done BOOLEAN NOT NULL DEFAULT FALSE;
