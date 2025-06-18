
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SaveHereSection from "@/components/SaveHereSection";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BarChart3, Zap, Eye, MessageCircle, Target, TrendingUp, Shield } from "lucide-react";

export default function AISolutions() {
  const benefits = [
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Predictive Analytics",
      description: "Harness data patterns to forecast trends, optimize resources, and make informed business decisions with 95% accuracy."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Intelligent Automation",
      description: "Automate complex workflows and decision-making processes, reducing manual effort by up to 80%."
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Hyper-Personalization",
      description: "Deliver tailored experiences to every user through advanced ML algorithms and behavioral analysis."
    }
  ];

  const techCapabilities = [
    {
      title: "Natural Language Processing",
      description: "Advanced text analysis, sentiment detection, and language understanding for chatbots and content processing.",
      tags: ["NLP", "Sentiment Analysis", "Text Processing"]
    },
    {
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual analytics for quality control and security applications.",
      tags: ["Image Recognition", "Object Detection", "Visual Analytics"]
    },
    {
      title: "Intelligent Chatbots",
      description: "Context-aware conversational AI that understands intent and provides human-like interactions.",
      tags: ["Conversational AI", "Intent Recognition", "Multi-language"]
    }
  ];

  const processSteps = [
    { step: "01", title: "Discover", description: "Analyze your business needs and identify AI opportunities" },
    { step: "02", title: "Prototype", description: "Build and test AI models with your specific data and requirements" },
    { step: "03", title: "Deploy", description: "Seamlessly integrate AI solutions into your existing systems" },
    { step: "04", title: "Scale", description: "Optimize performance and expand AI capabilities across your organization" }
  ];

  const caseStudies = [
    {
      title: "E-commerce Personalization Engine",
      industry: "Retail",
      result: "35% increase in conversion rates",
      description: "Implemented ML-driven product recommendations resulting in higher customer engagement and sales."
    },
    {
      title: "Predictive Maintenance System",
      industry: "Manufacturing",
      result: "60% reduction in downtime",
      description: "AI-powered equipment monitoring that predicts failures before they occur."
    },
    {
      title: "Customer Service Automation",
      industry: "Healthcare",
      result: "50% faster response times",
      description: "Intelligent chatbot handling 80% of customer inquiries with human-level accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="AI-Driven Transformation for Your Business"
        subtitle="Unlock the power of artificial intelligence to automate processes, gain insights, and drive unprecedented growth with our cutting-edge AI solutions."
        breadcrumb="Services / AI Solutions"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button className="btn-primary" size="lg">
            Schedule a Consultation
          </Button>
          <Button variant="outline" className="btn-secondary" size="lg">
            View Case Studies
          </Button>
        </div>
      </UniformHeroSection>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Our AI Solutions?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your business operations with AI technologies that deliver measurable results and competitive advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Capabilities */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our AI Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging cutting-edge AI technologies to build intelligent solutions that drive business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techCapabilities.map((tech, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our AI Implementation Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful AI integration from concept to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-neon-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from our AI implementations across various industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-accent border-accent">{study.industry}</Badge>
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <CardTitle className="text-lg text-primary">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-success">{study.result}</div>
                  <p className="text-muted-foreground">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how our AI solutions can drive innovation, efficiency, and growth for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" size="lg">
                Schedule a Consultation
              </Button>
              <Button variant="outline" className="btn-secondary" size="lg">
                Download AI Strategy Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
}
