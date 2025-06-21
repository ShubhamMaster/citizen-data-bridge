
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import AdminSidebar from '@/components/admin/AdminSidebar';
import InternsTab from '@/components/admin/InternsTab';
import ScheduledCallsTab from '@/components/admin/ScheduledCallsTab';
import ContactMessagesTab from '@/components/admin/ContactMessagesTab';
import TechnicalSupportTab from '@/components/admin/TechnicalSupportTab';
import SalaryInquiriesTab from '@/components/admin/SalaryInquiriesTab';
import { Users, Phone, MessageSquare, HeadphonesIcon, DollarSign, Eye, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const StatCard = ({ title, value, icon: Icon, subtitle, trend }: {
    title: string;
    value: number | string;
    icon: any;
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <Card className="card-modern">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {statsLoading ? (
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
          ) : (
            value
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time overview of your system
                {!statsLoading && (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-600">
                    <Activity className="w-3 h-3" />
                    Live
                  </span>
                )}
              </p>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interns">Interns</TabsTrigger>
              <TabsTrigger value="calls">Scheduled Calls</TabsTrigger>
              <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
              <TabsTrigger value="support">Technical Support</TabsTrigger>
              <TabsTrigger value="salary">Salary Inquiries</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Interns"
                  value={stats?.totalInterns || 0}
                  icon={Users}
                  subtitle={`${stats?.verifiedInterns || 0} verified`}
                />
                <StatCard
                  title="Scheduled Calls"
                  value={stats?.totalCalls || 0}
                  icon={Phone}
                  subtitle={`${stats?.completedCalls || 0} completed`}
                />
                <StatCard
                  title="Contact Messages"
                  value={stats?.totalContacts || 0}
                  icon={MessageSquare}
                  subtitle="Total received"
                />
                <StatCard
                  title="Website Visits"
                  value={stats?.totalVisits || 0}
                  icon={Eye}
                  subtitle="Total visits tracked"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                  title="Support Tickets"
                  value={stats?.totalSupportTickets || 0}
                  icon={HeadphonesIcon}
                  subtitle={`${stats?.pendingSupportTickets || 0} pending`}
                />
                <StatCard
                  title="Salary Inquiries"
                  value={stats?.totalSalaryInquiries || 0}
                  icon={DollarSign}
                  subtitle={`${stats?.pendingSalaryInquiries || 0} pending`}
                />
              </div>
            </TabsContent>

            <TabsContent value="interns">
              <InternsTab />
            </TabsContent>

            <TabsContent value="calls">
              <ScheduledCallsTab />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactMessagesTab />
            </TabsContent>

            <TabsContent value="support">
              <TechnicalSupportTab />
            </TabsContent>

            <TabsContent value="salary">
              <SalaryInquiriesTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
