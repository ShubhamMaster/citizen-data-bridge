
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Eye, Edit, Mail, Clock, Shield, Users as UsersIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const UsersCRUD: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User updated successfully",
        variant: "default"
      });
      
      setEditingUser(null);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const variants: Record<string, any> = {
      'super_admin': 'destructive',
      'admin': 'default',
      'user': 'secondary'
    };
    return <Badge variant={variants[role] || 'secondary'}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'login' ? 'default' : 'secondary'}>
        {status === 'login' ? 'Online' : 'Offline'}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            Users Management
          </h2>
          <p className="text-muted-foreground">{filteredUsers.length} users</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Login Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {user.full_name ? user.full_name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.full_name || 'No Name'}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.login_status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                      </div>
                    </TableCell>
                    <TableCell>{user.login_count || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* View Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                              <DialogDescription>
                                Complete information for this user account
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                                    <p className="text-sm">{selectedUser.full_name || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                                    <p className="text-sm">{selectedUser.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                                    <div className="mt-1">{getStatusBadge(selectedUser.login_status)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Created At</Label>
                                    <p className="text-sm">{new Date(selectedUser.created_at).toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Last Login</Label>
                                    <p className="text-sm">{selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString() : 'Never'}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Total Logins</Label>
                                    <p className="text-sm">{selectedUser.login_count || 0}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Today's Logins</Label>
                                    <p className="text-sm">{selectedUser.today_login_count || 0}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Edit Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => setEditingUser(user)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update user information and permissions
                              </DialogDescription>
                            </DialogHeader>
                            {editingUser && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="fullName">Full Name</Label>
                                  <Input
                                    id="fullName"
                                    value={editingUser.full_name || ''}
                                    onChange={(e) => setEditingUser({...editingUser, full_name: e.target.value})}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="role">Role</Label>
                                  <Select 
                                    value={editingUser.role}
                                    onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                      <SelectItem value="super_admin">Super Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setEditingUser(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={() => handleUpdateUser(editingUser.id, {
                                      full_name: editingUser.full_name,
                                      role: editingUser.role
                                    })}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersCRUD;
