
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  register_link: string;
}

const UpcomingEventsSection = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('upcoming_events')
          .select('*')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .limit(3);

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

    fetchUpcomingEvents();
  }, []);

  if (loading) {
    return (
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-modern p-6">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground">
              No upcoming events at the moment. Check back soon for exciting opportunities!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding-sm bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for exciting opportunities to engage with cutting-edge technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={event.id} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
                
                <Button asChild className="w-full">
                  <Link to={`/event-registration/${event.id}`}>
                    Register Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/all-events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
