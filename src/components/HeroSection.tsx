import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Users, Sparkles, Play } from "lucide-react";

// Stats card component
const StatsCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Trust badges component
const TrustBadges = () => (
  <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2 border border-gray-200 shadow-soft">
      <Shield className="w-5 h-5 text-accent" />
      <span className="text-sm font-medium text-primary">Government Trusted</span>
    </div>
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2 border border-gray-200 shadow-soft">
      <Heart className="w-5 h-5 text-red-500" />
      <span className="text-sm font-medium text-primary">Healthcare Focus</span>
    </div>
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2 border border-gray-200 shadow-soft">
      <Users className="w-5 h-5 text-blue-500" />
      <span className="text-sm font-medium text-primary">Community Impact</span>
    </div>
  </div>
);

// Detect mobile device
const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Show/hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetInTouch = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isMobileDevice()) {
        window.location.href = "/contact";
      } else {
        navigate("/contact");
      }
    },
    [navigate]
  );

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto text-center">
        <div className="max-w-6xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 mt-4 border border-gray-200 shadow-soft animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary">
              Next-Generation Civic Technology
            </span>
          </div>


          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-primary leading-tight">
            <span className="block">Smart.</span>
            <span className="block text-transparent bg-gradient-to-r from-accent via-blue-600 to-purple-600 bg-clip-text">
              Simple.
            </span>
            <span className="block">Civic.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Empowering communities through innovative technology solutions for modern governance,
            healthcare delivery, and citizen engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button
              asChild
              className="btn-primary group text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-6 h-auto shadow-lg hover:shadow-xl"
            >
              <a href="/case-studies" className="flex items-center gap-3">
                See Results
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>

            <Button
              className="btn-secondary text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-6 h-auto shadow-lg hover:shadow-xl"
              onClick={handleGetInTouch}
            >
              <Play className="w-5 h-5 mr-3" />
             Talk to Us
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 animate-fade-in">
            <StatsCard number="10+" label="Projects Delivered" />
            <StatsCard number="25+" label="Happy Clients" />
            <StatsCard number="98%" label="Success Rate" />
            <StatsCard number="24/7" label="Support" />
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-in">
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-opacity duration-500">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
