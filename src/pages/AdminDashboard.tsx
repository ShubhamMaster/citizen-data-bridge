
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useSessionTimer } from "@/hooks/useSessionTimer";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProfileTab from "@/components/admin/AdminProfileTab";
import InternsTab from "@/components/admin/InternsTab";
import ScheduledCallsTab from "@/components/admin/ScheduledCallsTab";
import ContactMessagesTab from "@/components/admin/ContactMessagesTab";
import SalaryInquiriesTab from "@/components/admin/SalaryInquiriesTab";
import TechnicalSupportTab from "@/components/admin/TechnicalSupportTab";
import RecycleBinTab from "@/components/admin/RecycleBinTab";
import ManageAdminsTab from "@/components/admin/ManageAdminsTab";
import JobManagement from "@/components/JobManagement";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase,
  DollarSign,
  Headphones,
  Activity,
  GraduationCap,
  Clock,
  Trash2,
  Shield,
  AlertTriangle
} from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const { timeLeft, showWarning, extendSession, formatTime, setShowWarning } = useSessionTimer();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  // Determine active tab from URL
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/overview') return 'overview';
    if (path === '/admin/interns') return 'interns';
    if (path === '/admin/scheduled-calls') return 'scheduled-calls';
    if (path === '/admin/contact-messages') return 'contact-messages';
    if (path === '/admin/jobs') return 'jobs';
    if (path === '/admin/salary') return 'salary';
    if (path === '/admin/support') return 'support';
    if (path === '/admin/recycle-bin') return 'recycle-bin';
    if (path === '/admin/manage-admins') return 'manage-admins';
    if (path === '/admin/profile') return 'profile';
    return 'overview';
  };

  const activeTab = getActiveTabFromPath();

  // Redirect non-super-admin users
  useEffect(() => {
    if (userRole && userRole !== 'super_admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

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

            {/* Session Warning Alert */}
            {showWarning && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-orange-800">
                    Your session will expire in {formatTime(timeLeft)}. 
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={extendSession}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Extend Session
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowWarning(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
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
                    onClick={() => navigate('/admin/manage-admins')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Manage Admins
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/admin/recycle-bin')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Recycle Bin
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
                    <span className="text-sm text-muted-foreground">Session Time</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">User Role</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      <Shield className="w-3 h-3 mr-1" />
                      {userRole}
                    </Badge>
                  </div>
                  <Button 
                    onClick={extendSession} 
                    variant="outline" 
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Extend Session
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'interns':
        return <InternsTab />;
      case 'scheduled-calls':
        return <ScheduledCallsTab />;
      case 'contact-messages':
        return <ContactMessagesTab />;
      case 'jobs':
        return <JobManagement />;
      case 'salary':
        return <SalaryInquiriesTab />;
      case 'support':
        return <TechnicalSupportTab />;
      case 'recycle-bin':
        return <RecycleBinTab />;
      case 'manage-admins':
        return <ManageAdminsTab />;
      case 'profile':
        return <AdminProfileTab />;
      default:
        return <div>Tab not found</div>;
    }
  };

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-background flex w-full">
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AdminHeader 
        user={user}
        timeLeft={timeLeft}
        formatTime={formatTime}
        extendSession={extendSession}
        signOut={signOut}
      />

      <div className="flex w-full pt-20">
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeTab={activeTab}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container-custom py-8">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
