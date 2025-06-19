
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateSupportTicket } from "@/hooks/useSupportTickets";
import { 
  Headphones, 
  Clock, 
  Shield, 
  Phone, 
  Mail,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Bug
} from "lucide-react";

const TechnicalSupport = () => {
  const navigate = useNavigate();
  const createTicket = useCreateSupportTicket();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    issue_type: '',
    priority: 'medium',
    subject: '',
    description: '',
    system_info: '',
    error_details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTicket.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        issue_type: formData.issue_type,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description,
        system_info: formData.system_info || null,
        error_details: formData.error_details || null,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        issue_type: '',
        priority: 'medium',
        subject: '',
        description: '',
        system_info: '',
        error_details: ''
      });

      setTimeout(() => {
        navigate('/help-center');
      }, 2000);

    } catch (error) {
      console.error('Error submitting support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const issueTypes = [
    "Bug Report",
    "Feature Request", 
    "Performance Issue",
    "Security Concern",
    "Integration Problem",
    "Account Access",
    "Billing Question",
    "Technical Documentation",
    "API Issues",
    "Other"
  ];

  const priorityLevels = [
    { value: "low", label: "Low - General inquiry", color: "text-gray-600" },
    { value: "medium", label: "Medium - Standard issue", color: "text-yellow-600" },
    { value: "high", label: "High - Important issue", color: "text-orange-600" },
    { value: "urgent", label: "Urgent - Critical issue", color: "text-red-600" }
  ];

  const supportFeatures = [
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "24 Hour Response",
      description: "We respond to all tickets within 24 hours"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Expert Support",
      description: "Direct access to our technical team"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Issue Tracking",
      description: "Real-time updates on your ticket status"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Need Technical Assistance?"
        subtitle="Experiencing technical issues? Submit a support ticket and our expert team will help resolve your problems quickly and efficiently."
        breadcrumb="Support / Technical Support"
      />

      {/* Features Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportFeatures.map((feature, index) => (
              <Card key={index} className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Submit Support Ticket</h2>
              <p className="text-muted-foreground">
                Provide detailed information about your issue so we can assist you effectively.
              </p>
            </div>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="h-5 w-5 text-accent mr-2" />
                  Technical Support Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="input-modern"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Issue Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Issue Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="issue_type">Issue Type *</Label>
                        <Select 
                          value={formData.issue_type} 
                          onValueChange={(value) => handleInputChange('issue_type', value)}
                          required
                        >
                          <SelectTrigger className="input-modern">
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {issueTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level *</Label>
                        <Select 
                          value={formData.priority} 
                          onValueChange={(value) => handleInputChange('priority', value)}
                          required
                        >
                          <SelectTrigger className="input-modern">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorityLevels.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <span className={priority.color}>{priority.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of the issue"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        className="input-modern"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Problem Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe the issue in detail. Include steps to reproduce the problem, what you expected to happen, and what actually happened."
                        rows={5}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                        className="input-modern"
                      />
                    </div>
                  </div>

                  {/* Technical Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Technical Information (Optional)
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="system_info">System Information</Label>
                        <Textarea
                          id="system_info"
                          placeholder="Operating System, Browser version, Device type, etc."
                          rows={3}
                          value={formData.system_info}
                          onChange={(e) => handleInputChange('system_info', e.target.value)}
                          className="input-modern"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="error_details">Error Messages/Logs</Label>
                        <Textarea
                          id="error_details"
                          placeholder="Copy and paste any error messages or relevant log entries here"
                          rows={4}
                          value={formData.error_details}
                          onChange={(e) => handleInputChange('error_details', e.target.value)}
                          className="input-modern font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Before submitting:</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Check our Help Center for common solutions</li>
                          <li>• Include as much detail as possible for faster resolution</li>
                          <li>• For urgent issues, consider calling our support line</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.issue_type || !formData.subject || !formData.description}
                  >
                    {isSubmitting ? "Submitting Ticket..." : "Submit Support Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Need Immediate Help?</h2>
              <p className="text-muted-foreground">
                For urgent issues, reach out to us directly through these channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Emergency Support</h3>
                  <p className="text-muted-foreground text-sm mb-2">+91 98765 43210</p>
                  <p className="text-xs text-muted-foreground">24/7 for critical issues</p>
                </CardContent>
              </Card>

              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-sm mb-2">Start instant chat</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM IST</p>
                </CardContent>
              </Card>

              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Email Support</h3>
                  <p className="text-muted-foreground text-sm mb-2">support@civora.com</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
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
