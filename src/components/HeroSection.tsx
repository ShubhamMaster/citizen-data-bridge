
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Users, Sparkles, Calendar } from "lucide-react";

const StatsCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const TrustBadges = () => (
  <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
      <Shield className="w-4 h-4 text-accent" />
      <span className="text-xs font-medium text-primary">Government Trusted</span>
    </div>
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
      <Heart className="w-4 h-4 text-red-500" />
      <span className="text-xs font-medium text-primary">Healthcare Focus</span>
    </div>
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
      <Users className="w-4 h-4 text-blue-500" />
      <span className="text-xs font-medium text-primary">Community Impact</span>
    </div>
  </div>
);

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetInTouch = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isMobileDevice()) {
        window.location.href = "mailto:contact@civoranexus.com";
      } else {
        navigate("/contact");
      }
    },
    [navigate]
  );

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 container-custom text-center">
        <div className="max-w-5xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary">Next-Generation Civic Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-primary" style={{ animationDelay: '0.1s' }}>
            <span className="block">Transforming</span>
            <span className="block text-transparent bg-gradient-to-r from-accent via-blue-600 to-purple-600 bg-clip-text">
              Governance
            </span>
            <span className="block">Through Technology</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We deliver cutting-edge digital solutions that modernize public services, enhance citizen engagement, 
            and drive innovation in healthcare and governance sectors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <a href="#services" className="flex items-center gap-2">
                Explore Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-lg border-2 border-accent/20 hover:bg-accent/5 transition-all duration-200"
              onClick={handleGetInTouch}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <StatsCard number="50+" label="Projects Delivered" />
            <StatsCard number="25+" label="Happy Clients" />
            <StatsCard number="98%" label="Success Rate" />
            <StatsCard number="24/7" label="Support Available" />
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
