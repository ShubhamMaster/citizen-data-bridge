
import React from 'react';
import { useSupportTickets, useUpdateSupportTicket } from '@/hooks/useSupportTickets';
import DataTable from './DataTable';

const TechnicalSupportTab = () => {
  const { data: tickets, isLoading } = useSupportTickets();
  const updateTicket = useUpdateSupportTicket();

  const columns = [
    { key: 'name', label: 'Name', type: 'text' as const },
    { key: 'email', label: 'Email', type: 'text' as const },
    { key: 'issue_type', label: 'Issue Type', type: 'text' as const },
    { key: 'priority', label: 'Priority', type: 'badge' as const },
    { key: 'created_at', label: 'Date', type: 'date' as const },
    { key: 'status', label: 'Status', type: 'status' as const }
  ];

  const statusOptions = ['pending', 'in_progress', 'resolved'];

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateTicket.mutate({
      id,
      updates: { 
        status: newStatus,
        updated_at: new Date().toISOString()
      }
    });
  };

  const handleExport = () => {
    if (!tickets?.length) return;
    
    const csv = [
      ['Name', 'Email', 'Company', 'Issue Type', 'Priority', 'Subject', 'Status', 'Date'],
      ...tickets.map(ticket => [
        ticket.name,
        ticket.email,
        ticket.company || '',
        ticket.issue_type,
        ticket.priority,
        ticket.subject,
        ticket.status,
        new Date(ticket.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'support-tickets.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DataTable
      data={tickets || []}
      columns={columns}
      title="Technical Support"
      onStatusUpdate={handleStatusUpdate}
      statusOptions={statusOptions}
      isLoading={isLoading}
      onExport={handleExport}
    />
  );
};

export default TechnicalSupportTab;
