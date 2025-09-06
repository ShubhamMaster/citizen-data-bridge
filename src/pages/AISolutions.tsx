
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, BarChart3, Shield, Cpu, Database, Eye, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

const AISolutions = () => {
  const aiServices = [
    {
      icon: Brain,
      title: "Machine Learning Solutions",
      description: "Custom ML models for predictive analytics, classification, and pattern recognition",
      features: ["Predictive Analytics", "Classification Models", "Recommendation Systems", "Anomaly Detection"]
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Advanced image and video analysis for automated visual intelligence",
      features: ["Image Recognition", "Object Detection", "OCR Solutions", "Video Analytics"]
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Extract insights from text data and enable intelligent conversation",
      features: ["Text Analysis", "Chatbots", "Language Translation", "Sentiment Analysis"]
    },
    {
      icon: Database,
      title: "Data Analytics & Intelligence",
      description: "Transform raw data into actionable business intelligence",
      features: ["Business Intelligence", "Data Visualization", "Real-time Analytics", "Performance Dashboards"]
    },
    {
      icon: Shield,
      title: "AI-Powered Security",
      description: "Intelligent security solutions for threat detection and prevention",
      features: ["Fraud Detection", "Threat Analysis", "Risk Assessment", "Behavioral Analytics"]
    },
    {
      icon: Cpu,
      title: "Process Automation",
      description: "Automate complex business processes with intelligent AI workflows",
      features: ["Workflow Automation", "Document Processing", "Decision Trees", "Smart Routing"]
    }
  ];

  const useCases = [
    {
      industry: "Healthcare",
      title: "Diagnostic AI Assistant",
      description: "AI-powered diagnostic tools that assist medical professionals in making accurate diagnoses",
      impact: "45% faster diagnosis, 92% accuracy rate"
    },
    {
      industry: "Finance",
      title: "Fraud Detection System",
      description: "Real-time fraud detection using machine learning to protect financial transactions",
      impact: "60% reduction in fraud losses"
    },
    {
      industry: "Retail",
      title: "Personalization Engine",
      description: "AI-driven product recommendations and personalized shopping experiences",
      impact: "35% increase in conversion rates"
    },
    {
      industry: "Manufacturing",
      title: "Predictive Maintenance",
      description: "IoT and AI integration for predicting equipment failures before they occur",
      impact: "40% reduction in downtime"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and optimize business processes"
    },
    {
      icon: Target,
      title: "Better Decision Making",
      description: "Data-driven insights for strategic business decisions"
    },
    {
      icon: Zap,
      title: "Competitive Advantage",
      description: "Stay ahead with cutting-edge AI technology"
    },
    {
      icon: BarChart3,
      title: "Scalable Solutions",
      description: "AI systems that grow with your business needs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="AI Solutions"
        subtitle="Transform your business with intelligent AI solutions designed to optimize operations, enhance decision-making, and drive innovation."
        breadcrumb="Services / AI Solutions"
      />

      {/* AI Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Our AI Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive AI solutions tailored to your specific business needs and industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map((service, index) => (
              <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">AI Use Cases</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how our AI solutions are transforming businesses across different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{useCase.industry}</Badge>
                    <Badge variant="secondary" className="text-accent">
                      {useCase.impact}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
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
            <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Our AI Solutions?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI solutions deliver measurable business value through innovation and intelligent automation.
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

      {/* CTA Section */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can help you achieve your business objectives and drive innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation">
                <Button size="lg" className="btn-primary">
                  Schedule Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/ai-consultation">
                <Button size="lg" variant="outline" className="btn-secondary">
                  AI Consultation
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

export default AISolutions;
