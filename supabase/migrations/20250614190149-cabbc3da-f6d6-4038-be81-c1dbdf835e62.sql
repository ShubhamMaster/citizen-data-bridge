
-- Create the jobs table to support the admin job management features
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL, -- e.g., full-time, part-time
  description text NOT NULL,
  requirements text NOT NULL,
  salary_range text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Allow anyone to read jobs (for public job listings), but only authenticated users (admins) can insert/update/delete (if you want more restriction, let me know)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to select (read) jobs
CREATE POLICY "Anyone can view jobs"
  ON public.jobs
  FOR SELECT
  USING (true);

-- Allow only authenticated users to insert jobs (can later restrict to admin)
CREATE POLICY "Authenticated can create jobs"
  ON public.jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow only authenticated users to update jobs (can later restrict to admin)
CREATE POLICY "Authenticated can update jobs"
  ON public.jobs
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow only authenticated users to delete jobs (can later restrict to admin)
CREATE POLICY "Authenticated can delete jobs"
  ON public.jobs
  FOR DELETE
  TO authenticated
  USING (true);

