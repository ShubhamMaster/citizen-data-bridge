
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useInterns = (year?: number) => {
  return useQuery({
    queryKey: ['interns', year],
    queryFn: async () => {
      let query = supabase
        .from('interns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (year) {
        query = query.eq('internship_year', year);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateIntern = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (internData: {
      name: string;
      email: string;
      phone?: string;
      department: string;
      internship_year: number;
      start_date?: string;
      end_date?: string;
      location?: string;
      resume_url?: string;
      linkedin_url?: string;
      portfolio_url?: string;
      mentor_assigned?: string;
      notes?: string;
    }) => {
      // Generate intern ID
      const { data: internId, error: idError } = await supabase
        .rpc('generate_intern_id', { year: internData.internship_year });
      
      if (idError) throw idError;

      const { data, error } = await supabase
        .from('interns')
        .insert({
          ...internData,
          intern_id: internId,
          // Convert empty strings to null for optional fields
          phone: internData.phone || null,
          start_date: internData.start_date || null,
          end_date: internData.end_date || null,
          resume_url: internData.resume_url || null,
          linkedin_url: internData.linkedin_url || null,
          portfolio_url: internData.portfolio_url || null,
          mentor_assigned: internData.mentor_assigned || null,
          notes: internData.notes || null,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interns'] });
      toast({
        title: "Success",
        description: "Intern created successfully with verification link generated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create intern: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

export const useUpdateIntern = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      // Convert empty strings to null for optional fields
      const cleanedUpdates = {
        ...updates,
        phone: updates.phone || null,
        start_date: updates.start_date || null,
        end_date: updates.end_date || null,
        resume_url: updates.resume_url || null,
        linkedin_url: updates.linkedin_url || null,
        portfolio_url: updates.portfolio_url || null,
        mentor_assigned: updates.mentor_assigned || null,
        notes: updates.notes || null,
      };

      const { data, error } = await supabase
        .from('interns')
        .update(cleanedUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interns'] });
      toast({
        title: "Updated",
        description: "Intern updated successfully.",
      });
    },
  });
};

export const useDeleteIntern = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('interns')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interns'] });
      toast({
        title: "Deleted",
        description: "Intern deleted successfully.",
      });
    },
  });
};
