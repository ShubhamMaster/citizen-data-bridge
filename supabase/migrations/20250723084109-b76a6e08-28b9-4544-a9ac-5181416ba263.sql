
-- Update the API key name to match what the edge function expects
UPDATE api_keys 
SET key_name = 'email' 
WHERE key_name = 'noreply@civoranexus.com';

-- If no record exists with 'noreply@civoranexus.com', insert a new one
-- (You'll need to replace 'your-brevo-api-key-here' with the actual API key)
INSERT INTO api_keys (key_name, api_key, service_type, description, is_active)
SELECT 'email', 'your-brevo-api-key-here', 'email', 'Email service API key for noreply@civoranexus.com', true
WHERE NOT EXISTS (
  SELECT 1 FROM api_keys WHERE key_name = 'email'
);
