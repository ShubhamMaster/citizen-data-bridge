
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SaveHereSection from "@/components/SaveHereSection";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Database, Zap, Shield, TrendingUp, Code, Lock, Globe } from "lucide-react";

export default function SaaSDevelopment() {
  const valueProps = [
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Infinite Scalability",
      description: "Built on cloud-native architecture that grows with your business, handling millions of users seamlessly."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Automatic Updates",
      description: "Zero-downtime deployments and continuous maintenance ensure your SaaS is always current and secure."
    },
    {
      icon: <Database className="h-8 w-8 text-accent" />,
      title: "Flexible Subscriptions",
      description: "Multiple pricing tiers, usage-based billing, and automated subscription management built-in."
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
      description: "Modern, responsive user interfaces with exceptional performance"
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Python/Django", "PostgreSQL", "Redis"],
      description: "Robust server architecture with real-time capabilities"
    },
    {
      category: "Infrastructure",
      technologies: ["Docker", "Kubernetes", "AWS/GCP", "CI/CD"],
      description: "Containerized deployment with auto-scaling and monitoring"
    }
  ];

  const processSteps = [
    { title: "Strategic Planning", description: "Market research, user personas, and technical architecture design" },
    { title: "MVP Development", description: "Core features development with rapid prototyping and user feedback" },
    { title: "CI/CD Pipeline", description: "Automated testing, deployment, and monitoring infrastructure setup" },
    { title: "Quality Assurance", description: "Comprehensive testing including security, performance, and usability" },
    { title: "Launch & Scale", description: "Production deployment with monitoring, analytics, and growth optimization" },
    { title: "Ongoing Support", description: "24/7 monitoring, updates, feature enhancements, and technical support" }
  ];

  const compliance = [
    { name: "GDPR", description: "European data protection compliance" },
    { name: "HIPAA", description: "Healthcare data security standards" },
    { name: "SOC 2", description: "Security and availability controls" },
    { name: "ISO 27001", description: "Information security management" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Build Scalable SaaS Products with Confidence"
        subtitle="Transform your innovative ideas into robust, scalable Software-as-a-Service platforms that delight users and drive recurring revenue growth."
        breadcrumb="Services / SaaS Development"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button className="btn-primary" size="lg">
            Start Your SaaS Project
          </Button>
          <Button variant="outline" className="btn-secondary" size="lg">
            View SaaS Portfolio
          </Button>
        </div>
      </UniformHeroSection>

      {/* Value Propositions */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Our SaaS Development?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We build enterprise-grade SaaS applications that scale effortlessly and deliver exceptional user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <Card key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                    {prop.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern, proven technologies that ensure your SaaS platform is fast, secure, and maintainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-3">
                    <Code className="h-6 w-6 text-accent" />
                    {stack.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{stack.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful SaaS delivery from concept to market leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-neon-blue rounded-full flex items-center justify-center mb-4 text-white font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Security & Compliance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade security measures and compliance standards built into every SaaS application we develop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((item, index) => (
              <Card key={index} className="card-modern p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-success/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-accent/5 to-neon-blue/5 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-4">Additional Security Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Automated backups</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Global CDN deployment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Real-time monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Performance optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Build Your SaaS Platform?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your business idea into a scalable SaaS solution that generates recurring revenue and delights customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" size="lg">
                Start Your SaaS Project
              </Button>
              <Button variant="outline" className="btn-secondary" size="lg">
                Get Technical Consultation
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
