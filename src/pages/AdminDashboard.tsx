
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobManagement from "@/components/JobManagement";
import AdminProfilePage from "@/components/AdminProfilePage";
import SalaryInquiriesTab from "@/components/admin/SalaryInquiriesTab";
import TechnicalSupportTab from "@/components/admin/TechnicalSupportTab";
import ContactMessagesTab from "@/components/admin/ContactMessagesTab";
import ScheduledCallsTab from "@/components/admin/ScheduledCallsTab";
import InternsTab from "@/components/admin/InternsTab";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase,
  DollarSign,
  Headphones,
  Activity,
  GraduationCap
} from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine active tab from URL
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/overview') return 'overview';
    if (path === '/admin/interns') return 'interns';
    if (path === '/admin/scheduled-calls') return 'calls';
    if (path === '/admin/contact-messages') return 'messages';
    if (path === '/admin/jobs') return 'jobs';
    if (path === '/admin/salary') return 'salary';
    if (path === '/admin/support') return 'support';
    return 'overview';
  };

  const activeTab = getActiveTabFromPath();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        scheduledCallsRes,
        contactMessagesRes,
        jobsRes,
        salaryInquiriesRes,
        supportTicketsRes,
        websiteVisitsRes,
        internsRes
      ] = await Promise.all([
        supabase.from('scheduled_calls').select('id, is_done'),
        supabase.from('contact_messages').select('id'),
        supabase.from('jobs').select('id, is_active'),
        supabase.from('salary_inquiries').select('id, status'),
        supabase.from('support_tickets').select('id, status'),
        supabase.from('website_visits').select('id').gte('visited_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('interns').select('id, status, internship_year')
      ]);

      const currentYear = new Date().getFullYear();

      return {
        scheduledCalls: {
          total: scheduledCallsRes.data?.length || 0,
          pending: scheduledCallsRes.data?.filter(call => !call.is_done).length || 0
        },
        contactMessages: {
          total: contactMessagesRes.data?.length || 0
        },
        jobs: {
          total: jobsRes.data?.length || 0,
          active: jobsRes.data?.filter(job => job.is_active).length || 0
        },
        salaryInquiries: {
          total: salaryInquiriesRes.data?.length || 0,
          pending: salaryInquiriesRes.data?.filter(inquiry => inquiry.status === 'pending').length || 0
        },
        supportTickets: {
          total: supportTicketsRes.data?.length || 0,
          pending: supportTicketsRes.data?.filter(ticket => ticket.status === 'pending').length || 0
        },
        websiteVisits: {
          thisWeek: websiteVisitsRes.data?.length || 0
        },
        interns: {
          total: internsRes.data?.length || 0,
          thisYear: internsRes.data?.filter(intern => intern.internship_year === currentYear).length || 0,
          pending: internsRes.data?.filter(intern => intern.status === 'pending').length || 0
        }
      };
    },
  });

  const dashboardCards = [
    {
      title: "Interns",
      total: stats?.interns.total || 0,
      pending: stats?.interns.pending || 0,
      icon: <GraduationCap className="h-6 w-6 text-accent" />,
      color: "from-purple-500/10 to-purple-600/10",
      subtitle: `${stats?.interns.thisYear || 0} this year`
    },
    {
      title: "Scheduled Calls",
      total: stats?.scheduledCalls.total || 0,
      pending: stats?.scheduledCalls.pending || 0,
      icon: <Calendar className="h-6 w-6 text-accent" />,
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      title: "Contact Messages",
      total: stats?.contactMessages.total || 0,
      pending: 0,
      icon: <MessageSquare className="h-6 w-6 text-accent" />,
      color: "from-green-500/10 to-green-600/10"
    },
    {
      title: "Job Listings",
      total: stats?.jobs.total || 0,
      pending: stats?.jobs.active || 0,
      icon: <Briefcase className="h-6 w-6 text-accent" />,
      color: "from-indigo-500/10 to-indigo-600/10"
    },
    {
      title: "Salary Inquiries",
      total: stats?.salaryInquiries.total || 0,
      pending: stats?.salaryInquiries.pending || 0,
      icon: <DollarSign className="h-6 w-6 text-accent" />,
      color: "from-orange-500/10 to-orange-600/10"
    },
    {
      title: "Support Tickets",
      total: stats?.supportTickets.total || 0,
      pending: stats?.supportTickets.pending || 0,
      icon: <Headphones className="h-6 w-6 text-accent" />,
      color: "from-red-500/10 to-red-600/10"
    },
    {
      title: "Website Visits",
      total: stats?.websiteVisits.thisWeek || 0,
      pending: 0,
      icon: <Activity className="h-6 w-6 text-accent" />,
      color: "from-teal-500/10 to-teal-600/10",
      subtitle: "This week"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">Monitor and manage your business operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Card key={index} className="card-modern">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      {card.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-primary">{card.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{card.total}</span>
                        {card.pending > 0 && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {card.pending} pending
                          </Badge>
                        )}
                      </div>
                      {card.subtitle && (
                        <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => navigate('/admin/interns')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Manage Interns
                    {stats?.interns.pending > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {stats.interns.pending}
                      </Badge>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/admin/salary')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Review Salary Inquiries
                    {stats?.salaryInquiries.pending > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {stats.salaryInquiries.pending}
                      </Badge>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/admin/support')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Headphones className="h-4 w-4 mr-2" />
                    Handle Support Tickets
                    {stats?.supportTickets.pending > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {stats.supportTickets.pending}
                      </Badge>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/admin/scheduled-calls')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Scheduled Calls
                    {stats?.scheduledCalls.pending > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {stats.scheduledCalls.pending}
                      </Badge>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/admin/jobs')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Manage Job Listings
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="text-sm">2.4 GB / 10 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Sessions</span>
                    <span className="text-sm">1 admin</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'interns':
        return <InternsTab />;
      case 'calls':
        return <AdminProfilePage />;
      case 'messages':
        return <AdminProfilePage />;
      case 'jobs':
        return <JobManagement />;
      case 'salary':
        return <SalaryInquiriesTab />;
      case 'support':
        return <TechnicalSupportTab />;
      case 'scheduled-calls':
        return <ScheduledCallsTab />;
      case 'contact-messages':
        return <ContactMessagesTab />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container-custom py-8">
            {renderTabContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
