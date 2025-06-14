
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type SectionKey = "hero" | "services" | "about" | "contact" | string;

export function useWebsiteContent(section: SectionKey) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line
  }, [section]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("website_content")
      .select("content")
      .eq("section", section)
      .maybeSingle();

    if (error) {
      setError(error.message);
      setContent(null);
    } else {
      setContent(data ? data.content : null);
    }
    setLoading(false);
  };

  const saveContent = async (newContent: any) => {
    setSaving(true);
    setError(null);

    // Try to update first, fallback to insert if not exist
    const { error: upsertError } = await supabase
      .from("website_content")
      .upsert([
        {
          section,
          content: newContent,
          updated_at: new Date().toISOString(),
        }
      ], { onConflict: "section" });

    if (upsertError) {
      setError(upsertError.message);
      toast({
        title: "Error saving content",
        description: upsertError.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Content saved!",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} updated.`,
      });
      setContent(newContent);
    }
    setSaving(false);
  };

  return {
    content,
    setContent,
    loading,
    saving,
    error,
    fetchContent,
    saveContent
  };
}
