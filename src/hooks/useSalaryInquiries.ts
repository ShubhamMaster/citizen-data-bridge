
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type SalaryInquiry = Tables<'salary_inquiries'>;
type SalaryInquiryInsert = TablesInsert<'salary_inquiries'>;
type SalaryInquiryUpdate = TablesUpdate<'salary_inquiries'>;

export const useSalaryInquiries = () => {
  return useQuery({
    queryKey: ['salary-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('salary_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SalaryInquiry[];
    },
  });
};

export const useCreateSalaryInquiry = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (inquiry: SalaryInquiryInsert) => {
      const { data, error } = await supabase
        .from('salary_inquiries')
        .insert(inquiry)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your salary inquiry has been submitted successfully. We'll get back to you soon!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating salary inquiry:', error);
    },
  });
};

export const useUpdateSalaryInquiry = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: SalaryInquiryUpdate }) => {
      const { data, error } = await supabase
        .from('salary_inquiries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salary-inquiries'] });
      toast({
        title: "Updated",
        description: "Salary inquiry status updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
      console.error('Error updating salary inquiry:', error);
    },
  });
};
