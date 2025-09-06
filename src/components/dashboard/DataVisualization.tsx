
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Loading from '@/components/Loading';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface DataVisualizationProps {
  tables: TableInfo[];
  loading: boolean;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ tables, loading }) => {
  if (loading) {
    return <Loading size="md" className="min-h-[400px]" />;
  }

  // Prepare data for charts - only top tables for performance
  const tableData = tables
    .filter(table => table.totalCount > 0)
    .map(table => ({
      name: table.name.replace(/_/g, ' ').replace(/civora nexus /, ''),
      count: table.totalCount,
      fullName: table.name
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Group tables by category for pie chart
  const categoryData = [
    {
      name: 'User Management',
      value: ['profiles', 'admin_logs', 'otp_verifications'].reduce((sum, name) => {
        const table = tables.find(t => t.name === name);
        return sum + (table?.totalCount || 0);
      }, 0),
      color: '#8884d8'
    },
    {
      name: 'Company Data',
      value: ['civora_nexus_companies', 'civora_nexus_company_contacts', 'civora_nexus_company_addresses'].reduce((sum, name) => {
        const table = tables.find(t => t.name === name);
        return sum + (table?.totalCount || 0);
      }, 0),
      color: '#82ca9d'
    },
    {
      name: 'Form Submissions',
      value: ['contact_submissions', 'collaboration_requests'].reduce((sum, name) => {
        const table = tables.find(t => t.name === name);
        return sum + (table?.totalCount || 0);
      }, 0),
      color: '#ffc658'
    }
  ].filter(item => item.value > 0);

  const totalRecords = tables.reduce((sum, table) => sum + table.totalCount, 0);
  const tablesWithData = tables.filter(table => table.totalCount > 0).length;

  return (
    <div className="space-y-6">
      {tableData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Tables by Record Count</CardTitle>
              <CardDescription>Tables with the most data entries</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tableData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {categoryData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Data Distribution</CardTitle>
                <CardDescription>Records by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Key statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {totalRecords.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {tables.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Tables</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {tablesWithData}
              </div>
              <div className="text-sm text-muted-foreground">Tables with Data</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
