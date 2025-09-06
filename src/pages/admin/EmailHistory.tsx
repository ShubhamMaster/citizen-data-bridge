
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Mail, RefreshCw, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface EmailRecord {
  id: string;
  sender_email: string;
  recipient_email: string;
  email_type: string;
  subject: string;
  form_type?: string;
  form_data?: any;
  template_used?: string;
  message_id?: string;
  provider: string;
  status: string;
  error_details?: string;
  sent_at: string;
  created_at: string;
}

const EmailHistory = () => {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const { toast } = useToast();

  const fetchEmailHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_history')
        .select('*')
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setEmails(data || []);
      setFilteredEmails(data || []);
    } catch (error: any) {
      console.error('Error fetching email history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch email history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  useEffect(() => {
    let filtered = emails.filter(email => {
      const matchesSearch = 
        email.recipient_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.sender_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (email.form_type && email.form_type.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
      const matchesType = typeFilter === 'all' || email.email_type === typeFilter;
      const matchesProvider = providerFilter === 'all' || email.provider === providerFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesProvider;
    });
    setFilteredEmails(filtered);
  }, [emails, searchTerm, statusFilter, typeFilter, providerFilter]);

  const getStatusBadge = (status: string, errorDetails?: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Sent
        </Badge>;
      case 'failed':
        return <Badge variant="destructive" className="flex items-center gap-1" title={errorDetails}>
          <XCircle className="h-3 w-3" />
          Failed
        </Badge>;
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'confirmation':
        return 'bg-blue-100 text-blue-800';
      case 'otp':
        return 'bg-green-100 text-green-800';
      case 'notification':
        return 'bg-orange-100 text-orange-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['Sent At', 'From', 'To', 'Subject', 'Type', 'Status', 'Provider', 'Message ID'];
    const csvContent = [
      headers.join(','),
      ...filteredEmails.map(email => [
        new Date(email.sent_at).toISOString(),
        email.sender_email,
        email.recipient_email,
        `"${email.subject.replace(/"/g, '""')}"`,
        email.email_type,
        email.status,
        email.provider,
        email.message_id || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const uniqueTypes = [...new Set(emails.map(email => email.email_type))];
  const uniqueProviders = [...new Set(emails.map(email => email.provider))];
  const sentCount = emails.filter(email => email.status === 'sent').length;
  const failedCount = emails.filter(email => email.status === 'failed').length;
  const todayCount = emails.filter(email => {
    const today = new Date().toDateString();
    return new Date(email.sent_at).toDateString() === today;
  }).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="h-8 w-8" />
            Email History
          </h1>
          <p className="text-muted-foreground">Monitor and manage email sending history</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchEmailHistory} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emails.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successfully Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{sentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {uniqueProviders.map(provider => (
                  <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Email Records ({filteredEmails.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sent At</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(email.sent_at).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{email.sender_email}</TableCell>
                    <TableCell className="font-mono text-sm">{email.recipient_email}</TableCell>
                    <TableCell className="max-w-xs truncate" title={email.subject}>
                      {email.subject}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(email.email_type)}>
                        {email.email_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(email.status, email.error_details)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{email.provider}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredEmails.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No email records found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailHistory;
