
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCompanyDataCapture } from "./useCompanyDataCapture";


type FormTable =
  | 'contact_submissions'
  | 'investment_inquiries'
  | 'partners_inquiries'
  | 'technical_consultations';

// Enhanced form submission hooks that automatically capture company data

export const useInvestmentInquiryWithCapture = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: any) => {
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

export const useContactSubmissionWithCapture = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: any) => {
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

export const usePartnersInquiryWithCapture = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: any) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("partners_inquiries")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Partnership Inquiry Submitted",
        description: "Thank you for your interest in partnering with us.",
      });
    },
    onError: (error) => {
      console.error('Partners inquiry error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};



export const useFormSubmissionsWithCapture = (formType: FormTable) => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
   mutationFn: async (data: Record<string, any>) => {
  await captureFromForm(data);
  const { error } = await (supabase.from(formType) as any).insert([data]);
  if (error) throw error;
},

    onSuccess: () => {
      toast({
        title: "Form Submitted",
        description: "Thank you! We'll contact you soon.",
      });
    },
    onError: (error) => {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};


export const useTechnicalConsultationWithCapture = () => {
  const { toast } = useToast();
  const { captureFromForm } = useCompanyDataCapture();

  return useMutation({
    mutationFn: async (data: any) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("technical_consultations")
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Technical Consultation Requested",
        description: "Our experts will contact you soon.",
      });
    },
    onError: (error) => {
      console.error('Technical consultation error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
};
