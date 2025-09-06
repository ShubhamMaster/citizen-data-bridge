
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Mail, Phone, Building2 } from 'lucide-react';
import { format } from 'date-fns';

const JoinLabFormsPage = () => {
  const { data: joinLabForms, isLoading } = useQuery({
    queryKey: ['join-lab-forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('join_lab_forms')
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
        <FlaskConical className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Join Lab Forms</h1>
          <p className="text-muted-foreground">Manage applications to join the innovation lab</p>
        </div>
      </div>

      <div className="grid gap-4">
        {joinLabForms?.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {form.name}
                    <Badge variant="outline">Applicant</Badge>
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
                    {form.organization && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {form.organization}
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
              <div className="space-y-2">
                {form.interest_area && (
                  <div>
                    <h4 className="font-medium text-sm">Interest Area:</h4>
                    <p className="text-sm text-muted-foreground">{form.interest_area}</p>
                  </div>
                )}
                {form.message && (
                  <div>
                    <h4 className="font-medium text-sm">Message:</h4>
                    <p className="text-sm text-muted-foreground">{form.message}</p>
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

export default JoinLabFormsPage;
