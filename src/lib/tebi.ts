import { supabase } from "@/integrations/supabase/client";

export async function uploadToTebi(file: File): Promise<string> {
  const uniqueName = `${Date.now()}-${file.name}`;

  // Call Supabase edge function for signed upload URL
  const res = await supabase.functions.invoke('tebi-upload', {
    body: JSON.stringify({
      fileName: uniqueName,
      fileType: file.type,
    }),
  });

  if (res.error) throw new Error("Failed to get signed URL");

  // Ensure data exists
  const { signedUrl, publicUrl, formData } = res.data || {};
  if (!signedUrl || !publicUrl || !formData) {
    throw new Error("Invalid upload data received");
  }

  // Prepare form data
  const uploadFormData = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    uploadFormData.append(key, value as string);
  });
  uploadFormData.append('file', file);

  // Upload file directly to Tebi
  const uploadRes = await fetch(signedUrl, {
    method: "POST",
    body: uploadFormData,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`Upload failed: ${text}`);
  }

  return publicUrl;
}
