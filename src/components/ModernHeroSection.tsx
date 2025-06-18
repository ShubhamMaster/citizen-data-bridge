
import React from "react";
import { ArrowRight, Sparkles, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ModernHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  showStats?: boolean;
  showTrustBadges?: boolean;
}

const ModernHeroSection: React.FC<ModernHeroSectionProps> = ({
  title = "Empowering Your Digital Vision",
  subtitle = "Transform Your Ideas Into Reality",
  description = "We deliver cutting-edge digital solutions that modernize businesses, enhance user experiences, and drive innovation across industries.",
  primaryCTA = { text: "Get Started", href: "/contact" },
  secondaryCTA = { text: "View Our Work", href: "/projects" },
  showStats = true,
  showTrustBadges = true
}) => {
  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "25+", label: "Happy Clients" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  const trustBadges = [
    { icon: Star, text: "Industry Leader", color: "text-yellow-500" },
    { icon: Sparkles, text: "Innovation Focus", color: "text-purple-500" },
    { icon: Star, text: "Client Satisfaction", color: "text-blue-500" }
  ];

  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-element w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-400 top-20 left-10 animate-float" 
             style={{ animationDelay: '0s' }} />
        <div className="floating-element w-96 h-96 bg-gradient-to-tl from-pink-400 to-red-400 bottom-20 right-10 animate-float" 
             style={{ animationDelay: '2s' }} />
        <div className="floating-element w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 top-1/2 left-1/3 animate-float" 
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="hero-content">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 animate-fade-in">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-gray-700">Next-Generation Solutions</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-heading font-bold text-gray-900 text-balance">
              <span className="block">{title}</span>
              <span className="block text-gradient mt-2">{subtitle}</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-balance">
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" 
               style={{ animationDelay: '0.4s' }}>
            <Link to={primaryCTA.href}>
              <Button className="btn-primary group">
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            
            <Link to={secondaryCTA.href}>
              <Button className="btn-secondary group">
                <Play className="w-4 h-4 mr-2" />
                {secondaryCTA.text}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in" 
                 style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trust Badges */}
          {showTrustBadges && (
            <div className="flex items-center justify-center gap-6 flex-wrap mt-12 animate-fade-in" 
                 style={{ animationDelay: '0.8s' }}>
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 glass rounded-2xl px-4 py-3">
                  <badge.icon className={`w-5 h-5 ${badge.color}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
