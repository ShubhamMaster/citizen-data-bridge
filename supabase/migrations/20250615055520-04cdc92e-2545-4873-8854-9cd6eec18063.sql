
-- Create table for scheduled calls
CREATE TABLE public.scheduled_calls (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- (No RLS policies are added since this is a public-facing scheduling feature,
-- but you may request RLS if you want user-specific access.)
