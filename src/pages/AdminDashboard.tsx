import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Helper: check if user is an admin
async function checkIsAdmin(userId: string) {
  // Use a direct query against user_roles table
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    return false;
  }
  return data?.role === "admin";
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalVisitors: 0, totalApplications: 0, activeJobs: 0, pendingReviews: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const navigate = useNavigate();

  // Protect route: only allow admin
  useEffect(() => {
    let sessionCleanup: undefined | (() => void);

    const run = async () => {
      // Set up Supabase auth change listener (sync updates only!)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setAuthChecked(true);
          setIsAdmin(false);
          setDenied(false);
          setLoading(false);
          navigate("/login", { replace: true });
        }
      });
      sessionCleanup = () => subscription.unsubscribe();

      // Now get actual session/user info
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setAuthChecked(true);
        setIsAdmin(false);
        setDenied(false);
        setLoading(false);
        navigate("/login", { replace: true });
        return;
      }
      setAuthChecked(true);
      setLoading(true);

      // Now check if user is an admin (wait for DB)
      const admin = await checkIsAdmin(session.user.id);
      if (!admin) {
        setIsAdmin(false);
        setDenied(true);
        setLoading(false);
      } else {
        setIsAdmin(true);
        setDenied(false);
        setLoading(false);
      }
    };

    run();

    return () => {
      if (sessionCleanup) sessionCleanup();
    };
  }, [navigate]);

  // Load dashboard data but ONLY if isAdmin
  useEffect(() => {
    if (!isAdmin) return;
    async function fetchData() {
      const { data: applications } = await supabase.from("applications").select("*");
      setApplications(applications || []);
      setStats((s) => ({ ...s, totalApplications: applications?.length || 0 }));
      setRecentVisitors([]);
    }
    fetchData();
  }, [isAdmin]);

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-civora-teal rounded-full border-t-transparent" />
        <span className="ml-4 text-civora-navy">Checking permissions...</span>
      </div>
    );
  }
  if (denied) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-red-500 mb-4">Access Denied</div>
        <p className="text-gray-600 mb-2">You don&apos;t have permission to view this page.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-civora-navy">Admin Dashboard</h1>
              <p className="text-gray-600">Civora Nexus Management Portal</p>
            </div>
            <Button variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Visitors</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalVisitors}</p>
                </div>
                <Users className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalApplications}</p>
                </div>
                <FileText className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.activeJobs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.pendingReviews}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="visitors">Visitor Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Job Applications</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Applicant</th>
                        <th className="text-left py-3 px-4">Position</th>
                        <th className="text-left py-3 px-4">Applied Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-gray-600">{app.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{app.position}</td>
                          <td className="py-3 px-4">{app.appliedDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadge(app.status)}>
                              {app.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Job Postings</CardTitle>
                  <Button className="bg-civora-teal hover:bg-civora-teal/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Job Title</th>
                        <th className="text-left py-3 px-4">Location</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Posted Date</th>
                        <th className="text-left py-3 px-4">Applications</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{job.title}</td>
                          <td className="py-3 px-4">{job.location}</td>
                          <td className="py-3 px-4">{job.type}</td>
                          <td className="py-3 px-4">{job.posted}</td>
                          <td className="py-3 px-4">{job.applications}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">IP Address</th>
                        <th className="text-left py-3 px-4">Location</th>
                        <th className="text-left py-3 px-4">Device</th>
                        <th className="text-left py-3 px-4">Browser</th>
                        <th className="text-left py-3 px-4">Visit Time</th>
                        <th className="text-left py-3 px-4">Pages Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVisitors.map((visitor, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{visitor.ip}</td>
                          <td className="py-3 px-4">{visitor.location}</td>
                          <td className="py-3 px-4">{visitor.device}</td>
                          <td className="py-3 px-4">{visitor.browser}</td>
                          <td className="py-3 px-4">{visitor.visitTime}</td>
                          <td className="py-3 px-4">{visitor.pagesVisited}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Hero Section
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Services
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Update About Us
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Contact Information
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input
                      id="site-title"
                      defaultValue="Civora Nexus"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      defaultValue="civoranexus@gmail.com"
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-full bg-civora-teal hover:bg-civora-teal/90">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
