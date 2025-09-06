import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// ---------- Types ----------
interface EmailRequest {
  email: string;
  otpCode: string;
  otpType: "login" | "2fa_login" | "password_reset" | "password_change";
  userName?: string;
}

// ---------- Helper: Fetch API key from DB ----------
async function getApiKeyFromDatabase(keyName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("api_keys")
    .select("api_key")
    .eq("key_name", keyName)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("[DB ERROR] Could not fetch API key:", error.message);
    return null;
  }

  return data?.api_key ?? null;
}

// ---------- Helper: Build email template ----------
function buildEmailTemplate(otpType: EmailRequest["otpType"], displayName: string, otpCode: string) {
  let subject = "";
  let htmlContent = "";

  if (otpType === "login" || otpType === "2fa_login") {
    subject = "Your Login Verification Code - Civora Nexus";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
        <h2>Hello ${displayName},</h2>
        <p>We received a login attempt. Use this verification code:</p>
        <h1 style="color:#667eea;">${otpCode}</h1>
        <p style="color:#666;">This code expires in 10 minutes. If you didn’t request this, please secure your account immediately.</p>
      </div>
    `;
  } else {
    subject = "Password Reset Verification Code - Civora Nexus";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
        <h2>Hello ${displayName},</h2>
        <p>We received a password reset request. Use this code:</p>
        <h1 style="color:#dc3545;">${otpCode}</h1>
        <p style="color:#666;">This code expires in 10 minutes. If you didn’t request a reset, ignore this email.</p>
      </div>
    `;
  }

  return { subject, htmlContent };
}

// ---------- Main handler ----------
const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otpCode, otpType, userName }: EmailRequest = await req.json();

    if (!email || !otpCode || !otpType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const BREVO_API_KEY = await getApiKeyFromDatabase("admin-auth@civoranexus.com");
    if (!BREVO_API_KEY) {
      throw new Error("Email service key not found in DB");
    }

    const displayName = userName || email.split("@")[0];
    const { subject, htmlContent } = buildEmailTemplate(otpType, displayName, otpCode);

    const emailData = {
      sender: { name: "Civora Nexus Authentication", email: "admin-auth@civoranexus.com" },
      to: [{ email, name: displayName }],
      subject,
      htmlContent,
    };

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error("[BREVO ERROR]", responseData);
      throw new Error(responseData.message || "Failed to send email");
    }

    console.log(`[SUCCESS] Sent ${otpType} OTP to ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: `${otpType} OTP sent`, messageId: responseData.messageId }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (err: any) {
    console.error("[FUNCTION ERROR]", err.message);

    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
