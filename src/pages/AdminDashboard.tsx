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
  Search,
  Loader2,
  Save,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import JobManagement from "@/components/JobManagement";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import VisitorsCard from "@/components/admin/VisitorsCard";
import ApplicationsCard from "@/components/admin/ApplicationsCard";
import ContentEditor from "@/components/admin/ContentEditor";
import CompanySettingsCard from "@/components/admin/CompanySettingsCard";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobsSearchTerm, setJobsSearchTerm] = useState('');
  const [contactsSearchTerm, setContactsSearchTerm] = useState('');
  const [callsSearchTerm, setCallsSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalVisitors: 0, totalApplications: 0, activeJobs: 0, pendingReviews: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [scheduledCalls, setScheduledCalls] = useState<any[]>([]);
  const [isUpdatingCall, setIsUpdatingCall] = useState<number | null>(null);
  const navigate = useNavigate();
  const [viewedApp, setViewedApp] = useState<any | null>(null);
  const [statusSaving, setStatusSaving] = useState<string | null>(null);
  const [websiteVisits, setWebsiteVisits] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }

        setIsLoggedIn(true);
        setLoading(false);

        // Load data
        await loadDashboardData();
        await loadContactMessages();
        await loadScheduledCalls();
        await loadWebsiteVisits();
      } catch (error) {
        console.error("Auth check error:", error);
        setLoading(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Load applications
      const { data: applicationsData } = await supabase
        .from("applications")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (applicationsData) {
        setApplications(applicationsData);
        setStats(prev => ({ ...prev, totalApplications: applicationsData.length }));
      }

      // Load jobs count
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id, is_active");
      
      if (jobsData) {
        const activeJobs = jobsData.filter(job => job.is_active).length;
        setStats(prev => ({ ...prev, activeJobs }));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order('created_at', { ascending: false });
      if (!error && data) {
        setContactMessages(data);
      }
    } catch (error) {
      console.error("Error loading contact messages:", error);
    }
  };

  const loadScheduledCalls = async () => {
    try {
      const { data, error } = await supabase
        .from("scheduled_calls")
        .select("*")
        .order('created_at', { ascending: false });
      if (!error && data) setScheduledCalls(data);
    } catch (e) {
      console.error("Error loading scheduled calls:", e);
    }
  };

  const loadWebsiteVisits = async () => {
    try {
      const { data, error } = await supabase
        .from("website_visits")
        .select("*")
        .order('visited_at', { ascending: false })
        .limit(100); // latest 100

      if (!error && data) {
        setWebsiteVisits(data);
        setStats(prev => ({ ...prev, totalVisitors: data.length }));
      }
    } catch (e) {
      // silent
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  // Add local search helpers
  const filteredApplications = applications.filter(app =>
    (app.application_data?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.application_data?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.application_data?.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContactMessages = contactMessages.filter(msg =>
    (msg.name || '').toLowerCase().includes(contactsSearchTerm.toLowerCase()) ||
    (msg.email || '').toLowerCase().includes(contactsSearchTerm.toLowerCase()) ||
    (msg.message || '').toLowerCase().includes(contactsSearchTerm.toLowerCase())
  );

  const filteredScheduledCalls = scheduledCalls.filter(call =>
    (call.name || '').toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.reason || '').toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.date || '').toString().toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.time || '').toLowerCase().includes(callsSearchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-civora-teal rounded-full border-t-transparent" />
        <span className="ml-4 text-civora-navy">Loading dashboard...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-red-500 mb-4">Access Denied</div>
        <p className="text-gray-600 mb-4">You need to be logged in to view this page.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  // Missing handlers for ApplicationsCard
  const exportCSV = () => {
    // Stub: show a toast instead of real export
    // eslint-disable-next-line no-console
    console.log("Export CSV - not yet implemented");
  };

  const exportPDF = () => {
    // Stub: show a toast instead of real export
    // eslint-disable-next-line no-console
    console.log("Export PDF - not yet implemented");
  };

  const handleDownloadApplication = (app: any) => {
    // Stub: show a toast instead of real download
    // eslint-disable-next-line no-console
    console.log("Download application - not yet implemented", app);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    // Stub: show a toast instead of real status change
    // eslint-disable-next-line no-console
    console.log(`Status change for ${id} -> ${newStatus}`);
  };

  // Missing handler for toggleCallDone in Scheduled Calls tab
  const toggleCallDone = (id: number, nextVal: boolean) => {
    // Stub: show a toast instead of real update
    // eslint-disable-next-line no-console
    console.log(`Toggle call done for ${id} -> ${nextVal}`);
  };

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
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <VisitorsCard websiteVisits={websiteVisits} stats={stats} />
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Job Applications</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalApplications}</p>
                  <p className="text-xs text-gray-500">Total received</p>
                </div>
                <FileText className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Positions</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.activeJobs}</p>
                  <p className="text-xs text-gray-500">Currently hiring</p>
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
                  <p className="text-xs text-gray-500">Need attention</p>
                </div>
                <BarChart3 className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="contact-messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="calls">Scheduled Calls</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <ApplicationsCard
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredApplications={filteredApplications}
              exportCSV={exportCSV}
              exportPDF={exportPDF}
              setViewedApp={setViewedApp}
              viewedApp={viewedApp}
              handleDownloadApplication={handleDownloadApplication}
              handleStatusChange={handleStatusChange}
              statusSaving={statusSaving}
            />
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-end mb-4">
              <div className="relative w-72">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={jobsSearchTerm}
                  onChange={e => setJobsSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search jobs"
                  disabled
                  title="For demo: JobManagement search to be added in JobManagement component"
                />
              </div>
            </div>
            <JobManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-500">As a new company, we're setting up analytics tracking. Visitor data will appear here once implemented.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Website Content Section Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ContentEditor section="hero" label="Edit Hero Section" />
                  <ContentEditor section="services" label="Manage Services" />
                  <ContentEditor section="about" label="Update About Us" />
                  <ContentEditor section="contact" label="Contact Information" />
                </CardContent>
              </Card>

              {/* Company Settings */}
              <CompanySettingsCard />
            </div>
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="contact-messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <div className="flex justify-end mt-2">
                  <div className="relative w-72">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search messages..."
                      value={contactsSearchTerm}
                      onChange={e => setContactsSearchTerm(e.target.value)}
                      className="pl-10"
                      aria-label="Search contact messages"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredContactMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages yet</h3>
                    <p className="text-gray-500">Messages submitted via the website contact form will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Message</th>
                          <th className="text-left py-3 px-4">Submitted At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContactMessages.map((msg) => (
                          <tr key={msg.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{msg.name}</td>
                            <td className="py-3 px-4 text-civora-teal">{msg.email}</td>
                            <td className="py-3 px-4">{msg.message}</td>
                            <td className="py-3 px-4 text-xs text-gray-500">
                              {new Date(msg.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Calls Tab */}
          <TabsContent value="calls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Calls</CardTitle>
                <div className="flex justify-end mt-2">
                  <div className="relative w-72">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search calls..."
                      value={callsSearchTerm}
                      onChange={e => setCallsSearchTerm(e.target.value)}
                      className="pl-10"
                      aria-label="Search scheduled calls"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredScheduledCalls.length === 0 ? (
                  <div className="text-center py-8">
                    <Table className="w-full mb-4">
                      <TableCaption>No calls scheduled.</TableCaption>
                    </Table>
                    <p className="text-gray-500 mt-2">Calls scheduled via the website will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Scheduled At</TableHead>
                          <TableHead>Done?</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredScheduledCalls.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>{call.name}</TableCell>
                            <TableCell>
                              {call.date ? new Date(call.date).toLocaleDateString() : ""}
                            </TableCell>
                            <TableCell>{call.time}</TableCell>
                            <TableCell className="whitespace-pre-line">{call.reason}</TableCell>
                            <TableCell>
                              {call.created_at
                                ? new Date(call.created_at).toLocaleString()
                                : ""}
                            </TableCell>
                            <TableCell>
                              <button
                                className={`inline-flex items-center justify-center w-10 h-6 rounded-full border ${call.is_done ? "bg-civora-teal border-civora-teal" : "bg-gray-200 border-gray-300"} transition-colors duration-150`}
                                onClick={() => toggleCallDone(call.id, !call.is_done)}
                                disabled={isUpdatingCall === call.id}
                                aria-pressed={!!call.is_done}
                                title={call.is_done ? "Mark as not done" : "Mark as done"}
                              >
                                <span
                                  className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-150 ${call.is_done ? "translate-x-4" : "translate-x-0"}`}
                                />
                                {isUpdatingCall === call.id && (
                                  <span className="absolute right-0 top-0 mr-1 mt-0.5 animate-spin w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full" />
                                )}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
