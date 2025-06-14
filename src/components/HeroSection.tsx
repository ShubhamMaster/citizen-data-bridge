
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-16 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Connecting Citizens Through{" "}
              <span className="text-civora-teal">Intelligent Innovation</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-2xl">
              Building civic and healthcare technology solutions for governments, NGOs, and communities. 
              Empowering public services through cutting-edge digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="bg-civora-teal hover:bg-civora-teal/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg order-1 sm:order-1"
                onClick={scrollToServices}
              >
                Explore Our Solutions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-civora-navy px-6 sm:px-8 py-3 text-base sm:text-lg order-2 sm:order-2"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-in order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">50+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Government Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">100K+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Citizens Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">25+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Healthcare Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-civora-teal mb-2">10+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Smart Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 sm:mt-16">
          <button onClick={scrollToServices} className="text-civora-teal animate-bounce hover:text-white transition-colors">
            <ArrowDown size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
