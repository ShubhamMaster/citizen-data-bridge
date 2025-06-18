
import React, { Suspense } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernHeroSection from '@/components/ModernHeroSection';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import { PageSkeleton } from '@/components/SkeletonLoader';
import { ArrowRight, Briefcase, Users, Rocket, Heart, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, href, color }: {
  icon: any;
  title: string;
  description: string;
  href: string;
  color: string;
}) => (
  <Link to={href} className="group">
    <div className="card-modern hover:shadow-large transition-all duration-300 group-hover:-translate-y-2">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex items-center text-accent font-semibold group-hover:gap-3 transition-all duration-200">
        Learn More
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  </Link>
);

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-accent" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Index = () => {
  const services = [
    {
      icon: Code,
      title: "AI Solutions",
      description: "Cutting-edge artificial intelligence solutions that transform business processes and enhance decision-making capabilities.",
      href: "/services/ai-solutions",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      icon: Rocket,
      title: "SaaS Development",
      description: "Scalable software-as-a-service platforms built with modern technologies and best practices.",
      href: "/services/saas-development",
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation Lab",
      description: "Research and development initiatives that push the boundaries of technology and create tomorrow's solutions.",
      href: "/innovation-lab",
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Work with experienced professionals who are passionate about delivering exceptional results."
    },
    {
      icon: Heart,
      title: "Client-Focused",
      description: "We prioritize your success and build long-lasting partnerships based on trust and excellence."
    },
    {
      icon: Briefcase,
      title: "Proven Results",
      description: "Track record of successful projects and satisfied clients across various industries."
    }
  ];

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="min-h-screen bg-background">
        <ModernHeader />
        
        <main>
          {/* Hero Section */}
          <ModernHeroSection
            title="Empowering Your Digital Vision"
            subtitle="Transform Ideas Into Reality"
            description="We deliver cutting-edge digital solutions that modernize businesses, enhance user experiences, and drive innovation across industries."
            primaryCTA={{ text: "Get Started", href: "/contact" }}
            secondaryCTA={{ text: "View Our Work", href: "/projects" }}
          />
          
          {/* Services Section */}
          <section className="section-padding bg-white">
            <div className="container-modern">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Our <span className="text-gradient">Services</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive digital solutions designed to accelerate your business growth and technological advancement.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="section-padding bg-gray-50">
            <div className="container-modern">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose <span className="text-gradient">Civora Nexus</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  We combine technical expertise with strategic thinking to deliver solutions that drive real business value.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <FeatureCard {...feature} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding bg-white">
            <div className="container-modern">
              <div className="card-gradient gradient-primary text-center animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Join the companies that trust Civora Nexus to deliver innovative solutions that drive growth and success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-white text-accent hover:bg-gray-100 px-8 py-3 rounded-2xl font-semibold">
                      Start Your Project
                    </Button>
                  </Link>
                  <Link to="/careers">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-2xl font-semibold">
                      Join Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <SaveHereSection />
        <Footer />
      </div>
    </Suspense>
  );
};

export default Index;
