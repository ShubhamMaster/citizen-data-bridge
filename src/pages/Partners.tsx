
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import PartnersSection from '@/components/PartnersSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Handshake, Globe, TrendingUp, Users, Star, Target } from 'lucide-react';

const Partners = () => {
  const partnershipBenefits = [
    {
      icon: Handshake,
      title: "Strategic Collaboration",
      description: "Work together on innovative projects that drive mutual growth and success."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Expand your market presence through our extensive network and partnerships."
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Unlock new revenue streams and business opportunities through collaboration."
    },
    {
      icon: Users,
      title: "Shared Expertise",
      description: "Leverage combined knowledge and resources for better outcomes."
    }
  ];

  const partnershipTypes = [
    {
      title: "Technology Partners",
      description: "Integrate and co-develop cutting-edge technology solutions",
      features: ["Joint product development", "Technical integration", "Shared resources"]
    },
    {
      title: "Channel Partners",
      description: "Expand market reach through reseller and distributor networks",
      features: ["Sales channel expansion", "Market penetration", "Revenue sharing"]
    },
    {
      title: "Strategic Alliances",
      description: "Long-term partnerships for mutual business growth",
      features: ["Market expansion", "Resource sharing", "Joint ventures"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Our Partners"
        subtitle="Building strong partnerships to deliver exceptional value and innovation to our clients worldwide."
        breadcrumb="Partners"
      />

      {/* Partnership Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Partner With Us?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in the power of collaboration. Our partnerships are built on trust, innovation, and shared success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <Card key={index} className="card-modern text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Partnership Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer various partnership models to suit different business needs and objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <PartnersSection />

      {/* Call to Action */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="text-center">
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's explore how we can work together to create innovative solutions and drive mutual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partners-inquiry">
                <Button size="lg" className="btn-primary">
                  Partnership Inquiry <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="btn-secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
