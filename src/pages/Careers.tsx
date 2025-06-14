
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });

  // Initial job postings for a new company
  const jobPostings = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Join our founding engineering team to build innovative civic technology solutions.",
      requirements: [
        "3+ years of experience with React and Node.js",
        "Experience with TypeScript and modern web development",
        "Passion for civic technology and social impact",
        "Strong problem-solving skills"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
        "Participate in code reviews and technical discussions"
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Lead product strategy and development for our civic technology platform.",
      requirements: [
        "2+ years of product management experience",
        "Understanding of civic technology landscape",
        "Strong analytical and communication skills",
        "Experience with agile development methodologies"
      ],
      responsibilities: [
        "Define product roadmap and strategy",
        "Work closely with engineering and design teams",
        "Conduct user research and market analysis",
        "Manage product launches and feature releases"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Design intuitive and accessible user experiences for civic applications.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Understanding of accessibility standards",
        "Portfolio demonstrating design thinking"
      ],
      responsibilities: [
        "Create user-centered design solutions",
        "Develop wireframes, prototypes, and mockups",
        "Conduct usability testing",
        "Collaborate with development team on implementation"
      ]
    }
  ];

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
      // Create a temporary goal for the application since the schema requires it
      const { data: goalData, error: goalError } = await supabase
        .from('goals')
        .insert([
          {
            goal_type: 'career',
            custom_description: `Job application for ${selectedJob?.title || 'General Position'}`,
            user_id: 'temp-user-id', // This should be the actual user ID when auth is implemented
          }
        ])
        .select()
        .single();

      if (goalError) {
        console.error('Goal creation error:', goalError);
        throw goalError;
      }

      // Submit application
      const applicationData = {
        goal_id: goalData.id,
        user_id: 'temp-user-id', // This should be the actual user ID when auth is implemented
        data_source: 'careers_page',
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

      // Reset form
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

      {/* Job Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">We're looking for talented individuals to join our founding team</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {jobPostings.map((job) => (
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
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-civora-navy mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-civora-teal mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-civora-navy mb-2">Responsibilities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-civora-teal mt-1">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
                onClick={() => setSelectedJob({ title: 'General Application', id: 0 })}
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
