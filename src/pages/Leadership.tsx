
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import { useLeadership } from "@/hooks/useLeadership";
import { Skeleton } from "@/components/ui/skeleton";

const Leadership = () => {
  const { data: leadership, isLoading, error } = useLeadership();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Meet Our Leadership"
        subtitle="Experienced leaders driving innovation in civic technology and committed to creating meaningful impact through collaborative solutions."
        breadcrumb="Company / Leadership"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/careers">Join Our Team</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/about-us/board-of-directors">Board of Directors</Link>
          </Button>
        </div>
      </UniformHeroSection>

      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Executive Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our leadership team combines deep technical expertise with extensive experience in public service and social impact
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card-modern overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-xl text-muted-foreground">Unable to load leadership information at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership?.map((leader, index) => (
                <div key={leader.id} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={leader.image_url || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108755-2616b612b829' : '1472099645785-5658abf4ff4e'}?auto=format&fit=crop&w=300&q=80`} 
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-primary mb-2">{leader.name}</h3>
                      <p className="text-accent font-medium mb-2">{leader.role}</p>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {leader.description ? leader.description.substring(0, 150) + '...' : 'Experienced professional committed to innovation and excellence.'}
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          View Full Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-4">
                            <img 
                              src={leader.image_url || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108755-2616b612b829' : '1472099645785-5658abf4ff4e'}?auto=format&fit=crop&w=300&q=80`} 
                              alt={leader.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="text-2xl font-bold text-primary">{leader.name}</h3>
                              <p className="text-accent font-medium">{leader.role}</p>
                            </div>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-primary mb-2">About</h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {leader.description || 'Experienced professional committed to innovation and excellence in civic technology.'}
                            </p>
                          </div>

                          <div className="flex gap-4 pt-4 border-t">
                            <Button variant="outline" size="sm">
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding-sm bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Join Our Leadership Journey</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're always looking for exceptional leaders who share our vision of transforming civic engagement through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/careers">View Open Positions</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
