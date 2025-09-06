
import React from "react";

interface UniformHeroSectionProps {
  title: string;
  subtitle: string;
  breadcrumb?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const UniformHeroSection: React.FC<UniformHeroSectionProps> = ({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
  children
}) => {
  return (
    <section className="relative hero-gradient text-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-accent to-neon-blue rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-neon-purple to-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 container-custom text-center">
        {breadcrumb && (
          <div className="mb-6 animate-fade-in">
            <span className="text-accent/80 text-sm font-medium uppercase tracking-wide">
              {breadcrumb}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>

        {children && (
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default UniformHeroSection;
