import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import UniformHeroSection from "@/components/UniformHeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { 
  Building2, Users, Briefcase, Globe, Phone, Mail, 
  FileText, Shield, Award, Lightbulb, Target, Handshake,
  MessageSquare, HelpCircle, Search, Book
} from "lucide-react";

const Help = () => {
  const websiteSections = [
    {
      title: "Company Information",
      icon: <Building2 className="h-5 w-5" />,
      links: [
        { label: "About Us", href: ROUTES.about, description: "Learn about our company history and mission" },
        { label: "Leadership", href: ROUTES.leadership, description: "Meet our executive team and leaders" },
        { label: "Board of Directors", href: ROUTES.boardOfDirectors, description: "Our board members and advisors" },
        { label: "Partners", href: ROUTES.partners, description: "Strategic partnerships and collaborations" },
        { label: "Investors", href: ROUTES.investors, description: "Information for current and potential investors" },
      ]
    },
    {
      title: "Services & Solutions",
      icon: <Target className="h-5 w-5" />,
      links: [
        { label: "Services Overview", href: ROUTES.services, description: "Complete overview of our service offerings" },
        { label: "AI Solutions", href: ROUTES.aiSolutions, description: "Artificial intelligence and machine learning services" },
        { label: "SaaS Development", href: ROUTES.saasDevelopment, description: "Software as a Service development solutions" },
        { label: "Custom Integrations", href: ROUTES.customIntegrations, description: "Tailored integration solutions for your business" },
        { label: "Automation", href: ROUTES.automation, description: "Business process automation services" },
        { label: "Cloud Hosting", href: ROUTES.cloudHosting, description: "Secure and scalable cloud hosting solutions" },
      ]
    },
    {
      title: "Innovation & Research",
      icon: <Lightbulb className="h-5 w-5" />,
      links: [
        { label: "Innovation Lab", href: ROUTES.innovationLab, description: "Our research and development initiatives" },
        { label: "R&D", href: ROUTES.rnd, description: "Research and development projects" },
        { label: "AI Research", href: ROUTES.aiResearch, description: "Cutting-edge AI research and development" },
        { label: "Patents", href: ROUTES.patents, description: "Our intellectual property portfolio" },
        { label: "Join Innovation Lab", href: ROUTES.joinInnovationLab, description: "Become part of our innovation team" },
      ]
    },
    {
      title: "Projects & Success Stories",
      icon: <Award className="h-5 w-5" />,
      links: [
        { label: "Projects", href: ROUTES.projects, description: "Portfolio of our completed and ongoing projects" },
        { label: "Case Studies", href: ROUTES.caseStudies, description: "Detailed case studies of successful implementations" },
        { label: "Client Success Stories", href: ROUTES.clientSuccessStories, description: "Testimonials and success stories from clients" },
      ]
    },
    {
      title: "Careers & Opportunities",
      icon: <Users className="h-5 w-5" />,
      links: [
        { label: "Careers", href: ROUTES.careers, description: "Career opportunities and company culture" },
        { label: "Job Openings", href: ROUTES.jobsOpening, description: "Current job opportunities and how to apply" },
        { label: "Life at Civora", href: ROUTES.lifeAtCivora, description: "What it's like to work at Civora Nexus" },
        { label: "Internships", href: ROUTES.internships, description: "Internship programs and opportunities" },
      ]
    },
    {
      title: "Contact & Inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      links: [
        { label: "Contact Us", href: ROUTES.contact, description: "Get in touch with our team" },
        { label: "Sales Inquiry", href: ROUTES.salesInquiry, description: "Sales and business inquiries" },
        { label: "Investment Inquiry", href: ROUTES.investmentInquiry, description: "Investment opportunities and partnerships" },
        { label: "Partners Inquiry", href: ROUTES.partnersInquiry, description: "Partnership opportunities and collaborations" },
        { label: "Project Inquiry", href: ROUTES.projectInquiry, description: "Project consultation and development inquiries" },
      ]
    },
    {
      title: "Legal & Compliance",
      icon: <Shield className="h-5 w-5" />,
      links: [
        { label: "Privacy Policy", href: ROUTES.privacy, description: "How we protect and handle your data" },
        { label: "Terms & Conditions", href: ROUTES.terms, description: "Terms of service and usage agreements" },
        { label: "Accessibility", href: ROUTES.accessibility, description: "Our commitment to web accessibility" },
        { label: "Data Security", href: ROUTES.dataSecurity, description: "Information about our security practices" },
        { label: "ISO Certifications", href: ROUTES.iso, description: "Our quality and security certifications" },
      ]
    }
  ];

  const faqs = [
    {
      question: "What services does Civora Nexus offer?",
      answer: "We offer a comprehensive range of technology services including AI solutions, SaaS development, custom integrations, automation, cloud hosting, and technical consultation. Visit our Services page for detailed information about each offering."
    },
    {
      question: "How can I apply for a job at Civora Nexus?",
      answer: "You can view all current job openings on our Job Openings page. Each listing includes detailed requirements and an application form. We encourage you to also check out our Life at Civora page to learn more about our culture."
    },
    {
      question: "How do I start a project with Civora Nexus?",
      answer: "The best way to start is by filling out our Project Inquiry form. This helps us understand your needs and requirements. Our team will then reach out to discuss your project in detail and provide a customized proposal."
    },
    {
      question: "What makes Civora Nexus different from other tech companies?",
      answer: "We combine cutting-edge technology with a focus on innovation and client success. Our Innovation Lab drives continuous research and development, while our experienced team ensures high-quality delivery. We're also committed to corporate responsibility and sustainable practices."
    },
    {
      question: "Do you offer internship programs?",
      answer: "Yes, we offer various internship programs throughout the year. Visit our Internships page to learn about current opportunities, application requirements, and what you can expect from our internship experience."
    },
    {
      question: "How can I become a partner with Civora Nexus?",
      answer: "We're always looking for strategic partnerships. Fill out our Partners Inquiry form to tell us about your organization and how we might collaborate. Our partnership team will review your submission and reach out if there's a potential fit."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <UniformHeroSection 
          title="Help Center"
          subtitle="Find everything you need to know about Civora Nexus - from services to careers, projects to partnerships"
        />
        
        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* Quick Actions */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
                <Link to={ROUTES.contact}>
                  <Phone className="h-6 w-6" />
                  <span>Contact Us</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
                <Link to={ROUTES.jobsOpening}>
                  <Briefcase className="h-6 w-6" />
                  <span>View Jobs</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
                <Link to={ROUTES.projectInquiry}>
                  <MessageSquare className="h-6 w-6" />
                  <span>Start Project</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
                <Link to={ROUTES.services}>
                  <Globe className="h-6 w-6" />
                  <span>Our Services</span>
                </Link>
              </Button>
            </div>
          </section>

          {/* Website Sections */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Website Sections</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {websiteSections.map((section, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="border-l-2 border-primary/20 pl-4">
                          <Link 
                            to={link.href} 
                            className="block hover:text-primary transition-colors group"
                          >
                            <div className="font-medium group-hover:underline">{link.label}</div>
                            <div className="text-sm text-muted-foreground mt-1">{link.description}</div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-muted/30 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Our team is here to help.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get detailed help via email
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={ROUTES.contact}>Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Sales Inquiry</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Questions about our services
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={ROUTES.salesInquiry}>Ask Sales</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Briefcase className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Project Consultation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discuss your project needs
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={ROUTES.projectInquiry}>Start Project</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Help;