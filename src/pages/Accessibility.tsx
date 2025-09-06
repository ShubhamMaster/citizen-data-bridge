
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Users, Heart, Shield, Mail, CheckCircle } from "lucide-react";

const Accessibility = () => {
  const commitments = [
    {
      icon: <Eye className="w-8 h-8 text-accent" />,
      title: "Visual Accessibility",
      features: [
        "High contrast color combinations meeting WCAG 2.1 AA standards",
        "Scalable text that can be enlarged up to 200% without loss of functionality",
        "Alternative text for all meaningful images and graphics",
        "Clear visual focus indicators for keyboard navigation"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-neon-blue" />,
      title: "Keyboard & Motor Accessibility",
      features: [
        "Full keyboard navigation support for all interactive elements",
        "Consistent tab order and logical navigation flow",
        "Sufficient target sizes (minimum 44×44 pixels) for touch interfaces",
        "No time-based interactions that cannot be extended or disabled"
      ]
    },
    {
      icon: <Heart className="w-8 w-8 text-neon-pink" />,
      title: "Cognitive Accessibility",
      features: [
        "Clear, simple language at appropriate reading levels",
        "Consistent navigation and interface patterns",
        "Error messages that clearly explain how to fix problems",
        "Content organized with clear headings and logical structure"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Technical Standards",
      features: [
        "Semantic HTML markup for proper screen reader interpretation",
        "ARIA labels and descriptions where needed",
        "Valid, standards-compliant code",
        "Regular accessibility testing with assistive technologies"
      ]
    }
  ];

  const guidelines = [
    {
      standard: "WCAG 2.1 Level AA",
      description: "We follow the Web Content Accessibility Guidelines 2.1 at Level AA compliance",
      status: "Implemented"
    },
    {
      standard: "Section 508",
      description: "Our services comply with Section 508 standards for federal accessibility",
      status: "Implemented"
    },
    {
      standard: "ADA Compliance",
      description: "We strive for compliance with the Americans with Disabilities Act",
      status: "Ongoing"
    },
    {
      standard: "EN 301 549",
      description: "European standard for accessibility of ICT procurement",
      status: "Planned"
    }
  ];

  const tools = [
    "Screen readers (NVDA, JAWS, VoiceOver)",
    "Keyboard-only navigation testing",
    "Color contrast analyzers",
    "Automated accessibility scanning tools",
    "Manual testing by users with disabilities"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Accessibility Statement"
        subtitle="Civora Nexus is committed to ensuring digital accessibility for all users. We continuously work to improve our services and make them usable by everyone."
        breadcrumb="Legal / Accessibility"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary">
            <Link to="/contact">Report Accessibility Issue</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Commitment Overview */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Our Commitment to Accessibility</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At Civora Nexus, we believe that technology should be accessible to everyone, regardless of ability. 
                      Our civic technology solutions are designed with accessibility as a core principle, not an afterthought.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We are committed to providing an inclusive experience that enables all users to access information, 
                      navigate our services, and participate in civic engagement through our platforms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Accessibility Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We implement comprehensive accessibility features across all our digital services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center">
                    {commitment.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">{commitment.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {commitment.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Standards & Compliance</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We adhere to internationally recognized accessibility standards and guidelines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidelines.map((guideline, index) => (
                <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-primary">{guideline.standard}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        guideline.status === 'Implemented' 
                          ? 'bg-green-100 text-green-800' 
                          : guideline.status === 'Ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guideline.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{guideline.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testing & Quality Assurance */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Testing & Quality Assurance</h2>
              <p className="text-xl text-muted-foreground">
                We use multiple testing methods to ensure our accessibility features work effectively
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Testing Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tools.map((tool, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Improvements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Accessibility is an ongoing effort. We regularly:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      Conduct regular accessibility audits
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      Gather user feedback from the disability community
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      Update our practices based on new standards
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      Train our team on accessibility best practices
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback & Support */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Mail className="w-6 h-6 text-accent" />
                  Report Accessibility Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  We welcome feedback about the accessibility of our services. If you encounter any barriers 
                  or have suggestions for improvement, please let us know:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Accessibility Team</h4>
                    <a 
                      href="mailto:accessibility@civoranexus.com" 
                      className="text-accent hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      accessibility@civoranexus.com
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">General Support</h4>
                    <a 
                      href="mailto:civoranexus@gmail.com" 
                      className="text-accent hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      civoranexus@gmail.com
                    </a>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-6 border border-accent/10">
                  <h4 className="font-semibold text-primary mb-3">When reporting issues, please include:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                      The specific page or feature where you encountered the issue
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                      Description of the accessibility barrier
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                      The assistive technology you were using (if applicable)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                      Your browser and operating system
                    </li>
                  </ul>
                </div>

                <div className="text-center pt-4">
                  <Button asChild className="btn-primary">
                    <Link to="/contact">Contact Our Accessibility Team</Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center border-t border-muted pt-4">
                  We aim to respond to accessibility feedback within 5 business days and will work with you 
                  to address any issues as quickly as possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accessibility;
