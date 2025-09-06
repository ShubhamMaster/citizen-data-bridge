
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Plus, Pencil, Trash2, RefreshCw, Search, Download, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Document {
  document_id: string;
  company_id: string;
  document_name: string;
  doc_type: string;
  document_url: string;
  created_at: string;
  updated_at: string;
  document_number?: string;
  issue_date?: string;
  expiry_date?: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [companyFilter, setCompanyFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    company_id: '',
    document_name: '',
    doc_type: '',
    document_url: '',
    document_number: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    let filtered = documents.filter(doc =>
      doc.document_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (companyFilter === '' || doc.company_id === companyFilter)
    );
    setFilteredDocuments(filtered);
  }, [documents, searchTerm, companyFilter]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('civora_nexus_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({ ...prev, [name]: value }));
  };

  const createDocument = async () => {
    try {
      const documentToInsert = {
        ...newDocument,
        document_id: `DOC_${Date.now()}`,
      };

      const { error } = await supabase
        .from('civora_nexus_documents')
        .insert([documentToInsert]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document created successfully",
        variant: "default"
      });

      fetchDocuments();
      setIsCreateModalOpen(false);
      setNewDocument({
        company_id: '',
        document_name: '',
        doc_type: '',
        document_url: '',
        document_number: '',
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive"
      });
    }
  };

  const deleteDocument = async (document_id: string) => {
    try {
      const { error } = await supabase
        .from('civora_nexus_documents')
        .delete()
        .eq('document_id', document_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document deleted successfully",
        variant: "default"
      });

      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  const companyOptions = [...new Set(documents.map(doc => doc.company_id))];

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
            <FileText className="h-8 w-8" />
            Documents
          </h1>
          <p className="text-muted-foreground">Manage company documents</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                {companyOptions.map(companyId => (
                  <SelectItem key={companyId} value={companyId}>{companyId}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={fetchDocuments} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Company ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map(document => (
                <TableRow key={document.document_id}>
                  <TableCell className="font-medium">{document.document_name}</TableCell>
                  <TableCell>{document.doc_type}</TableCell>
                  <TableCell>{document.company_id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={document.document_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDocument(document.document_id)}
                      >
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

      {/* Create Document Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Document
              </h3>
              <div className="mt-2">
                <Input
                  placeholder="Document Name"
                  name="document_name"
                  value={newDocument.document_name}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Input
                  placeholder="Document Type"
                  name="doc_type"
                  value={newDocument.doc_type}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Input
                  placeholder="Document URL"
                  name="document_url"
                  value={newDocument.document_url}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Input
                  placeholder="Company ID"
                  name="company_id"
                  value={newDocument.company_id}
                  onChange={handleInputChange}
                  className="mb-4"
                />
              </div>
              <div className="items-center px-4 py-3">
                <Button variant="default" onClick={createDocument}>
                  Create Document
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
