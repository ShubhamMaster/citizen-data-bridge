import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProjectInquiryForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry_type: 'partnership',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendConfirmationEmail = async (formData) => {
    try {
      const emailPayload = {
        to: formData.email,
        subject: `Thank you for your project inquiry - Civora Nexus`,
        html: generateConfirmationEmailHTML(formData),
        formType: 'project',
        formData: formData
      };

      const { error } = await supabase.functions.invoke('send-noreply-email', {
        body: emailPayload
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Project inquiry confirmation email sent successfully');
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
        
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for your project inquiry!</h2>
        
        <p style="margin-bottom: 20px;">Dear ${data.name},</p>
        
        <p style="margin-bottom: 20px;">We have received your project inquiry and appreciate your interest in working with Civora Nexus. Our team will review your requirements and get back to you within 24-48 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            ${data.inquiry_type ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Project Type:</td><td style="padding: 8px 0;">${data.inquiry_type}</td></tr>` : ''}
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
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      await sendConfirmationEmail(formData);

      toast({
        title: "Partnership Inquiry Submitted!",
        description: "Thank you for your interest. We'll get back to you within 24 hours. Please check your email for confirmation.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiry_type: 'partnership',
        message: ''
      });

      setTimeout(() => navigate('/about-us/partners'), 2000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-modern p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Your full name"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="your.email@company.com"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Company/Organization
            </label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Your organization"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Partnership Type
          </label>
          <Select
            value={formData.inquiry_type}
            onValueChange={(value) => handleInputChange('inquiry_type', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="partnership">Strategic Partnership</SelectItem>
              <SelectItem value="implementation">Implementation Partner</SelectItem>
              <SelectItem value="technology">Technology Integration</SelectItem>
              <SelectItem value="collaboration">Research Collaboration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Partnership Details *
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
            rows={6}
            placeholder="Please describe your partnership proposal, goals, and how you envision working together..."
            className="w-full resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/about-us/partners')}
            className="btn-secondary"
          >
            Back to Partners
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInquiryForm;
