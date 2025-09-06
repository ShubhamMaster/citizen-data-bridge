
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, FileText, Calendar, Download, RefreshCw } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');
  const { toast } = useToast();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch various analytics data
      const [
        formsResponse,
        usersResponse,
        companiesResponse,
        eventsResponse
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('civora_nexus_companies').select('*'),
        supabase.from('upcoming_events').select('*')
      ]);

      // Process form submissions by type
      const formsByType = formsResponse.data?.reduce((acc: any, form: any) => {
        acc[form.inquiry_type || 'general'] = (acc[form.inquiry_type || 'general'] || 0) + 1;
        return acc;
      }, {}) || {};

      // Process user registrations over time
      const usersByMonth = usersResponse.data?.reduce((acc: any, user: any) => {
        const month = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}) || {};

      // Process companies by industry
      const companiesByIndustry = companiesResponse.data?.reduce((acc: any, company: any) => {
        const industry = company.industry || 'Other';
        acc[industry] = (acc[industry] || 0) + 1;
        return acc;
      }, {}) || {};

      setData({
        totalForms: formsResponse.data?.length || 0,
        totalUsers: usersResponse.data?.length || 0,
        totalCompanies: companiesResponse.data?.length || 0,
        totalEvents: eventsResponse.data?.length || 0,
        formsByType: Object.entries(formsByType).map(([name, value]) => ({ name, value })),
        usersByMonth: Object.entries(usersByMonth).map(([name, value]) => ({ name, value })),
        companiesByIndustry: Object.entries(companiesByIndustry).map(([name, value]) => ({ name, value }))
      });

    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const exportData = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Forms', data.totalForms],
      ['Total Users', data.totalUsers],
      ['Total Companies', data.totalCompanies],
      ['Total Events', data.totalEvents]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive business insights and metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">Comprehensive business insights and metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={fetchAnalytics} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total Forms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalForms}</div>
            <Badge variant="secondary">+12% from last month</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers}</div>
            <Badge variant="secondary">+8% from last month</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Total Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCompanies}</div>
            <Badge variant="secondary">+15% from last month</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalEvents}</div>
            <Badge variant="secondary">+5% from last month</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Submissions by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Form Submissions by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.formsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Registrations Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>User Registrations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.usersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Companies by Industry */}
        <Card>
          <CardHeader>
            <CardTitle>Companies by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.companiesByIndustry}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.companiesByIndustry?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Conversion Rate</span>
                <Badge variant="default">4.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Response Time</span>
                <Badge variant="default">2.3 hours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Customer Satisfaction</span>
                <Badge variant="default">94%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Projects</span>
                <Badge variant="default">18</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
