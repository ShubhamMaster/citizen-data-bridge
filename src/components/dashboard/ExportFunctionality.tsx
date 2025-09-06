
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Database } from 'lucide-react';
import Loading from '@/components/Loading';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface ExportFunctionalityProps {
  tables: TableInfo[];
  loading: boolean;
}

const ExportFunctionality: React.FC<ExportFunctionalityProps> = ({ tables, loading }) => {
  const { toast } = useToast();

  if (loading) {
    return <Loading size="md" className="min-h-[200px]" />;
  }

  const handleExport = async (tableName: string, format: 'csv' | 'json') => {
    try {
      const { data, error } = await supabase.from(tableName as any).select('*');
      if (error) throw error;
      
      if (format === 'csv') {
        const csv = convertToCSV(data || []);
        downloadFile(csv, `${tableName}.csv`, 'text/csv');
      } else if (format === 'json') {
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, `${tableName}.json`, 'application/json');
      }
      
      toast({
        title: "Export Complete",
        description: `${tableName} exported as ${format.toUpperCase()}`,
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    return csvContent;
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Only show tables with data for export
  const exportableTables = tables.filter(table => table.totalCount > 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download table data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportableTables.map((table) => (
              <Card key={table.name} className="border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span className="truncate">
                      {table.name.replace(/_/g, ' ').replace(/civora nexus /, '')}
                    </span>
                    <Badge variant="secondary">
                      {table.totalCount.toLocaleString()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleExport(table.name, 'csv')}
                      className="flex-1"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      CSV
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleExport(table.name, 'json')}
                      className="flex-1"
                    >
                      <Database className="h-3 w-3 mr-1" />
                      JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportFunctionality;
