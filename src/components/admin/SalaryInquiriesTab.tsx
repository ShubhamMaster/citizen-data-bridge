
import React from 'react';
import { useSalaryInquiries, useUpdateSalaryInquiry } from '@/hooks/useSalaryInquiries';
import DataTable from './DataTable';

const SalaryInquiriesTab = () => {
  const { data: inquiries, isLoading } = useSalaryInquiries();
  const updateInquiry = useUpdateSalaryInquiry();

  const columns = [
    { key: 'name', label: 'Name', type: 'text' as const },
    { key: 'email', label: 'Email', type: 'text' as const },
    { key: 'department', label: 'Department', type: 'text' as const },
    { key: 'experience_years', label: 'Experience', type: 'text' as const, render: (value: number) => `${value || 0} years` },
    { key: 'created_at', label: 'Date', type: 'date' as const },
    { key: 'status', label: 'Status', type: 'status' as const }
  ];

  const statusOptions = ['pending', 'replied'];

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateInquiry.mutate({
      id,
      updates: { 
        status: newStatus,
        updated_at: new Date().toISOString()
      }
    });
  };

  const handleExport = () => {
    if (!inquiries?.length) return;
    
    const csv = [
      ['Name', 'Email', 'Phone', 'Department', 'Experience', 'Current Salary', 'Expected Salary', 'Status', 'Date'],
      ...inquiries.map(inquiry => [
        inquiry.name,
        inquiry.email,
        inquiry.phone || '',
        inquiry.department,
        inquiry.experience_years || '',
        inquiry.current_salary || '',
        inquiry.expected_salary || '',
        inquiry.status,
        new Date(inquiry.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salary-inquiries.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DataTable
      data={inquiries || []}
      columns={columns}
      title="Salary Inquiries"
      onStatusUpdate={handleStatusUpdate}
      statusOptions={statusOptions}
      isLoading={isLoading}
      onExport={handleExport}
    />
  );
};

export default SalaryInquiriesTab;
