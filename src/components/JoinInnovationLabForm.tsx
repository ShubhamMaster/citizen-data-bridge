
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateInnovationLabApplication } from "@/hooks/useInnovationLabApplications";
import { FormSkeleton } from "./SkeletonLoaders";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  experience_level: z.string().min(1, "Please select your experience level"),
  areas_of_interest: z.array(z.string()).min(1, "Please select at least one area of interest"),
  project_idea: z.string().min(20, "Please provide more details about your project idea"),
  collaboration_interest: z.string().optional(),
  availability: z.string().optional(),
  linkedin_profile: z.string().optional(),
  portfolio_url: z.string().optional(),
  additional_info: z.string().optional(),
});

const JoinInnovationLabForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const createApplication = useCreateInnovationLabApplication();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      experience_level: "",
      areas_of_interest: [],
      project_idea: "",
      collaboration_interest: "",
      availability: "",
      linkedin_profile: "",
      portfolio_url: "",
      additional_info: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await createApplication.mutateAsync({
        name: values.name,
        email: values.email,
        phone: values.phone,
        organization: values.organization,
        role: values.role,
        experience_level: values.experience_level,
        areas_of_interest: values.areas_of_interest,
        project_idea: values.project_idea,
        collaboration_interest: values.collaboration_interest,
        availability: values.availability,
        linkedin_profile: values.linkedin_profile,
        portfolio_url: values.portfolio_url,
        additional_info: values.additional_info,
      });
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const areasOfInterest = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "IoT Solutions",
    "Blockchain",
    "Cloud Computing",
    "Cybersecurity",
    "UI/UX Design",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Join Our Innovation Lab</CardTitle>
        <CardDescription>
          Be part of cutting-edge projects and collaborate with innovative minds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <FormSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization/Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your current organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Role (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experience_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                          <SelectItem value="expert">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="areas_of_interest"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Areas of Interest</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {areasOfInterest.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="areas_of_interest"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_idea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Idea or Innovation Concept</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your innovative project idea, the problem it solves, and how you plan to implement it..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collaboration_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collaboration Interests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What type of collaborations are you interested in? How do you prefer to work with teams?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10 hours/week, weekends" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedin_profile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio/GitHub URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username or portfolio link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additional_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other information you'd like to share about your background, interests, or goals..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={createApplication.isPending}
              >
                {createApplication.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default JoinInnovationLabForm;
