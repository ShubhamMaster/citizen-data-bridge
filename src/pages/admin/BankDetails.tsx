
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Plus, Pencil, Trash2, RefreshCw, Search } from 'lucide-react';

interface BankDetail {
  bank_id: string;
  company_id?: string;
  account_holder_name?: string;
  account_number?: string;
  ifsc_code?: string;
  bank_name?: string;
  branch_name?: string;
  upi_id?: string;
  created_at: string;
}

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState<BankDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newBankDetail, setNewBankDetail] = useState<Omit<BankDetail, 'bank_id' | 'created_at'>>({
    company_id: '',
    account_holder_name: '',
    account_number: '',
    ifsc_code: '',
    bank_name: '',
    branch_name: '',
    upi_id: '',
  });

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('civora_nexus_bank_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match expected interface
      const transformedData = (data || []).map(item => ({
        bank_id: item.bank_id,
        company_id: item.company_id,
        account_holder_name: item.account_holder_name,
        account_number: item.account_number,
        ifsc_code: item.ifsc_code,
        bank_name: item.bank_name,
        branch_name: item.branch_name,
        upi_id: item.upi_id,
        created_at: item.created_at
      }));
      
      setBankDetails(transformedData);
    } catch (error: any) {
      console.error('Error fetching bank details:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to fetch bank details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const createBankDetail = async () => {
    try {
      setLoading(true);
      
      const bankDetailData = {
        bank_id: `BANK_${Date.now()}`,
        ...newBankDetail
      };

      const { data, error } = await supabase
        .from('civora_nexus_bank_details')
        .insert([bankDetailData])
        .select();

      if (error) throw error;

      useToast().toast({
        title: "Success",
        description: "Bank detail created successfully",
        variant: "default"
      });

      setNewBankDetail({
        company_id: '',
        account_holder_name: '',
        account_number: '',
        ifsc_code: '',
        bank_name: '',
        branch_name: '',
        upi_id: '',
      });
      setIsCreating(false);
      fetchBankDetails();
    } catch (error: any) {
      console.error('Error creating bank detail:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to create bank detail",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBankDetail = async (bankId: string) => {
    try {
      const { error } = await supabase
        .from('civora_nexus_bank_details')
        .delete()
        .eq('bank_id', bankId);

      if (error) throw error;

      useToast().toast({
        title: "Success",
        description: "Bank detail deleted successfully",
        variant: "default"
      });

      fetchBankDetails();
    } catch (error: any) {
      console.error('Error deleting bank detail:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to delete bank detail",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Bank Details
          </h1>
          <p className="text-muted-foreground">Manage company bank details</p>
        </div>
        <Button onClick={fetchBankDetails} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bankDetails.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Banks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(bankDetails.map(detail => detail.bank_name).filter(Boolean)).size}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">UPI Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bankDetails.filter(detail => detail.upi_id).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Bank Details</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bank details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Holder</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>IFSC Code</TableHead>
                <TableHead>UPI ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankDetails.map(detail => (
                <TableRow key={detail.bank_id}>
                  <TableCell className="font-medium">{detail.account_holder_name}</TableCell>
                  <TableCell>{detail.bank_name}</TableCell>
                  <TableCell>{detail.account_number}</TableCell>
                  <TableCell>{detail.ifsc_code}</TableCell>
                  <TableCell>{detail.upi_id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBankDetail(detail.bank_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Bank Detail Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Bank Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="company_id">Company ID</Label>
                <Input
                  id="company_id"
                  value={newBankDetail.company_id}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, company_id: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="account_holder_name">Account Holder Name</Label>
                <Input
                  id="account_holder_name"
                  value={newBankDetail.account_holder_name}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, account_holder_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bank_name">Bank Name</Label>
                <Input
                  id="bank_name"
                  value={newBankDetail.bank_name}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, bank_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="account_number">Account Number</Label>
                <Input
                  id="account_number"
                  value={newBankDetail.account_number}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, account_number: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="ifsc_code">IFSC Code</Label>
                <Input
                  id="ifsc_code"
                  value={newBankDetail.ifsc_code}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, ifsc_code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="branch_name">Branch Name</Label>
                <Input
                  id="branch_name"
                  value={newBankDetail.branch_name}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, branch_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="upi_id">UPI ID</Label>
                <Input
                  id="upi_id"
                  value={newBankDetail.upi_id}
                  onChange={(e) => setNewBankDetail({ ...newBankDetail, upi_id: e.target.value })}
                />
              </div>
              <Button onClick={createBankDetail} disabled={loading}>
                {loading ? "Creating..." : "Create Bank Detail"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BankDetails;
