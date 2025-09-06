import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Checking if user exists with email:', email);

    // Check if user exists in auth.users table using admin client
    const { data: users, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error fetching users:', userError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify email' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log('User not found with email:', email);
      return new Response(
        JSON.stringify({ error: 'No account found with this email address' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('User found, generating OTP for user:', user.id);

    // Generate OTP using the database function
    const { data: otpCode, error: otpError } = await supabaseAdmin.rpc('generate_otp_with_history', {
      p_user_id: user.id,
      p_otp_type: 'password_reset',
      p_email: email,
      p_expires_minutes: 10
    });

    if (otpError) {
      console.error('Error generating OTP:', otpError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate reset code' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('OTP generated successfully, sending email...');

    // Send OTP email via the send-auth-otp function
    const { error: emailError } = await supabaseAdmin.functions.invoke('send-auth-otp', {
      body: {
        email,
        otpCode,
        otpType: 'password_reset',
        userName: user.email?.split('@')[0] || 'User',
      }
    });

    if (emailError) {
      console.error('Error sending OTP email:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send reset code' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Password reset email sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Password reset code sent to your email',
        userId: user.id 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in handle-password-reset function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);