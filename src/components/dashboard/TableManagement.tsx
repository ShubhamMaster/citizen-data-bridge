
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Trash2 } from 'lucide-react';
import Loading from '@/components/Loading';
import EnhancedCRUD from './EnhancedCRUD';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface TableManagementProps {
  tables: TableInfo[];
  loading: boolean;
}

const TableManagement: React.FC<TableManagementProps> = ({ tables, loading }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTableDisplay, setSelectedTableDisplay] = useState<string>('');

  if (selectedTable) {
    return (
      <EnhancedCRUD
        tableName={selectedTable}
        displayName={selectedTableDisplay}
        onBack={() => {
          setSelectedTable(null);
          setSelectedTableDisplay('');
        }}
      />
    );
  }

  if (loading) {
    return <Loading size="md" className="min-h-[200px]" />;
  }

  const handleTableSelect = (tableName: string) => {
    const displayName = tableName
      .replace(/_/g, ' ')
      .replace(/civora nexus /, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    setSelectedTable(tableName);
    setSelectedTableDisplay(displayName);
  };

  // Sort tables by count for better UX
  const sortedTables = [...tables].sort((a, b) => b.totalCount - a.totalCount);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTables.map((table) => (
          <Card key={table.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="truncate">
                  {table.name.replace(/_/g, ' ').replace(/civora nexus /, '')}
                </span>
                <Badge variant="secondary" className="ml-2">
                  {table.totalCount}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                {table.columns.length} columns • {table.totalCount} records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleTableSelect(table.name)}
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" disabled={table.totalCount === 0}>
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableManagement;
