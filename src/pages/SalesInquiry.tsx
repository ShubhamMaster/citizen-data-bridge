
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
import { useCreateSalaryInquiry } from "@/hooks/useSalaryInquiries";
import { 
  Users, 
  DollarSign, 
  Phone, 
  Mail,
  Building,
  Clock,
  CheckCircle,
  MessageCircle
} from "lucide-react";

const SalesInquiry = () => {
  const navigate = useNavigate();
  const createInquiry = useCreateSalaryInquiry();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_title: '',
    department: '',
    experience_years: '',
    current_salary: '',
    expected_salary: '',
    additional_info: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        job_title: formData.job_title || null,
        department: formData.department,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
        current_salary: formData.current_salary || null,
        expected_salary: formData.expected_salary || null,
        additional_info: formData.additional_info || null,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        job_title: '',
        department: '',
        experience_years: '',
        current_salary: '',
        expected_salary: '',
        additional_info: ''
      });

      // Navigate to thank you page or show success
      setTimeout(() => {
        navigate('/careers');
      }, 2000);

    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    "Engineering",
    "Product Management", 
    "Design",
    "Marketing",
    "Sales",
    "Operations",
    "Data Science",
    "DevOps",
    "Quality Assurance",
    "Business Development",
    "Human Resources",
    "Finance"
  ];

  const experienceRanges = [
    "0-1", "1-2", "2-3", "3-5", "5-7", "7-10", "10+"
  ];

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Quick Response",
      description: "We respond to all inquiries within 24-48 hours"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Expert Team",
      description: "Connect directly with our hiring managers and team leads"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Transparent Process",
      description: "Clear communication throughout the entire process"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Talk to Our Sales Team"
        subtitle="Interested in working with us? Submit your details and salary expectations. We'll get back to you with opportunities that match your profile."
        breadcrumb="Contact / Sales Inquiry"
      />

      {/* Features Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
              <h2 className="text-3xl font-bold text-primary mb-4">Submit Your Inquiry</h2>
              <p className="text-muted-foreground">
                Share your details and career goals. We'll match you with relevant opportunities.
              </p>
            </div>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 text-accent mr-2" />
                  Career & Salary Inquiry Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Personal Information
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
                        <Label htmlFor="job_title">Current Job Title</Label>
                        <Input
                          id="job_title"
                          type="text"
                          placeholder="e.g., Senior Software Engineer"
                          value={formData.job_title}
                          onChange={(e) => handleInputChange('job_title', e.target.value)}
                          className="input-modern"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department of Interest *</Label>
                        <Select 
                          value={formData.department} 
                          onValueChange={(value) => handleInputChange('department', value)}
                          required
                        >
                          <SelectTrigger className="input-modern">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience_years">Years of Experience</Label>
                        <Select 
                          value={formData.experience_years} 
                          onValueChange={(value) => handleInputChange('experience_years', value)}
                        >
                          <SelectTrigger className="input-modern">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceRanges.map((range) => (
                              <SelectItem key={range} value={range}>{range} years</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Salary Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Salary Information (Optional)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_salary">Current Salary</Label>
                        <Input
                          id="current_salary"
                          type="text"
                          placeholder="e.g., ₹12,00,000 per annum"
                          value={formData.current_salary}
                          onChange={(e) => handleInputChange('current_salary', e.target.value)}
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expected_salary">Expected Salary</Label>
                        <Input
                          id="expected_salary"
                          type="text"
                          placeholder="e.g., ₹15,00,000 per annum"
                          value={formData.expected_salary}
                          onChange={(e) => handleInputChange('expected_salary', e.target.value)}
                          className="input-modern"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">
                      Additional Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="additional_info">Tell us more about your career goals</Label>
                      <Textarea
                        id="additional_info"
                        placeholder="Share your career aspirations, preferred work style, or any specific requirements..."
                        rows={4}
                        value={formData.additional_info}
                        onChange={(e) => handleInputChange('additional_info', e.target.value)}
                        className="input-modern"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.department}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm">careers@civora.com</p>
                </CardContent>
              </Card>

              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Call Us</h3>
                  <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                </CardContent>
              </Card>

              <Card className="card-modern text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-sm">Available 9 AM - 6 PM IST</p>
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
