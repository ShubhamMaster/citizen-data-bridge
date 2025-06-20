
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Clock, Shield, Settings, Save } from 'lucide-react';

const AdminProfile = () => {
  const [sessionTimeLeft, setSessionTimeLeft] = useState(7200); // 2 hours in seconds
  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    email: 'admin@civoranexus.com',
    role: 'Super Admin',
    lastLogin: new Date().toLocaleString(),
    sessionsToday: 3,
    totalLogins: 247
  });

  // Session timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    // Handle saving profile data
    console.log('Saving profile data:', adminData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Admin Profile</h2>
          <p className="text-muted-foreground">Manage your admin account settings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              Session: {formatTime(sessionTimeLeft)}
            </span>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            {adminData.role}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={adminData.name}
                    onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={adminData.role}
                  disabled
                  className="bg-muted"
                />
              </div>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Session & Activity Stats */}
        <div className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Session Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Time Remaining</Label>
                <p className="text-2xl font-bold text-orange-600">{formatTime(sessionTimeLeft)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Last Login</Label>
                <p className="text-sm">{adminData.lastLogin}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Sessions Today</Label>
                <p className="text-lg font-semibold">{adminData.sessionsToday}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Total Logins</Label>
                <p className="text-lg font-semibold">{adminData.totalLogins}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                <Clock className="w-4 h-4 mr-2" />
                Extend Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
