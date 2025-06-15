import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Clock, DollarSign, Send, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

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
        job_id: null,
        user_id: 'temp-user-id',
        data_source: 'careers_page_general_application',
        status: 'pending',
        application_data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          job_id: 0,
          job_title: 'General Application',
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Be part of building the future of civic technology. We're a new company looking for passionate individuals to help us make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Why Join Civora Nexus?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a newly launched startup, you'll have the opportunity to shape our company culture and make a real impact from day one.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-12 h-12 bg-civora-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-civora-teal" />
                </div>
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Ground Floor Opportunity</h3>
                <p className="text-gray-600">Join us at the beginning and help build something meaningful from the ground up.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-12 h-12 bg-civora-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-civora-teal" />
                </div>
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Competitive Package</h3>
                <p className="text-gray-600">We offer competitive salaries and equity opportunities for early team members.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-12 h-12 bg-civora-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-civora-teal" />
                </div>
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Remote-First Culture</h3>
                <p className="text-gray-600">Work from anywhere with flexible hours and a focus on results, not location.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* REMOVE job listing and application modal section */}
      {/* Job Listings section is moved to CareersJobs page */}
      
      {/* Call to Action */}
      <section className="py-20 bg-civora-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Don't See a Perfect Fit?</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute to our mission.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-civora-teal hover:bg-civora-teal/90"
              >
                Submit General Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>General Application</DialogTitle>
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
                  <Label htmlFor="message">Tell us about yourself</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What role are you interested in? How would you like to contribute to Civora Nexus?"
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
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
