
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

const Leadership = () => {
  const leadership = [
    {
      name: "Founding Team",
      role: "Co-Founders & Executive Leadership",
      department: "Executive",
      bio: "Our founding team brings together decades of experience in technology innovation, public service, and social impact. With backgrounds spanning software engineering, government operations, and nonprofit leadership, they established Civora Nexus to bridge the critical gap between citizens and public services through intelligent technology solutions.",
      expertise: ["Technology Leadership", "Public Service", "Social Impact", "Strategic Planning"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Chief Technology Officer",
      role: "Technology & Innovation Lead",
      department: "Engineering",
      bio: "Leading our technology strategy and innovation initiatives, our CTO oversees the development of scalable civic technology solutions. With expertise in AI, cloud computing, and system architecture, they ensure our platforms meet the highest standards of security, accessibility, and performance while serving diverse community needs.",
      expertise: ["AI & Machine Learning", "Cloud Architecture", "Cybersecurity", "Product Strategy"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Chief Operating Officer",
      role: "Operations & Strategy",
      department: "Operations",
      bio: "Our COO drives operational excellence and strategic partnerships across all business functions. With a proven track record in scaling technology companies and managing complex stakeholder relationships, they ensure our solutions are delivered effectively and sustainably to the communities we serve.",
      expertise: ["Operations Management", "Strategic Partnerships", "Business Development", "Process Optimization"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Head of Product",
      role: "Product Strategy & User Experience",
      department: "Product",
      bio: "Leading our product development and user experience initiatives, our Head of Product ensures our solutions are intuitive, accessible, and truly serve citizen needs. With deep expertise in human-centered design and civic technology, they bridge the gap between technical capabilities and real-world impact.",
      expertise: ["Product Management", "UX/UI Design", "User Research", "Civic Technology"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Director of Engineering",
      role: "Software Development & Architecture",
      department: "Engineering",
      bio: "Our Director of Engineering leads our technical teams in building robust, scalable solutions that serve millions of citizens. With extensive experience in full-stack development, DevOps, and team leadership, they ensure our technology infrastructure can handle the complex demands of civic services.",
      expertise: ["Full-Stack Development", "DevOps & Infrastructure", "Team Leadership", "System Architecture"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Head of Partnerships",
      role: "Government & Community Relations",
      department: "Partnerships",
      bio: "Leading our partnership strategy with government agencies, NGOs, and community organizations, our Head of Partnerships ensures our solutions address real-world needs and create lasting impact. Their experience in public sector engagement and stakeholder management drives our collaborative approach to civic innovation.",
      expertise: ["Government Relations", "Partnership Development", "Stakeholder Management", "Community Engagement"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-primary mb-2">{leader.name}</h3>
                    <p className="text-accent font-medium mb-2">{leader.role}</p>
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {leader.department}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {leader.bio.substring(0, 150)}...
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.slice(0, 2).map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {leader.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          +{leader.expertise.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

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
                            src={leader.image} 
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
                          <p className="text-muted-foreground leading-relaxed">{leader.bio}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Areas of Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {leader.expertise.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
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
        </div>
      </section>

      {/* Call to Action */}
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

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default Leadership;
