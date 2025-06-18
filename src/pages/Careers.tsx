
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Globe, Zap, Award, Coffee, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const coreValues = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Innovation First",
      description: "We push boundaries and embrace cutting-edge technologies to solve tomorrow's challenges today."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Collaborative Spirit",
      description: "Our diverse teams work together, sharing knowledge and celebrating collective achievements."
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Global Impact",
      description: "Every project we undertake aims to create positive change for communities and businesses worldwide."
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Work-Life Balance",
      description: "We believe great work comes from fulfilled individuals who have time for what matters most."
    }
  ];

  const benefits = [
    { icon: <Heart className="h-6 w-6 text-accent" />, title: "Comprehensive Health Coverage", description: "Medical, dental, and vision insurance for you and your family" },
    { icon: <Globe className="h-6 w-6 text-accent" />, title: "Remote-First Culture", description: "Work from anywhere with flexible hours and outcomes-focused approach" },
    { icon: <Award className="h-6 w-6 text-accent" />, title: "Learning & Development", description: "Annual learning budget, conference attendance, and skill development programs" },
    { icon: <Coffee className="h-6 w-6 text-accent" />, title: "Wellness Programs", description: "Mental health support, wellness stipends, and team building activities" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior AI Engineer",
      image: "/api/placeholder/120/120",
      quote: "Working at Civora has empowered me to work on cutting-edge AI projects that actually make a difference in people's lives. The collaborative environment here is unlike anywhere I've worked before."
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      image: "/api/placeholder/120/120",
      quote: "The autonomy and trust given to teams here is incredible. We're not just building products; we're crafting solutions that shape the future of civic technology."
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      image: "/api/placeholder/120/120",
      quote: "Civora's commitment to accessibility and user-centered design aligns perfectly with my values. Every project here challenges me to think differently and grow professionally."
    }
  ];

  const lifeAtCivora = [
    { image: "/api/placeholder/400/300", caption: "Team collaboration in our modern workspace" },
    { image: "/api/placeholder/400/300", caption: "Annual tech conference and learning sessions" },
    { image: "/api/placeholder/400/300", caption: "Remote team building activities and virtual coffee chats" },
    { image: "/api/placeholder/400/300", caption: "Celebrating project launches and milestones" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Grow with Civora Nexus"
        subtitle="Join a team of innovators building the future of civic technology. We're creating solutions that empower communities and transform how people interact with digital services."
        breadcrumb="Careers"
      >
        <div className="mt-8 w-full max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-soft">
            <img 
              src="/api/placeholder/800/400" 
              alt="Civora Nexus team collaboration" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        </div>
      </UniformHeroSection>

      {/* Mission & Culture */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Mission & Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building technology that bridges the gap between innovation and human impact, creating solutions that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What Our Team Says</h2>
            <p className="text-xl text-muted-foreground">
              Hear from the people who make Civora Nexus an amazing place to work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Benefits & Perks</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We invest in our people's success and well-being with comprehensive benefits and growth opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Civora */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Life at Civora</h2>
            <p className="text-xl text-muted-foreground">
              Get a glimpse into our vibrant culture and collaborative environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lifeAtCivora.map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative rounded-2xl overflow-hidden shadow-soft">
                  <img 
                    src={item.image} 
                    alt={item.caption}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore our current openings and take the next step in your career journey with Civora Nexus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/careers/jobs">Explore Job Openings</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/careers/internships">Browse Internships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default Careers;
