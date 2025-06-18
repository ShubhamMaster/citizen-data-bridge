
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Smart Village Digital Transformation",
      client: "Rural Development Authority",
      industry: "Government",
      duration: "8 months",
      teamSize: "6 developers",
      image: "/api/placeholder/600/400",
      challenge: "Remote rural communities lacked access to essential government services, resulting in citizens traveling long distances for basic administrative tasks. Manual processes led to delays and inefficiencies.",
      solution: "We developed a comprehensive digital platform that brings government services directly to citizens through mobile-first design, offline capabilities, and multilingual support. The platform includes citizen portals, admin dashboards, and automated workflow management.",
      technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "AI/ML"],
      results: [
        { metric: "Citizen Satisfaction", value: "95%", improvement: "+40%" },
        { metric: "Service Processing Time", value: "2 hours", improvement: "-85%" },
        { metric: "Digital Adoption Rate", value: "78%", improvement: "New metric" },
        { metric: "Cost Reduction", value: "$2.5M", improvement: "-60%" }
      ],
      testimonial: {
        quote: "Civora Nexus transformed how we serve our rural communities. The platform's intuitive design and robust functionality exceeded our expectations.",
        author: "Sarah Johnson",
        role: "Director of Digital Services",
        company: "Rural Development Authority"
      },
      keyFeatures: [
        "Multi-language support for 5 regional languages",
        "Offline-first architecture for areas with poor connectivity",
        "AI-powered document processing and verification",
        "Real-time analytics and reporting dashboard",
        "Mobile-responsive design with PWA capabilities"
      ]
    },
    {
      title: "Healthcare Integration Platform",
      client: "MedConnect Network",
      industry: "Healthcare",
      duration: "12 months",
      teamSize: "8 developers",
      image: "/api/placeholder/600/400",
      challenge: "Healthcare providers struggled with fragmented patient data across multiple systems, leading to inefficient care coordination and potential medical errors. No unified view of patient history existed.",
      solution: "Built a HIPAA-compliant integration platform that securely connects disparate healthcare systems, providing healthcare professionals with a unified patient view while maintaining strict data privacy and security standards.",
      technologies: ["Next.js", "Python", "FHIR", "Azure", "Docker", "Kubernetes"],
      results: [
        { metric: "Data Integration Speed", value: "Real-time", improvement: "+100%" },
        { metric: "Medical Errors", value: "0.1%", improvement: "-75%" },
        { metric: "Care Coordination Time", value: "15 min", improvement: "-70%" },
        { metric: "Provider Satisfaction", value: "92%", improvement: "+35%" }
      ],
      testimonial: {
        quote: "The platform has revolutionized how we access and share patient information. Care quality has improved significantly.",
        author: "Dr. Michael Chen",
        role: "Chief Medical Officer",
        company: "MedConnect Network"
      },
      keyFeatures: [
        "FHIR-compliant data exchange standards",
        "End-to-end encryption for all patient data",
        "Real-time notification system for critical updates",
        "Comprehensive audit logging and compliance reporting",
        "Role-based access control with fine-grained permissions"
      ]
    },
    {
      title: "E-commerce Analytics Platform",
      client: "RetailTech Solutions",
      industry: "E-commerce",
      duration: "6 months",
      teamSize: "5 developers",
      image: "/api/placeholder/600/400",
      challenge: "Growing e-commerce company needed advanced analytics to understand customer behavior, optimize inventory, and improve conversion rates. Existing tools provided limited insights and poor integration.",
      solution: "Developed a comprehensive analytics platform with real-time data processing, predictive analytics, and intuitive dashboards. Integrated machine learning algorithms for personalized recommendations and demand forecasting.",
      technologies: ["Vue.js", "Django", "Redis", "ElasticSearch", "GCP", "TensorFlow"],
      results: [
        { metric: "Conversion Rate", value: "8.5%", improvement: "+35%" },
        { metric: "Customer Lifetime Value", value: "$450", improvement: "+28%" },
        { metric: "Inventory Turnover", value: "12x", improvement: "+40%" },
        { metric: "Revenue Growth", value: "45%", improvement: "+45%" }
      ],
      testimonial: {
        quote: "The insights we now have into our customer behavior have transformed our business strategy. ROI was achieved within 3 months.",
        author: "Lisa Rodriguez",
        role: "VP of Operations",
        company: "RetailTech Solutions"
      },
      keyFeatures: [
        "Real-time customer behavior tracking and analysis",
        "AI-powered product recommendation engine",
        "Predictive inventory management with demand forecasting",
        "Custom dashboard builder with drag-and-drop interface",
        "Advanced segmentation and cohort analysis tools"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Deep Dive into Our Work"
        subtitle="Explore detailed case studies that showcase our problem-solving approach, technical expertise, and the measurable impact we create for our clients."
        breadcrumb="Projects / Case Studies"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/contact">Discuss Your Project</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/projects/client-success-stories">View Client Stories</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section key={index} className={`section-padding ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} animate-fade-in`}>
                <div className="relative rounded-2xl overflow-hidden shadow-soft">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-8 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge variant="outline" className="text-accent border-accent">{study.industry}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {study.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {study.teamSize}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">{study.title}</h2>
                  <p className="text-lg text-muted-foreground">{study.client}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent" />
                      The Challenge
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Our Solution
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    Results & Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {study.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="bg-gradient-to-br from-accent/5 to-neon-blue/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">{result.value}</div>
                        <div className="text-sm text-muted-foreground">{result.metric}</div>
                        <div className="text-xs text-success font-medium">{result.improvement}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Key Features */}
              <Card className="card-modern p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Key Features Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {study.keyFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="card-modern p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{study.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{study.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
                      <div className="text-sm text-accent">{study.testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Create Your Success Story?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how we can help you achieve similar results with a tailored solution for your unique challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/projects/client-success-stories">View More Stories</Link>
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

export default CaseStudies;
