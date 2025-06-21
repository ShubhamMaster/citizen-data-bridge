
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useDashboardStats = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscriptions for all relevant tables
  useEffect(() => {
    const channels = [
      supabase
        .channel('dashboard-stats-interns')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'interns' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        }),
      
      supabase
        .channel('dashboard-stats-calls')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'scheduled_calls' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        }),
      
      supabase
        .channel('dashboard-stats-contacts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        }),
      
      supabase
        .channel('dashboard-stats-support')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        }),
      
      supabase
        .channel('dashboard-stats-salary')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'salary_inquiries' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        }),
      
      supabase
        .channel('dashboard-stats-visits')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'website_visits' }, () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        })
    ];

    // Subscribe to all channels
    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch all stats in parallel for better performance
      const [
        internsResult,
        callsResult,
        contactsResult,
        supportResult,
        salaryResult,
        visitsResult
      ] = await Promise.all([
        supabase.from('interns').select('id, status', { count: 'exact' }),
        supabase.from('scheduled_calls').select('id, is_done', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('support_tickets').select('id, status', { count: 'exact' }),
        supabase.from('salary_inquiries').select('id, status', { count: 'exact' }),
        supabase.from('website_visits').select('id', { count: 'exact' })
      ]);

      if (internsResult.error) throw internsResult.error;
      if (callsResult.error) throw callsResult.error;
      if (contactsResult.error) throw contactsResult.error;
      if (supportResult.error) throw supportResult.error;
      if (salaryResult.error) throw salaryResult.error;
      if (visitsResult.error) throw visitsResult.error;

      const totalInterns = internsResult.count || 0;
      const verifiedInterns = internsResult.data?.filter(intern => intern.status === 'verified').length || 0;
      
      const totalCalls = callsResult.count || 0;
      const completedCalls = callsResult.data?.filter(call => call.is_done).length || 0;
      
      const totalContacts = contactsResult.count || 0;
      
      const totalSupportTickets = supportResult.count || 0;
      const pendingSupportTickets = supportResult.data?.filter(ticket => ticket.status === 'pending').length || 0;
      
      const totalSalaryInquiries = salaryResult.count || 0;
      const pendingSalaryInquiries = salaryResult.data?.filter(inquiry => inquiry.status === 'pending').length || 0;
      
      const totalVisits = visitsResult.count || 0;

      return {
        totalInterns,
        verifiedInterns,
        pendingInterns: totalInterns - verifiedInterns,
        totalCalls,
        completedCalls,
        pendingCalls: totalCalls - completedCalls,
        totalContacts,
        totalSupportTickets,
        pendingSupportTickets,
        totalSalaryInquiries,
        pendingSalaryInquiries,
        totalVisits
      };
    },
    refetchInterval: 30000, // Fallback refresh every 30 seconds
  });
};
