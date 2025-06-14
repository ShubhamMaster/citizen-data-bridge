
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Target, Users } from "lucide-react";

const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-civora-navy via-civora-navy/95 to-civora-navy/90 text-white py-16 sm:py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-civora-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-civora-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-civora-teal/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in order-2 lg:order-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-civora-teal" />
              <span className="text-civora-teal font-medium text-sm uppercase tracking-wider">
                Innovation Driven
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Connecting Citizens Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-civora-teal to-cyan-400">
                Intelligent Innovation
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-2xl">
              Building civic and healthcare technology solutions for governments, NGOs, and communities. 
              Empowering public services through cutting-edge digital transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-civora-teal to-cyan-500 hover:from-civora-teal/90 hover:to-cyan-500/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={scrollToServices}
              >
                Explore Our Solutions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white hover:text-civora-navy px-6 sm:px-8 py-3 text-base sm:text-lg backdrop-blur-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-civora-teal" />
                <span>Trusted by 50+ Organizations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-civora-teal" />
                <span>100K+ Citizens Served</span>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in order-1 lg:order-2">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">50+</div>
                    <div className="text-xs sm:text-sm text-gray-200">Government Projects</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">100K+</div>
                    <div className="text-xs sm:text-sm text-gray-200">Citizens Served</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">25+</div>
                    <div className="text-xs sm:text-sm text-gray-200">Healthcare Tools</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">10+</div>
                    <div className="text-xs sm:text-sm text-gray-200">Smart Cities</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-civora-teal/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400/20 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 sm:mt-16">
          <button 
            onClick={scrollToServices} 
            className="text-civora-teal animate-bounce hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowDown size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
