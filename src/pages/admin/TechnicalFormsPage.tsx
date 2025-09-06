
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Mail, Phone, Building2 } from 'lucide-react';
import { format } from 'date-fns';

const TechnicalFormsPage = () => {
  const { data: technicalForms, isLoading } = useQuery({
    queryKey: ['technical-consultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technical_consultations')
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
        <Settings className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Technical Consultation Forms</h1>
          <p className="text-muted-foreground">Manage technical consultation requests</p>
        </div>
      </div>

      <div className="grid gap-4">
        {technicalForms?.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {form.name}
                    <Badge variant="outline">Technical Consultation</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {form.email}
                    </span>
                    {form.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {form.phone}
                      </span>
                    )}
                    {form.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {form.company}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {format(new Date(form.created_at), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Technical Requirements:</h4>
                  <p className="text-sm text-muted-foreground">{form.technical_requirements}</p>
                </div>
                {form.current_system && (
                  <div>
                    <h4 className="font-medium text-sm">Current System:</h4>
                    <p className="text-sm text-muted-foreground">{form.current_system}</p>
                  </div>
                )}
                {form.integration_needs && (
                  <div>
                    <h4 className="font-medium text-sm">Integration Needs:</h4>
                    <p className="text-sm text-muted-foreground">{form.integration_needs}</p>
                  </div>
                )}
                {form.timeline && (
                  <div>
                    <h4 className="font-medium text-sm">Timeline:</h4>
                    <p className="text-sm text-muted-foreground">{form.timeline}</p>
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

export default TechnicalFormsPage;
