
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Database, Activity } from 'lucide-react';
import Loading from '@/components/Loading';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface RealTimeMetricsProps {
  tables: TableInfo[];
  loading: boolean;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ tables, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Loading size="sm" className="min-h-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalRecords = tables.reduce((sum, table) => sum + table.totalCount, 0);
  const totalTables = tables.length;
  const tablesWithData = tables.filter(table => table.totalCount > 0).length;
  
  // Calculate user count efficiently
  const userTables = ['profiles', 'employees', 'interns'];
  const userCount = userTables.reduce((sum, tableName) => {
    const table = tables.find(t => t.name === tableName);
    return sum + (table?.totalCount || 0);
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Across {totalTables} tables
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users & Staff</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Profiles, employees, interns
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tables</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tablesWithData}</div>
          <p className="text-xs text-muted-foreground">
            Tables with data
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            All systems operational
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMetrics;
