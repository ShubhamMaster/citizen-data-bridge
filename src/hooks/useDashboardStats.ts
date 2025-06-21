
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        scheduledCallsRes,
        contactMessagesRes,
        jobsRes,
        salaryInquiriesRes,
        supportTicketsRes,
        websiteVisitsRes,
        internsRes
      ] = await Promise.all([
        supabase.from('scheduled_calls').select('id, is_done').eq('is_deleted', false),
        supabase.from('contact_messages').select('id'),
        supabase.from('jobs').select('id, is_active'),
        supabase.from('salary_inquiries').select('id, status').eq('is_deleted', false),
        supabase.from('support_tickets').select('id, status').eq('is_deleted', false),
        supabase.from('website_visits').select('id').gte('visited_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('interns').select('id, status, internship_year').eq('is_deleted', false)
      ]);

      const currentYear = new Date().getFullYear();

      return {
        scheduledCalls: {
          total: scheduledCallsRes.data?.length || 0,
          pending: scheduledCallsRes.data?.filter(call => !call.is_done).length || 0
        },
        contactMessages: {
          total: contactMessagesRes.data?.length || 0
        },
        jobs: {
          total: jobsRes.data?.length || 0,
          active: jobsRes.data?.filter(job => job.is_active).length || 0
        },
        salaryInquiries: {
          total: salaryInquiriesRes.data?.length || 0,
          pending: salaryInquiriesRes.data?.filter(inquiry => inquiry.status === 'pending').length || 0
        },
        supportTickets: {
          total: supportTicketsRes.data?.length || 0,
          pending: supportTicketsRes.data?.filter(ticket => ticket.status === 'pending').length || 0
        },
        websiteVisits: {
          thisWeek: websiteVisitsRes.data?.length || 0
        },
        interns: {
          total: internsRes.data?.length || 0,
          thisYear: internsRes.data?.filter(intern => intern.internship_year === currentYear).length || 0,
          pending: internsRes.data?.filter(intern => intern.status === 'pending').length || 0
        }
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
};
