
import React from 'react';
import { useScheduledCalls, useUpdateScheduledCall } from '@/hooks/useScheduledCalls';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Phone, Calendar, Clock, User } from 'lucide-react';

const ScheduledCallsTab = () => {
  const { data: calls, isLoading } = useScheduledCalls();
  const updateCall = useUpdateScheduledCall();

  const handleStatusUpdate = (id: number, newStatus: string) => {
    updateCall.mutate({
      id,
      updates: { 
        is_done: newStatus === 'completed'
      }
    });
  };

  const getStatusBadge = (isDone: boolean) => {
    return (
      <Badge className={isDone ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
        {isDone ? 'Completed' : 'Pending'}
      </Badge>
    );
  };

  const handleExport = () => {
    if (!calls?.length) return;
    
    const csv = [
      ['Name', 'Mobile', 'Date', 'Time', 'Reason', 'Status', 'Created At'],
      ...calls.map(call => [
        call.name,
        call.mobile || '',
        call.date,
        call.time,
        call.reason,
        call.is_done ? 'Completed' : 'Pending',
        new Date(call.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scheduled-calls-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Scheduled Calls</h2>
          <p className="text-muted-foreground">{calls?.length || 0} total calls</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time
                </div>
              </TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls?.map((call) => (
              <TableRow key={call.id}>
                <TableCell className="font-medium">{call.name}</TableCell>
                <TableCell>{call.mobile || 'Not provided'}</TableCell>
                <TableCell>{new Date(call.date).toLocaleDateString()}</TableCell>
                <TableCell>{call.time}</TableCell>
                <TableCell className="max-w-xs truncate">{call.reason}</TableCell>
                <TableCell>{getStatusBadge(call.is_done)}</TableCell>
                <TableCell>
                  <Select 
                    value={call.is_done ? 'completed' : 'pending'} 
                    onValueChange={(value) => handleStatusUpdate(call.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {(!calls || calls.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No scheduled calls found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledCallsTab;
