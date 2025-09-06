
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEmailConfirmation } from '@/hooks/useEmailConfirmation';

const RDCollaborationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sendConfirmationEmail } = useEmailConfirmation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    collaboration_type: '',
    message: ''
  });

  const collaborationTypes = [
    'Research Partnership',
    'Technology Development',
    'Academic Collaboration',
    'Industry Partnership',
    'Grant Collaboration',
    'Joint Venture',
    'Knowledge Exchange',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('collaboration_requests')
        .insert([formData]);

      if (error) throw error;

      // Send confirmation email
      await sendConfirmationEmail({
        formType: 'collaboration request',
        ...formData
      });

      toast({
        title: "Collaboration Request Submitted!",
        description: "Thank you for your interest in collaborating with us. We'll review your proposal and contact you within 48 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        collaboration_type: '',
        message: ''
      });

      setTimeout(() => navigate('/innovation-lab/rnd'), 2000);
    } catch (error) {
      console.error('Error submitting collaboration request:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-modern p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Collaborate With Us</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Tell us about your research interests and how we can work together to drive innovation.
        </p>
      </div>

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
              placeholder="your.email@organization.com"
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
              Organization/Institution *
            </label>
            <Input
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              required
              placeholder="Your organization or institution"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Collaboration Type *
          </label>
          <Select
            value={formData.collaboration_type}
            onValueChange={(value) => handleInputChange('collaboration_type', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select collaboration type" />
            </SelectTrigger>
            <SelectContent>
              {collaborationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Collaboration Proposal *
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
            rows={6}
            placeholder="Please describe your collaboration proposal, research interests, expected outcomes, timeline, and how this partnership would benefit both parties... "
            className="w-full resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Collaboration Request'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/innovation-lab/rnd')}
            className="btn-secondary"
          >
            Back to R&D
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RDCollaborationForm;
