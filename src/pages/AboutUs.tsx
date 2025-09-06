import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Award, Globe } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Innovation First",
      description: "We prioritize cutting-edge solutions that push the boundaries of civic technology."
    },
    {
      icon: <Users className="h-8 w-8 text-neon-blue" />,
      title: "Community Focused", 
      description: "Every solution we create is designed with the community's needs at the forefront."
    },
    {
      icon: <Award className="h-8 w-8 text-neon-pink" />,
      title: "Excellence Driven",
      description: "We maintain the highest standards in everything we do, from code to customer service."
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Global Impact",
      description: "Our solutions are designed to scale and make a positive impact worldwide."
    }
  ];

  const milestones = [
    { year: "2022", title: "Founded", description: "Civora Nexus was established with a vision to transform civic engagement through technology." },
    { year: "2020", title: "First Major Project", description: "Launched our first smart city initiative, serving over 100,000 citizens." },
    { year: "2021", title: "AI Integration", description: "Introduced AI-powered analytics to enhance decision-making processes." },
    { year: "2022", title: "Global Expansion", description: "Expanded operations to serve communities across multiple countries." },
    { year: "2023", title: "Innovation Lab", description: "Established our dedicated R&D facility for next-generation civic solutions." },
    { year: "2024", title: "Strategic Partnerships", description: "Formed key partnerships with leading technology providers and government agencies." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Transforming Communities Through Innovation"
        subtitle="We're a forward-thinking technology company dedicated to revolutionizing how communities interact with government services through intelligent, accessible, and impactful solutions."
        breadcrumb="About Us"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/careers">Career Inquiry</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Mission & Vision */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <h1 className="sr-only">About Civora Nexus - Transforming Communities Through Innovation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card-modern p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To bridge the gap between government services and citizens through innovative technology solutions that make civic engagement more accessible, efficient, and transparent for everyone.
              </p>
            </div>
            
            <div className="card-modern p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where technology empowers every citizen to actively participate in their community, creating stronger, more connected, and more responsive societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our mission to transform civic engagement
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-accent to-neon-blue"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-primary mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding-sm bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ready to be part of transforming how communities engage with technology? 
              Explore our career opportunities and help us build the future of civic engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/careers">View Career Opportunities</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/leadership">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
