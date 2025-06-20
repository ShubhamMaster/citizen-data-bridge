import React, { useState } from 'react';
import { useInterns, useCreateIntern, useUpdateIntern, useDeleteIntern } from '@/hooks/useInterns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
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
    phone: '',
    department: '',
    internship_year: selectedYear,
    start_date: '',
    end_date: '',
    location: 'Remote',
    resume_url: '',
    linkedin_url: '',
    portfolio_url: '',
    mentor_assigned: '',
    notes: ''
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

  const locationOptions = ['Onsite', 'Remote', 'Hybrid'];
  const statusOptions = ['pending', 'verified', 'completed', 'terminated'];

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createIntern.mutateAsync(formData);
    setIsCreateModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      internship_year: selectedYear,
      start_date: '',
      end_date: '',
      location: 'Remote',
      resume_url: '',
      linkedin_url: '',
      portfolio_url: '',
      mentor_assigned: '',
      notes: ''
    });
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
      name: intern.name || '',
      email: intern.email || '',
      phone: intern.phone || '',
      department: intern.department || '',
      internship_year: intern.internship_year || selectedYear,
      start_date: intern.start_date || '',
      end_date: intern.end_date || '',
      location: intern.location || 'Remote',
      resume_url: intern.resume_url || '',
      linkedin_url: intern.linkedin_url || '',
      portfolio_url: intern.portfolio_url || '',
      mentor_assigned: intern.mentor_assigned || '',
      notes: intern.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteIntern.mutateAsync(id);
  };

  const exportToExcel = () => {
    const exportData = filteredInterns.map((intern, index) => ({
      'S.No.': index + 1,
      'Intern ID': intern.intern_id,
      'Full Name': intern.name,
      'Email Address': intern.email,
      'Phone Number': intern.phone || 'Not Provided',
      'Department': intern.department,
      'Internship Year': intern.internship_year,
      'Start Date': intern.start_date ? new Date(intern.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }) : 'Not Set',
      'End Date': intern.end_date ? new Date(intern.end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }) : 'Not Set',
      'Work Location': intern.location || 'Remote',
      'Current Status': intern.status.charAt(0).toUpperCase() + intern.status.slice(1),
      'Assigned Mentor': intern.mentor_assigned || 'Not Assigned',
      'Resume/CV Link': intern.resume_url || 'Not Provided',
      'LinkedIn Profile': intern.linkedin_url || 'Not Provided',
      'Portfolio Website': intern.portfolio_url || 'Not Provided',
      'Verification Link': `${window.location.origin}/verify/${intern.verification_token}`,
      'Record Created': new Date(intern.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      'Verification Date': intern.verified_at ? new Date(intern.verified_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Not Verified',
      'Additional Notes': intern.notes || 'None'
    }));

    // Create workbook with proper formatting
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths
    const colWidths = [
      { wch: 6 },   // S.No
      { wch: 15 },  // Intern ID
      { wch: 25 },  // Full Name
      { wch: 30 },  // Email
      { wch: 15 },  // Phone
      { wch: 15 },  // Department
      { wch: 12 },  // Year
      { wch: 12 },  // Start Date
      { wch: 12 },  // End Date
      { wch: 12 },  // Location
      { wch: 12 },  // Status
      { wch: 20 },  // Mentor
      { wch: 35 },  // Resume
      { wch: 35 },  // LinkedIn
      { wch: 35 },  // Portfolio
      { wch: 50 },  // Verification
      { wch: 18 },  // Created
      { wch: 18 },  // Verified
      { wch: 30 }   // Notes
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Interns ${selectedYear}`);
    
    // Add metadata
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `Civora_Nexus_Interns_${selectedYear}_${timestamp}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
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

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      internship_year: selectedYear,
      start_date: '',
      end_date: '',
      location: 'Remote',
      resume_url: '',
      linkedin_url: '',
      portfolio_url: '',
      mentor_assigned: '',
      notes: ''
    });
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
              <Button className="flex items-center gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Intern
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Intern</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
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
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="year">Internship Year *</Label>
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
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resume_url">Resume URL</Label>
                    <Input
                      id="resume_url"
                      type="url"
                      value={formData.resume_url}
                      onChange={(e) => setFormData({...formData, resume_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input
                      id="linkedin_url"
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="portfolio_url">Portfolio URL</Label>
                    <Input
                      id="portfolio_url"
                      type="url"
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="mentor_assigned">Mentor Assigned</Label>
                    <Input
                      id="mentor_assigned"
                      value={formData.mentor_assigned}
                      onChange={(e) => setFormData({...formData, mentor_assigned: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                  />
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
              <TableHead>Location</TableHead>
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
                <TableCell>{intern.location || 'Remote'}</TableCell>
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
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Intern Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
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
                              <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                              <p>{intern.phone || 'Not provided'}</p>
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
                              <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                              <p>{intern.location || 'Remote'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                              <div className="mt-1">{getStatusBadge(intern.status)}</div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                              <p>{intern.start_date ? new Date(intern.start_date).toLocaleDateString() : 'Not set'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                              <p>{intern.end_date ? new Date(intern.end_date).toLocaleDateString() : 'Not set'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Mentor</Label>
                              <p>{intern.mentor_assigned || 'Not assigned'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Resume</Label>
                              <p>{intern.resume_url ? (
                                <a href={intern.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                  View Resume
                                </a>
                              ) : 'Not provided'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">LinkedIn</Label>
                              <p>{intern.linkedin_url ? (
                                <a href={intern.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                  View Profile
                                </a>
                              ) : 'Not provided'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Portfolio</Label>
                              <p>{intern.portfolio_url ? (
                                <a href={intern.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                  View Portfolio
                                </a>
                              ) : 'Not provided'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Created At</Label>
                              <p>{new Date(intern.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Verified At</Label>
                              <p>{intern.verified_at ? new Date(intern.verified_at).toLocaleString() : 'Not verified'}</p>
                            </div>
                          </div>
                          {intern.notes && (
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                              <p className="whitespace-pre-wrap">{intern.notes}</p>
                            </div>
                          )}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Intern</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-department">Department *</Label>
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-year">Internship Year *</Label>
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
              <div>
                <Label htmlFor="edit-start_date">Start Date</Label>
                <Input
                  id="edit-start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-end_date">End Date</Label>
                <Input
                  id="edit-end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-resume_url">Resume URL</Label>
                <Input
                  id="edit-resume_url"
                  type="url"
                  value={formData.resume_url}
                  onChange={(e) => setFormData({...formData, resume_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="edit-linkedin_url">LinkedIn URL</Label>
                <Input
                  id="edit-linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-portfolio_url">Portfolio URL</Label>
                <Input
                  id="edit-portfolio_url"
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="edit-mentor_assigned">Mentor Assigned</Label>
                <Input
                  id="edit-mentor_assigned"
                  value={formData.mentor_assigned}
                  onChange={(e) => setFormData({...formData, mentor_assigned: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
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
