
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobManagement from "@/components/JobManagement";
import AdminProfilePage from "@/components/AdminProfilePage";
import SalaryInquiriesTab from "@/components/admin/SalaryInquiriesTab";
import TechnicalSupportTab from "@/components/admin/TechnicalSupportTab";
import ContactMessagesTab from "@/components/admin/ContactMessagesTab";
import ScheduledCallsTab from "@/components/admin/ScheduledCallsTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  Settings,
  DollarSign,
  Headphones,
  BarChart3,
  Activity,
  Database
} from "lucide-react";

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    // Update the URL path as well for deep linking
    navigate(`/admin/${value}`);
  };

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
        websiteVisitsRes
      ] = await Promise.all([
        supabase.from('scheduled_calls').select('id, is_done'),
        supabase.from('contact_messages').select('id'),
        supabase.from('jobs').select('id, is_active'),
        supabase.from('salary_inquiries').select('id, status'),
        supabase.from('support_tickets').select('id, status'),
        supabase.from('website_visits').select('id').gte('visited_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

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
        }
      };
    },
  });

  const dashboardCards = [
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
      color: "from-purple-500/10 to-purple-600/10"
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
      color: "from-teal-500/10 to-teal-600/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your business operations and track performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8 lg:w-auto lg:flex lg:flex-wrap gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calls</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Salary</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled-calls" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Scheduled</span>
            </TabsTrigger>
            <TabsTrigger value="contact-messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    onClick={() => handleTabChange('salary')} 
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
                    onClick={() => handleTabChange('support')} 
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
                    onClick={() => handleTabChange('calls')} 
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
                    onClick={() => handleTabChange('jobs')} 
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calls">
            <AdminProfilePage />
          </TabsContent>

          <TabsContent value="messages">
            <AdminProfilePage />
          </TabsContent>

          <TabsContent value="jobs">
            <JobManagement />
          </TabsContent>

          <TabsContent value="salary">
            <SalaryInquiriesTab />
          </TabsContent>

          <TabsContent value="support">
            <TechnicalSupportTab />
          </TabsContent>

          <TabsContent value="scheduled-calls">
            <ScheduledCallsTab />
          </TabsContent>

          <TabsContent value="contact-messages">
            <ContactMessagesTab />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
