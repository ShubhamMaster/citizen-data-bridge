
-- Enable RLS on all civora_nexus tables
ALTER TABLE public.civora_nexus_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civora_nexus_company_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civora_nexus_company_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civora_nexus_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civora_nexus_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civora_nexus_bank_details ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check super admin role
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;

-- Policies for civora_nexus_companies
CREATE POLICY "Super admins can manage companies"
  ON public.civora_nexus_companies
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read companies"
  ON public.civora_nexus_companies
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert companies"
  ON public.civora_nexus_companies
  FOR INSERT
  WITH CHECK (true);

-- Policies for civora_nexus_company_contacts
CREATE POLICY "Super admins can manage company contacts"
  ON public.civora_nexus_company_contacts
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read company contacts"
  ON public.civora_nexus_company_contacts
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert company contacts"
  ON public.civora_nexus_company_contacts
  FOR INSERT
  WITH CHECK (true);

-- Policies for civora_nexus_company_addresses
CREATE POLICY "Super admins can manage company addresses"
  ON public.civora_nexus_company_addresses
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read company addresses"
  ON public.civora_nexus_company_addresses
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert company addresses"
  ON public.civora_nexus_company_addresses
  FOR INSERT
  WITH CHECK (true);

-- Policies for civora_nexus_social_links
CREATE POLICY "Super admins can manage social links"
  ON public.civora_nexus_social_links
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read social links"
  ON public.civora_nexus_social_links
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert social links"
  ON public.civora_nexus_social_links
  FOR INSERT
  WITH CHECK (true);

-- Policies for civora_nexus_documents
CREATE POLICY "Super admins can manage documents"
  ON public.civora_nexus_documents
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read documents"
  ON public.civora_nexus_documents
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert documents"
  ON public.civora_nexus_documents
  FOR INSERT
  WITH CHECK (true);

-- Policies for civora_nexus_bank_details
CREATE POLICY "Super admins can manage bank details"
  ON public.civora_nexus_bank_details
  FOR ALL
  USING (public.is_super_admin());

CREATE POLICY "Public can read bank details"
  ON public.civora_nexus_bank_details
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert bank details"
  ON public.civora_nexus_bank_details
  FOR INSERT
  WITH CHECK (true);

-- Create function to automatically extract and store company data
CREATE OR REPLACE FUNCTION public.extract_and_store_company_data(
  company_name text,
  email text DEFAULT NULL,
  phone text DEFAULT NULL,
  website text DEFAULT NULL,
  address text DEFAULT NULL,
  social_platform text DEFAULT NULL,
  social_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  company_id uuid;
  contact_id uuid;
  address_id uuid;
  social_id uuid;
BEGIN
  -- Check if company exists
  SELECT c.company_id INTO company_id
  FROM public.civora_nexus_companies c
  WHERE LOWER(c.company_name) = LOWER(company_name)
  LIMIT 1;
  
  -- If company doesn't exist, create it
  IF company_id IS NULL THEN
    INSERT INTO public.civora_nexus_companies (company_name, website)
    VALUES (company_name, website)
    RETURNING company_id INTO company_id;
  END IF;
  
  -- Add contact if email is provided and doesn't exist
  IF email IS NOT NULL THEN
    SELECT c.contact_id INTO contact_id
    FROM public.civora_nexus_company_contacts c
    WHERE c.company_id = company_id AND LOWER(c.email) = LOWER(email)
    LIMIT 1;
    
    IF contact_id IS NULL THEN
      INSERT INTO public.civora_nexus_company_contacts (company_id, email, phone, is_primary_contact)
      VALUES (company_id, email, phone, true)
      RETURNING contact_id INTO contact_id;
    END IF;
  END IF;
  
  -- Add address if provided and doesn't exist
  IF address IS NOT NULL THEN
    SELECT a.address_id INTO address_id
    FROM public.civora_nexus_company_addresses a
    WHERE a.company_id = company_id AND LOWER(a.street_address) = LOWER(address)
    LIMIT 1;
    
    IF address_id IS NULL THEN
      INSERT INTO public.civora_nexus_company_addresses (company_id, street_address, address_type)
      VALUES (company_id, address, 'Head Office')
      RETURNING address_id INTO address_id;
    END IF;
  END IF;
  
  -- Add social link if provided and doesn't exist
  IF social_platform IS NOT NULL AND social_url IS NOT NULL THEN
    SELECT s.social_id INTO social_id
    FROM public.civora_nexus_social_links s
    WHERE s.company_id = company_id AND LOWER(s.platform) = LOWER(social_platform)
    LIMIT 1;
    
    IF social_id IS NULL THEN
      INSERT INTO public.civora_nexus_social_links (company_id, platform, url)
      VALUES (company_id, social_platform, social_url)
      RETURNING social_id INTO social_id;
    END IF;
  END IF;
  
  RETURN company_id;
END;
$$;
