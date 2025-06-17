import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Handshake, Lightbulb, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Community First",
      description: "We prioritize community needs and citizen welfare in every solution we build."
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Innovation Focus",
      description: "Leveraging cutting-edge technology to solve real-world civic challenges."
    },
    {
      icon: <Heart className="h-8 w-8 text-neon-pink" />,
      title: "Social Impact",
      description: "Committed to creating meaningful change that improves lives and communities."
    },
    {
      icon: <Handshake className="h-8 w-8 text-accent" />,
      title: "Collaborative Approach",
      description: "Building partnerships with governments, NGOs, and communities for lasting solutions."
    }
  ];

  const goals = [
    {
      icon: <Lightbulb className="h-8 w-8 text-neon-blue" />,
      title: "Smart Governance Solutions",
      description: "Developing digital platforms that enhance transparency and efficiency in government operations."
    },
    {
      icon: <Heart className="h-8 w-8 text-neon-pink" />,
      title: "Healthcare Innovation",
      description: "Creating accessible healthcare technologies that bridge gaps in medical service delivery."
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Community Engagement",
      description: "Building tools that strengthen citizen participation in democratic processes and community development."
    }
  ];

  const initiatives = [
    "Digital India Initiative Alignment",
    "Smart City Mission Support",
    "Public Health Technology Solutions",
    "Educational Technology Platforms",
    "Civic Engagement Applications"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Uniform Hero Section */}
      <UniformHeroSection
        title="About Civora Nexus"
        subtitle="A new venture dedicated to empowering communities through innovative civic and healthcare technology solutions."
        breadcrumb="Company / About Us"
      />

      {/* Mission & Vision */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-modern p-10 text-center animate-fade-in">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To bridge the gap between citizens and public services through intelligent innovation, 
                creating scalable technology solutions that enhance governance, healthcare delivery, 
                and community engagement.
              </p>
            </div>
            
            <div className="card-modern p-10 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the leading catalyst for digital transformation in civic and healthcare sectors, 
                enabling transparent, efficient, and citizen-centric public services across communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Focus Areas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key domains where we aim to create transformative impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-purple/10 rounded-2xl flex items-center justify-center">
                    {goal.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Initiatives */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Strategic Initiatives</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aligning with national and international programs for maximum impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <div key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-lg font-semibold text-primary">{initiative}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default About;
