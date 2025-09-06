-- Drop the transactions table and related function
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP FUNCTION IF EXISTS public.generate_transaction_id() CASCADE;