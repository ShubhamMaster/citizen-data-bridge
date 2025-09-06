
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TableSectionProps {
  title: string;
  description: string;
  tables: Array<{
    name: string;
    displayName: string;
    count: number;
    icon: React.ReactNode;
    description: string;
  }>;
  onTableSelect: (tableName: string) => void;
  onExport: (tableName: string, format: string) => void;
  onBulkDelete: (tableName: string, ids: string[]) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  title,
  description,
  tables,
  onTableSelect,
  onExport,
  onBulkDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredTables = tables.filter(table =>
    table.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (tableName: string, format: string) => {
    onExport(tableName, format);
    toast({
      title: "Export Started",
      description: `Exporting ${tableName} as ${format}...`,
      variant: "default"
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTables.map((table) => (
            <Card key={table.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {table.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{table.displayName}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {table.count} records
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {table.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    onClick={() => onTableSelect(table.name)}
                    className="flex-1 mr-2"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                  
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExport(table.name, 'csv')}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableSection;
