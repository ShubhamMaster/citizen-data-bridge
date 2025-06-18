
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Handshake, Lightbulb, Globe, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Community First",
      description: "We prioritize community needs and citizen welfare in every solution we build, ensuring our technology serves the greater good."
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Innovation Focus",
      description: "Leveraging cutting-edge AI and automation technologies to solve real-world civic challenges with practical, scalable solutions."
    },
    {
      icon: <Heart className="h-8 w-8 text-neon-pink" />,
      title: "Social Impact",
      description: "Committed to creating meaningful change that improves lives, strengthens communities, and builds a more equitable future."
    },
    {
      icon: <Handshake className="h-8 w-8 text-accent" />,
      title: "Collaborative Approach",
      description: "Building partnerships with governments, NGOs, and communities to create lasting solutions through trust and transparency."
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Company Founded",
      description: "Civora Nexus was established with a vision to bridge the gap between citizens and public services through intelligent technology."
    },
    {
      year: "2024",
      title: "First Solutions Deployed",
      description: "Launched our initial suite of civic engagement and healthcare technology solutions, focusing on accessibility and user experience."
    },
    {
      year: "2024",
      title: "Partnership Program",
      description: "Established strategic partnerships with government agencies and NGOs to expand our impact across communities."
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Expanding our innovation lab and research initiatives to develop next-generation civic technology solutions."
    }
  ];

  const team = [
    {
      name: "Leadership Team",
      role: "Founders & Executives",
      description: "Experienced leaders from technology, government, and social impact sectors.",
      link: "/about-us/leadership"
    },
    {
      name: "Engineering Team",
      role: "Technology Innovation",
      description: "Expert developers and AI researchers building scalable civic solutions.",
      link: "/careers"
    },
    {
      name: "Advisory Board",
      role: "Strategic Guidance",
      description: "Industry veterans providing insights on technology trends and civic needs.",
      link: "/about-us/board-of-directors"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <UniformHeroSection
        title="About Civora Nexus"
        subtitle="Empowering communities through innovative civic and healthcare technology solutions that bridge the gap between citizens and public services."
        breadcrumb="Company / About Us"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/careers">Join Our Team</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/contact/sales">Partnership Inquiry</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Company Story */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded with a mission to transform civic engagement through technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="card-modern p-8">
                <h3 className="text-2xl font-semibold text-primary mb-4">Why We Started</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Civora Nexus was born from the recognition that traditional civic services often fail to meet 
                  modern citizen expectations. We saw an opportunity to leverage emerging technologies like AI, 
                  automation, and cloud computing to create more accessible, efficient, and transparent public services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our founders, with combined decades of experience in technology and public service, 
                  established Civora Nexus as a bridge between innovative solutions and real-world civic challenges.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary mb-6">Key Milestones</h3>
              {timeline.map((milestone, index) => (
                <div key={index} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-primary mb-2">{milestone.title}</h4>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="card-modern p-10 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To bridge the gap between citizens and public services through intelligent innovation, 
                creating scalable technology solutions that enhance governance, healthcare delivery, 
                and community engagement while ensuring accessibility and transparency for all.
              </p>
            </div>
            
            <div className="card-modern p-10 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ArrowUp className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the leading catalyst for digital transformation in civic and healthcare sectors, 
                enabling transparent, efficient, and citizen-centric public services that empower 
                communities and foster democratic participation across all levels of society.
              </p>
            </div>
          </div>

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

      {/* Team Overview */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate professionals dedicated to creating meaningful change through technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((section, index) => (
              <Link key={index} to={section.link} className="group">
                <div className="card-modern p-8 text-center group-hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-200">{section.name}</h3>
                  <p className="text-sm font-medium text-accent mb-4">{section.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{section.description}</p>
                  <div className="mt-4 text-accent group-hover:underline">Learn More →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding-sm bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our mission to transform civic engagement through innovative technology solutions. 
              Whether you're looking to partner with us, join our team, or explore our services, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/careers">Explore Careers</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/contact">Contact Us</Link>
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

export default About;
