
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Mail, Phone, Building2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const SupportFormsPage = () => {
  const { data: supportTickets, isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <HelpCircle className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Manage customer support requests</p>
        </div>
      </div>

      <div className="grid gap-4">
        {supportTickets?.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {ticket.name}
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {ticket.email}
                    </span>
                    {ticket.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {ticket.phone}
                      </span>
                    )}
                    {ticket.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {ticket.company}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {format(new Date(ticket.created_at), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Issue Type: {ticket.issue_type}
                  </h4>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Subject:</h4>
                  <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Description:</h4>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                </div>
                {ticket.system_info && (
                  <div>
                    <h4 className="font-medium text-sm">System Information:</h4>
                    <p className="text-sm text-muted-foreground">{ticket.system_info}</p>
                  </div>
                )}
                {ticket.error_details && (
                  <div>
                    <h4 className="font-medium text-sm">Error Details:</h4>
                    <p className="text-sm text-muted-foreground">{ticket.error_details}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportFormsPage;
