
-- JOBS TABLE
CREATE TABLE public.jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g. 'full-time', 'part-time', 'contract', etc.
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary_range TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- APPLICATIONS TABLE
CREATE TABLE public.applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES public.jobs(id) ON DELETE SET NULL,
  user_id TEXT, -- for future use / can be updated if auth is implemented
  data_source TEXT,
  status TEXT DEFAULT 'pending',
  application_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance (optional)
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
