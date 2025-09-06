
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Users, Rocket, Code, Brain, Target, ArrowRight, Zap, Star, Trophy } from 'lucide-react';

const InnovationLab = () => {
  const labFocus = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Exploring the frontiers of AI and machine learning",
      projects: ["Neural Network Optimization", "Computer Vision Research", "NLP Advancements"]
    },
    {
      icon: Code,
      title: "Emerging Technologies",
      description: "Experimenting with cutting-edge development frameworks",
      projects: ["Quantum Computing", "Blockchain Applications", "IoT Innovation"]
    },
    {
      icon: Rocket,
      title: "Product Innovation",
      description: "Rapid prototyping and proof-of-concept development",
      projects: ["MVP Development", "Technology Validation", "Market Testing"]
    },
    {
      icon: Users,
      title: "Collaborative Research",
      description: "Cross-functional teams working on breakthrough solutions",
      projects: ["Open Source Contributions", "Academic Partnerships", "Industry Collaboration"]
    }
  ];

  const currentProjects = [
    {
      title: "Smart City Analytics Platform",
      description: "Real-time urban data analysis using IoT sensors and AI",
      status: "In Development",
      technologies: ["IoT", "Machine Learning", "Real-time Analytics"]
    },
    {
      title: "Healthcare AI Assistant",
      description: "AI-powered diagnostic support system for medical professionals",
      status: "Beta Testing",
      technologies: ["Natural Language Processing", "Computer Vision", "Medical AI"]
    },
    {
      title: "Sustainable Tech Initiative",
      description: "Green technology solutions for environmental challenges",
      status: "Research Phase",
      technologies: ["Clean Energy", "Environmental Monitoring", "Sustainability"]
    }
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: "Innovation Culture",
      description: "Foster creativity and experimentation in a collaborative environment"
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Quick iteration cycles to validate ideas and concepts"
    },
    {
      icon: Target,
      title: "Market Validation",
      description: "Test and refine solutions with real-world feedback"
    },
    {
      icon: Trophy,
      title: "Industry Recognition",
      description: "Showcase innovative solutions and gain industry recognition"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Innovation Lab"
        subtitle="Where brilliant minds collaborate to create the future. Join our community of innovators, researchers, and visionaries."
        breadcrumb="Innovation Lab"
      />

      {/* Lab Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our Innovation Lab is a creative space where technology meets imagination. We explore emerging technologies, 
              develop breakthrough solutions, and push the boundaries of what's possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {labFocus.map((focus, index) => (
              <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <focus.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{focus.title}</CardTitle>
                      <CardDescription>{focus.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Current Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {focus.projects.map((project, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Current Projects</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Take a look at some of the innovative projects currently being developed in our lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.status}</Badge>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Innovation Lab?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our Innovation Lab provides the perfect environment for breakthrough thinking and collaborative development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
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

      {/* Call to Action */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="text-center">
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to Innovate?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our Innovation Lab and be part of creating the next generation of technological breakthroughs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-innovation-lab">
                <Button size="lg" className="btn-primary">
                  Join Innovation Lab <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="btn-secondary">
                  Learn More
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

export default InnovationLab;
