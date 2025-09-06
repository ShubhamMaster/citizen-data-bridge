
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Mail, Phone, Building } from 'lucide-react';
import { format } from 'date-fns';

const InvestmentFormsPage = () => {
  const { data: investmentForms, isLoading } = useQuery({
    queryKey: ['investment-forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investment_inquiries')
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
        <DollarSign className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Investment Inquiries</h1>
          <p className="text-muted-foreground">Manage investment inquiry submissions</p>
        </div>
      </div>

      <div className="grid gap-4">
        {investmentForms?.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {form.name}
                    {form.investment_type && (
                      <Badge variant="outline">{form.investment_type}</Badge>
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
                    {form.company && (
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {form.company}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">
                    {format(new Date(form.created_at), 'MMM dd, yyyy')}
                  </Badge>
                  {form.investment_amount && (
                    <div className="text-sm font-medium mt-1">{form.investment_amount}</div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{form.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentFormsPage;
