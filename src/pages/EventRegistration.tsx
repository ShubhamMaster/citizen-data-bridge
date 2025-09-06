
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
}

const EventRegistration = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('upcoming_events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Event Not Found",
          description: "The requested event could not be found.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{
          ...formData,
          event_id: eventId
        }]);

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: `You've been registered for ${event?.title}. We'll send you event details via email.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      });

      // Redirect after short delay
      setTimeout(() => navigate('/innovation-lab'), 2000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: "Registration Error",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested event could not be found.</p>
          <Button onClick={() => navigate('/innovation-lab')} className="btn-primary">
            Back to Innovation Lab
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title={`Register for ${event.title}`}
        subtitle={`Join us on ${new Date(event.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} for this exciting event.`}
        breadcrumb="Innovation Lab / Events / Register"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Event Details */}
              <div>
                <div className="card-modern overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-4">{event.title}</h3>
                    <div className="flex items-center gap-2 text-accent mb-4">
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div>
                <div className="card-modern p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary mb-4">Event Registration</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below to secure your spot at this event.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full"
                      >
                        {isSubmitting ? 'Registering...' : 'Register for Event'}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/innovation-lab')}
                        className="btn-secondary w-full"
                      >
                        Back to Innovation Lab
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventRegistration;
