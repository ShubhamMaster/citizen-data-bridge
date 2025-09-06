
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CompanyProject {
  id: string;
  title: string;
  description: string | null;
  short_description?: string | null;
  full_description?: string | null;
  image_url: string | null;
  link: string | null;
  client_name?: string | null;
  industry?: string | null;
  project_status?: string | null;
  team_size?: number | null;
  duration_months?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  technologies_used?: string[] | null;
  key_features?: string[] | null;
  challenges_solved?: string[] | null;
  impact_metrics?: any | null;
  roi_metrics?: any | null;
  project_gallery?: any | null;
  preference_number?: number | null;
  budget_range?: string | null;
  testimonial_quote?: string | null;
  testimonial_author?: string | null;
  testimonial_position?: string | null;
  created_at: string;
  updated_at: string;
}

export const useCompanyProjects = () => {
  return useQuery({
    queryKey: ["company-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_project")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CompanyProject[];
    },
  });
};

export const useCompanyProject = (id: string) => {
  return useQuery({
    queryKey: ["company-project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_project")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as CompanyProject;
    },
  });
};
