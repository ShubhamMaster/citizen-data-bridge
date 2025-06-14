import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "Join our team to build innovative civic and healthcare technology solutions. Work with React, Node.js, and modern web technologies.",
      requirements: [
        "2+ years of experience with React and Node.js",
        "Experience with databases (MongoDB/PostgreSQL)",
        "Knowledge of RESTful APIs",
        "Understanding of modern web development practices"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      description: "Design user-centric interfaces for government and healthcare applications. Focus on accessibility and usability.",
      requirements: [
        "Proficiency in Figma/Adobe Creative Suite",
        "Experience in user research and testing",
        "Strong portfolio of web/mobile designs",
        "Understanding of accessibility standards"
      ]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build and maintain infrastructure for scalable civic technology platforms.",
      requirements: [
        "Experience with cloud platforms (AWS/Azure)",
        "Knowledge of Docker and Kubernetes",
        "CI/CD pipeline management",
        "Monitoring and logging systems"
      ]
    }
  ];

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !applicationData.name ||
      !applicationData.email ||
      !applicationData.phone ||
      !selectedJob ||
      !applicationData.resume
    ) {
      toast({ title: "All fields are required.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we just capture file name; storing files in database is another step
      // (You can use Supabase Storage for file upload if desired)

      const { name, email, phone, message, resume } = applicationData;
      const applicationPayload = {
        name,
        email,
        phone,
        message,
        job_id: selectedJob,
        resume_name: resume?.name || "",
        // optionally add: resume_url if uploading to Storage
      };

      // Save in Supabase (for demonstration, store as JSON in application_data column)
      const { error } = await supabase
        .from("applications")
        .insert([
          {
            application_data: applicationPayload,
            data_source: "careers_form",
            created_at: new Date().toISOString()
            // Optionally: add user_id if login required
          }
        ]);

      if (error) {
        toast({ title: "Failed to submit application", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Application submitted!", description: "Thank you for applying. We'll be in touch soon." });
        setApplicationData({ name: '', email: '', phone: '', message: '', resume: null });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Unknown error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({
        ...applicationData,
        resume: e.target.files[0]
      });
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
              Be part of the mission to transform civic and healthcare technology
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Why Choose Civora Nexus?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Work on meaningful projects that make a real difference in communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <Users className="h-12 w-12 text-civora-teal mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Social Impact</h3>
                <p className="text-gray-600">Work on projects that directly improve lives and communities</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <Clock className="h-12 w-12 text-civora-teal mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Flexible Work</h3>
                <p className="text-gray-600">Remote-first culture with flexible working hours</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <MapPin className="h-12 w-12 text-civora-teal mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-civora-navy mb-3">Growth Opportunities</h3>
                <p className="text-gray-600">Learn cutting-edge technologies and advance your career</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your next career opportunity with us</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job List */}
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-all ${selectedJob === job.id ? 'ring-2 ring-civora-teal' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedJob(job.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-civora-navy">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{job.location}</Badge>
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="secondary">{job.experience}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Application Form */}
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-civora-navy">
                    {selectedJob ? `Apply for ${jobs.find(j => j.id === selectedJob)?.title}` : 'Select a Position'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedJob ? (
                    <form onSubmit={handleApplicationSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={applicationData.name}
                          onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={applicationData.email}
                          onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={applicationData.phone}
                          onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="resume">Resume (PDF/DOC)</Label>
                        <div className="mt-1 flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                {applicationData.resume ? applicationData.resume.name : 'Click to upload resume'}
                              </p>
                            </div>
                            <input 
                              id="resume" 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              required
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Cover Message</Label>
                        <textarea
                          id="message"
                          value={applicationData.message}
                          onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                          rows={4}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civora-teal focus:border-transparent"
                          placeholder="Tell us why you're interested in this position..."
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-civora-teal hover:bg-civora-teal/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </form>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Please select a position from the list to apply
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
