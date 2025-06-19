
import React, { useState } from 'react';
import { useSupportTickets, useUpdateSupportTicket } from '@/hooks/useSupportTickets';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Clock, AlertTriangle, CheckCircle, Calendar, User, Mail, Phone, Building, Settings, Bug } from 'lucide-react';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

type SupportTicket = Tables<'support_tickets'>;

const TechnicalSupportTab = () => {
  const { data: tickets, isLoading } = useSupportTickets();
  const updateTicket = useUpdateSupportTicket();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><AlertTriangle className="w-3 h-3 mr-1" />In Progress</Badge>;
      case 'resolved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Low</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">High</Badge>;
      case 'urgent':
        return <Badge variant="destructive" className="bg-red-200 text-red-900">Urgent</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateTicket.mutate({
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
          <h2 className="text-2xl font-bold text-primary">Technical Support</h2>
          <p className="text-muted-foreground">Manage support tickets and customer issues</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {tickets?.length || 0} Total Tickets
        </Badge>
      </div>

      <Card className="card-modern">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets?.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.name}</TableCell>
                  <TableCell>{ticket.issue_type}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{format(new Date(ticket.created_at), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Support Ticket Details</DialogTitle>
                          </DialogHeader>
                          {selectedTicket && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span>Contact Information</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-medium">{selectedTicket.name}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="w-3 h-3" />
                                      {selectedTicket.email}
                                    </div>
                                    {selectedTicket.phone && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-3 h-3" />
                                        {selectedTicket.phone}
                                      </div>
                                    )}
                                    {selectedTicket.company && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Building className="w-3 h-3" />
                                        {selectedTicket.company}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Settings className="w-4 h-4" />
                                    <span>Ticket Details</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p><span className="font-medium">Issue Type:</span> {selectedTicket.issue_type}</p>
                                    <p><span className="font-medium">Priority:</span> {getPriorityBadge(selectedTicket.priority)}</p>
                                    <p><span className="font-medium">Status:</span> {getStatusBadge(selectedTicket.status)}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-medium">Subject</h4>
                                <p className="text-sm bg-muted p-3 rounded-lg">{selectedTicket.subject}</p>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Bug className="w-4 h-4" />
                                  <span>Problem Description</span>
                                </div>
                                <p className="text-sm bg-muted p-3 rounded-lg whitespace-pre-wrap">{selectedTicket.description}</p>
                              </div>

                              {selectedTicket.system_info && (
                                <div className="space-y-2">
                                  <h4 className="font-medium">System Information</h4>
                                  <p className="text-sm bg-muted p-3 rounded-lg font-mono">{selectedTicket.system_info}</p>
                                </div>
                              )}

                              {selectedTicket.error_details && (
                                <div className="space-y-2">
                                  <h4 className="font-medium">Error Details</h4>
                                  <p className="text-sm bg-red-50 text-red-900 p-3 rounded-lg font-mono">{selectedTicket.error_details}</p>
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Submitted on {format(new Date(selectedTicket.created_at), 'MMMM dd, yyyy at hh:mm a')}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleStatusUpdate(ticket.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {!tickets?.length && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No support tickets found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSupportTab;
