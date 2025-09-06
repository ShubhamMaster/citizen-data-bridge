
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEmailConfirmation } from "./useEmailConfirmation";

export interface JobApplicationData {
  job_id: number;
  user_id: string;
  application_data: {
    name: string;
    email: string;
    phone?: string;
    resume?: string;
    cover_letter?: string;
    [key: string]: any;
  };
  data_source?: string;
}

export const useJobApplication = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: JobApplicationData) => {
      const { error } = await supabase
        .from("applications")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'job_application',
        name: data.application_data.name,
        email: data.application_data.email,
        phone: data.application_data.phone,
        message: `Job application for position ID: ${data.job_id}`
      });
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your job application has been submitted successfully. We'll review it and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      console.error('Error submitting job application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });
};
