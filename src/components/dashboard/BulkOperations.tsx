
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Trash2, Download, Mail, Archive, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BulkOperationsProps {
  selectedRecords: string[];
  allRecords: any[];
  tableName: string;
  onSelectionChange: (selected: string[]) => void;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onExport: (data: any[], format: 'csv' | 'excel') => void;
}

const BulkOperations: React.FC<BulkOperationsProps> = ({
  selectedRecords,
  allRecords,
  tableName,
  onSelectionChange,
  onBulkDelete,
  onExport
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = allRecords.map(record => record.id).filter(Boolean);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRecords.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedRecords.length} records? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      for (let i = 0; i < selectedRecords.length; i++) {
        await onBulkDelete([selectedRecords[i]]);
        setProgress(((i + 1) / selectedRecords.length) * 100);
      }
      
      toast({
        title: "Success",
        description: `Deleted ${selectedRecords.length} records successfully`,
        variant: "default"
      });
      
      onSelectionChange([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Some records could not be deleted",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleBulkExport = (format: 'csv' | 'excel') => {
    const selectedData = allRecords.filter(record => 
      selectedRecords.includes(record.id)
    );
    
    if (selectedData.length === 0) {
      toast({
        title: "Warning",
        description: "No records selected for export",
        variant: "destructive"
      });
      return;
    }

    onExport(selectedData, format);
    
    toast({
      title: "Success",
      description: `Exported ${selectedData.length} records as ${format.toUpperCase()}`,
      variant: "default"
    });
  };

  const isAllSelected = allRecords.length > 0 && selectedRecords.length === allRecords.length;
  const isPartiallySelected = selectedRecords.length > 0 && selectedRecords.length < allRecords.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Bulk Operations
            {selectedRecords.length > 0 && (
              <Badge variant="secondary">
                {selectedRecords.length} selected
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
              {...(isPartiallySelected && { 'data-state': 'indeterminate' })}
            />
            <span className="text-sm text-muted-foreground">Select All</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isProcessing && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Processing...</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={selectedRecords.length === 0 || isProcessing}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete ({selectedRecords.length})
          </Button>

          <Button
            variant="outline"
            onClick={() => handleBulkExport('csv')}
            disabled={selectedRecords.length === 0 || isProcessing}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>

          <Button
            variant="outline"
            onClick={() => handleBulkExport('excel')}
            disabled={selectedRecords.length === 0 || isProcessing}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </Button>

          <Button
            variant="outline"
            disabled={selectedRecords.length === 0 || isProcessing}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Bulk Email
          </Button>
        </div>

        {selectedRecords.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>{selectedRecords.length}</strong> records selected from <strong>{tableName}</strong>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectionChange([])}
              className="mt-2"
            >
              Clear Selection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BulkOperations;
