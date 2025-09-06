
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Plus, Pencil, Trash2, RefreshCw, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Address {
  address_id: string;
  company_id?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  is_primary?: boolean;
  created_at: string;
}

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'address_id' | 'created_at'>>({
    company_id: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    is_primary: false,
  });

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('civora_nexus_company_addresses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match expected interface
      const transformedData = (data || []).map(item => ({
        address_id: item.address_id,
        company_id: item.company_id,
        address_line1: item.street_address,
        address_line2: item.area,
        city: item.city,
        state: item.state,
        zip_code: item.postal_code,
        country: item.country,
        is_primary: false, // This field doesn't exist in the actual table
        created_at: item.created_at
      }));
      
      setAddresses(transformedData);
      setFilteredAddresses(transformedData);
    } catch (error: any) {
      console.error('Error fetching addresses:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const filtered = addresses.filter(address =>
      address.address_line1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.address_line2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.zip_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAddresses(filtered);
  }, [addresses, searchTerm]);

  const createAddress = async () => {
    try {
      setIsCreating(true);
      
      // Transform data to match database schema
      const addressData = {
        address_id: `ADDR_${Date.now()}`,
        company_id: newAddress.company_id,
        street_address: newAddress.address_line1,
        area: newAddress.address_line2,
        city: newAddress.city,
        state: newAddress.state,
        postal_code: newAddress.zip_code,
        country: newAddress.country,
        address_type: 'Office'
      };

      const { data, error } = await supabase
        .from('civora_nexus_company_addresses')
        .insert([addressData])
        .select();

      if (error) throw error;

      useToast().toast({
        title: "Success",
        description: "Address created successfully",
        variant: "default"
      });

      setNewAddress({
        company_id: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        is_primary: false,
      });
      setIsCreating(false);
      fetchAddresses();
    } catch (error: any) {
      console.error('Error creating address:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to create address",
        variant: "destructive"
      });
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('civora_nexus_company_addresses')
        .delete()
        .eq('address_id', addressId);

      if (error) throw error;

      useToast().toast({
        title: "Success",
        description: "Address deleted successfully",
        variant: "default"
      });

      fetchAddresses();
    } catch (error: any) {
      console.error('Error deleting address:', error);
      useToast().toast({
        title: "Error",
        description: "Failed to delete address",
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
            <MapPin className="h-8 w-8" />
            Company Addresses
          </h1>
          <p className="text-muted-foreground">Manage company addresses</p>
        </div>
        <Button onClick={fetchAddresses} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addresses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Primary Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addresses.filter(address => address.is_primary).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(addresses.map(address => address.country).filter(Boolean)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add New */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Addresses</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search addresses..."
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
                <TableHead>Address Line 1</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Zip Code</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAddresses.map(address => (
                <TableRow key={address.address_id}>
                  <TableCell className="font-medium">{address.address_line1}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.state}</TableCell>
                  <TableCell>{address.zip_code}</TableCell>
                  <TableCell>{address.country}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAddress(address.address_id)}
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

      {/* Create Address Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="company_id">Company ID</Label>
                <Input
                  id="company_id"
                  value={newAddress.company_id}
                  onChange={(e) => setNewAddress({ ...newAddress, company_id: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input
                  id="address_line1"
                  value={newAddress.address_line1}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address_line2">Address Line 2</Label>
                <Input
                  id="address_line2"
                  value={newAddress.address_line2}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="zip_code">Zip Code</Label>
                <Input
                  id="zip_code"
                  value={newAddress.zip_code}
                  onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                />
              </div>
              <Button onClick={createAddress} disabled={loading}>
                {loading ? "Creating..." : "Create Address"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Addresses;
