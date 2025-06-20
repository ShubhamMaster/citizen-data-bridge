
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const InternVerification = () => {
  const { token } = useParams<{ token: string }>();

  const { data: intern, isLoading, error } = useQuery({
    queryKey: ['intern-verification', token],
    queryFn: async () => {
      if (!token) throw new Error('No verification token provided');
      
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .eq('verification_token', token)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error('Invalid verification token');
      
      return data;
    },
    enabled: !!token,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-orange-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-600" />;
    }
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
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-custom py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Verifying intern credentials...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !intern) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <UniformHeroSection
          title="Verification Error"
          subtitle="The verification link you used is invalid or has expired."
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Intern Verification"
        subtitle="Official Internship Credential Verification"
      />

      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="card-modern">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                {getStatusIcon(intern.status)}
              </div>
              <CardTitle className="text-2xl">Intern Verification Details</CardTitle>
              <p className="text-muted-foreground">
                Official verification for internship at Civora Nexus
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-lg font-medium">{intern.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <p>{intern.email}</p>
                      </div>
                      {intern.phone && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                          <p>{intern.phone}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Intern ID</label>
                        <p className="font-mono text-primary font-semibold">{intern.intern_id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Internship Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Department</label>
                        <p className="text-lg font-medium">{intern.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Internship Year</label>
                        <p>{intern.internship_year}</p>
                      </div>
                      {intern.location && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Location</label>
                          <p>{intern.location}</p>
                        </div>
                      )}
                      {intern.start_date && intern.end_date && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duration</label>
                          <p>{new Date(intern.start_date).toLocaleDateString()} - {new Date(intern.end_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Current Status</label>
                        <div className="mt-1">
                          {getStatusBadge(intern.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-primary mb-4">Verification Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Internship Record Created</span>
                    <span className="text-sm font-medium">
                      {new Date(intern.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {intern.verified_at && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Verification Completed</span>
                      <span className="text-sm font-medium">
                        {new Date(intern.verified_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">
                      {new Date(intern.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  This verification page confirms the authenticity of the internship credentials.
                </p>
                <p className="text-xs text-muted-foreground">
                  For any inquiries regarding this verification, please contact our HR department at hr@civoranexus.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InternVerification;
