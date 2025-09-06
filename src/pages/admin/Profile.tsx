import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { User, Shield, Clock, Activity, Key, Mail, Calendar, LogIn } from 'lucide-react';
import OTPVerification from '@/components/OTPVerification';

interface ProfileData {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  created_at?: string;
  last_login?: string;
  login_count?: number;
  today_login_count?: number;
  last_password_change?: string;
  two_fa_enabled?: boolean;
  login_status?: string;
}

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChangeRequest = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setShowOTPVerification(true);
  };

  const handleOTPSuccess = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Update last password change timestamp
      await supabase
        .from('profiles')
        .update({ 
          last_password_change: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      toast({
        title: "Success",
        description: "Password updated successfully"
      });

      setIsPasswordDialogOpen(false);
      setNewPassword('');
      setConfirmPassword('');
      setShowOTPVerification(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString() + ' at ' + 
           new Date(dateString).toLocaleTimeString();
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'login':
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'logout':
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <User className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Your account details and basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <p className="text-sm">{profile?.full_name || 'Not provided'}</p>
            </div>
            
            <div className="space-y-2">
              <Label>Email Address</Label>
              <p className="text-sm">{profile?.email}</p>
            </div>
            
            <div className="space-y-2">
              <Label>Role</Label>
              <Badge variant="outline" className="capitalize">
                {profile?.role?.replace('_', ' ')}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label>Current Status</Label>
              {getStatusBadge(profile?.login_status)}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  {profile?.two_fa_enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <Badge variant={profile?.two_fa_enabled ? "default" : "secondary"}>
                {profile?.two_fa_enabled ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Last Password Change</Label>
              <p className="text-sm text-muted-foreground">
                {profile?.last_password_change ? formatDate(profile.last_password_change) : 'Never changed'}
              </p>
            </div>

            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handlePasswordChangeRequest} className="flex-1">
                      Verify with OTP
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsPasswordDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Account Activity
            </CardTitle>
            <CardDescription>
              Your login history and account usage statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <LogIn className="w-3 h-3" />
                  Total Logins
                </Label>
                <p className="text-2xl font-bold">{profile?.login_count || 0}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Today's Logins
                </Label>
                <p className="text-2xl font-bold">{profile?.today_login_count || 0}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last Login
              </Label>
              <p className="text-sm text-muted-foreground">
                {formatDate(profile?.last_login)}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <User className="w-3 h-3" />
                Account Created
              </Label>
              <p className="text-sm text-muted-foreground">
                {profile?.created_at ? formatDate(profile.created_at) : 'Unknown'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Your contact details and communication preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Email</Label>
              <p className="text-sm">{profile?.email}</p>
            </div>

            <div className="space-y-2">
              <Label>Account ID</Label>
              <p className="text-xs font-mono text-muted-foreground">
                {profile?.id}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Role Permissions</Label>
              <p className="text-sm text-muted-foreground">
                {profile?.role === 'super_admin' 
                  ? 'Full administrative access to all systems and data'
                  : 'Standard user access with limited permissions'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showOTPVerification && (
        <OTPVerification
          open={showOTPVerification}
          onClose={() => setShowOTPVerification(false)}
          onSuccess={handleOTPSuccess}
          userId={user?.id || ''}
          email={profile?.email || ''}
          otpType="password_change"
          title="Verify Password Change"
          description="Please enter the verification code to confirm your password change"
        />
      )}
    </div>
  );
};

export default Profile;
