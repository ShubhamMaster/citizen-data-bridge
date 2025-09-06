
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEmailConfirmation } from "./useEmailConfirmation";

export interface SupportTicketData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  issue_type: string;
  priority?: string;
  subject: string;
  description: string;
  system_info?: string;
  error_details?: string;
}

export const useCreateSupportTicket = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: SupportTicketData) => {
      const { data: result, error } = await supabase
        .from('support_tickets')
        .insert([{
          ...data,
          priority: data.priority || 'medium'
        }])
        .select()
        .single();
      
      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'technical',
        ...data
      });

      return result;
    },
    onSuccess: () => {
      toast({
        title: "Support Ticket Created!",
        description: "Your technical support request has been submitted. We'll contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
    },
    onError: (error) => {
      console.error('Error creating support ticket:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your support request. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ['support-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching support tickets:', error);
        throw error;
      }

      return data;
    }
  });
};
