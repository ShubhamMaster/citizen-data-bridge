
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Users, Mail, FileText } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      id: "information-collection",
      icon: <Eye className="w-6 h-6 text-accent" />,
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when you use our services, create an account, or contact us. This includes:`,
      details: [
        "Personal identification information (name, email address, phone number)",
        "Professional information when applying for positions or partnerships", 
        "Communication preferences and feedback",
        "Usage data and analytics to improve our services",
        "Technical information such as IP address, browser type, and device information"
      ]
    },
    {
      id: "information-use", 
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "2. How We Use Your Information",
      content: `We use the information we collect for legitimate business purposes, including:`,
      details: [
        "Provide, maintain, and improve our civic technology services",
        "Process job applications and communicate with candidates",
        "Send you technical notices, updates, and support messages",
        "Respond to your comments, questions, and customer service requests",
        "Analyze usage patterns to enhance user experience and service effectiveness",
        "Comply with legal obligations and protect our rights and interests"
      ]
    },
    {
      id: "information-sharing",
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "3. Information Sharing and Disclosure",
      content: `We respect your privacy and do not sell or rent your personal information. We may share information in the following circumstances:`,
      details: [
        "With your explicit consent for specific purposes",
        "With trusted service providers who assist in our operations (under strict confidentiality agreements)",
        "To comply with legal obligations, court orders, or government requests",
        "To protect the rights, property, or safety of Civora Nexus, our users, or others",
        "In connection with business transfers (mergers, acquisitions) with appropriate notice"
      ]
    },
    {
      id: "data-security",
      icon: <Lock className="w-6 h-6 text-accent" />,
      title: "4. Data Security and Protection",
      content: `We implement comprehensive security measures to protect your personal information:`,
      details: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and vulnerability assessments", 
        "Access controls limiting data access to authorized personnel only",
        "Secure development practices and regular security training",
        "Incident response procedures for potential security breaches",
        "Compliance with applicable data protection regulations and standards"
      ]
    },
    {
      id: "user-rights",
      icon: <FileText className="w-6 h-6 text-accent" />,
      title: "5. Your Rights and Choices",
      content: `You have important rights regarding your personal information:`,
      details: [
        "Access: Request copies of your personal information we hold",
        "Correction: Request correction of inaccurate or incomplete information",
        "Deletion: Request deletion of your personal information (subject to legal requirements)",
        "Portability: Request transfer of your data in a portable format",
        "Objection: Object to processing of your information for specific purposes",
        "Withdraw consent: Withdraw previously given consent at any time"
      ]
    },
    {
      id: "cookies-tracking",
      icon: <Eye className="w-6 h-6 text-accent" />,
      title: "6. Cookies and Tracking Technologies",
      content: `We use cookies and similar technologies to enhance your experience:`,
      details: [
        "Essential cookies for website functionality and security",
        "Analytics cookies to understand how you use our services",
        "Preference cookies to remember your settings and choices",
        "You can control cookie settings through your browser preferences",
        "Some features may not work properly if cookies are disabled"
      ]
    }
  ];

  const tableOfContents = sections.map(section => ({
    id: section.id,
    title: section.title
  }));

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Privacy Policy"
        subtitle="Your privacy is fundamental to our mission. Learn how we collect, use, and protect your information while delivering civic technology solutions."
        breadcrumb="Legal / Privacy Policy"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/terms">Terms of Service</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/compliance/accessibility">Accessibility</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Effective Date and Summary */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Important Notice</h3>
                    <p className="text-muted-foreground mb-4">
                      <strong>Effective Date:</strong> December 18, 2024 | <strong>Last Updated:</strong> December 18, 2024
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      This Privacy Policy describes how Civora Nexus Pvt. Ltd. ("we," "our," or "us") collects, uses, and protects 
                      your personal information when you use our website, services, or interact with us. By using our services, 
                      you acknowledge that you have read and understand this policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-accent" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tableOfContents.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className="text-accent hover:text-primary transition-colors duration-200 hover:underline p-2 rounded block"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Privacy Policy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} id={section.id} className="scroll-mt-20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-primary">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        {section.icon}
                      </div>
                      <span className="text-xl lg:text-2xl">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 lg:p-8">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                        {section.content}
                      </p>
                      
                      {section.details && (
                        <ul className="space-y-3 ml-4">
                          {section.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-3 text-muted-foreground">
                              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <Card className="mt-12 border-accent/20 bg-gradient-to-r from-accent/5 to-neon-blue/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Mail className="w-6 h-6 text-accent" />
                  Contact Us About Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, wish to exercise your rights, 
                    or need to report a privacy concern, please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Email</h4>
                      <a 
                        href="mailto:privacy@civoranexus.com" 
                        className="text-accent hover:text-primary transition-colors duration-200 hover:underline"
                      >
                        privacy@civoranexus.com
                      </a>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">General Contact</h4>
                      <a 
                        href="mailto:civoranexus@gmail.com" 
                        className="text-accent hover:text-primary transition-colors duration-200 hover:underline"
                      >
                        civoranexus@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted">
                    <p className="text-sm text-muted-foreground">
                      We will respond to your privacy-related inquiries within 30 days of receipt. 
                      For urgent matters, please indicate "URGENT" in your subject line.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default Privacy;
