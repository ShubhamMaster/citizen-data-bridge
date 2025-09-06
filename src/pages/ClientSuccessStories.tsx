
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Users, Building, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ClientSuccessStories = () => {
  const successStories = [
    {
      clientName: "TechStart Inc.",
      industry: "SaaS",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "MVP Development",
      timeline: "4 months",
      teamSize: "5 developers",
      testimonial: "Civora Nexus didn't just build our product; they became our strategic partners. Their expertise in SaaS development and understanding of our market helped us launch 2 months ahead of schedule. The platform they built has scaled beautifully as we've grown from 100 to 10,000+ users.",
      results: [
        "Achieved $1M ARR within 8 months of launch",
        "99.9% uptime since deployment",
        "Successful Series A funding round",
        "Featured in top industry publications"
      ],
      clientInfo: {
        name: "Jennifer Walsh",
        role: "CEO & Founder",
        company: "TechStart Inc.",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "Built scalable multi-tenant architecture",
        "Implemented advanced analytics dashboard",
        "Created mobile-first responsive design",
        "Integrated payment processing and billing"
      ]
    },
    {
      clientName: "GreenEnergy Solutions",
      industry: "Clean Tech",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "IoT Platform",
      timeline: "6 months",
      teamSize: "7 developers",
      testimonial: "The IoT platform Civora built for us has transformed how we monitor and optimize our renewable energy installations. Their deep technical expertise and commitment to sustainability aligned perfectly with our mission. The real-time analytics have helped us improve efficiency by 35% across all our sites.",
      results: [
        "35% improvement in energy efficiency",
        "Reduced maintenance costs by $500K annually",
        "Real-time monitoring of 200+ installations",
        "Predictive maintenance preventing 95% of failures"
      ],
      clientInfo: {
        name: "Dr. Ahmed Hassan",
        role: "CTO",
        company: "GreenEnergy Solutions",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "Connected 500+ IoT sensors across multiple sites",
        "Built predictive maintenance algorithms",
        "Created executive dashboard with KPI tracking",
        "Implemented automated alert system"
      ]
    },
    {
      clientName: "HealthCare Connect",
      industry: "Healthcare",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "Digital Health Platform",
      timeline: "10 months",
      teamSize: "8 developers",
      testimonial: "Working with Civora on our digital health platform was exceptional. They understood the complex regulatory requirements in healthcare and built a HIPAA-compliant system that our patients and providers love. The platform has improved patient engagement by 60% and reduced administrative overhead significantly.",
      results: [
        "60% increase in patient engagement",
        "Reduced admin costs by 40%",
        "Served 25,000+ patients in first year",
        "Achieved 4.8/5 patient satisfaction rating"
      ],
      clientInfo: {
        name: "Dr. Maria Rodriguez",
        role: "Chief Medical Officer",
        company: "HealthCare Connect",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "HIPAA-compliant architecture and data handling",
        "Integrated telemedicine capabilities",
        "Built patient portal with appointment scheduling",
        "Created provider dashboard with EHR integration"
      ]
    },
    {
      clientName: "EduTech Academy",
      industry: "Education",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "Learning Management System",
      timeline: "8 months",
      teamSize: "6 developers",
      testimonial: "The learning platform Civora developed has revolutionized how we deliver education. The intuitive interface and powerful features have increased student engagement by 70%. Our teachers love the analytics that help them understand student progress, and parents appreciate the transparency.",
      results: [
        "70% increase in student engagement",
        "Improved test scores by 25% on average",
        "Reduced dropout rates by 15%",
        "Expanded to serve 15,000+ students"
      ],
      clientInfo: {
        name: "Robert Chen",
        role: "Director of Technology",
        company: "EduTech Academy",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "Built adaptive learning algorithms",
        "Created parent/teacher communication portal",
        "Implemented gamification features",
        "Developed mobile app for on-the-go learning"
      ]
    },
    {
      clientName: "RetailMax",
      industry: "E-commerce",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "E-commerce Platform",
      timeline: "5 months",
      teamSize: "4 developers",
      testimonial: "Civora transformed our online presence completely. The new e-commerce platform they built not only looks amazing but performs incredibly well. Our conversion rates doubled, and the AI-powered recommendations have increased our average order value by 45%. The ROI was clear within the first quarter.",
      results: [
        "Doubled conversion rates (3.2% to 6.4%)",
        "45% increase in average order value",
        "Reduced page load times by 60%",
        "Achieved 99.99% uptime during Black Friday"
      ],
      clientInfo: {
        name: "Sarah Thompson",
        role: "E-commerce Director",
        company: "RetailMax",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "Built AI-powered product recommendation engine",
        "Implemented advanced search and filtering",
        "Created responsive design for all devices",
        "Integrated with multiple payment gateways"
      ]
    },
    {
      clientName: "CityGov Municipal",
      industry: "Government",
      logo: "/api/placeholder/120/60",
      rating: 5,
      projectType: "Civic Engagement Platform",
      timeline: "12 months",
      teamSize: "9 developers",
      testimonial: "The civic engagement platform has transformed how our citizens interact with city services. What used to take weeks now takes hours. Citizen satisfaction has increased dramatically, and our staff can focus on more complex issues rather than routine administrative tasks. It's been a game-changer for our community.",
      results: [
        "85% of services now processed digitally",
        "Reduced service processing time by 80%",
        "Increased citizen satisfaction to 92%",
        "Saved $2.3M in operational costs annually"
      ],
      clientInfo: {
        name: "Mayor Patricia Johnson",
        role: "Mayor",
        company: "CityGov Municipal",
        image: "/api/placeholder/80/80"
      },
      projectHighlights: [
        "Digitized 50+ city services",
        "Built multilingual citizen portal",
        "Created staff workflow management system",
        "Implemented real-time service tracking"
      ]
    }
  ];

  const industries = [
    { name: "SaaS", count: "8 projects" },
    { name: "Healthcare", count: "12 projects" },
    { name: "Government", count: "15 projects" },
    { name: "E-commerce", count: "6 projects" },
    { name: "Education", count: "9 projects" },
    { name: "FinTech", count: "5 projects" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Our Clients Speak"
        subtitle="Discover how we've helped organizations across industries achieve their digital transformation goals. These are the real stories behind our work."
        breadcrumb="Projects / Client Success Stories"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/contact">Start Your Success Story</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/projects/case-studies">View Detailed Case Studies</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Industry Overview */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by organizations across diverse sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl font-bold text-primary">{industry.count.split(' ')[0]}</div>
                <div className="text-sm text-muted-foreground">{industry.name}</div>
                <div className="text-xs text-muted-foreground">{industry.count.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real testimonials from real clients who've experienced transformational results with our solutions.
            </p>
          </div>

          <div className="space-y-16">
            {successStories.map((story, index) => (
              <Card key={index} className="card-modern overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                      <img 
                        src={story.logo} 
                        alt={`${story.clientName} logo`}
                        className="h-12 w-auto object-contain"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-primary">{story.clientName}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="text-accent border-accent">
                            {story.industry}
                          </Badge>
                          <Badge variant="secondary" className="bg-muted">
                            {story.projectType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Testimonial */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="relative">
                        <Quote className="h-8 w-8 text-accent/20 absolute -top-2 -left-2" />
                        <blockquote className="text-lg text-muted-foreground italic leading-relaxed pl-6">
                          {story.testimonial}
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center space-x-4 pt-4 border-t">
                        <img 
                          src={story.clientInfo.image} 
                          alt={story.clientInfo.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-primary">{story.clientInfo.name}</div>
                          <div className="text-sm text-muted-foreground">{story.clientInfo.role}</div>
                          <div className="text-sm text-accent">{story.clientInfo.company}</div>
                        </div>
                      </div>
                    </div>

                    {/* Project Info & Results */}
                    <div className="space-y-6">
                      {/* Project Info */}
                      <div className="bg-gradient-to-br from-accent/5 to-neon-blue/5 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-3">Project Overview</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timeline:</span>
                            <span className="font-medium">{story.timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Team Size:</span>
                            <span className="font-medium">{story.teamSize}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Results */}
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-success" />
                          Key Results
                        </h4>
                        <ul className="space-y-2">
                          {story.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-2 h-2 bg-success rounded-full flex-shrink-0 mt-2"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Project Highlights */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold text-primary mb-4">Project Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {story.projectHighlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-muted-foreground">
              The collective results across all our client partnerships
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <div className="text-muted-foreground">Client Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2M+</div>
              <div className="text-muted-foreground">Users Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Average Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our growing list of satisfied clients who've transformed their businesses with our innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/projects/case-studies">View Technical Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientSuccessStories;
