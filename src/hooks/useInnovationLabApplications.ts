import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEmailConfirmation } from "./useEmailConfirmation";

export interface InnovationLabApplicationData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  experience_level: string;
  areas_of_interest: string[];
  project_idea: string;
  collaboration_interest?: string;
  availability?: string;
  linkedin_profile?: string;
  portfolio_url?: string;
  additional_info?: string;
}

export const useCreateInnovationLabApplication = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: InnovationLabApplicationData) => {
      const { error } = await supabase
        .from("innovation_lab_applications")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'innovation_lab',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your Innovation Lab application has been submitted successfully. We'll review it and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["innovation-lab-applications"] });
    },
    onError: (error) => {
      console.error('Error submitting innovation lab application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Keep the old export for backward compatibility
export const useInnovationLabApplication = useCreateInnovationLabApplication;
