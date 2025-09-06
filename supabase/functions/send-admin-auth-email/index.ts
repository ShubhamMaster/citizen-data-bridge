
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface AdminAuthEmailRequest {
  to: string;
  subject: string;
  otpCode?: string;
  action: string;
  userName?: string;
}

const getApiKeyFromDatabase = async (keyName: string) => {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('api_key')
      .eq('key_name', keyName)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching API key:', error);
      return null;
    }

    return data?.api_key;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log('Admin auth email function called');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, otpCode, action, userName }: AdminAuthEmailRequest = await req.json();
    console.log('Admin auth email request:', { to, subject, action });

    // Get API key from database for admin auth emails
    const brevoApiKey = await getApiKeyFromDatabase('admin-auth@civoranexus.com');
    
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not found in database for admin auth emails');
      throw new Error('Email service not configured');
    }

    let htmlContent = '';
    
    switch (action) {
      case 'otp_verification':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Admin Authentication Required</h2>
            <p>Hello ${userName || 'Admin'},</p>
            <p>Your OTP code for admin authentication is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otpCode}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this, please contact your system administrator immediately.</p>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Civora Nexus Admin System.
            </p>
          </div>
        `;
        break;
      
      case 'login_alert':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Admin Login Alert</h2>
            <p>Hello ${userName || 'Admin'},</p>
            <p>A successful admin login was detected on your account.</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p>If this wasn't you, please contact your system administrator immediately.</p>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated security alert from Civora Nexus Admin System.
            </p>
          </div>
        `;
        break;
      
      default:
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Admin Notification</h2>
            <p>Hello ${userName || 'Admin'},</p>
            <p>This is a notification from the Civora Nexus Admin System.</p>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated message from Civora Nexus Admin System.
            </p>
          </div>
        `;
    }

    const emailData = {
      sender: {
        name: "Civora Admin System",
        email: "admin-auth@civoranexus.com"
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent
    };

    console.log('Sending admin auth email via Brevo');

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    console.log('Brevo response:', result);

    if (!response.ok) {
      console.error('Brevo API error:', result);
      throw new Error(`Email sending failed: ${result.message || 'Unknown error'}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: result.messageId,
      result 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error: any) {
    console.error('Error in admin auth email function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

serve(handler);
