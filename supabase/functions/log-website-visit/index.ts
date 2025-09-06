
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const uaString = req.headers.get("user-agent") || "";
    const { path } = await req.json();

    // UA Parser
    const UAParser = (await import("npm:ua-parser-js")).default;
    const parser = new UAParser(uaString);
    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    // Get IP address (using true client IP if available, or Deno's fallback)
    let ip = req.headers.get("x-forwarded-for") ||
             req.headers.get("x-real-ip") ||
             (req as any).ip ||
             "";

    if (Array.isArray(ip)) ip = ip[0];
    if (ip.includes(",")) ip = ip.split(",")[0].trim();

    // Use ipinfo.io (or similar) for a lightweight geo lookup
    let city = "";
    let region = "";
    let country = "";
    try {
      if (ip) {
        const resp = await fetch(`https://ipinfo.io/${ip}?token=3b1dc2ebd502a7`); // Free tier; replace or rotate as needed
        if (resp.ok) {
          const loc = await resp.json();
          city = loc.city || "";
          region = loc.region || "";
          country = loc.country || "";
        }
      }
    } catch { /* ignore geo lookup errors */ }

    // Save to Supabase
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Supabase keys missing" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const { createClient } = await import("npm:@supabase/supabase-js");
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error } = await supabase.from("website_visits").insert({
      path: path || "",
      user_agent: uaString,
      device_brand: device.brand || "",
      device_model: device.model || "",
      device_type: device.type || "",
      os_name: os.name || "",
      browser_name: browser.name || "",
      ip_address: ip,
      city,
      region,
      country,
    });
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as any)?.message || "Unknown" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
