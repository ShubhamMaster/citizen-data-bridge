
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailConfirmationData {
  formType: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  organization?: string;
  inquiry_type?: string;
  message?: string;
  consultation_type?: string;
  investment_type?: string;
  partnership_type?: string;
  collaboration_type?: string;
  [key: string]: any;
}

export const useEmailConfirmation = () => {
  const { toast } = useToast();

  const sendConfirmationEmail = async (data: EmailConfirmationData) => {
    try {
      console.log('Sending confirmation email for:', data.formType, 'to:', data.email);
      console.log('Form data:', data);
      
      // Use the noreply email function with better error handling
      const { data: result, error } = await supabase.functions.invoke('send-noreply-email', {
        body: {
          to: data.email,
          subject: `Thank you for your ${data.formType} submission - Civora Nexus`,
          html: generateConfirmationEmailHTML(data),
          formType: data.formType,
          formData: data
        }
      });

      if (error) {
        console.error('Email confirmation error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        // Show user-friendly error message but don't throw
        toast({
          title: "Email Warning",
          description: "Form submitted successfully, but confirmation email may be delayed. Please check your spam folder.",
          variant: "default"
        });
        return null;
      }

      console.log('Email confirmation sent successfully:', result);
      
      // Store email history with improved error handling
      try {
        const { error: historyError } = await supabase
          .from('email_history')
          .insert([{
            sender_email: 'noreply@civoranexus.com',
            recipient_email: data.email,
            email_type: 'confirmation',
            subject: `Thank you for your ${data.formType} submission - Civora Nexus`,
            form_type: data.formType,
            form_data: data,
            template_used: data.formType,
            message_id: result?.messageId || null,
            provider: result?.source || 'brevo',
            status: 'sent'
          }]);

        if (historyError) {
          console.error('Error storing email history:', historyError);
        } else {
          console.log('Email history stored successfully');
        }
      } catch (historyError) {
        console.error('Failed to store email history:', historyError);
      }

      // Show success message
      toast({
        title: "Form Submitted Successfully",
        description: "Thank you for your submission! A confirmation email has been sent to your email address.",
        variant: "default"
      });

      return result;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      console.error('Full error:', JSON.stringify(error, null, 2));
      toast({
        title: "Form Submitted",
        description: "Your form has been submitted successfully. If you don't receive a confirmation email, please check your spam folder.",
        variant: "default"
      });
      return null;
    }
  };

  const generateConfirmationEmailHTML = (data: EmailConfirmationData): string => {
    const currentDate = new Date().toLocaleString();
    
    // Generate form-specific content
    const formDetails = generateFormSpecificDetails(data);
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px;">Civora Nexus</h1>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">Innovation • Technology • Solutions</p>
        </div>
        
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for your ${data.formType} submission!</h2>
        
        <p style="margin-bottom: 20px;">Dear ${data.name},</p>
        
        <p style="margin-bottom: 20px;">We have received your ${data.formType} submission and appreciate your interest in Civora Nexus. Our team will review your request and get back to you within 24-48 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            ${data.organization ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Organization:</td><td style="padding: 8px 0;">${data.organization}</td></tr>` : ''}
            ${formDetails}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted:</td><td style="padding: 8px 0;">${currentDate}</td></tr>
          </table>
        </div>
        
        <p style="margin: 20px 0;">In the meantime, feel free to explore our services and solutions on our website.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://civoranexus.com" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Visit Our Website</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <div style="color: #666; font-size: 14px;">
          <p style="margin-bottom: 15px;"><strong>Civora Nexus</strong><br>
          Email: info@civoranexus.com<br>
          Website: www.civoranexus.com</p>
          
          <p style="font-size: 12px; color: #999; margin: 0;">
            This is an automated confirmation email. Please do not reply to this message.
            If you have any questions, please contact us at info@civoranexus.com
          </p>
        </div>
      </div>
    `;
  };

  const generateFormSpecificDetails = (data: EmailConfirmationData): string => {
    let details = '';
    
    if (data.inquiry_type) {
      details += `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Inquiry Type:</td><td style="padding: 8px 0;">${data.inquiry_type}</td></tr>`;
    }
    
    if (data.consultation_type) {
      details += `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Consultation Type:</td><td style="padding: 8px 0;">${data.consultation_type}</td></tr>`;
    }
    
    if (data.investment_type) {
      details += `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Investment Type:</td><td style="padding: 8px 0;">${data.investment_type}</td></tr>`;
    }
    
    if (data.partnership_type) {
      details += `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Partnership Type:</td><td style="padding: 8px 0;">${data.partnership_type}</td></tr>`;
    }
    
    if (data.collaboration_type) {
      details += `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Collaboration Type:</td><td style="padding: 8px 0;">${data.collaboration_type}</td></tr>`;
    }
    
    return details;
  };

  return { sendConfirmationEmail };
};
