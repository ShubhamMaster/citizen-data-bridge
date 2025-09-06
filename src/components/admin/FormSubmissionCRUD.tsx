
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Eye, Trash2, Filter, Calendar, User, Mail, Phone, Building } from 'lucide-react';

interface FormSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  [key: string]: any;
}

const FormSubmissionCRUD = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // States for different form types
  const [contactSubmissions, setContactSubmissions] = useState<FormSubmission[]>([]);
  const [investmentInquiries, setInvestmentInquiries] = useState<FormSubmission[]>([]);
  const [partnersInquiries, setPartnersInquiries] = useState<FormSubmission[]>([]);
  const [technicalConsultations, setTechnicalConsultations] = useState<FormSubmission[]>([]);
  const [supportTickets, setSupportTickets] = useState<FormSubmission[]>([]);
  const [salaryInquiries, setSalaryInquiries] = useState<FormSubmission[]>([]);
  const [collaborationRequests, setCollaborationRequests] = useState<FormSubmission[]>([]);
  const [joinLabForms, setJoinLabForms] = useState<FormSubmission[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  const fetchAllSubmissions = async () => {
    setLoading(true);
    try {
      const [
        contactRes,
        investmentRes,
        partnersRes,
        technicalRes,
        supportRes,
        salaryRes,
        collaborationRes,
        joinLabRes
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('investment_inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('partners_inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('technical_consultations').select('*').order('created_at', { ascending: false }),
        supabase.from('support_tickets').select('*').order('created_at', { ascending: false }),
        supabase.from('salary_inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('collaboration_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('join_lab_forms').select('*').order('created_at', { ascending: false })
      ]);

      setContactSubmissions(contactRes.data || []);
      setInvestmentInquiries(investmentRes.data || []);
      setPartnersInquiries(partnersRes.data || []);
      setTechnicalConsultations(technicalRes.data || []);
      setSupportTickets(supportRes.data || []);
      setSalaryInquiries(salaryRes.data || []);
      setCollaborationRequests(collaborationRes.data || []);
      setJoinLabForms(joinLabRes.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch form submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string, tableName: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      // Use type assertion to handle the dynamic table name
      const { error } = await (supabase as any).from(tableName).delete().eq('id', id);
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Submission deleted successfully"
      });
      
      fetchAllSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive"
      });
    }
  };

  const filterSubmissions = (submissions: FormSubmission[]) => {
    if (!searchTerm) return submissions;
    return submissions.filter(submission =>
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderSubmissionCard = (submission: FormSubmission, tableName: string) => (
    <Card key={submission.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{submission.name}</span>
              <Badge variant="outline" className="text-xs">
                {new Date(submission.created_at).toLocaleDateString()}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>{submission.email}</span>
              </div>
              {submission.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{submission.phone}</span>
                </div>
              )}
              {submission.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-3 h-3" />
                  <span>{submission.company}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleView(submission)}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => handleDelete(submission.id, tableName)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {submission.message && (
          <p className="text-sm text-muted-foreground truncate">
            {submission.message.length > 100 
              ? `${submission.message.substring(0, 100)}...` 
              : submission.message}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const renderSubmissionDetails = (submission: FormSubmission | null) => {
    if (!submission) return null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="mt-1">{submission.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="mt-1">{submission.email}</p>
          </div>
          {submission.phone && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="mt-1">{submission.phone}</p>
            </div>
          )}
          {submission.company && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Company</label>
              <p className="mt-1">{submission.company}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Submitted At</label>
            <p className="mt-1">{new Date(submission.created_at).toLocaleString()}</p>
          </div>
        </div>
        
        {/* Render all other fields dynamically */}
        {Object.entries(submission).map(([key, value]) => {
          if (['id', 'created_at', 'name', 'email', 'phone', 'company'].includes(key)) {
            return null;
          }
          if (value === null || value === undefined || value === '') {
            return null;
          }
          
          return (
            <div key={key}>
              <label className="text-sm font-medium text-muted-foreground capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <p className="mt-1 whitespace-pre-wrap">
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Form Submissions</h2>
          <p className="text-muted-foreground">Manage all form submissions from your website</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search submissions..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="contact" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="contact">Contact ({contactSubmissions.length})</TabsTrigger>
          <TabsTrigger value="investment">Investment ({investmentInquiries.length})</TabsTrigger>
          <TabsTrigger value="partners">Partners ({partnersInquiries.length})</TabsTrigger>
          <TabsTrigger value="technical">Technical ({technicalConsultations.length})</TabsTrigger>
          <TabsTrigger value="support">Support ({supportTickets.length})</TabsTrigger>
          <TabsTrigger value="salary">Salary ({salaryInquiries.length})</TabsTrigger>
          <TabsTrigger value="collaboration">R&D ({collaborationRequests.length})</TabsTrigger>
          <TabsTrigger value="joinlab">Join Lab ({joinLabForms.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <div className="space-y-4">
            {filterSubmissions(contactSubmissions).map(submission => 
              renderSubmissionCard(submission, 'contact_submissions')
            )}
            {filterSubmissions(contactSubmissions).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No contact submissions found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="investment">
          <div className="space-y-4">
            {filterSubmissions(investmentInquiries).map(submission => 
              renderSubmissionCard(submission, 'investment_inquiries')
            )}
            {filterSubmissions(investmentInquiries).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No investment inquiries found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="space-y-4">
            {filterSubmissions(partnersInquiries).map(submission => 
              renderSubmissionCard(submission, 'partners_inquiries')
            )}
            {filterSubmissions(partnersInquiries).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No partner inquiries found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="space-y-4">
            {filterSubmissions(technicalConsultations).map(submission => 
              renderSubmissionCard(submission, 'technical_consultations')
            )}
            {filterSubmissions(technicalConsultations).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No technical consultations found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="space-y-4">
            {filterSubmissions(supportTickets).map(submission => 
              renderSubmissionCard(submission, 'support_tickets')
            )}
            {filterSubmissions(supportTickets).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No support tickets found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="salary">
          <div className="space-y-4">
            {filterSubmissions(salaryInquiries).map(submission => 
              renderSubmissionCard(submission, 'salary_inquiries')
            )}
            {filterSubmissions(salaryInquiries).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No salary inquiries found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="collaboration">
          <div className="space-y-4">
            {filterSubmissions(collaborationRequests).map(submission => 
              renderSubmissionCard(submission, 'collaboration_requests')
            )}
            {filterSubmissions(collaborationRequests).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No collaboration requests found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="joinlab">
          <div className="space-y-4">
            {filterSubmissions(joinLabForms).map(submission => 
              renderSubmissionCard(submission, 'join_lab_forms')
            )}
            {filterSubmissions(joinLabForms).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No join lab forms found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {renderSubmissionDetails(selectedSubmission)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormSubmissionCRUD;
