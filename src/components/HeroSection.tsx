
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Users } from "lucide-react";

const TrustBadges = () => (
  <div className="flex items-center justify-center gap-6 flex-wrap mt-8">
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
      <Shield className="w-4 h-4 text-success" />
      <span className="text-sm font-medium text-muted-foreground">Government Trusted</span>
    </div>
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
      <Heart className="w-4 h-4 text-coral" />
      <span className="text-sm font-medium text-muted-foreground">Healthcare Focus</span>
    </div>
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
      <Users className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-muted-foreground">Community Impact</span>
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
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple/5 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Smart. Simple.</span>
            <br />
            <span className="text-foreground">Civic.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Innovative technology solutions for thriving communities and modern healthcare systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              asChild
              size="lg"
              className="btn-primary group text-lg px-8 py-4 h-auto"
            >
              <a href="#services" className="flex items-center gap-2">
                Discover Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
            
            <Button
              size="lg"
              className="btn-secondary text-lg px-8 py-4 h-auto hover:shadow-glow"
              onClick={handleGetInTouch}
            >
              Get in Touch
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
