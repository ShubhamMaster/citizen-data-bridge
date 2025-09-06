import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

const CONTACT_ID = 'support_contact_125625';
const ADDRESS_ID = 'head_office_422605';
const COMPANY_ID = 'your-company-id';
const SOCIAL_IDS = ['social_facebok_239746', 'social_github_856152'];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry_type: 'general',
    message: ''
  });

  const [contactInfo, setContactInfo] = useState(null);
  const [addressInfo, setAddressInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendConfirmationEmail = async (formData) => {
    try {
      const emailPayload = {
        to: formData.email,
        subject: `Thank you for your contact inquiry - Civora Nexus`,
        html: generateConfirmationEmailHTML(formData),
        formType: 'contact',
        formData: formData
      };

      const { error } = await supabase.functions.invoke('send-noreply-email', {
        body: emailPayload
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Confirmation email sent successfully');
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
        
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for contacting us!</h2>
        
        <p style="margin-bottom: 20px;">Dear ${data.name},</p>
        
        <p style="margin-bottom: 20px;">We have received your contact inquiry and appreciate your interest in Civora Nexus. Our team will review your request and get back to you within 24-48 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Inquiry Type:</td><td style="padding: 8px 0;">${data.inquiry_type}</td></tr>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      await sendConfirmationEmail(formData);

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours. Please check your email for confirmation.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiry_type: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchContactData = async () => {
      const { data: contact } = await supabase
        .from('civora_nexus_company_contacts')
        .select('*')
        .eq('contact_id', CONTACT_ID)
        .single();

      const { data: address } = await supabase
        .from('civora_nexus_company_addresses')
        .select('*')
        .eq('address_id', ADDRESS_ID)
        .single();

      const { data: company } = await supabase
        .from('civora_nexus_companies')
        .select('*')
        .eq('company_id', COMPANY_ID)
        .single();

      const { data: socials } = await supabase
        .from('civora_nexus_social_links')
        .select('*')
        .in('social_id', SOCIAL_IDS);

      setContactInfo(contact);
      setAddressInfo(address);
      setCompanyInfo(company);
      setSocialLinks(socials);
    };

    fetchContactData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <UniformHeroSection
        title="Get in Touch"
        subtitle="Whether you're looking for solutions, partnerships, or just want to say hello - we'd love to hear from you and discuss how we can help achieve your goals."
        breadcrumb="Contact Us"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="card-modern p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="h-6 w-6 text-accent" />
                  <h2 className="text-3xl font-bold text-primary">
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 9625 462564"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Company/Organization
                      </label>
                      <Input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        placeholder="Your organization (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      How can we help you?
                    </label>
                    <Select
                      value={formData.inquiry_type}
                      onValueChange={(value) =>
                        handleInputChange("inquiry_type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select how we can help" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="product_info">Product Information</SelectItem>
                        <SelectItem value="sales">Sales & Solutions</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="consultation">Consultation Request</SelectItem>
                        <SelectItem value="careers">Careers & Jobs</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      rows={6}
                      placeholder="Tell us about your needs, questions, or how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
            <div className="space-y-8">
              <div className="card-modern p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-4">
                  <ScheduleCallDialog />

                  <Button asChild variant="outline" className="w-full">
                    <a href="/consultation">Request Consultation</a>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <a href="/contact/sales">Sales Inquiry</a>
                  </Button>
                </div>
              </div>

              <div className="card-modern p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Need Support?
                </h3>

                <div className="space-y-4">
                  <Button asChild variant="outline" className="w-full">
                    <a href="/support/help-center">Help Center</a>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <a href="/support/technical-support">Technical Support</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for
              you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Office Address
              </h3>
              <p className="text-muted-foreground text-sm">
                {addressInfo?.street_address}, {addressInfo?.area}
                <br />
                {addressInfo?.city}, {addressInfo?.state} -{" "}
                {addressInfo?.postal_code}
                <br />
                {addressInfo?.country}
              </p>
            </div>

            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">
                <a
                  href={`tel:+91${contactInfo?.phone}`}
                  className="hover:text-accent transition-colors"
                >
                  +91 {contactInfo?.phone}
                </a>
              </p>
            </div>

            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">
                <a
                  href={`mailto:${contactInfo?.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {contactInfo?.email}
                </a>
              </p>
            </div>

            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Business Hours
              </h3>
              <p className="text-muted-foreground text-sm">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Find Us</h2>
            <p className="text-xl text-muted-foreground">
              {companyInfo?.description || "Visit our office location below."}
            </p>
          </div>

          <div className="card-modern overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {addressInfo?.google_map_link ? (
                    <a
                      href={addressInfo.google_map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  ) : (
                    "Map location will be available soon."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Follow us on social media for the latest updates, insights, and
              community stories.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.social_id}
                  variant="outline"
                  className="w-12 h-12 p-0"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.platform === "linkedin" && "🔗"}
                    {social.platform === "twitter" && "🐦"}
                    {social.platform === "github" && "💻"}
                    {social.platform === "instagram" && "📸"}
                    {social.platform === "youtube" && "📺"}
                    {social.platform === "facebook" && "📘"}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;