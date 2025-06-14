
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Connecting Citizens Through{" "}
              <span className="text-civora-teal">Intelligent Innovation</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Building civic and healthcare technology solutions for governments, NGOs, and communities. 
              Empowering public services through cutting-edge digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-civora-teal hover:bg-civora-teal/90 text-white px-8 py-3 text-lg"
              >
                Explore Our Solutions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-civora-navy px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-civora-teal mb-2">50+</div>
                  <div className="text-sm text-gray-200">Government Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-civora-teal mb-2">100K+</div>
                  <div className="text-sm text-gray-200">Citizens Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-civora-teal mb-2">25+</div>
                  <div className="text-sm text-gray-200">Healthcare Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-civora-teal mb-2">10+</div>
                  <div className="text-sm text-gray-200">Smart Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <ArrowDown className="text-civora-teal animate-bounce" size={32} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
