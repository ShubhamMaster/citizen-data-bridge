
-- Fix the generate_intern_id function to resolve ambiguous column reference
CREATE OR REPLACE FUNCTION generate_intern_id(year INTEGER)
RETURNS TEXT AS $$
DECLARE
  sequence_num INTEGER;
  new_intern_id TEXT;
BEGIN
  -- Get the next sequence number for the year
  SELECT COALESCE(MAX(CAST(SUBSTRING(i.intern_id FROM 7) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM interns i
  WHERE i.internship_year = year;
  
  -- Format as IN{year}{6-digit sequence}
  new_intern_id := 'IN' || year::TEXT || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN new_intern_id;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for all admin tables
ALTER TABLE public.interns REPLICA IDENTITY FULL;
ALTER TABLE public.scheduled_calls REPLICA IDENTITY FULL;
ALTER TABLE public.contact_messages REPLICA IDENTITY FULL;
ALTER TABLE public.jobs REPLICA IDENTITY FULL;
ALTER TABLE public.salary_inquiries REPLICA IDENTITY FULL;
ALTER TABLE public.support_tickets REPLICA IDENTITY FULL;
ALTER TABLE public.website_visits REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.interns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheduled_calls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.salary_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_visits;
