
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
      department: string;
      internship_year: number;
    }) => {
      // Generate intern ID
      const { data: internId, error: idError } = await supabase
        .rpc('generate_intern_id', { year: internData.internship_year });
      
      if (idError) throw idError;

      const { data, error } = await supabase
        .from('interns')
        .insert({
          ...internData,
          intern_id: internId
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
      const { data, error } = await supabase
        .from('interns')
        .update(updates)
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
