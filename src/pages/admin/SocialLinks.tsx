
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSuperAdminDashboard } from '@/hooks/useSuperAdminDashboard';
import { useForm } from 'react-hook-form';
import { Search, Link, Plus, Edit, Trash2, Download, RefreshCw, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SocialLink {
  social_id: string;
  company_id: string;
  platform: string;
  url: string;
  preference: number;
  created_at: string;
  updated_at: string;
  civora_nexus_companies?: {
    company_name: string;
  };
}

interface SocialLinkFormData {
  company_id: string;
  platform: string;
  url: string;
  preference: number;
}

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSocialLink, setSelectedSocialLink] = useState<SocialLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { createRecord, updateRecord, deleteRecord } = useSuperAdminDashboard();

  const form = useForm<SocialLinkFormData>({
    defaultValues: {
      company_id: '',
      platform: '',
      url: '',
      preference: 0,
    },
  });

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('civora_nexus_social_links')
        .select(`
          *,
          civora_nexus_companies (
            company_name
          )
        `)
        .order('preference', { ascending: true });

      if (error) throw error;
      setSocialLinks(data || []);
    } catch (error: any) {
      console.error('Error fetching social links:', error);
      toast({
        title: "Error",
        description: "Failed to fetch social links",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('civora_nexus_companies')
        .select('company_id, company_name')
        .order('company_name');

      if (error) throw error;
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
    fetchCompanies();
  }, []);

  const handleSubmit = async (data: SocialLinkFormData) => {
    try {
      if (selectedSocialLink) {
        await updateRecord('civora_nexus_social_links', selectedSocialLink.social_id, data, selectedSocialLink);
      } else {
        await createRecord('civora_nexus_social_links', data);
      }
      
      setIsDialogOpen(false);
      setSelectedSocialLink(null);
      form.reset();
      fetchSocialLinks();
    } catch (error: any) {
      console.error('Error saving social link:', error);
    }
  };

  const handleEdit = (socialLink: SocialLink) => {
    setSelectedSocialLink(socialLink);
    form.reset({
      company_id: socialLink.company_id,
      platform: socialLink.platform,
      url: socialLink.url,
      preference: socialLink.preference,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (socialLink: SocialLink) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      try {
        await deleteRecord('civora_nexus_social_links', socialLink.social_id, socialLink);
        fetchSocialLinks();
      } catch (error: any) {
        console.error('Error deleting social link:', error);
      }
    }
  };

  const exportSocialLinks = () => {
    const csvContent = [
      ['Company', 'Platform', 'URL', 'Preference', 'Created Date'].join(','),
      ...filteredSocialLinks.map(link => [
        link.civora_nexus_companies?.company_name || '',
        link.platform,
        link.url,
        link.preference,
        new Date(link.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const linkEl = document.createElement('a');
    linkEl.href = url;
    linkEl.download = 'social-links-export.csv';
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
    URL.revokeObjectURL(url);
  };

  const filteredSocialLinks = socialLinks.filter(link => {
    const matchesSearch = 
      (link.platform || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.url || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.civora_nexus_companies?.company_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getPlatformBadge = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-100 text-blue-800',
      twitter: 'bg-sky-100 text-sky-800',
      linkedin: 'bg-blue-100 text-blue-800',
      instagram: 'bg-pink-100 text-pink-800',
      youtube: 'bg-red-100 text-red-800',
      github: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <Badge className={colors[platform.toLowerCase()] || 'bg-gray-100 text-gray-800'}>
        {platform}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Link className="h-8 w-8" />
            Social Links Management
          </h1>
          <p className="text-muted-foreground">Manage company social media links and profiles</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportSocialLinks} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchSocialLinks} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setSelectedSocialLink(null);
                form.reset();
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedSocialLink ? 'Edit Social Link' : 'Add New Social Link'}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="company_id"
                    rules={{ required: 'Company is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company.company_id} value={company.company_id}>
                                {company.company_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platform"
                    rules={{ required: 'Platform is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Twitter">Twitter</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="GitHub">GitHub</SelectItem>
                            <SelectItem value="Website">Website</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    rules={{ 
                      required: 'URL is required',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL starting with http:// or https://'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {selectedSocialLink ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialLinks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(socialLinks.map(link => link.platform)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Companies with Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(socialLinks.map(link => link.company_id)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Popular Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {socialLinks.length > 0 
                ? Object.entries(
                    socialLinks.reduce((acc, link) => {
                      acc[link.platform] = (acc[link.platform] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                : 'N/A'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Social Links ({filteredSocialLinks.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search social links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSocialLinks.map((link) => (
                  <TableRow key={link.social_id}>
                    <TableCell className="font-medium">
                      {link.civora_nexus_companies?.company_name || 'Unknown Company'}
                    </TableCell>
                    <TableCell>{getPlatformBadge(link.platform)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="truncate max-w-xs">{link.url}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{link.preference}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(link.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(link)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(link)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredSocialLinks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No social links found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialLinks;
