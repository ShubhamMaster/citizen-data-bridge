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

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalVisitors: 0, totalApplications: 0, activeJobs: 0, pendingReviews: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const navigate = useNavigate();

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

  // CSV Export for applications
  const handleExportApplications = () => {
    if (applications.length === 0) {
      toast({
        title: "Nothing to export",
        description: "There are no applications to export.",
      });
      return;
    }
    const csvHeaders = [
      "Applicant Name",
      "Applicant Email",
      "Position",
      "Applied Date",
      "Status"
    ];
    const csvRows = applications.map((app) => [
      `"${(app.application_data?.name ?? '').replace(/"/g, '""')}"`,
      `"${(app.application_data?.email ?? '').replace(/"/g, '""')}"`,
      `"${(app.application_data?.position ?? 'General Application').replace(/"/g, '""')}"`,
      `"${new Date(app.created_at).toLocaleString().replace(/"/g, '""')}"`,
      `"${(app.status ?? 'pending').replace(/"/g, '""')}"`
    ]);
    const csvContent = [csvHeaders, ...csvRows].map(row => row.join(",")).join("\r\n");

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "job-applications.csv");
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 0);
  };

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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Website Visitors</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalVisitors}</p>
                  <p className="text-xs text-gray-500">Since launch</p>
                </div>
                <Users className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="contact-messages">Contact Messages</TabsTrigger>
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
                    <Button variant="outline" onClick={handleExportApplications}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500">As a new company, you'll see job applications here once candidates start applying.</p>
                  </div>
                ) : (
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
                                <p className="font-medium">{app.application_data?.name || 'N/A'}</p>
                                <p className="text-sm text-gray-600">{app.application_data?.email || 'N/A'}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">{app.application_data?.position || 'General Application'}</td>
                            <td className="py-3 px-4">{new Date(app.created_at).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadge(app.status || 'pending')}>
                                {app.status || 'pending'}
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
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

              {/* Company Settings (static, unchanged) */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
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
                  <div>
                    <Label htmlFor="company-status">Company Status</Label>
                    <Input
                      id="company-status"
                      defaultValue="Newly Launched Startup"
                      className="mt-1"
                      readOnly
                    />
                  </div>
                  <Button className="w-full bg-civora-teal hover:bg-civora-teal/90">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="contact-messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {contactMessages.length === 0 ? (
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
                        {contactMessages.map((msg) => (
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
        </Tabs>
      </div>
    </div>
  );
};

// -------------------------------------
// ContentEditor Component (inline for simplicity)
type Props = {
  section: string;
  label: string;
};
const ContentEditor: React.FC<Props> = ({ section, label }) => {
  const {
    content,
    setContent,
    loading,
    saving,
    error,
    saveContent,
  } = useWebsiteContent(section);

  // Default state for common fields
  const [editState, setEditState] = useState<any>({
    title: "",
    subtitle: "",
    description: "",
    services: [],
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (content) {
      setEditState(content);
    }
  }, [content]);

  // Simple mappings for which fields to show
  let fields: JSX.Element[] = [];
  if (section === "hero") {
    fields = [
      <Input
        key="title"
        className="mb-2"
        placeholder="Headline"
        value={editState.title || ""}
        onChange={(e) => setEditState({ ...editState, title: e.target.value })}
      />,
      <Textarea
        key="subtitle"
        className="mb-2"
        placeholder="Subtitle"
        value={editState.subtitle || ""}
        onChange={(e) => setEditState({ ...editState, subtitle: e.target.value })}
      />
    ];
  } else if (section === "about") {
    fields = [
      <Textarea
        key="description"
        className="mb-2"
        placeholder="About Us"
        value={editState.description || ""}
        onChange={(e) => setEditState({ ...editState, description: e.target.value })}
      />
    ];
  } else if (section === "services") {
    fields = [
      <Textarea
        key="services"
        className="mb-2"
        placeholder="Services (comma separated)"
        value={Array.isArray(editState.services) ? editState.services.join(", ") : ""}
        onChange={(e) =>
          setEditState({
            ...editState,
            services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
          })
        }
      />
    ];
  } else if (section === "contact") {
    fields = [
      <Input
        key="address"
        className="mb-2"
        placeholder="Address"
        value={editState.address || ""}
        onChange={(e) => setEditState({ ...editState, address: e.target.value })}
      />,
      <Input
        key="email"
        className="mb-2"
        placeholder="Email"
        value={editState.email || ""}
        onChange={(e) => setEditState({ ...editState, email: e.target.value })}
      />,
      <Input
        key="phone"
        className="mb-2"
        placeholder="Phone"
        value={editState.phone || ""}
        onChange={(e) => setEditState({ ...editState, phone: e.target.value })}
      />
    ];
  }

  return (
    <form
      className="p-3 border rounded mb-4 bg-gray-50"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveContent(editState);
      }}
    >
      <div className="font-semibold mb-2">{label}</div>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <>
          {fields}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-civora-teal hover:bg-civora-teal/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save
            </Button>
            {error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default AdminDashboard;
