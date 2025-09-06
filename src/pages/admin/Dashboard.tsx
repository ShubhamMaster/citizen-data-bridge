
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SystemHealthCheck from '@/components/SystemHealthCheck';
import Loading from '@/components/Loading';

const Dashboard = () => {
  const { data: contactSubmissions, isLoading: isLoadingContactSubmissions, error: errorContactSubmissions } = useQuery({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*');
      if (error) {
        console.error("Error fetching contact submissions:", error);
        throw error;
      }
      return data;
    }
  });


  const { data: collaborationRequests, isLoading: isLoadingCollaborationRequests, error: errorCollaborationRequests } = useQuery({
    queryKey: ['collaborationRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collaboration_requests')
        .select('*');
      if (error) {
        console.error("Error fetching collaboration requests:", error);
        throw error;
      }
      return data;
    }
  });

  const totalContactSubmissions = contactSubmissions ? contactSubmissions.length : 0;
  const totalCollaborationRequests = collaborationRequests ? collaborationRequests.length : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, Administrator
        </div>
      </div>

      {/* System Health Check */}
      <div className="mb-8">
        <SystemHealthCheck />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalContactSubmissions}</div>
            {errorContactSubmissions && <div className="text-red-500">Error: {errorContactSubmissions.message}</div>}
            {isLoadingContactSubmissions && <Loading size="sm" className="min-h-[40px]" />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collaboration Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalCollaborationRequests}</div>
            {errorCollaborationRequests && <div className="text-red-500">Error: {errorCollaborationRequests.message}</div>}
            {isLoadingCollaborationRequests && <Loading size="sm" className="min-h-[40px]" />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
