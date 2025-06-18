
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Handshake, Globe, Users, Target } from "lucide-react";

const Partners = () => {
  const partnerCategories = [
    {
      title: "Government Partners",
      description: "Collaborating with government agencies to improve citizen services",
      icon: <Globe className="h-8 w-8 text-accent" />,
      partners: [
        "Municipal Government Offices",
        "State Digital India Initiatives", 
        "Public Health Departments",
        "Education Ministry Programs"
      ]
    },
    {
      title: "Technology Partners",
      description: "Strategic alliances with leading technology providers",
      icon: <Target className="h-8 w-8 text-neon-blue" />,
      partners: [
        "Cloud Infrastructure Providers",
        "AI & Machine Learning Platforms",
        "Cybersecurity Solutions",
        "Integration Technology Partners"
      ]
    },
    {
      title: "NGO & Community Partners",
      description: "Working with non-profits to maximize social impact",
      icon: <Users className="h-8 w-8 text-neon-pink" />,
      partners: [
        "Healthcare Access Organizations",
        "Education & Literacy NGOs",
        "Community Development Groups",
        "Social Justice Advocates"
      ]
    },
    {
      title: "Implementation Partners",
      description: "Local partners ensuring effective solution deployment",
      icon: <Handshake className="h-8 w-8 text-accent" />,
      partners: [
        "Regional System Integrators",
        "Local Government Consultants",
        "Community Outreach Organizations",
        "Training & Support Providers"
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Civora Nexus has transformed how we deliver digital services to our citizens. Their innovative approach and collaborative spirit make them an ideal partner.",
      author: "Government Technology Director",
      organization: "Municipal Government"
    },
    {
      quote: "The partnership with Civora Nexus has enabled us to reach more communities and deliver better outcomes through their scalable technology solutions.",
      author: "Program Director",
      organization: "Healthcare NGO"
    },
    {
      quote: "Working with Civora Nexus brings together the best of technology innovation and deep understanding of civic needs.",
      author: "Chief Technology Officer",
      organization: "Technology Partner"
    }
  ];

  const partnershipTypes = [
    {
      title: "Strategic Partnerships",
      description: "Long-term collaborations focused on transforming civic services",
      benefits: ["Joint solution development", "Shared market access", "Co-innovation opportunities", "Technical integration support"]
    },
    {
      title: "Implementation Partners",
      description: "Local expertise for effective solution deployment and support",
      benefits: ["Regional market knowledge", "Local community connections", "Implementation support", "Ongoing maintenance"]
    },
    {
      title: "Technology Integrations",
      description: "API partnerships and platform integrations for enhanced capabilities",
      benefits: ["Technical integration", "Enhanced functionality", "Broader service offerings", "Shared customer base"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Our Partners & Collaborators"
        subtitle="Building stronger communities through strategic partnerships with government agencies, NGOs, and technology leaders committed to social impact."
        breadcrumb="Company / Partners"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/contact/sales">Partner With Us</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/about-us/investors">View Investors</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Partner Categories */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Partnership Ecosystem</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We collaborate with diverse organizations to maximize our impact and reach in civic technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerCategories.map((category, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {category.partners.map((partner, partnerIndex) => (
                    <li key={partnerIndex} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore different ways to collaborate with Civora Nexus and create lasting impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold text-primary mb-4">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                
                <div className="space-y-3 mb-6">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3 text-sm text-m-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact/sales">Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What Our Partners Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from organizations that have experienced the impact of our collaborative approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-6">
                  <div className="text-4xl text-accent/20 mb-4">"</div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    {testimonial.quote}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-accent">{testimonial.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding-sm bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Partner With Us?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our network of partners committed to transforming civic engagement through innovative technology solutions. 
              Together, we can create lasting positive impact in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact/sales">Start Partnership Discussion</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/contact">General Inquiry</Link>
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

export default Partners;
