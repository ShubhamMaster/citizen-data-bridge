
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SaveHereSection from "@/components/SaveHereSection";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Cloud, Zap, Globe, Database, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const featuredProjects = [
    {
      title: "Smart Village Platform",
      description: "AI-powered civic engagement platform connecting rural communities with digital services and government resources.",
      tags: ["AI", "Civic Tech", "Community"],
      image: "/api/placeholder/400/250",
      status: "Live",
      impact: "10,000+ citizens served"
    },
    {
      title: "CivicOne Dashboard",
      description: "Comprehensive municipal management system with real-time analytics and citizen service tracking.",
      tags: ["Dashboard", "Analytics", "SaaS"],
      image: "/api/placeholder/400/250",
      status: "Beta",
      impact: "5 municipalities onboarded"
    },
    {
      title: "HealthBridge Integration",
      description: "Seamless healthcare data integration platform connecting hospitals, clinics, and patient records.",
      tags: ["Healthcare", "Integration", "Security"],
      image: "/api/placeholder/400/250",
      status: "Development",
      impact: "HIPAA compliant architecture"
    }
  ];

  const projectTypes = [
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "AI-Powered Solutions",
      description: "Machine learning applications that automate processes and provide intelligent insights",
      count: "12+ Projects"
    },
    {
      icon: <Cloud className="h-8 w-8 text-accent" />,
      title: "SaaS Platforms",
      description: "Scalable software-as-a-service applications built for modern businesses",
      count: "8+ Projects"
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Civic Technology",
      description: "Digital solutions that improve government services and citizen engagement",
      count: "15+ Projects"
    },
    {
      icon: <Database className="h-8 w-8 text-accent" />,
      title: "Data Integration",
      description: "Complex system integrations that connect disparate data sources",
      count: "20+ Projects"
    }
  ];

  const projectStats = [
    { label: "Active Projects", value: "25+" },
    { label: "Happy Clients", value: "50+" },
    { label: "Lines of Code", value: "1M+" },
    { label: "Uptime", value: "99.9%" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Explore Our Innovations"
        subtitle="Discover the cutting-edge projects that showcase our expertise in AI, SaaS development, and civic technology. Each solution is crafted to solve real-world challenges and drive meaningful impact."
        breadcrumb="Projects"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/projects/case-studies">See Case Studies</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Project Stats */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our most impactful projects that demonstrate our commitment to innovation and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={project.status === 'Live' ? 'default' : project.status === 'Beta' ? 'secondary' : 'outline'}
                      className={project.status === 'Live' ? 'bg-success text-white' :
                                project.status === 'Beta' ? 'bg-warning text-white' : 
                                'bg-muted text-muted-foreground'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impact</span>
                      <span className="text-sm font-medium text-primary">{project.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What We Build</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse portfolio spans multiple technologies and industries, each designed to create lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectTypes.map((type, index) => (
              <Card key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{type.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                  <Badge variant="outline" className="text-accent border-accent">
                    {type.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Technology Focus</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable, and secure solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-modern p-8 text-center">
              <CardContent className="space-y-6">
                <Shield className="h-12 w-12 text-accent mx-auto" />
                <h3 className="text-xl font-semibold text-primary">Security First</h3>
                <p className="text-muted-foreground">
                  Every project is built with security at its core, ensuring data protection and compliance with industry standards.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">GDPR</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">HIPAA</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">SOC 2</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern p-8 text-center">
              <CardContent className="space-y-6">
                <Zap className="h-12 w-12 text-accent mx-auto" />
                <h3 className="text-xl font-semibold text-primary">Performance Optimized</h3>
                <p className="text-muted-foreground">
                  Our applications are designed for speed and efficiency, delivering exceptional user experiences at scale.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">CDN</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Caching</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Optimization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern p-8 text-center">
              <CardContent className="space-y-6">
                <Globe className="h-12 w-12 text-accent mx-auto" />
                <h3 className="text-xl font-semibold text-primary">Global Scale</h3>
                <p className="text-muted-foreground">
                  Built for worldwide deployment with multi-region support and localization capabilities.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Multi-region</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">i18n</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Auto-scaling</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Build Your Next Project?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's collaborate to create innovative solutions that drive your business forward and make a lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/projects/case-studies">Read Case Studies</Link>
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

export default Projects;
