
import React, { useState, memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RealTimeMetrics from './dashboard/RealTimeMetrics';
import DashboardOverview from './dashboard/DashboardOverview';
import TableManagement from './dashboard/TableManagement';
import DataVisualization from './dashboard/DataVisualization';
import ExportFunctionality from './dashboard/ExportFunctionality';
import { useSuperAdminDashboard } from '@/hooks/useSuperAdminDashboard';

const SuperAdminDashboard: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState('overview');
  const { dashboardState, fetchTables } = useSuperAdminDashboard();
  const { toast } = useToast();

  const handleRefresh = React.useCallback(async () => {
    try {
      await fetchTables();
      toast({
        title: "Dashboard Refreshed",
        description: "Data has been updated successfully",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Refresh Failed",
        description: error.message || "Failed to refresh dashboard",
        variant: "destructive"
      });
    }
  }, [fetchTables, toast]);

  // Memoize expensive calculations
  const totalRecords = React.useMemo(() => 
    dashboardState.tables.reduce((sum, table) => sum + table.totalCount, 0),
    [dashboardState.tables]
  );

  const renderTabContent = React.useCallback(() => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview tables={dashboardState.tables} loading={dashboardState.loading} />;
      case 'tables':
        return <TableManagement tables={dashboardState.tables} loading={dashboardState.loading} />;
      case 'analytics':
        return <DataVisualization tables={dashboardState.tables} loading={dashboardState.loading} />;
      case 'exports':
        return <ExportFunctionality tables={dashboardState.tables} loading={dashboardState.loading} />;
      default:
        return <DashboardOverview tables={dashboardState.tables} loading={dashboardState.loading} />;
    }
  }, [activeTab, dashboardState.tables, dashboardState.loading]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive system management and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={dashboardState.loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${dashboardState.loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="secondary">
            {totalRecords.toLocaleString()} Total Records
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics - lightweight summary */}
      <RealTimeMetrics tables={dashboardState.tables} loading={dashboardState.loading} />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tables">Table Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="exports">Export Tools</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </Tabs>
    </div>
  );
});

SuperAdminDashboard.displayName = 'SuperAdminDashboard';

export default SuperAdminDashboard;
