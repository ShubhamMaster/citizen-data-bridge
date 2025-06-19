
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle, Headphones, HelpCircle, Clock, Shield, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [loading, setLoading] = useState(false);

  // Fetch contact info from Supabase
  const { content } = useWebsiteContent("contact");
  const email = content?.email || "contact@civoranexus.com";
  const phone = content?.phone || "+91-9146 2687 10";
  const address = content?.address || "Sangamner, Maharashtra, India";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([{
      name: formData.name,
      email: formData.email,
      message: `Company: ${formData.company}\nPhone: ${formData.phone}\nInquiry Type: ${formData.inquiryType}\n\nMessage: ${formData.message}`
    }]);

    if (error) {
      toast({
        title: "Error",
        description: "We couldn't send your message. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll be in touch within 24 hours."
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        inquiryType: 'general'
      });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactOptions = [
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Sales Inquiry",
      description: "Interested in our solutions? Let's discuss how we can help your business grow.",
      link: "/contact/sales",
      bgColor: "bg-gradient-to-br from-accent/10 to-primary/10"
    },
    {
      icon: <Headphones className="h-6 w-6 text-accent" />,
      title: "Technical Support",
      description: "Need help with our products? Our technical team is ready to assist you.",
      link: "/support/technical-support",
      bgColor: "bg-gradient-to-br from-primary/10 to-accent/10"
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-accent" />,
      title: "Help Center",
      description: "Browse our knowledge base, FAQs, and documentation.",
      link: "/support/help-center",
      bgColor: "bg-gradient-to-br from-accent/10 to-primary/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Let's Build Together"
        subtitle="Ready to transform your organization with innovative technology? We're here to help you succeed. Get in touch with our team of experts."
        breadcrumb="Contact"
      />

      {/* Trust Badges - Repositioned */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="trust-badges">
            <div className="trust-badge">
              <Shield className="inline w-4 h-4 mr-2" />
              Government Trusted
            </div>
            <div className="trust-badge">
              <Headphones className="inline w-4 h-4 mr-2" />
              Healthcare Focus
            </div>
            <div className="trust-badge">
              <Users className="inline w-4 h-4 mr-2" />
              Community Impact
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">How Can We Help?</h2>
            <p className="text-xl text-muted-foreground">
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <Link key={index} to={option.link} className="block">
                <Card className={`card-modern ${option.bgColor} border-0 h-full hover:scale-105 transition-all duration-300`}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-soft">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{option.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{option.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="card-modern shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          className="mt-1 input-modern" 
                          disabled={loading} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className="mt-1 input-modern" 
                          disabled={loading} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange} 
                          className="mt-1 input-modern" 
                          disabled={loading} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="mt-1 input-modern" 
                          disabled={loading} 
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <select 
                        id="inquiryType" 
                        name="inquiryType" 
                        value={formData.inquiryType} 
                        onChange={handleChange}
                        className="mt-1 w-full input-modern"
                        disabled={loading}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        rows={6} 
                        className="mt-1 w-full input-modern resize-none" 
                        disabled={loading}
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  We're here to help you transform your organization with cutting-edge technology solutions. 
                  Our team of experts is ready to discuss your project and provide tailored recommendations.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a href={`mailto:${email}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {email}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Phone</h3>
                    <a href={`tel:${phone}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monday - Friday, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Office</h3>
                    <p className="text-muted-foreground">{address}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Remote-first company with global reach
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Response Time</h3>
                    <p className="text-muted-foreground">24 hours for general inquiries</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Priority support for existing clients
                    </p>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-0 p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary mb-3">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Let's discuss how we can help transform your organization with innovative technology solutions.
                  </p>
                  <div className="w-full sm:w-auto">
                    <ScheduleCallDialog />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default Contact;
