
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Target, Users, Globe, Mail, FileText } from "lucide-react";

const Investors = () => {
  const investmentHighlights = [
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Market Opportunity",
      description: "Addressing the $50B+ global civic technology market with innovative AI-powered solutions",
      metrics: ["Growing at 15%+ CAGR", "Underserved market segments", "Government digitization trends"]
    },
    {
      icon: <Target className="w-8 h-8 text-neon-blue" />,
      title: "Unique Value Proposition",
      description: "First-mover advantage in AI-driven civic engagement and healthcare integration",
      metrics: ["Proprietary technology stack", "Strategic partnerships", "Scalable SaaS model"]
    },
    {
      icon: <Users className="w-8 h-8 text-neon-pink" />,
      title: "Experienced Team",
      description: "Leadership with proven track record in technology, government, and social impact",
      metrics: ["Combined 50+ years experience", "Previous successful exits", "Strong advisory board"]
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: "Social Impact",
      description: "Creating measurable positive impact while building a sustainable, profitable business",
      metrics: ["ESG-aligned returns", "Community outcomes", "Government partnerships"]
    }
  ];

  const fundingStages = [
    {
      stage: "Pre-Seed",
      status: "Current",
      description: "Initial funding to validate product-market fit and build core platform",
      focus: ["MVP development", "Market validation", "Team building", "Strategic partnerships"],
      timeline: "Q1 2025"
    },
    {
      stage: "Seed Round",
      status: "Planned",
      description: "Scale operations, expand product offerings, and accelerate customer acquisition",
      focus: ["Product scaling", "Market expansion", "Sales team", "Technology development"],
      timeline: "Q3 2025"
    },
    {
      stage: "Series A",
      status: "Future",
      description: "International expansion and comprehensive platform development",
      focus: ["Global markets", "Enterprise sales", "R&D expansion", "Strategic acquisitions"],
      timeline: "2026"
    }
  ];

  const keyMetrics = [
    { label: "Founded", value: "2024" },
    { label: "Market Size", value: "$50B+" },
    { label: "Target Industries", value: "3 Verticals" },
    { label: "Revenue Model", value: "SaaS + Services" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Investment Opportunity"
        subtitle="Join us in transforming civic engagement through innovative technology solutions that create both social impact and sustainable returns."
        breadcrumb="Company / Investors"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/contact/sales">Investment Inquiry</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="#pitch-deck">Download Pitch Deck</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Investment Overview */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-primary mb-4">Investment Thesis</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    Civora Nexus represents a unique opportunity to invest in the digital transformation of civic services, 
                    combining cutting-edge technology with meaningful social impact to address critical gaps in government-citizen engagement.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {keyMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Invest in Civora Nexus</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic advantages and growth drivers that position us for exceptional returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentHighlights.map((highlight, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {highlight.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Roadmap */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Funding Roadmap</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic funding stages aligned with growth milestones and market opportunities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {fundingStages.map((stage, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {index < fundingStages.length - 1 && (
                    <div className="absolute left-4 top-20 w-0.5 h-16 bg-accent/30"></div>
                  )}
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.status === 'Current' 
                          ? 'bg-accent text-white' 
                          : stage.status === 'Planned'
                          ? 'bg-accent/20 text-accent border-2 border-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">{stage.stage}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                              stage.status === 'Current' 
                                ? 'bg-green-100 text-green-800' 
                                : stage.status === 'Planned'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {stage.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-accent">{stage.timeline}</div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{stage.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {stage.focus.map((item, itemIndex) => (
                            <div key={itemIndex} className="px-3 py-1 bg-muted rounded text-sm text-center">
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Materials */}
      <section id="pitch-deck" className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Investment Materials</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access comprehensive information about our business model, market opportunity, and growth strategy
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">Investor Pitch Deck</h3>
                <p className="text-muted-foreground mb-6">
                  Comprehensive presentation covering our vision, market opportunity, business model, and financial projections.
                </p>
                <Button className="w-full" variant="outline">
                  Request Pitch Deck
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-purple/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">Financial Projections</h3>
                <p className="text-muted-foreground mb-6">
                  Detailed financial models, market analysis, and growth projections for serious investors.
                </p>
                <Button className="w-full" variant="outline">
                  Request Financial Data
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Investor Relations</h3>
                <p className="text-muted-foreground mb-6">
                  For detailed investment information, due diligence materials, or to schedule a meeting with our leadership team.
                </p>
                <div className="space-y-4">
                  <div>
                    <a 
                      href="mailto:investors@civoranexus.com" 
                      className="text-accent hover:text-primary transition-colors duration-200 hover:underline text-lg font-medium"
                    >
                      investors@civoranexus.com
                    </a>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    We respond to qualified investor inquiries within 48 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding-sm bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Partner With Us</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join us in building the future of civic technology. Together, we can create sustainable returns 
              while making a meaningful impact on communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact/sales">Schedule Investor Meeting</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/about-us">Learn More About Us</Link>
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

export default Investors;
