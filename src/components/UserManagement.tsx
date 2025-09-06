
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Edit, Shield, Clock, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import OTPVerification from './OTPVerification';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  login_status: string;
  last_login: string;
  session_expires_at: string;
  created_at: string;
  login_count: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    action: string;
    user: UserProfile;
    data?: any;
  } | null>(null);
  const { toast } = useToast();

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
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSensitiveAction = (action: string, user: UserProfile, data?: any) => {
    setPendingAction({ action, user, data });
    setShowOTPVerification(true);
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;

    const { action, user, data } = pendingAction;

    try {
      switch (action) {
        case 'update_user':
          await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);
          
          toast({
            title: "Success",
            description: "User updated successfully",
            variant: "default"
          });
          break;

        case 'change_role':
          await supabase
            .from('profiles')
            .update({ role: data.role })
            .eq('id', user.id);
          
          toast({
            title: "Success",
            description: "User role changed successfully",
            variant: "default"
          });
          break;

        case 'force_logout':
          await supabase.rpc('update_login_status', {
            p_user_id: user.id,
            p_status: 'logout'
          });
          
          toast({
            title: "Success",
            description: "User logged out successfully",
            variant: "default"
          });
          break;

        default:
          throw new Error('Unknown action');
      }

      await fetchUsers();
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (error: any) {
      console.error('Error executing action:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to execute action",
        variant: "destructive"
      });
    } finally {
      setPendingAction(null);
      setShowOTPVerification(false);
    }
  };

  const openEditModal = (user: UserProfile) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (data: any) => {
    if (editingUser) {
      handleSensitiveAction('update_user', editingUser, data);
    }
  };

  const handleChangeRole = (user: UserProfile, newRole: string) => {
    handleSensitiveAction('change_role', user, { role: newRole });
  };

  const handleForceLogout = (user: UserProfile) => {
    handleSensitiveAction('force_logout', user);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'login':
        return <Badge variant="default">Online</Badge>;
      case 'logout':
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge variant="destructive">Super Admin</Badge>;
      case 'admin':
        return <Badge variant="default">Admin</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  const isSessionExpired = (expiresAt: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Users</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.login_status === 'login' && !isSessionExpired(u.session_expires_at)).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'admin' || u.role === 'super_admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={fetchUsers} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
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
                        <div>
                          <div className="font-medium">{user.full_name || 'No Name'}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(user.login_status)}
                          {user.login_status === 'login' && isSessionExpired(user.session_expires_at) && (
                            <Badge variant="destructive">Expired</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(user.last_login)}</TableCell>
                      <TableCell>{user.login_count || 0}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.login_status === 'login' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleForceLogout(user)}
                            >
                              Force Logout
                            </Button>
                          )}
                          <select
                            value={user.role}
                            onChange={(e) => handleChangeRole(user, e.target.value)}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={editingUser.full_name || ''}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    full_name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    email: e.target.value
                  })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateUser({
                  full_name: editingUser.full_name,
                  email: editingUser.email
                })}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* OTP Verification for sensitive actions */}
      {showOTPVerification && pendingAction && (
        <OTPVerification
          open={showOTPVerification}
          onClose={() => {
            setShowOTPVerification(false);
            setPendingAction(null);
          }}
          onSuccess={executePendingAction}
          userId={pendingAction.user.id}
          email="admin-auth@civoranexus.com"
          otpType="sensitive_action"
          title="Verify Sensitive Action"
          description="This action requires OTP verification for security."
        />
      )}
    </div>
  );
};

export default UserManagement;
