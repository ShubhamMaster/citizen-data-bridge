
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coffee, Calendar, Award, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LifeAtCivora = () => {
  const cultureHighlights = [
    {
      image: "/api/placeholder/600/400",
      title: "Innovation Fridays",
      description: "Every Friday, our team dedicates time to experimental projects and learning new technologies.",
      tags: ["Innovation", "Learning", "Creativity"]
    },
    {
      image: "/api/placeholder/600/400",
      title: "Remote Team Bonding",
      description: "Virtual coffee chats, online game sessions, and collaborative workshops keep us connected.",
      tags: ["Remote", "Team Building", "Connection"]
    },
    {
      image: "/api/placeholder/600/400",
      title: "Tech Talk Tuesdays",
      description: "Weekly presentations where team members share insights, learnings, and industry trends.",
      tags: ["Knowledge Sharing", "Growth", "Community"]
    }
  ];

  const employeeSpotlights = [
    {
      name: "Alex Kim",
      role: "Full-Stack Developer",
      image: "/api/placeholder/150/150",
      story: "Joined as a junior developer and grew into leading our flagship SaaS platform. The mentorship and growth opportunities here are incredible.",
      achievement: "Led development of 3 major product features",
      timeAtCompany: "2 years"
    },
    {
      name: "Jordan Martinez",
      role: "UX Researcher",
      image: "/api/placeholder/150/150",
      story: "Transitioned from psychology to UX research with full support from the team. Now I'm conducting user studies that directly impact our product decisions.",
      achievement: "Improved user satisfaction by 35%",
      timeAtCompany: "1.5 years"
    },
    {
      name: "Taylor Chen",
      role: "DevOps Engineer",
      image: "/api/placeholder/150/150",
      story: "Started as an intern and was offered a full-time position. The collaborative environment here helped me develop skills I never thought possible.",
      achievement: "Reduced deployment time by 60%",
      timeAtCompany: "3 years"
    }
  ];

  const workEnvironment = [
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Global Remote Team",
      description: "Work from anywhere in the world with team members across 12+ time zones"
    },
    {
      icon: <Calendar className="h-8 w-8 text-accent" />,
      title: "Flexible Schedule",
      description: "Core hours for collaboration, but flexible start and end times to fit your life"
    },
    {
      icon: <Coffee className="h-8 w-8 text-accent" />,
      title: "Coffee Chat Culture",
      description: "Regular informal conversations that build relationships and spark innovation"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Recognition Programs",
      description: "Monthly peer nominations and achievement celebrations for outstanding contributions"
    }
  ];

  const events = [
    { name: "Quarterly All-Hands", description: "Company updates, celebrations, and strategic planning", frequency: "Every 3 months" },
    { name: "Hackathons", description: "48-hour innovation sprints with cross-functional teams", frequency: "Bi-annually" },
    { name: "Learning Lunches", description: "Skill-sharing sessions over virtual lunch breaks", frequency: "Weekly" },
    { name: "Team Retreats", description: "Annual in-person gatherings for strategic planning and bonding", frequency: "Annually" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Our Vibrant Culture"
        subtitle="Discover what makes Civora Nexus a place where innovation thrives, relationships flourish, and careers grow. We're more than colleagues—we're a community."
        breadcrumb="Careers / Life at Civora"
      >
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative rounded-xl overflow-hidden shadow-soft">
              <img 
                src={`/api/placeholder/300/200`} 
                alt={`Team culture ${i}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          ))}
        </div>
      </UniformHeroSection>

      {/* Culture Highlights */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Culture in Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our values come to life through the programs and initiatives that make Civora special.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cultureHighlights.map((highlight, index) => (
              <Card key={index} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-primary">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {highlight.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Spotlights */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Employee Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from team members about their growth and experiences at Civora Nexus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employeeSpotlights.map((employee, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <img 
                      src={employee.image} 
                      alt={employee.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-primary">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                    <Badge variant="outline" className="mt-2">{employee.timeAtCompany}</Badge>
                  </div>
                  
                  <blockquote className="text-muted-foreground italic text-center">
                    "{employee.story}"
                  </blockquote>
                  
                  <div className="bg-gradient-to-br from-accent/5 to-neon-blue/5 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-primary">Key Achievement</p>
                    <p className="text-sm text-muted-foreground">{employee.achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Environment */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Work Environment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've built a workplace that supports your best work while maintaining flexibility and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workEnvironment.map((item, index) => (
              <Card key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Activities */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Events & Activities</h2>
            <p className="text-xl text-muted-foreground">
              Regular events that bring our team together and foster continuous learning and connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">{event.name}</h3>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {event.frequency}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Be Part of Our Story?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join a team where your ideas matter, your growth is supported, and your work makes a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/jobs-opening">View Open Roles</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/careers">Learn More About Careers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LifeAtCivora;
