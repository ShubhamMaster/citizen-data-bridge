
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Key, Plus, Trash2, Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface APIKey {
  id: string;
  key_name: string | null;
  api_key: string;
  is_active: boolean;
  created_at: string;
  api_key_masked?: string;
  api_key_full?: string;
}

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [showFullKey, setShowFullKey] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const fetchAPIKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match expected interface
      const transformedData = (data || []).map(item => ({
        ...item,
        key_name: item.key_name || 'Unnamed Key',
        api_key_masked: item.api_key.substring(0, 8) + '...' + item.api_key.substring(item.api_key.length - 4),
        api_key_full: item.api_key
      }));
      
      setApiKeys(transformedData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch API keys",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const generateAPIKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-api-key', {
        body: { key_name: newKeyName.trim() }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "API key generated successfully",
        variant: "default"
      });

      fetchAPIKeys();
      setNewKeyName('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate API key",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAPIKey = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "API key deleted successfully",
        variant: "default"
      });

      fetchAPIKeys();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowFullKey = (id: string) => {
    setShowFullKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Key className="h-8 w-8" />
            API Keys
          </h1>
          <p className="text-muted-foreground">Manage and generate API keys for secure access</p>
        </div>
        <Button onClick={fetchAPIKeys} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Generate API Key Form */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="col-span-2"
              />
            </div>
            <Button onClick={generateAPIKey} disabled={loading}>
              Generate Key
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.key_name}</TableCell>
                  <TableCell>
                    {showFullKey[key.id] ? (
                      <div className="flex items-center">
                        {key.api_key_full}
                        <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(key.api_key_full || '')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      key.api_key_masked
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={key.is_active ? "default" : "secondary"}>
                      {key.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => toggleShowFullKey(key.id)}>
                        {showFullKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => deleteAPIKey(key.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeys;
