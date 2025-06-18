
import React, { Suspense } from 'react';
import ProfessionalHeader from '@/components/ProfessionalHeader';
import ProfessionalHeroSection from '@/components/ProfessionalHeroSection';
import ProfessionalFooter from '@/components/ProfessionalFooter';
import { PageSkeleton } from '@/components/SkeletonLoader';
import { ArrowRight, Code, Users, Rocket, Brain, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, href, tags }: {
  icon: any;
  title: string;
  description: string;
  href: string;
  tags: string[];
}) => (
  <Link to={href} className="group">
    <div className="card-professional group-hover:shadow-large transition-all duration-300">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-800 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="tag text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
        Learn More
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  </Link>
);

const OpportunityCard = ({ title, description, href, tags }: {
  title: string;
  description: string;
  href: string;
  tags: string[];
}) => (
  <Link to={href} className="group">
    <div className="card-professional group-hover:shadow-large transition-all duration-300 text-center">
      <h3 className="text-lg font-semibold text-neutral-800 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-600 mb-4 text-sm">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {tags.map((tag) => (
          <span key={tag} className="tag text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
        Explore
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  </Link>
);

const Index = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Intelligent systems that transform business processes and enhance decision-making capabilities through advanced artificial intelligence.",
      href: "/services",
      tags: ["AI", "Machine Learning", "Automation"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies and best practices for optimal performance.",
      href: "/services",
      tags: ["React", "Full-Stack", "Responsive"]
    },
    {
      icon: Shield,
      title: "Civic Technology",
      description: "Digital solutions for government and public sector organizations to improve citizen engagement and service delivery.",
      href: "/services",
      tags: ["e-Governance", "Public Sector", "Digital Services"]
    }
  ];

  const opportunities = [
    {
      title: "Internships",
      description: "Start your career journey with hands-on experience in cutting-edge technology projects.",
      href: "/internships",
      tags: ["Remote", "Paid", "3-6 Months"]
    },
    {
      title: "Projects",
      description: "Explore our innovative solutions and contribute to impactful technology initiatives.",
      href: "/projects",
      tags: ["Open Source", "Innovation", "Collaboration"]
    },
    {
      title: "Careers",
      description: "Join our team of passionate professionals building the future of technology.",
      href: "/careers",
      tags: ["Full-Time", "Remote", "Growth"]
    }
  ];

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="min-h-screen bg-background">
        <ProfessionalHeader />
        
        <main>
          {/* Hero Section */}
          <ProfessionalHeroSection
            title="Empowering Your Digital Vision"
            subtitle="Transform Ideas Into Reality"
            description="We deliver cutting-edge digital solutions that modernize businesses, enhance user experiences, and drive innovation across industries."
            primaryCTA={{ text: "Explore Services", href: "/services" }}
            secondaryCTA={{ text: "Get In Touch", href: "/contact" }}
            showStats={true}
            tags={["Innovation", "Technology", "Professional"]}
          />
          
          {/* Services Section */}
          <section className="section-professional bg-white">
            <div className="container-professional">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-neutral-800 mb-4">
                  Our <span className="text-blue-600">Services</span>
                </h2>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  Comprehensive digital solutions designed to accelerate your business growth and technological advancement.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Opportunities Section */}
          <section className="section-professional bg-neutral-50">
            <div className="container-professional">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-neutral-800 mb-4">
                  <span className="text-blue-600">Opportunities</span> Await
                </h2>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  Discover ways to grow your career, contribute to innovative projects, and be part of our mission.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => (
                  <div
                    key={opportunity.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <OpportunityCard {...opportunity} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-professional bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="container-professional">
              <div className="card-professional max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm">
                <div className="animate-fade-in">
                  <h2 className="text-neutral-800 mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                    Join the companies that trust Civora Nexus to deliver innovative solutions that drive growth and success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <button className="btn-primary">
                        Start Your Project
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                    <Link to="/careers">
                      <button className="btn-secondary">
                        Join Our Team
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <ProfessionalFooter />
      </div>
    </Suspense>
  );
};

export default Index;
