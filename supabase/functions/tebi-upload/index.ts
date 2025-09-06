import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileName, fileType } = await req.json();
    
    const accessKey = Deno.env.get('TEBI_ACCESS_KEY');
    const secretKey = Deno.env.get('TEBI_SECRET_KEY');
    const bucket = Deno.env.get('TEBI_BUCKET');
    const endpoint = Deno.env.get('TEBI_ENDPOINT');

    if (!accessKey || !secretKey || !bucket || !endpoint) {
      throw new Error('Missing Tebi configuration');
    }

    const objectKey = `${fileName}`;
    const host = `${bucket}.s3.tebi.io`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.substring(0, 8);

    // prepare string to sign
    const credential = `${accessKey}/${dateStamp}/us-east-1/s3/aws4_request`;
    const policy = {
      expiration: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      conditions: [
        { bucket },
        ["starts-with", "$key", objectKey],
        { "x-amz-credential": credential },
        { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
        { "x-amz-date": amzDate },
      ],
    };

    const policyBase64 = btoa(JSON.stringify(policy));

    // Create crypto key for signing
    const encoder = new TextEncoder();
    const keyData = encoder.encode("AWS4" + secretKey);
    const cryptoKey = await crypto.subtle.importKey(
      "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );

    // Sign step by step
    const kDate = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(dateStamp));
    const kRegion = await crypto.subtle.sign("HMAC", 
      await crypto.subtle.importKey("raw", kDate, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), 
      encoder.encode("us-east-1")
    );
    const kService = await crypto.subtle.sign("HMAC", 
      await crypto.subtle.importKey("raw", kRegion, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), 
      encoder.encode("s3")
    );
    const kSigning = await crypto.subtle.sign("HMAC", 
      await crypto.subtle.importKey("raw", kService, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), 
      encoder.encode("aws4_request")
    );
    const signature = await crypto.subtle.sign("HMAC", 
      await crypto.subtle.importKey("raw", kSigning, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), 
      encoder.encode(policyBase64)
    );

    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const signedUrl = `${endpoint}/${bucket}/${objectKey}`;
    const publicUrl = `https://${bucket}.tebi.io/${objectKey}`;

    return new Response(JSON.stringify({ 
      signedUrl, 
      publicUrl,
      formData: {
        key: objectKey,
        'x-amz-credential': credential,
        'x-amz-algorithm': 'AWS4-HMAC-SHA256',
        'x-amz-date': amzDate,
        policy: policyBase64,
        'x-amz-signature': signatureHex
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in tebi-upload function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});