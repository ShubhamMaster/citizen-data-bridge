
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, UserPlus, Edit, Phone, Mail, Building, Download, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Contact {
  contact_id: string;
  company_id: string;
  full_name: string;
  email: string;
  phone: string;
  alternate_email?: string;
  alternate_phone?: string;
  designation?: string;
  department?: string;
  contact_type?: string;
  is_primary_contact: boolean;
  linkedin_profile?: string;
  created_at: string;
  updated_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactTypeFilter, setContactTypeFilter] = useState('all');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({});
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('civora_nexus_company_contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
      setFilteredContacts(data || []);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    let filtered = contacts.filter(contact => {
      const matchesSearch = contact.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.designation?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = contactTypeFilter === 'all' || contact.contact_type === contactTypeFilter;
      
      return matchesSearch && matchesType;
    });
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, contactTypeFilter]);

  const handleCreateContact = async () => {
    try {
      const { data, error } = await supabase
        .from('civora_nexus_company_contacts')
        .insert([{
          ...newContact,
          contact_id: crypto.randomUUID()
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact created successfully",
        variant: "default"
      });

      setIsCreateModalOpen(false);
      setNewContact({});
      fetchContacts();
    } catch (error: any) {
      console.error('Error creating contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create contact",
        variant: "destructive"
      });
    }
  };

  const handleUpdateContact = async () => {
    if (!editingContact) return;

    try {
      const { error } = await supabase
        .from('civora_nexus_company_contacts')
        .update(editingContact)
        .eq('contact_id', editingContact.contact_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact updated successfully",
        variant: "default"
      });

      setIsEditModalOpen(false);
      setEditingContact(null);
      fetchContacts();
    } catch (error: any) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact",
        variant: "destructive"
      });
    }
  };

  const exportContacts = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Designation', 'Department', 'Type', 'Primary Contact'].join(','),
      ...filteredContacts.map(contact => [
        contact.full_name || 'N/A',
        contact.email,
        contact.phone || 'N/A',
        contact.designation || 'N/A',
        contact.department || 'N/A',
        contact.contact_type || 'N/A',
        contact.is_primary_contact ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
            <Phone className="h-8 w-8" />
            Contact Management
          </h1>
          <p className="text-muted-foreground">Manage company contacts and communication</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportContacts} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Contact</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={newContact.full_name || ''}
                    onChange={(e) => setNewContact({...newContact, full_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={newContact.designation || ''}
                    onChange={(e) => setNewContact({...newContact, designation: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newContact.department || ''}
                    onChange={(e) => setNewContact({...newContact, department: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_type">Contact Type</Label>
                  <Select 
                    value={newContact.contact_type || ''} 
                    onValueChange={(value) => setNewContact({...newContact, contact_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateContact}>
                  Create Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Primary Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.is_primary_contact).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Technical Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.contact_type === 'technical').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => {
                const created = new Date(c.created_at);
                const now = new Date();
                return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
              }).length}
            </div>
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
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={contactTypeFilter} onValueChange={setContactTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.contact_id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contact.full_name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{contact.designation || 'N/A'}</TableCell>
                    <TableCell>{contact.department || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={contact.contact_type === 'primary' ? 'default' : 'secondary'}>
                        {contact.contact_type || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={contact.is_primary_contact ? 'default' : 'secondary'}>
                        {contact.is_primary_contact ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingContact(contact);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Contact Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_full_name">Full Name</Label>
                <Input
                  id="edit_full_name"
                  value={editingContact.full_name || ''}
                  onChange={(e) => setEditingContact({
                    ...editingContact,
                    full_name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_email">Email</Label>
                <Input
                  id="edit_email"
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({
                    ...editingContact,
                    email: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_phone">Phone</Label>
                <Input
                  id="edit_phone"
                  value={editingContact.phone || ''}
                  onChange={(e) => setEditingContact({
                    ...editingContact,
                    phone: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_designation">Designation</Label>
                <Input
                  id="edit_designation"
                  value={editingContact.designation || ''}
                  onChange={(e) => setEditingContact({
                    ...editingContact,
                    designation: e.target.value
                  })}
                />
              </div>
              <div className="flex justify-end space-x-2 col-span-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateContact}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
