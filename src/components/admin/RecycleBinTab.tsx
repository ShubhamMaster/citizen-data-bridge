
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, RotateCcw, Search, AlertTriangle } from 'lucide-react';

const RecycleBinTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recycleBinItems, isLoading } = useQuery({
    queryKey: ['recycle-bin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recycle_bin')
        .select('*')
        .order('deleted_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const restoreItem = useMutation({
    mutationFn: async ({ itemId, originalTable, originalId, data }: {
      itemId: string;
      originalTable: string;
      originalId: string;
      data: any;
    }) => {
      // Remove sensitive fields and restore the item
      const { id, created_at, updated_at, is_deleted, deleted_at, ...cleanData } = data;
      
      const { error: insertError } = await supabase
        .from(originalTable)
        .insert({
          ...cleanData,
          id: originalId,
          is_deleted: false,
          deleted_at: null,
        });
      
      if (insertError) throw insertError;

      // Remove from recycle bin
      const { error: deleteError } = await supabase
        .from('recycle_bin')
        .delete()
        .eq('id', itemId);
      
      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recycle-bin'] });
      toast({
        title: "Item Restored",
        description: "The item has been successfully restored.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Restore Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteForever = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('recycle_bin')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recycle-bin'] });
      toast({
        title: "Item Deleted",
        description: "The item has been permanently deleted.",
      });
    },
  });

  const emptyRecycleBin = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('recycle_bin')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recycle-bin'] });
      toast({
        title: "Recycle Bin Emptied",
        description: "All items have been permanently deleted.",
      });
    },
  });

  const filteredItems = recycleBinItems?.filter(item => 
    item.original_table.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.original_id.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getTableDisplayName = (tableName: string) => {
    const names: Record<string, string> = {
      'interns': 'Interns',
      'scheduled_calls': 'Scheduled Calls',
      'salary_inquiries': 'Salary Inquiries',
      'support_tickets': 'Support Tickets',
    };
    return names[tableName] || tableName;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Recycle Bin</h2>
          <p className="text-muted-foreground">Restore or permanently delete items</p>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!filteredItems.length}>
                <Trash2 className="w-4 h-4 mr-2" />
                Empty Recycle Bin
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all items in the recycle bin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => emptyRecycleBin.mutate()}>
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Deleted Items ({filteredItems.length})</span>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Trash2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {recycleBinItems?.length === 0 ? 'Recycle bin is empty' : 'No items match your search'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Deleted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {getTableDisplayName(item.original_table)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.original_id}
                    </TableCell>
                    <TableCell>
                      {new Date(item.deleted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.can_restore ? (
                        <Badge className="bg-green-100 text-green-800">Restorable</Badge>
                      ) : (
                        <Badge variant="destructive">Cannot Restore</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.can_restore && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => restoreItem.mutate({
                              itemId: item.id,
                              originalTable: item.original_table,
                              originalId: item.original_id,
                              data: item.data
                            })}
                            disabled={restoreItem.isPending}
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Restore
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete Forever
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this item. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteForever.mutate(item.id)}
                              >
                                Delete Forever
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecycleBinTab;
