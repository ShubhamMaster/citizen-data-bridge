
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProfessionalHeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  showStats?: boolean;
  tags?: string[];
}

const ProfessionalHeroSection: React.FC<ProfessionalHeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  showStats = false,
  tags = []
}) => {
  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "25+", label: "Happy Clients" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="hero-professional">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container-professional text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="font-bold text-neutral-800">
                {title}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-blue-600 font-medium">
                {subtitle}
              </h2>
              
              {description && (
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" 
                   style={{ animationDelay: '0.2s' }}>
                {primaryCTA && (
                  <Link to={primaryCTA.href}>
                    <Button className="btn-primary group">
                      {primaryCTA.text}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                )}
                
                {secondaryCTA && (
                  <Link to={secondaryCTA.href}>
                    <Button className="btn-secondary">
                      {secondaryCTA.text}
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Stats */}
            {showStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in" 
                   style={{ animationDelay: '0.3s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHeroSection;
