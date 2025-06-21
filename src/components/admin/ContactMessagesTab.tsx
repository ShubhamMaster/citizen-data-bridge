
import React from 'react';
import { useContactMessages } from '@/hooks/useContactMessages';
import DataTable from './DataTable';

const ContactMessagesTab = () => {
  const { data: messages, isLoading } = useContactMessages();

  const columns = [
    { key: 'name', label: 'Name', type: 'text' as const },
    { key: 'email', label: 'Email', type: 'text' as const },
    { key: 'message', label: 'Message', type: 'text' as const, render: (value: string) => value?.substring(0, 100) + '...' },
    { key: 'created_at', label: 'Date', type: 'date' as const }
  ];

  const handleExport = () => {
    if (!messages?.length) return;
    
    const csv = [
      ['Name', 'Email', 'Message', 'Date'],
      ...messages.map(msg => [
        msg.name,
        msg.email,
        msg.message.replace(/,/g, ';'),
        new Date(msg.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-messages.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DataTable
      data={messages || []}
      columns={columns}
      title="Contact Messages"
      isLoading={isLoading}
      onExport={handleExport}
    />
  );
};

export default ContactMessagesTab;
