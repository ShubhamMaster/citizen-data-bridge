
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake, Mail, Phone, Building, Globe } from 'lucide-react';
import { format } from 'date-fns';

const PartnersFormsPage = () => {
  const { data: partnersForms, isLoading } = useQuery({
    queryKey: ['partners-forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners_inquiries')
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
        <Handshake className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Partners Inquiries</h1>
          <p className="text-muted-foreground">Manage partnership inquiry submissions</p>
        </div>
      </div>

      <div className="grid gap-4">
        {partnersForms?.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {form.name}
                    {form.partnership_type && (
                      <Badge variant="outline">{form.partnership_type}</Badge>
                    )}
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
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {form.company}
                    </span>
                    {form.website && (
                      <span className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {form.website}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">
                    {format(new Date(form.created_at), 'MMM dd, yyyy')}
                  </Badge>
                  {form.industry && (
                    <div className="text-sm text-muted-foreground mt-1">{form.industry}</div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{form.proposal_details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnersFormsPage;
