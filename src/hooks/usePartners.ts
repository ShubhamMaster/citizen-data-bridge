
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Partner {
  id: string;
  name: string;
  image_url: string | null;
  description: string | null;
  min_partner: number;
  created_at: string;
  updated_at: string;
}

export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("civora_nexus_partner")
        .select("*")
        .gt("min_partner", 0)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Partner[];
    },
  });
};
