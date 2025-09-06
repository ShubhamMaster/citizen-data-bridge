-- Fix search_path security vulnerability in all functions

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Update update_login_stats function
CREATE OR REPLACE FUNCTION public.update_login_stats(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  today_date DATE := CURRENT_DATE;
BEGIN
  UPDATE public.profiles 
  SET 
    last_login = NOW(),
    login_count = COALESCE(login_count, 0) + 1,
    today_login_count = CASE 
      WHEN last_login_date = today_date THEN COALESCE(today_login_count, 0) + 1
      ELSE 1
    END,
    last_login_date = today_date,
    updated_at = NOW()
  WHERE id = user_id;
END;
$function$;

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, required_role user_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = required_role
  );
END;
$function$;

-- Update generate_employee_id function
CREATE OR REPLACE FUNCTION public.generate_employee_id(year integer)
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  sequence_num INTEGER;
  new_employee_id TEXT;
BEGIN
  -- Get the next sequence number for the year
  SELECT COALESCE(MAX(CAST(SUBSTRING(e.employee_id FROM 7) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM employees e
  WHERE EXTRACT(YEAR FROM e.date_of_joining) = year;
  
  -- Format as EMP{year}{6-digit sequence}
  new_employee_id := 'EMP' || year::TEXT || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN new_employee_id;
END;
$function$;

-- Update soft_delete_record function
CREATE OR REPLACE FUNCTION public.soft_delete_record(table_name text, record_id text, user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  record_data JSONB;
  sql_query TEXT;
BEGIN
  -- Get the record data before deletion
  sql_query := format('SELECT row_to_json(t.*) FROM %I t WHERE id = %L', table_name, record_id);
  EXECUTE sql_query INTO record_data;
  
  -- Insert into recycle bin
  INSERT INTO public.recycle_bin (original_table, original_id, data, deleted_by)
  VALUES (table_name, record_id, record_data, user_id);
  
  -- Mark as deleted in original table
  sql_query := format('UPDATE %I SET is_deleted = true, deleted_at = NOW() WHERE id = %L', table_name, record_id);
  EXECUTE sql_query;
END;
$function$;

-- Update generate_intern_id function
CREATE OR REPLACE FUNCTION public.generate_intern_id(year integer)
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
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
$function$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.email
  );
  RETURN new;
END;
$function$;

-- Update get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role::TEXT INTO user_role
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_role, 'user');
END;
$function$;