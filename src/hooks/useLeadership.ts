
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  description: string | null;
  image_url: string | null;
  preference_number: number;
  created_at: string;
  updated_at: string;
}

export const useLeadership = () => {
  return useQuery({
    queryKey: ["leadership"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leadership_team_public")
        .select("*");

      if (error) throw error;
      return data as LeadershipMember[];
    },
  });
};
