import { uploadToTebi } from "@/lib/tebi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useJobApplication } from "@/hooks/useJobApplications";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  job_id: z.string().min(1, "Please select a job position"),
  resume: z.any().refine((files) => files?.length === 1, "Please upload your resume"),
  cover_letter: z.string().min(10, "Cover letter must be at least 10 characters"),
});


const CareersJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const jobApplication = useJobApplication();

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      return data;
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      job_id: "",
      cover_letter: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resumeFile = values.resume[0];
    if (!resumeFile) {
      alert("Please upload your resume before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const resumeUrl = await uploadToTebi(resumeFile);

      await jobApplication.mutateAsync({
        job_id: parseInt(values.job_id),
        user_id: null, 
        application_data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          cover_letter: values.cover_letter,
        },
        resume_url: resumeUrl,
        data_source: 'website'
      });

      form.reset();
      setIsDialogOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Application submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    form.setValue('job_id', job.id.toString());
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <UniformHeroSection
          title="Job Openings"
          subtitle="Join our innovative team and help shape the future of technology"
        />

        <div className="container mx-auto px-4 py-16">
          {jobsLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading job openings...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No Open Positions</h3>
              <p className="text-muted-foreground mb-6">
                We don't have any open positions at the moment, but we're always looking for talented individuals.
              </p>
              <Button asChild>
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Available Positions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover exciting career opportunities at Civora Nexus. We're looking for passionate individuals
                  to join our mission of innovation and technological excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {jobs.map((job) => (
                  <Card key={job.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {job.department}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location || 'Remote'}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.type || 'Full-time'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {job.description?.substring(0, 150)}
                        {job.description?.length > 150 && '...'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4 mb-6">
                        {job.requirements && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Key Requirements:</h4>
                            <div className="text-sm text-muted-foreground">
                              {typeof job.requirements === 'string'
                                ? job.requirements.split('\n').slice(0, 3).map((req, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{req.replace(/^[-•]\s*/, '')}</span>
                                  </div>
                                ))
                                : <span>{JSON.stringify(job.requirements).substring(0, 100)}...</span>
                              }
                            </div>
                          </div>
                        )}

                        {job.salary_range && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="font-medium">Salary: {job.salary_range}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => handleApplyClick(job)}
                        className="w-full"
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Application Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                {selectedJob?.department} • {selectedJob?.location || 'Remote'} • {selectedJob?.type || 'Full-time'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Resume *</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="cover_letter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 sm:flex-none sm:w-auto"
                    disabled={isLoading || jobApplication.isPending}
                  >
                    {isLoading || jobApplication.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CareersJobs;