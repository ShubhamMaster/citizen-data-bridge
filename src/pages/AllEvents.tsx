
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  register_link: string;
}

const AllEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('upcoming_events')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          console.error('Error fetching events:', error);
        } else {
          setEvents(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

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

  const EventCard = ({ event }: { event: Event }) => (
    <div className="card-modern overflow-hidden animate-fade-in">
      <div className="aspect-video overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-accent mb-3">
          <Calendar className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {event.description}
        </p>
        
        <Button 
          onClick={() => navigate(`/event-registration/${event.id}`)}
          className="w-full"
        >
          Register Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="All Events"
        subtitle="Discover all our upcoming and past events. Join us for exciting opportunities to engage with cutting-edge technology and innovation."
        breadcrumb="Innovation Lab / Events"
      >
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => navigate('/innovation-lab')}
            variant="outline" 
            className="btn-secondary"
          >
            Back to Innovation Lab
          </Button>
        </div>
      </UniformHeroSection>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding-sm bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join us for these exciting upcoming opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="section-padding-sm bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Past Events</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Take a look at our previous events and activities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="card-modern overflow-hidden animate-fade-in opacity-75">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <Button variant="outline" className="w-full" disabled>
                      Event Completed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Events */}
      {events.length === 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">No Events Available</h2>
            <p className="text-xl text-muted-foreground mb-8">
              No events are currently scheduled. Check back soon for exciting opportunities!
            </p>
            <Button 
              onClick={() => navigate('/innovation-lab')}
              className="btn-primary"
            >
              Back to Innovation Lab
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default AllEvents;
