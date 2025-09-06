
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectInquiry } from '@/hooks/useInquiryForms';

const ProjectInquiryFormComponent = () => {
  const navigate = useNavigate();
  const projectInquiry = useProjectInquiry();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    project_description: '',
    requirements: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectInquiry.mutateAsync(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        budget_range: '',
        timeline: '',
        project_description: '',
        requirements: ''
      });
      setTimeout(() => navigate('/projects'), 2000);
    } catch (error) {
      console.error('Form submission error:', error);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Project Type
            </label>
            <Select
              value={formData.project_type}
              onValueChange={(value) => handleInputChange('project_type', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="ai-solution">AI Solution</SelectItem>
                <SelectItem value="saas-platform">SaaS Platform</SelectItem>
                <SelectItem value="custom-software">Custom Software</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Budget Range
            </label>
            <Select
              value={formData.budget_range}
              onValueChange={(value) => handleInputChange('budget_range', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10k">Under $10K</SelectItem>
                <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="over-100k">Over $100K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Timeline
          </label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => handleInputChange('timeline', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Project Description *
          </label>
          <Textarea
            value={formData.project_description}
            onChange={(e) => handleInputChange('project_description', e.target.value)}
            required
            rows={4}
            placeholder="Describe your project idea, goals, and what you want to achieve..."
            className="w-full resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Technical Requirements
          </label>
          <Textarea
            value={formData.requirements}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
            rows={3}
            placeholder="Any specific technical requirements, integrations, or constraints..."
            className="w-full resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={projectInquiry.isPending}
            className="btn-primary flex-1"
          >
            {projectInquiry.isPending ? 'Submitting...' : 'Submit Project Inquiry'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/projects')}
            className="btn-secondary"
          >
            Back to Projects
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInquiryFormComponent;
