
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText,
  Lightbulb,
  Settings,
  Shield,
  Zap,
  Users,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      articles: 8,
      color: "bg-gradient-to-br from-accent/10 to-primary/10"
    },
    {
      icon: <Settings className="h-6 w-6 text-accent" />,
      title: "Account & Billing",
      description: "Manage your account settings and payments",
      articles: 12,
      color: "bg-gradient-to-br from-primary/10 to-accent/10"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Security & Privacy",
      description: "Data protection and security features",
      articles: 6,
      color: "bg-gradient-to-br from-accent/10 to-primary/10"
    },
    {
      icon: <FileText className="h-6 w-6 text-accent" />,
      title: "API Documentation",
      description: "Integration guides and API references",
      articles: 15,
      color: "bg-gradient-to-br from-primary/10 to-accent/10"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Team Management",
      description: "User roles, permissions, and collaboration",
      articles: 10,
      color: "bg-gradient-to-br from-accent/10 to-primary/10"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-accent" />,
      title: "Best Practices",
      description: "Tips and tricks to maximize your success",
      articles: 7,
      color: "bg-gradient-to-br from-primary/10 to-accent/10"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with Civora Nexus services?",
      answer: "Getting started is simple! Contact our sales team for a consultation, and we'll assess your needs, provide a custom proposal, and guide you through the onboarding process. Most projects can begin within 1-2 weeks of contract signing."
    },
    {
      question: "What types of projects do you typically work on?",
      answer: "We specialize in AI solutions, SaaS development, cloud hosting, automation, and custom integrations. Our projects range from small automation scripts to large-scale enterprise digital transformations, primarily focusing on civic and healthcare technologies."
    },
    {
      question: "How do you ensure data security and compliance?",
      answer: "We implement enterprise-grade security measures including end-to-end encryption, regular security audits, ISO 27001 compliance, and GDPR/HIPAA compliance where applicable. All our systems are monitored 24/7 and we maintain strict data governance policies."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. Simple integrations may take 2-4 weeks, while complex AI solutions or full SaaS development can take 3-6 months. We provide detailed timelines during the proposal phase and maintain regular progress updates."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes! We offer comprehensive support packages including 24/7 monitoring, regular updates, bug fixes, and feature enhancements. Our support tiers range from basic email support to dedicated technical account management."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Absolutely! We specialize in custom integrations and have experience working with various platforms, APIs, and legacy systems. We conduct thorough system analysis to ensure seamless integration without disrupting your current operations."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer flexible pricing including fixed-price projects, time-and-materials, and retainer-based models. Pricing depends on project scope, complexity, and timeline. Contact our sales team for a detailed quote tailored to your specific needs."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! While we're based in India, we work with clients globally. We have experience navigating different time zones, compliance requirements, and cultural considerations to ensure successful international partnerships."
    }
  ];

  const popularArticles = [
    "Setting up your first AI automation",
    "API authentication and security best practices",
    "Choosing the right cloud hosting solution",
    "Data migration checklist and timeline",
    "Understanding our SLA and support levels"
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "Available 9 AM - 6 PM IST"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Get help via email",
      action: "Send Email",
      available: "Response within 24 hours"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      description: "Speak with an expert",
      action: "Call Now",
      available: "Mon-Fri, 9 AM - 6 PM IST"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="We're Here to Help"
        subtitle="Find answers to your questions, browse our knowledge base, or contact our support team for personalized assistance."
        breadcrumb="Support / Help Center"
      />

      {/* Search Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg input-modern"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">
              Find relevant articles and guides organized by topic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => (
              <Card key={index} className={`card-modern ${category.color} border-0 cursor-pointer hover:scale-105 transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft">
                      {category.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <Card className="card-modern mb-16">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 text-accent mr-2" />
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <span className="text-primary">{article}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index} className="card-modern">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-semibold text-primary pr-4">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronDown className="h-5 w-5 text-accent flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground">
              Our support team is ready to assist you with any questions or issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <Card key={index} className="card-modern text-center hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center">
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">{option.available}</p>
                  {option.title === "Email Support" ? (
                    <Link to="/support/technical-support">
                      <Button className="btn-primary">{option.action}</Button>
                    </Link>
                  ) : (
                    <Button className="btn-primary">{option.action}</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="card-modern inline-block">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-2">
                  For sales inquiries and new project discussions
                </p>
                <Link to="/contact/sales">
                  <Button variant="outline" className="btn-secondary">
                    Contact Sales Team
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
