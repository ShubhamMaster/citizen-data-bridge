
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TableManagerProps {
  table: {
    name: string;
    columns: string[];
    data: any[];
    totalCount: number;
  };
  onCreateRecord: (tableName: string, data: any) => Promise<any>;
  onUpdateRecord: (tableName: string, id: string, data: any, oldData: any) => Promise<any>;
  onDeleteRecord: (tableName: string, id: string, recordData: any) => Promise<void>;
  onRefresh: () => Promise<void>;
}

const TableManager: React.FC<TableManagerProps> = ({
  table,
  onCreateRecord,
  onUpdateRecord,
  onDeleteRecord,
  onRefresh
}) => {
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRecord, setNewRecord] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreate = async () => {
    setLoading(true);
    try {
      await onCreateRecord(table.name, newRecord);
      setNewRecord({});
      setShowCreateForm(false);
      toast({
        title: "Success",
        description: "Record created successfully",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create record",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingRecord) return;

    setLoading(true);
    try {
      await onUpdateRecord(table.name, editingRecord.id, editingRecord, table.data.find((item: any) => item.id === editingRecord.id));
      setEditingRecord(null);
      toast({
        title: "Success",
        description: "Record updated successfully",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update record",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, recordData: any) => {
    setLoading(true);
    try {
      await onDeleteRecord(table.name, id, recordData);
      toast({
        title: "Success",
        description: "Record deleted successfully",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete record",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to refresh data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{table.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
          <Button onClick={handleRefresh} variant="outline" className="ml-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {showCreateForm && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Create New Record</h3>
            <div className="grid grid-cols-2 gap-4">
              {table.columns.map((column) => (
                <div key={column}>
                  <Label htmlFor={`create-${column}`}>{column}</Label>
                  <Input
                    type="text"
                    id={`create-${column}`}
                    value={newRecord[column] || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, [column]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleCreate} className="mt-4">
              Create
            </Button>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {table.columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.data.map((record) => (
              <TableRow key={record.id}>
                {table.columns.map((column) => (
                  <TableCell key={column}>
                    {editingRecord?.id === record.id ? (
                      <Input
                        type="text"
                        value={editingRecord[column] || ''}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, [column]: e.target.value })
                        }
                      />
                    ) : (
                      record[column]?.toString() || 'N/A'
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  {editingRecord?.id === record.id ? (
                    <>
                      <Button onClick={handleUpdate} variant="secondary" size="sm">
                        Save
                      </Button>
                      <Button onClick={() => setEditingRecord(null)} variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditingRecord({ ...record })}
                        variant="outline"
                        size="sm"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(record.id, record)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableManager;
