
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Phone, Clock } from 'lucide-react';
import { format } from 'date-fns';

const CallScheduleFormsPage = () => {
  const { data: scheduledCalls, isLoading } = useQuery({
    queryKey: ['scheduled-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scheduled_calls')
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
        <Calendar className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Scheduled Calls</h1>
          <p className="text-muted-foreground">Manage call scheduling requests</p>
        </div>
      </div>

      <div className="grid gap-4">
        {scheduledCalls?.map((call) => (
          <Card key={call.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {call.name}
                    <Badge variant={call.is_done ? 'secondary' : 'default'}>
                      {call.is_done ? 'Completed' : 'Pending'}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(call.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {call.time}
                    </span>
                    {call.mobile && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {call.mobile}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {format(new Date(call.created_at), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium text-sm">Reason for Call:</h4>
                <p className="text-sm text-muted-foreground">{call.reason}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CallScheduleFormsPage;
