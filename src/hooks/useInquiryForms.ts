
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCompanyDataCapture } from "./useCompanyDataCapture";
import { useEmailConfirmation } from "./useEmailConfirmation";

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type?: string;
  message?: string;
}

export const useContactForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { captureFromForm } = useCompanyDataCapture();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("contact_submissions")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'contact',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
    onError: (error) => {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });
};


// Project Inquiry
export interface ProjectInquiry {
  name: string;
  email: string;
  company?: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  requirements?: string;
  project_type?: string;
}

export const useProjectInquiry = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { captureFromForm } = useCompanyDataCapture();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: ProjectInquiry) => {
      // First capture company data
      await captureFromForm(data);
      
      // Transform data for saas_project_requests table
      const transformedData = {
        name: data.name,
        email: data.email,
        company: data.company,
        project_idea: data.project_description,
        budget_range: data.budget_range,
        timeline: data.timeline,
        key_features: data.requirements,
        target_users: data.project_type,
      };

      const { error } = await supabase
        .from("saas_project_requests")
        .insert([transformedData]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'saas',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Inquiry Submitted!",
        description: "Thank you for your project inquiry. Our team will review it and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["saas-project-requests"] });
    },
    onError: (error) => {
      console.error('Error submitting project inquiry:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your project inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Partners Inquiry
export interface PartnersInquiry {
  name: string;
  email: string;
  phone?: string;
  company: string;
  website?: string;
  industry?: string;
  partnership_type?: string;
  proposal_details?: string;
}

export const usePartnersInquiry = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { captureFromForm } = useCompanyDataCapture();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: PartnersInquiry) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("partners_inquiries")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'partnership',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Partnership Inquiry Submitted!",
        description: "Thank you for your interest in partnering with us. We'll review your proposal and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["partners-inquiries"] });
    },
    onError: (error) => {
      console.error('Error submitting partners inquiry:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your partnership inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Investment Inquiry
export interface InvestmentInquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  investment_type: string;
  investment_amount?: string;
  message?: string;
}

export const useInvestmentInquiry = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { captureFromForm } = useCompanyDataCapture();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: InvestmentInquiry) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("investment_inquiries")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'investment',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Investment Inquiry Submitted!",
        description: "Thank you for your investment inquiry. Our team will review it and contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["investment-inquiries"] });
    },
    onError: (error) => {
      console.error('Error submitting investment inquiry:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your investment inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Technical Consultation
export interface TechnicalConsultation {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  technical_requirements: string;
  current_system?: string;
  integration_needs?: string;
  timeline?: string;
}

export const useTechnicalConsultation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { captureFromForm } = useCompanyDataCapture();
  const { sendConfirmationEmail } = useEmailConfirmation();

  return useMutation({
    mutationFn: async (data: TechnicalConsultation) => {
      // First capture company data
      await captureFromForm(data);
      
      // Then submit the form
      const { error } = await supabase
        .from("technical_consultations")
        .insert([data]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'technical',
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Technical Consultation Requested!",
        description: "Your technical consultation request has been submitted. Our experts will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["technical-consultations"] });
    },
    onError: (error) => {
      console.error('Error submitting technical consultation:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your technical consultation request. Please try again.",
        variant: "destructive",
      });
    },
  });
};
