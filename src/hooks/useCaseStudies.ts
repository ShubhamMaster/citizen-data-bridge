
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WebsiteCaseStudy {
  case_id: string;
  title: string;
  subtitle?: string | null;
  category?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: any | null;
  main_image?: string | null;
  gallery_images?: any | null;
  video_links?: any | null;
  technologies?: any | null;
  key_features?: any | null;
  duration?: string | null;
  team_size?: number | null;
  client_name?: string | null;
  client_role?: string | null;
  industry?: string | null;
  testimonial?: string | null;
  testimonial_author?: string | null;
  testimonial_role?: string | null;
  tags?: any | null;
  custom_sections?: any | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: any | null;
  status?: string | null;
  is_featured?: boolean | null;
  preference?: number | null;
  view_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const useCaseStudies = () => {
  return useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_case_studies")
        .select("*")
        .eq("status", "published")
        .order("preference", { ascending: true });

      if (error) throw error;
      return data as WebsiteCaseStudy[];
    },
  });
};

export const useFeaturedCaseStudy = (id: string) => {
  return useQuery({
    queryKey: ["case-study", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_case_studies")
        .select("*")
        .eq("case_id", id)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data as WebsiteCaseStudy;
    },
    enabled: !!id,
  });
};
