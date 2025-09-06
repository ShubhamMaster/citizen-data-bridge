
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationProps {
  jobId: string;
  onSuccess?: () => void;
}

const JobApplication: React.FC<JobApplicationProps> = ({ jobId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    cover_letter: '',
    resume_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: parseInt(jobId),
          application_data: formData,
          user_id: null,
          data_source: 'web_form',
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
        variant: "default"
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        skills: '',
        cover_letter: '',
        resume_url: ''
      });

      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitting) {
    return <div className="loader"></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
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
        />
      </div>

      <div>
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="List your relevant skills..."
        />
      </div>

      <div>
        <Label htmlFor="resume_url">Resume URL</Label>
        <Input
          id="resume_url"
          name="resume_url"
          type="url"
          value={formData.resume_url}
          onChange={handleChange}
          placeholder="Link to your resume..."
        />
      </div>

      <div>
        <Label htmlFor="cover_letter">Cover Letter</Label>
        <Textarea
          id="cover_letter"
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          placeholder="Tell us why you're interested in this position..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <div className="loader"></div> : 'Submit Application'}
      </Button>
    </form>
  );
};

export default JobApplication;
