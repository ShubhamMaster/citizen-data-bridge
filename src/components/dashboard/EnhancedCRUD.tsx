
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Edit, Trash2, Download, Search, Filter, Calendar as CalendarIcon, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface EnhancedCRUDProps {
  tableName: string;
  displayName: string;
  onBack: () => void;
}

const EnhancedCRUD: React.FC<EnhancedCRUDProps> = ({ tableName, displayName, onBack }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [tableName, currentPage, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(tableName as any).select('*');
      
      // Apply search
      if (searchTerm) {
        // Simple search across all fields - in a real app you'd want more sophisticated search
        // For now, we'll just fetch all data and filter client-side
      }
      
      // Pagination
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      query = query.range(from, to);
      
      const { data: result, error } = await query;
      
      if (error) throw error;
      
      setData(result || []);
      
      // Get columns from first row
      if (result && result.length > 0) {
        setColumns(Object.keys(result[0]));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: Record<string, any>) => {
    try {
      const { error } = await supabase.from(tableName as any).insert([formData]);
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Record created successfully",
        variant: "default"
      });
      
      setShowAddForm(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: string, formData: Record<string, any>) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .update(formData)
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Record updated successfully",
        variant: "default"
      });
      
      setEditingRow(null);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from(tableName as any).delete().eq('id', id);
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Record deleted successfully",
        variant: "default"
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .delete()
        .in('id', selectedRows);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `${selectedRows.length} records deleted successfully`,
        variant: "default"
      });
      
      setSelectedRows([]);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const exportData = async (format: string) => {
    try {
      const { data: allData, error } = await supabase.from(tableName as any).select('*');
      if (error) throw error;
      
      if (format === 'csv') {
        const csv = convertToCSV(allData || []);
        downloadFile(csv, `${tableName}.csv`, 'text/csv');
      } else if (format === 'json') {
        const json = JSON.stringify(allData, null, 2);
        downloadFile(json, `${tableName}.json`, 'application/json');
      }
      
      toast({
        title: "Success",
        description: `Data exported as ${format.toUpperCase()}`,
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
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

  const renderFormField = (columnName: string, value: any, onChange: (value: any) => void) => {
    // Basic field rendering - you could expand this based on column types
    if (columnName.includes('date') || columnName.includes('time')) {
      return (
        <Input
          type="datetime-local"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${columnName.replace(/_/g, ' ')}`}
        />
      );
    }
    
    if (columnName.includes('email')) {
      return (
        <Input
          type="email"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${columnName.replace(/_/g, ' ')}`}
        />
      );
    }
    
    if (columnName.includes('message') || columnName.includes('description')) {
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${columnName.replace(/_/g, ' ')}`}
        />
      );
    }
    
    return (
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${columnName.replace(/_/g, ' ')}`}
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-muted-foreground">{data.length} records</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('json')}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          {selectedRows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedRows.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Selected Records</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedRows.length} records? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === data.length && data.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRows(data.map(row => row.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableHead>
                  {columns.slice(0, 6).map((column) => (
                    <TableHead key={column}>
                      {column.replace(/_/g, ' ').toUpperCase()}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows([...selectedRows, row.id]);
                          } else {
                            setSelectedRows(selectedRows.filter(id => id !== row.id));
                          }
                        }}
                      />
                    </TableCell>
                    {columns.slice(0, 6).map((column) => (
                      <TableCell key={column}>
                        {typeof row[column] === 'boolean' ? (
                          <Badge variant={row[column] ? "default" : "secondary"}>
                            {row[column] ? "Yes" : "No"}
                          </Badge>
                        ) : (
                          String(row[column] || '-').slice(0, 50)
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingRow(row)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this record? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(row.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} results
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={data.length < itemsPerPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCRUD;
