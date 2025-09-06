
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCompanyDataCapture } from "./useCompanyDataCapture";

// Enhanced form submission hooks that automatically capture company data

interface InvestmentInquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  investment_amount?: string;
  message?: string;
}

interface JoinLabForm {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  interest_area?: string;
  message?: string;
}

interface EventRegistration {
  event_id: string;
  name: string;
  email: string;
  phone?: string;
}

interface CollaborationRequest {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  collaboration_type?: string;
  message?: string;
}

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type?: string;
  message?: string;
}

interface InternshipApplication {
  name: string;
  email: string;
  college?: string;
  portfolio_link?: string;
  resume_link?: string;
  skills?: string;
}

interface SalaryInquiry {
  name: string;
  email: string;
  phone?: string;
  job_title?: string;
  department: string;
  current_salary?: string;
  expected_salary?: string;
  experience_years?: number;
  additional_info?: string;
}

export const useInvestmentInquiry = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: InvestmentInquiry) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("investment_inquiries")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Investment Inquiry Submitted",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
    },
    onError: (error) => {
      console.error('Investment inquiry error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};

export const useJoinLabForm = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: JoinLabForm) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("join_lab_forms")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in joining our Innovation Lab.",
      });
    },
    onError: (error) => {
      console.error('Join lab form error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};

export const useEventRegistration = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: EventRegistration) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("event_registrations")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Event Registration Successful",
        description: "You've been registered for the event.",
      });
    },
    onError: (error) => {
      console.error('Event registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};

export const useCollaborationRequest = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: CollaborationRequest) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("collaboration_requests")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Collaboration Request Sent",
        description: "Thank you for your interest in collaborating with us.",
      });
    },
    onError: (error) => {
      console.error('Collaboration request error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};

export const useContactSubmission = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: ContactSubmission) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("contact_submissions")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond soon.",
      });
    },
    onError: (error) => {
      console.error('Contact submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};


export const useSalaryInquiry = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: SalaryInquiry) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("salary_inquiries")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Salary Inquiry Submitted",
        description: "Thank you for your inquiry. We'll review and respond soon.",
      });
    },
    onError: (error) => {
      console.error('Salary inquiry error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};
