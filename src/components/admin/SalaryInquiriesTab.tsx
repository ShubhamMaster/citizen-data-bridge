
import React, { useState } from 'react';
import { useSalaryInquiries, useUpdateSalaryInquiry } from '@/hooks/useSalaryInquiries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Clock, CheckCircle, Calendar, User, Mail, Phone, Building, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

type SalaryInquiry = Tables<'salary_inquiries'>;

const SalaryInquiriesTab = () => {
  const { data: inquiries, isLoading } = useSalaryInquiries();
  const updateInquiry = useUpdateSalaryInquiry();
  const [selectedInquiry, setSelectedInquiry] = useState<SalaryInquiry | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'replied':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateInquiry.mutate({
      id,
      updates: { 
        status: newStatus,
        updated_at: new Date().toISOString()
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Salary Inquiries</h2>
          <p className="text-muted-foreground">Manage salary inquiry submissions and responses</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {inquiries?.length || 0} Total Inquiries
        </Badge>
      </div>

      <Card className="card-modern">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries?.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.department}</TableCell>
                  <TableCell>{inquiry.experience_years} years</TableCell>
                  <TableCell>{format(new Date(inquiry.created_at), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Salary Inquiry Details</DialogTitle>
                          </DialogHeader>
                          {selectedInquiry && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span>Contact Information</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-medium">{selectedInquiry.name}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="w-3 h-3" />
                                      {selectedInquiry.email}
                                    </div>
                                    {selectedInquiry.phone && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-3 h-3" />
                                        {selectedInquiry.phone}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building className="w-4 h-4" />
                                    <span>Position Details</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p><span className="font-medium">Department:</span> {selectedInquiry.department}</p>
                                    {selectedInquiry.job_title && (
                                      <p><span className="font-medium">Current Role:</span> {selectedInquiry.job_title}</p>
                                    )}
                                    <p><span className="font-medium">Experience:</span> {selectedInquiry.experience_years} years</p>
                                  </div>
                                </div>
                              </div>
                              
                              {(selectedInquiry.current_salary || selectedInquiry.expected_salary) && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Salary Information</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedInquiry.current_salary && (
                                      <p><span className="font-medium">Current Salary:</span> {selectedInquiry.current_salary}</p>
                                    )}
                                    {selectedInquiry.expected_salary && (
                                      <p><span className="font-medium">Expected Salary:</span> {selectedInquiry.expected_salary}</p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {selectedInquiry.additional_info && (
                                <div className="space-y-2">
                                  <h4 className="font-medium">Additional Information</h4>
                                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedInquiry.additional_info}</p>
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Submitted on {format(new Date(selectedInquiry.created_at), 'MMMM dd, yyyy at hh:mm a')}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) => handleStatusUpdate(inquiry.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {!inquiries?.length && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No salary inquiries found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryInquiriesTab;
