
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Mail, Phone, User } from 'lucide-react';
import { format } from 'date-fns';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'reviewed':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const SalaryFormsPage = () => {
  const { data: salaryForms, isLoading } = useQuery({
    queryKey: ['salary-forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('salary_inquiries')
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
          <h1 className="text-3xl font-bold">Salary Inquiry Forms</h1>
          <p className="text-muted-foreground">Manage salary inquiry submissions</p>
        </div>
      </div>

      <div className="grid gap-4">
        {salaryForms?.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {form.name}
                    <Badge className={getStatusColor(form.status)}>
                      {form.status}
                    </Badge>
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
                    {form.job_title && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {form.job_title}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm">Department:</h4>
                  <p className="text-sm text-muted-foreground">{form.department}</p>
                </div>
                {form.experience_years && (
                  <div>
                    <h4 className="font-medium text-sm">Experience:</h4>
                    <p className="text-sm text-muted-foreground">{form.experience_years} years</p>
                  </div>
                )}
                {form.current_salary && (
                  <div>
                    <h4 className="font-medium text-sm">Current Salary:</h4>
                    <p className="text-sm text-muted-foreground">{form.current_salary}</p>
                  </div>
                )}
                {form.expected_salary && (
                  <div>
                    <h4 className="font-medium text-sm">Expected Salary:</h4>
                    <p className="text-sm text-muted-foreground">{form.expected_salary}</p>
                  </div>
                )}
              </div>
              {form.additional_info && (
                <div className="mt-4">
                  <h4 className="font-medium text-sm">Additional Information:</h4>
                  <p className="text-sm text-muted-foreground">{form.additional_info}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalaryFormsPage;
