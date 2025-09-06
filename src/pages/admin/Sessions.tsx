
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Clock, Users, Shield, Activity, RefreshCw, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SessionData {
  id: string;
  email: string;
  full_name: string;
  login_status: string;
  session_token: string;
  session_expires_at: string;
  session_start_time: string;
  last_activity: string;
  concurrent_sessions: number;
  login_count: number;
}

const Sessions = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('login_status', 'login')
        .order('last_activity', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
      setFilteredSessions(data || []);
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch active sessions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = sessions.filter(session =>
      session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSessions(filtered);
  }, [sessions, searchTerm]);

  const forceLogout = async (userId: string, userName: string) => {
    try {
      await supabase.rpc('update_login_status', {
        p_user_id: userId,
        p_status: 'logout'
      });

      toast({
        title: "Success",
        description: `${userName} has been logged out`,
        variant: "default"
      });

      fetchSessions();
    } catch (error: any) {
      console.error('Error forcing logout:', error);
      toast({
        title: "Error",
        description: "Failed to force logout",
        variant: "destructive"
      });
    }
  };

  const getSessionStatus = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const timeLeft = expiry.getTime() - now.getTime();
    
    if (timeLeft <= 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (timeLeft <= 300000) { // 5 minutes
      return <Badge variant="secondary">Expiring Soon</Badge>;
    } else {
      return <Badge variant="default">Active</Badge>;
    }
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const timeLeft = Math.max(0, expiry.getTime() - now.getTime());
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (timeLeft <= 0) return 'Expired';
    return `${hours}h ${minutes}m`;
  };

  const formatDuration = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const duration = now.getTime() - start.getTime();
    
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const activeSessions = sessions.filter(s => new Date(s.session_expires_at) > new Date());
  const expiredSessions = sessions.filter(s => new Date(s.session_expires_at) <= new Date());

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
            <Clock className="h-8 w-8" />
            Session Management
          </h1>
          <p className="text-muted-foreground">Monitor and manage active user sessions</p>
        </div>
        <Button onClick={fetchSessions} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSessions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredSessions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.length > 0 ? 
                Math.round(sessions.reduce((acc, s) => {
                  const duration = new Date().getTime() - new Date(s.session_start_time || s.last_activity).getTime();
                  return acc + duration;
                }, 0) / sessions.length / (1000 * 60)) : 0}m
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions by user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions ({filteredSessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Session Duration</TableHead>
                  <TableHead>Time Remaining</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Total Logins</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{session.full_name || 'No Name'}</div>
                        <div className="text-sm text-muted-foreground">{session.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getSessionStatus(session.session_expires_at)}</TableCell>
                    <TableCell>
                      {formatDuration(session.session_start_time || session.last_activity)}
                    </TableCell>
                    <TableCell>
                      {formatTimeRemaining(session.session_expires_at)}
                    </TableCell>
                    <TableCell>
                      {session.last_activity ? 
                        new Date(session.last_activity).toLocaleString() : 'Unknown'}
                    </TableCell>
                    <TableCell>{session.login_count || 0}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <LogOut className="h-4 w-4 mr-1" />
                            Force Logout
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Force User Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to force logout {session.full_name || session.email}? 
                              This will immediately terminate their session.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => forceLogout(session.id, session.full_name || session.email)}
                            >
                              Force Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No active sessions found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sessions;
