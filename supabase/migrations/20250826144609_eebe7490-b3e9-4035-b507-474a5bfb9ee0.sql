-- Check if consultation_requests table exists and create if needed
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'consultation_requests') THEN
        -- Create consultation_requests table
        CREATE TABLE public.consultation_requests (
            id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            message TEXT,
            consultation_type TEXT,
            service_type TEXT,
            preferred_date TEXT,
            preferred_time TEXT
        );

        -- Enable Row Level Security
        ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

        -- Create policies for admin access
        CREATE POLICY "Allow admin read access to consultation_requests"
        ON public.consultation_requests
        FOR SELECT
        USING (has_role(auth.uid(), 'super_admin'::user_role));

        -- Create policy for secure inserts
        CREATE POLICY "Secure insert consultation_requests"
        ON public.consultation_requests
        FOR INSERT
        WITH CHECK (
            validate_text_lengths(name, email, message, phone, company) AND
            is_valid_email(email) AND
            check_email_rate_limit('consultation_requests'::text, email, 60) AND
            name IS NOT NULL AND
            email IS NOT NULL
        );

        -- Add updated_at trigger if needed
        CREATE TRIGGER update_consultation_requests_updated_at
        BEFORE UPDATE ON public.consultation_requests
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;