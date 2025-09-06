
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
import { useInvestmentInquiry } from "@/hooks/useInquiryForms";
import { FormSkeleton } from "../SkeletonLoaders";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  investment_type: z.string().min(1, "Please select an investment type"),
  investment_amount: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your investment inquiry"),
});

type FormData = z.infer<typeof formSchema>;

const InvestmentInquiryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const investmentInquiry = useInvestmentInquiry();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      investment_type: "",
      investment_amount: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      // Ensure required fields are present and cast to proper type
      const submissionData = {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        investment_type: values.investment_type,
        investment_amount: values.investment_amount || undefined,
        message: values.message || undefined,
      };
      
      await investmentInquiry.mutateAsync(submissionData);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Investment Inquiry</CardTitle>
        <CardDescription>
          Interested in investing with us? Share your details and we'll get back to you.
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="investment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="seed">Seed Investment</SelectItem>
                          <SelectItem value="series_a">Series A</SelectItem>
                          <SelectItem value="series_b">Series B</SelectItem>
                          <SelectItem value="growth">Growth Capital</SelectItem>
                          <SelectItem value="strategic">Strategic Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="investment_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Amount (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $100K - $1M" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your investment interests, goals, and any specific requirements..."
                        className="min-h-[120px]"
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
                disabled={investmentInquiry.isPending}
              >
                {investmentInquiry.isPending ? "Submitting..." : "Submit Investment Inquiry"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentInquiryForm;
