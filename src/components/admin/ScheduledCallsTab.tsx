
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DataTable from './DataTable';

const ScheduledCallsTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: calls, isLoading } = useQuery({
    queryKey: ['scheduled-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scheduled_calls')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateCall = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const { data, error } = await supabase
        .from('scheduled_calls')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-calls'] });
      toast({
        title: "Updated",
        description: "Call status updated successfully.",
      });
    },
  });

  const columns = [
    { key: 'name', label: 'Name', type: 'text' as const },
    { key: 'mobile', label: 'Mobile', type: 'text' as const },
    { key: 'date', label: 'Date', type: 'text' as const },
    { key: 'time', label: 'Time', type: 'text' as const },
    { key: 'reason', label: 'Reason', type: 'text' as const },
    { key: 'is_done', label: 'Status', type: 'text' as const, render: (value: boolean) => value ? 'Completed' : 'Pending' }
  ];

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateCall.mutate({
      id: parseInt(id),
      updates: { 
        is_done: newStatus === 'completed'
      }
    });
  };

  const handleExport = () => {
    if (!calls?.length) return;
    
    const csv = [
      ['Name', 'Mobile', 'Date', 'Time', 'Reason', 'Status'],
      ...calls.map(call => [
        call.name,
        call.mobile || '',
        call.date,
        call.time,
        call.reason,
        call.is_done ? 'Completed' : 'Pending'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scheduled-calls.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DataTable
      data={calls || []}
      columns={columns}
      title="Scheduled Calls"
      onStatusUpdate={handleStatusUpdate}
      statusOptions={['pending', 'completed']}
      isLoading={isLoading}
      onExport={handleExport}
    />
  );
};

export default ScheduledCallsTab;
