import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PartnersInquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    partnership_type: '',
    proposal_details: '',
    website: '',
    industry: ''
  });

  const sendConfirmationEmail = async (formData) => {
    try {
      const emailPayload = {
        to: formData.email,
        subject: `Thank you for your partnership inquiry - Civora Nexus`,
        html: generateConfirmationEmailHTML(formData),
        formType: 'partnership',
        formData: formData
      };

      const { error } = await supabase.functions.invoke('send-noreply-email', {
        body: emailPayload
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Partnership confirmation email sent successfully');
      }
    } catch (error) {
      console.error('Error calling email function:', error);
    }
  };

  const generateConfirmationEmailHTML = (data) => {
    const currentDate = new Date().toLocaleString();
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px;">Civora Nexus</h1>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">Innovation • Technology • Solutions</p>
        </div>
        
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for your partnership inquiry!</h2>
        
        <p style="margin-bottom: 20px;">Dear ${data.name},</p>
        
        <p style="margin-bottom: 20px;">We have received your partnership inquiry and appreciate your interest in collaborating with Civora Nexus. Our team will review your proposal and get back to you within 24-48 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            ${data.website ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Website:</td><td style="padding: 8px 0;">${data.website}</td></tr>` : ''}
            ${data.industry ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Industry:</td><td style="padding: 8px 0;">${data.industry}</td></tr>` : ''}
            ${data.partnership_type ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Partnership Type:</td><td style="padding: 8px 0;">${data.partnership_type}</td></tr>` : ''}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('partners_inquiries')
        .insert([formData]);

      if (error) throw error;

      await sendConfirmationEmail(formData);

      // Save to email history
      await supabase
        .from('email_history')
        .insert([{
          sender_email: 'noreply@civoranexus.com', // Use your actual sender
          recipient_email: formData.email,
          email_type: 'partnership_confirmation',
          subject: 'Partnership Inquiry Confirmation',
          status: 'sent',
          sent_at: new Date().toISOString(),
          form_type: 'partnership',
          form_data: formData, // This will be stored as JSONB
          template_used: 'partnership_confirmation_template', // Optional, if you use templates
          provider: 'brevo' // Or your actual provider
        }]);

      toast({
        title: "Partnership Inquiry Submitted!",
        description: "Thank you for your interest in partnering with us. We'll review your proposal and get back to you soon. Please check your email for confirmation.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        partnership_type: '',
        proposal_details: '',
        website: '',
        industry: ''
      });
    } catch (error) {
      console.error('Error submitting partnership inquiry:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card-modern p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Your full name"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              placeholder="your.email@company.com"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
              Company Name *
            </label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              required
              placeholder="Your company name"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-primary mb-2">
              Company Website
            </label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-primary mb-2">
              Industry
            </label>
            <Input
              id="industry"
              type="text"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              placeholder="e.g., Technology, Healthcare, Finance"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="partnership_type" className="block text-sm font-medium text-primary mb-2">
            Partnership Type
          </label>
          <Select value={formData.partnership_type} onValueChange={(value) => handleChange('partnership_type', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology Partnership</SelectItem>
              <SelectItem value="strategic">Strategic Alliance</SelectItem>
              <SelectItem value="reseller">Reseller Partnership</SelectItem>
              <SelectItem value="integration">Integration Partnership</SelectItem>
              <SelectItem value="joint-venture">Joint Venture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="proposal_details" className="block text-sm font-medium text-primary mb-2">
            Partnership Proposal *
          </label>
          <Textarea
            id="proposal_details"
            value={formData.proposal_details}
            onChange={(e) => handleChange('proposal_details', e.target.value)}
            required
            rows={6}
            placeholder="Please describe your partnership proposal, including goals, expected outcomes, and how we can collaborate..."
            className="w-full resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full btn-primary" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
        </Button>
      </form>
    </div>
  );
};

export default PartnersInquiryForm;
