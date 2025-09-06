
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import SaveHereSection from '@/components/SaveHereSection';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, FileText, Users, Lock, Mail, AlertCircle, Scale } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      id: "acceptance",
      icon: <FileText className="w-6 h-6 text-accent" />,
      title: "1. Acceptance of Terms",
      content: `By accessing and using the Civora Nexus website, services, and related applications ("Services"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these terms, please discontinue use of our Services immediately.`,
      details: [
        "These Terms apply to all users, including visitors, registered users, and business partners",
        "Your continued use of our Services constitutes acceptance of any updated Terms",
        "Additional terms may apply to specific services and will be presented when relevant"
      ]
    },
    {
      id: "services-description",
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "2. Description of Services",
      content: `Civora Nexus provides civic technology solutions, including but not limited to:`,
      details: [
        "Digital platforms for government and citizen engagement",
        "Healthcare technology solutions and integrations", 
        "AI-powered automation tools for public services",
        "SaaS applications for community management",
        "Custom integrations and consulting services",
        "Career opportunities and internship programs"
      ]
    },
    {
      id: "user-obligations",
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "3. User Obligations and Conduct",
      content: `When using our Services, you agree to:`,
      details: [
        "Provide accurate, current, and complete information",
        "Maintain the security of your account credentials",
        "Use our Services only for lawful purposes and in accordance with these Terms",
        "Respect intellectual property rights of Civora Nexus and third parties",
        "Not engage in any activity that could harm or disrupt our Services",
        "Comply with all applicable laws and regulations"
      ]
    },
    {
      id: "intellectual-property",
      icon: <Lock className="w-6 h-6 text-accent" />,
      title: "4. Intellectual Property Rights",
      content: `All content, features, and functionality of our Services are owned by Civora Nexus and are protected by intellectual property laws:`,
      details: [
        "Our website content, software, and technology are proprietary to Civora Nexus",
        "You may not copy, modify, distribute, or create derivative works without permission",
        "User-generated content remains your property, but you grant us necessary licenses to provide Services",
        "We respect third-party intellectual property and expect users to do the same",
        "Report any suspected intellectual property violations to us immediately"
      ]
    },
    {
      id: "privacy-data",
      icon: <Lock className="w-6 h-6 text-accent" />,
      title: "5. Privacy and Data Protection",
      content: `Your privacy is important to us. Our data practices are governed by our Privacy Policy:`,
      details: [
        "We collect and process personal information as described in our Privacy Policy",
        "We implement appropriate security measures to protect your data",
        "You have rights regarding your personal information under applicable data protection laws",
        "We may use aggregated, non-personal data for business analytics and improvement",
        "Third-party integrations are subject to their respective privacy policies"
      ]
    },
    {
      id: "disclaimers",
      icon: <AlertCircle className="w-6 h-6 text-accent" />,
      title: "6. Disclaimers and Limitations",
      content: `Our Services are provided "as is" and "as available" without warranties of any kind:`,
      details: [
        "We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose",
        "We do not guarantee uninterrupted or error-free operation of our Services",
        "We are not liable for any indirect, incidental, special, or consequential damages",
        "Our total liability is limited to the amount paid by you for our Services in the preceding 12 months",
        "Some jurisdictions may not allow these limitations, so they may not apply to you"
      ]
    },
    {
      id: "termination",
      icon: <AlertCircle className="w-6 h-6 text-accent" />,
      title: "7. Termination",
      content: `Either party may terminate the use of Services under certain conditions:`,
      details: [
        "You may stop using our Services at any time",
        "We may suspend or terminate your access for violations of these Terms",
        "We may discontinue Services with reasonable notice",
        "Upon termination, your right to use our Services ceases immediately",
        "Provisions that should survive termination will remain in effect"
      ]
    },
    {
      id: "governing-law",
      icon: <Scale className="w-6 h-6 text-accent" />,
      title: "8. Governing Law and Dispute Resolution",
      content: `These Terms and any disputes arising from them are governed by Indian law:`,
      details: [
        "These Terms are governed by and construed in accordance with the laws of India",
        "Any disputes will be subject to the exclusive jurisdiction of courts in Maharashtra, India",
        "We encourage informal resolution of disputes through direct communication",
        "If formal proceedings are necessary, they will be conducted in English",
        "You waive any right to participate in class action lawsuits against us"
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
        title="Terms of Service"
        subtitle="Please read these terms and conditions carefully before using our services. Your trust and transparency are fundamental to our relationship."
        breadcrumb="Legal / Terms of Service"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/privacy">Privacy Policy</Link>
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
                    <h3 className="text-xl font-semibold text-primary mb-2">Important Legal Notice</h3>
                    <p className="text-muted-foreground mb-4">
                      <strong>Effective Date:</strong> December 18, 2024 | <strong>Last Updated:</strong> December 18, 2024
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms of Service constitute a legally binding agreement between you and Civora Nexus Pvt. Ltd. 
                      By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                      Please contact us if you have any questions before proceeding.
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

            {/* Terms Sections */}
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
                  Questions About These Terms?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, need clarification on any provisions, 
                    or wish to discuss specific use cases, please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Legal Inquiries</h4>
                      <a 
                        href="mailto:legal@civoranexus.com" 
                        className="text-accent hover:text-primary transition-colors duration-200 hover:underline"
                      >
                        legal@civoranexus.com
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
                      We will respond to your legal inquiries within 7 business days. For urgent matters requiring 
                      immediate attention, please indicate "URGENT" in your subject line.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates Notice */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Updates to These Terms</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We may update these Terms of Service from time to time to reflect changes in our services or legal requirements. 
                      We will notify users of significant changes via email or prominent notice on our website. 
                      Your continued use of our Services after such notice constitutes acceptance of the updated terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <SaveHereSection /> */}
      <Footer />
    </div>
  );
};

export default Terms;
