
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Clock, DollarSign, Send, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

const CareersJobs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) {
        toast({
          title: "Error loading jobs",
          description: "Could not load job postings.",
          variant: "destructive"
        });
        setJobs([]);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationData = {
        job_id: selectedJob?.id || null,
        user_id: 'temp-user-id', // replace if you add auth
        data_source: 'careers_jobs_page',
        status: 'pending',
        application_data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          job_id: selectedJob?.id || 0,
          job_title: selectedJob?.title || 'General Application',
          resume_name: formData.resume?.name || '',
          applied_at: new Date().toISOString()
        }
      };

      const { error: applicationError } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        throw applicationError;
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        resume: null
      });

      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-civora-navy mb-4">Job Openings</h1>
          <p className="text-xl text-gray-600">We're looking for talented individuals to join our founding team.</p>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-civora-teal rounded-full border-t-transparent mx-auto mb-4" />
            <p className="text-gray-700">Loading jobs...</p>
          </div>
        ) : (
          <>
            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings available</h3>
                <p className="text-gray-500">Check back soon for new openings!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-civora-navy mb-2">{job.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{job.department}</Badge>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="bg-civora-teal hover:bg-civora-teal/90"
                              onClick={() => setSelectedJob(job)}
                            >
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Apply for {job.title}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <Label htmlFor="resume">Resume/CV</Label>
                                <Input
                                  id="resume"
                                  name="resume"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div>
                                <Label htmlFor="message">Cover Letter / Message</Label>
                                <Textarea
                                  id="message"
                                  name="message"
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  placeholder="Tell us why you're interested in this position..."
                                  rows={4}
                                />
                              </div>
                              <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-civora-teal hover:bg-civora-teal/90"
                              >
                                {isSubmitting ? (
                                  "Submitting..."
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Application
                                  </>
                                )}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                        {job.salary_range && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary_range}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-civora-navy mb-2">Requirements:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {(job.requirements?.split('\n') ?? []).map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-civora-teal mt-1">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-civora-navy mb-2">Responsibilities:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-start gap-2 text-gray-400 italic">
                              Information will be provided if available.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default CareersJobs;
