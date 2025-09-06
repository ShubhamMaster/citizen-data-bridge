
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Key, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface OTPVerification {
  id: string;
  user_id?: string;
  otp_code: string;
  otp_type: string;
  email: string;
  verified: boolean;
  expires_at: string;
  created_at: string;
}

const OTPVerifications = () => {
  const [otps, setOtps] = useState<OTPVerification[]>([]);
  const [filteredOtps, setFilteredOtps] = useState<OTPVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const fetchOTPs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('otp_verifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOtps(data || []);
      setFilteredOtps(data || []);
    } catch (error: any) {
      console.error('Error fetching OTP verifications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch OTP verifications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOTPs();
  }, []);

  useEffect(() => {
    let filtered = otps.filter(otp => {
      const matchesSearch = otp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           otp.otp_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           otp.otp_code.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'verified' && otp.verified) ||
        (statusFilter === 'unverified' && !otp.verified) ||
        (statusFilter === 'expired' && new Date(otp.expires_at) < new Date());
      
      const matchesType = typeFilter === 'all' || otp.otp_type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    setFilteredOtps(filtered);
  }, [otps, searchTerm, statusFilter, typeFilter]);

  const getStatusBadge = (otp: OTPVerification) => {
    const now = new Date();
    const expiresAt = new Date(otp.expires_at);
    
    if (otp.verified) {
      return <Badge variant="default" className="flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Verified
      </Badge>;
    } else if (expiresAt < now) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Expired
      </Badge>;
    } else {
      return <Badge variant="secondary" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'login':
        return 'bg-blue-100 text-blue-800';
      case 'signup':
        return 'bg-green-100 text-green-800';
      case 'password_reset':
        return 'bg-orange-100 text-orange-800';
      case 'email_verification':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const cleanupExpired = async () => {
    try {
      await supabase.rpc('cleanup_expired_otp');
      toast({
        title: "Success",
        description: "Expired OTP records cleaned up",
        variant: "default"
      });
      fetchOTPs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to cleanup expired OTPs",
        variant: "destructive"
      });
    }
  };

  const uniqueTypes = [...new Set(otps.map(otp => otp.otp_type))];
  const verifiedCount = otps.filter(otp => otp.verified).length;
  const expiredCount = otps.filter(otp => new Date(otp.expires_at) < new Date()).length;
  const activeCount = otps.filter(otp => !otp.verified && new Date(otp.expires_at) >= new Date()).length;

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
            <Key className="h-8 w-8" />
            OTP Verifications
          </h1>
          <p className="text-muted-foreground">Monitor and manage OTP verification codes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={cleanupExpired} variant="outline">
            Cleanup Expired
          </Button>
          <Button onClick={fetchOTPs} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total OTPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{otps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
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
                placeholder="Search by email or OTP code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* OTP Table */}
      <Card>
        <CardHeader>
          <CardTitle>OTP Verification Records ({filteredOtps.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>OTP Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOtps.map((otp) => (
                  <TableRow key={otp.id}>
                    <TableCell className="font-medium">{otp.email}</TableCell>
                    <TableCell>
                      <div className="font-mono bg-muted px-2 py-1 rounded text-sm">
                        {otp.otp_code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(otp.otp_type)}>
                        {otp.otp_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(otp)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(otp.created_at).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(otp.expires_at).toLocaleString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOtps.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No OTP verification records found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerifications;
