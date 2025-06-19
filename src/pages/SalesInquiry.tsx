
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Zap, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const SalesInquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: '',
    companySize: '',
    budget: '',
    timeline: '',
    services: [],
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([{
      name: formData.name,
      email: formData.email,
      message: `SALES INQUIRY
Company: ${formData.company}
Role: ${formData.role}
Phone: ${formData.phone}
Company Size: ${formData.companySize}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}
Services of Interest: ${formData.services.join(', ')}

Message: ${formData.message}`
    }]);

    if (error) {
      toast({
        title: "Error",
        description: "We couldn't send your inquiry. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Inquiry sent!",
        description: "Thank you for your interest. Our sales team will contact you within 4 hours during business hours."
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        role: '',
        companySize: '',
        budget: '',
        timeline: '',
        services: [],
        message: ''
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

  const handleServiceChange = (service: string) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
    
    setFormData({
      ...formData,
      services: updatedServices
    });
  };

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Fast Response",
      description: "Get a personalized response within 4 hours during business hours"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Expert Consultation",
      description: "Speak directly with our solution architects and technical experts"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Tailored Solutions",
      description: "Custom proposals designed specifically for your business needs"
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "No Commitment",
      description: "Free consultation with no obligation to purchase"
    }
  ];

  const services = [
    "AI Solutions",
    "SaaS Development", 
    "Cloud Hosting",
    "Automation",
    "Custom Integrations",
    "Data Analytics",
    "Mobile App Development",
    "Digital Transformation Consulting"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Talk to Our Sales Team"
        subtitle="Ready to transform your business with innovative technology solutions? Let's discuss how we can help you achieve your goals with our cutting-edge services."
        breadcrumb="Contact / Sales"
      />

      {/* Benefits Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Form */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-modern shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Tell Us About Your Project</CardTitle>
                  <p className="text-muted-foreground">
                    Provide details about your business and requirements so we can prepare a tailored proposal.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
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
                          <Label htmlFor="email">Business Email *</Label>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
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
                        <div>
                          <Label htmlFor="role">Your Role *</Label>
                          <select 
                            id="role" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            required
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            <option value="">Select your role</option>
                            <option value="ceo">CEO/President</option>
                            <option value="cto">CTO/Technical Lead</option>
                            <option value="manager">Manager/Director</option>
                            <option value="developer">Developer/Engineer</option>
                            <option value="consultant">Consultant</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company Name *</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 input-modern" 
                            disabled={loading} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="companySize">Company Size</Label>
                          <select 
                            id="companySize" 
                            name="companySize" 
                            value={formData.companySize} 
                            onChange={handleChange}
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            <option value="">Select company size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-1000">201-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Project Details</h3>
                      <div>
                        <Label className="text-base font-medium">Services of Interest</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {services.map((service) => (
                            <label key={service} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.services.includes(service)}
                                onChange={() => handleServiceChange(service)}
                                className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                                disabled={loading}
                              />
                              <span className="text-sm text-muted-foreground">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <select 
                            id="budget" 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleChange}
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            <option value="">Select budget range</option>
                            <option value="under-25k">Under $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k-250k">$100,000 - $250,000</option>
                            <option value="250k+">$250,000+</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="timeline">Project Timeline</Label>
                          <select 
                            id="timeline" 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleChange}
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            <option value="">Select timeline</option>
                            <option value="asap">ASAP</option>
                            <option value="1-3-months">1-3 months</option>
                            <option value="3-6-months">3-6 months</option>
                            <option value="6-12-months">6-12 months</option>
                            <option value="12+-months">12+ months</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Project Description</Label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={4} 
                        className="mt-1 w-full input-modern resize-none" 
                        disabled={loading}
                        placeholder="Tell us about your project goals, challenges, and any specific requirements..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary" disabled={loading}>
                      {loading ? "Sending..." : (
                        <>
                          Send Sales Inquiry
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">What Happens Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Immediate Confirmation</p>
                        <p className="text-sm text-muted-foreground">You'll receive an email confirmation within minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Sales Team Review</p>
                        <p className="text-sm text-muted-foreground">Our team will review your requirements within 4 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Discovery Call</p>
                        <p className="text-sm text-muted-foreground">We'll schedule a call to discuss your project in detail</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Custom Proposal</p>
                        <p className="text-sm text-muted-foreground">Receive a tailored proposal within 2-3 business days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">Need Immediate Help?</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    For urgent inquiries or immediate assistance, contact us directly.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> sales@civoranexus.com
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Phone:</strong> +91-9146 2687 10
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SalesInquiry;
