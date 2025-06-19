
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Headphones, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Shield,
  Users,
  MessageCircle,
  Mail,
  Phone,
  FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const TechnicalSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    priority: 'medium',
    category: '',
    subject: '',
    description: '',
    systemInfo: '',
    errorMessage: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([{
      name: formData.name,
      email: formData.email,
      message: `TECHNICAL SUPPORT REQUEST
Company: ${formData.company}
Phone: ${formData.phone}
Priority: ${formData.priority}
Category: ${formData.category}
Subject: ${formData.subject}

Description:
${formData.description}

System Information:
${formData.systemInfo}

Error Message:
${formData.errorMessage}`
    }]);

    if (error) {
      toast({
        title: "Error",
        description: "We couldn't submit your support request. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Support request submitted!",
        description: "Our technical team will review your request and respond according to your priority level."
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        priority: 'medium',
        category: '',
        subject: '',
        description: '',
        systemInfo: '',
        errorMessage: ''
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

  const priorityLevels = [
    {
      value: 'critical',
      label: 'Critical',
      description: 'Service completely down or major security issue',
      responseTime: '1 hour',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200'
    },
    {
      value: 'high',
      label: 'High',
      description: 'Significant functionality impacted',
      responseTime: '4 hours',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Minor functionality issues or questions',
      responseTime: '24 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      value: 'low',
      label: 'Low',
      description: 'General questions or feature requests',
      responseTime: '48 hours',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    }
  ];

  const categories = [
    "API Integration",
    "Authentication & Security",
    "Performance Issues",
    "Data Synchronization",
    "User Interface/UX",
    "Mobile Application",
    "Third-party Integrations",
    "Billing & Account",
    "Other"
  ];

  const supportFeatures = [
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "24/7 Monitoring",
      description: "Our systems are monitored around the clock to prevent issues before they occur"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Expert Team",
      description: "Dedicated technical support engineers with deep product knowledge"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Secure Support",
      description: "All support interactions are encrypted and comply with security standards"
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Fast Resolution",
      description: "Tiered response times based on priority to ensure quick issue resolution"
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Live Chat",
      description: "Instant chat with support team",
      availability: "9 AM - 6 PM IST",
      action: "Start Chat"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      description: "Direct phone support for urgent issues",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Call +91-9146 2687 10"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Detailed support via email",
      availability: "24/7 submission",
      action: "support@civoranexus.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Need Technical Assistance?"
        subtitle="Our expert technical support team is here to help you resolve issues quickly and efficiently. Submit a support request or contact us directly."
        breadcrumb="Support / Technical Support"
      />

      {/* Support Features */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Levels */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Support Priority Levels</h2>
            <p className="text-muted-foreground">
              Choose the appropriate priority level to ensure your request receives the right attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {priorityLevels.map((priority, index) => (
              <Card key={index} className={`border-2 ${priority.bgColor} hover:scale-105 transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    {priority.value === 'critical' && <AlertTriangle className={`h-8 w-8 ${priority.color}`} />}
                    {priority.value === 'high' && <Zap className={`h-8 w-8 ${priority.color}`} />}
                    {priority.value === 'medium' && <Headphones className={`h-8 w-8 ${priority.color}`} />}
                    {priority.value === 'low' && <CheckCircle className={`h-8 w-8 ${priority.color}`} />}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${priority.color}`}>{priority.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{priority.description}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priority.color} bg-white/80`}>
                    Response: {priority.responseTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Request Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-modern shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Submit Support Request
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Provide detailed information about your issue to help us assist you more effectively.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
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
                          <Label htmlFor="email">Email Address *</Label>
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
                      </div>
                    </div>

                    {/* Issue Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Issue Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="priority">Priority Level *</Label>
                          <select 
                            id="priority" 
                            name="priority" 
                            value={formData.priority} 
                            onChange={handleChange}
                            required
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            {priorityLevels.map((priority) => (
                              <option key={priority.value} value={priority.value}>
                                {priority.label} - {priority.description}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <select 
                            id="category" 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange}
                            required
                            className="mt-1 w-full input-modern"
                            disabled={loading}
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          required 
                          className="mt-1 input-modern" 
                          disabled={loading}
                          placeholder="Brief description of the issue"
                        />
                      </div>
                    </div>

                    {/* Detailed Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Detailed Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="description">Problem Description *</Label>
                          <textarea 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            rows={4} 
                            className="mt-1 w-full input-modern resize-none" 
                            disabled={loading}
                            placeholder="Describe the issue in detail, including steps to reproduce if applicable..."
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="systemInfo">System Information</Label>
                          <textarea 
                            id="systemInfo" 
                            name="systemInfo" 
                            value={formData.systemInfo} 
                            onChange={handleChange} 
                            rows={3} 
                            className="mt-1 w-full input-modern resize-none" 
                            disabled={loading}
                            placeholder="Operating system, browser version, device information, etc."
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="errorMessage">Error Messages</Label>
                          <textarea 
                            id="errorMessage" 
                            name="errorMessage" 
                            value={formData.errorMessage} 
                            onChange={handleChange} 
                            rows={3} 
                            className="mt-1 w-full input-modern resize-none" 
                            disabled={loading}
                            placeholder="Copy and paste any error messages you received"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Support Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg">Alternative Contact Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="border-b border-muted last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary text-sm">{method.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                          <p className="text-xs text-muted-foreground mb-2">{method.availability}</p>
                          <Button size="sm" variant="outline" className="text-xs">
                            {method.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* SLA Information */}
              <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Our Service Level Agreement
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Critical Issues:</span>
                      <span className="font-medium text-primary">1 hour response</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">High Priority:</span>
                      <span className="font-medium text-primary">4 hours response</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium Priority:</span>
                      <span className="font-medium text-primary">24 hours response</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Low Priority:</span>
                      <span className="font-medium text-primary">48 hours response</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Response times are calculated during business hours (9 AM - 6 PM IST, Monday - Friday)
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

export default TechnicalSupport;
