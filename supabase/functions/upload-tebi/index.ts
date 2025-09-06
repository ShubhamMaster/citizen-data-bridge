import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string || 'civoranexus-filedata'
    const folder = formData.get('folder') as string || 'uploads'

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate unique filename
    const timestamp = new Date().getTime()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${folder}/${timestamp}-${crypto.randomUUID()}.${fileExtension}`

    // Get Tebi credentials from environment
    const tebiAccessKey = Deno.env.get('TEBI_ACCESS_KEY')
    const tebiSecretKey = Deno.env.get('TEBI_SECRET_KEY')
    const tebiEndpoint = Deno.env.get('TEBI_ENDPOINT') || 'https://s3.tebi.io'

    if (!tebiAccessKey || !tebiSecretKey) {
      return new Response(
        JSON.stringify({ error: 'Tebi credentials not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Convert file to ArrayBuffer
    const fileBuffer = await file.arrayBuffer()

    // Create AWS SDK compatible request
    const url = `${tebiEndpoint}/${bucket}/${fileName}`
    const date = new Date().toISOString().slice(0, 19) + 'Z'

    // Simple PUT request to S3-compatible storage
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'Content-Length': fileBuffer.byteLength.toString(),
        'Authorization': `AWS ${tebiAccessKey}:${tebiSecretKey}`,
        'Date': date,
      },
      body: fileBuffer,
    })

    if (!response.ok) {
      console.error('Tebi upload failed:', await response.text())
      return new Response(
        JSON.stringify({ error: 'Upload failed' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const fileUrl = url

    return new Response(
      JSON.stringify({ 
        url: fileUrl,
        message: 'File uploaded successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})