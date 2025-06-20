
import React, { useState } from 'react';
import { useInterns, useCreateIntern, useUpdateIntern, useDeleteIntern } from '@/hooks/useInterns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Plus, Download, Search, ExternalLink } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import * as XLSX from 'xlsx';

const InternsTab = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const { data: interns, isLoading } = useInterns(selectedYear);
  const createIntern = useCreateIntern();
  const updateIntern = useUpdateIntern();
  const deleteIntern = useDeleteIntern();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    internship_year: selectedYear
  });

  const filteredInterns = interns?.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.intern_id.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedInterns = filteredInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredInterns.length / rowsPerPage);

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i + 2);

  const departments = [
    'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 
    'HR', 'Finance', 'Operations', 'Research', 'Data Science'
  ];

  const statusOptions = ['pending', 'verified', 'completed', 'terminated'];

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createIntern.mutateAsync(formData);
    setIsCreateModalOpen(false);
    setFormData({ name: '', email: '', department: '', internship_year: selectedYear });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIntern) {
      await updateIntern.mutateAsync({
        id: selectedIntern.id,
        updates: formData
      });
      setIsEditModalOpen(false);
      setSelectedIntern(null);
    }
  };

  const handleEdit = (intern: any) => {
    setSelectedIntern(intern);
    setFormData({
      name: intern.name,
      email: intern.email,
      department: intern.department,
      internship_year: intern.internship_year
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteIntern.mutateAsync(id);
  };

  const exportToExcel = () => {
    const exportData = filteredInterns.map(intern => ({
      'Intern ID': intern.intern_id,
      'Name': intern.name,
      'Email': intern.email,
      'Department': intern.department,
      'Year': intern.internship_year,
      'Status': intern.status,
      'Verification Link': `${window.location.origin}/verify/${intern.verification_token}`,
      'Created Date': new Date(intern.created_at).toLocaleDateString(),
      'Verified Date': intern.verified_at ? new Date(intern.verified_at).toLocaleDateString() : 'Not verified'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Interns_${selectedYear}`);
    XLSX.writeFile(wb, `Interns_${selectedYear}.xlsx`);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-orange-100 text-orange-800',
      verified: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      terminated: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Interns Management</h2>
          <p className="text-muted-foreground">{filteredInterns.length} interns found</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Intern
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Intern</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Internship Year</Label>
                  <Select value={formData.internship_year.toString()} onValueChange={(value) => setFormData({...formData, internship_year: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createIntern.isPending}>
                    {createIntern.isPending ? 'Creating...' : 'Create Intern'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search interns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Intern ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification Link</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInterns.map((intern) => (
              <TableRow key={intern.id}>
                <TableCell className="font-mono font-medium">{intern.intern_id}</TableCell>
                <TableCell>{intern.name}</TableCell>
                <TableCell>{intern.email}</TableCell>
                <TableCell>{intern.department}</TableCell>
                <TableCell>{intern.internship_year}</TableCell>
                <TableCell>{getStatusBadge(intern.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/verify/${intern.verification_token}`, '_blank')}
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Intern Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Intern ID</Label>
                            <p className="font-mono">{intern.intern_id}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                            <p>{intern.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <p>{intern.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                            <p>{intern.department}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Year</Label>
                            <p>{intern.internship_year}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                            <div className="mt-1">{getStatusBadge(intern.status)}</div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Created At</Label>
                            <p>{new Date(intern.created_at).toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Verified At</Label>
                            <p>{intern.verified_at ? new Date(intern.verified_at).toLocaleString() : 'Not verified'}</p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm font-medium text-muted-foreground">Verification Link</Label>
                            <p className="break-all text-sm text-blue-600">{`${window.location.origin}/verify/${intern.verification_token}`}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" onClick={() => handleEdit(intern)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the intern record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(intern.id)} className="bg-red-600 hover:bg-red-700">
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
        
        {paginatedInterns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No interns found for {selectedYear}</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Intern</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-year">Internship Year</Label>
              <Select value={formData.internship_year.toString()} onValueChange={(value) => setFormData({...formData, internship_year: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateIntern.isPending}>
                {updateIntern.isPending ? 'Updating...' : 'Update Intern'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternsTab;
