import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Settings as SettingsIcon, Shield, Bell, Database, Key } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    sessionTimeout: 120, // minutes
    autoLogout: true,
    dataRetention: 90, // days
    apiAccess: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('two_fa_enabled')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error loading user settings:', error);
        } else {
          setSettings(prev => ({
            ...prev,
            twoFactorAuth: data?.two_fa_enabled || false
          }));
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSettings();
  }, [user]);

  const updateSetting = async (key: keyof typeof settings, value: boolean | number) => {
    if (!user) return;

    setSettings(prev => ({ ...prev, [key]: value }));

    try {
      // Handle 2FA setting update
      if (key === 'twoFactorAuth' && typeof value === 'boolean') {
        const { error } = await supabase
          .from('profiles')
          .update({ two_fa_enabled: value })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating 2FA setting:', error);
          // Revert the setting on error
          setSettings(prev => ({ ...prev, [key]: !value }));
          toast({
            title: "Error",
            description: "Failed to update two-factor authentication setting.",
            variant: "destructive"
          });
          return;
        }
      }

      toast({
        title: "Setting Updated",
        description: `${key === 'twoFactorAuth' ? 'Two-factor authentication' : 'Setting'} has been updated successfully.`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revert the setting on error
      const revertValue = key === 'twoFactorAuth' && typeof value === 'boolean' ? !value : value;
      setSettings(prev => ({ ...prev, [key]: revertValue }));
      toast({
        title: "Error",
        description: "Failed to update setting. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <SettingsIcon />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Loading your preferences...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security and authentication options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked: boolean) => updateSetting('twoFactorAuth', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                onBlur={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                min="30"
                max="480"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Logout on Inactivity</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically log out when session expires
                </p>
              </div>
              <Switch
                checked={settings.autoLogout}
                onCheckedChange={(checked: boolean) => updateSetting('autoLogout', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked: boolean) => updateSetting('emailNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Configure data retention and storage options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                onBlur={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                min="30"
                max="365"
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Access
            </CardTitle>
            <CardDescription>
              Manage API keys and external integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Access Enabled</Label>
                <p className="text-sm text-muted-foreground">
                  Allow API access to your account
                </p>
              </div>
              <Switch
                checked={settings.apiAccess}
                onCheckedChange={(checked: boolean) => updateSetting('apiAccess', checked)}
              />
            </div>
            
            {settings.apiAccess && (
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex space-x-2">
                  <Input value="sk-1234567890abcdef" readOnly />
                  <button className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded">
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Settings are automatically saved when you make changes
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
