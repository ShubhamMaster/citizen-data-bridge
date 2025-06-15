
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Hospital, Users, Shield, Heart } from "lucide-react";

// Trust badge component (untouched except for colors)
const TrustBadges = () => (
  <div className="flex items-center gap-5 flex-wrap mt-7 md:mt-8">
    <span className="flex items-center text-xs font-semibold text-civora-teal bg-white/10 border border-civora-teal/20 rounded px-3 py-1.5">
      <Shield className="mr-2 text-civora-teal" size={17} />
      Trusted by Governments & NGOs
    </span>
    <span className="flex items-center gap-2">
      <Hospital className="text-civora-teal" size={18} />
      <Handshake className="text-civora-teal" size={18} />
      <span className="rounded bg-civora-teal/10 px-2 py-0.5 text-[11px] font-bold text-civora-teal">CityHealth</span>
      <span className="rounded bg-civora-teal/10 px-2 py-0.5 text-[11px] font-bold text-civora-teal">CivicOne</span>
    </span>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[450px] md:min-h-[620px] flex items-center justify-center bg-civora-navy w-full overflow-hidden py-12 md:py-24">
      <div className="container mx-auto flex flex-col items-center justify-center w-full max-w-3xl z-10 px-4">
        <h1
          className="text-white font-sans font-extrabold text-[2.4rem] xs:text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-5 text-center animate-fade-in"
          style={{ fontFamily: "Inter, Poppins, 'Open Sans', sans-serif" }}
        >
          Connecting Citizens <br className="hidden sm:block"/>
          Through Intelligent Innovation
        </h1>
        <p
          className="text-lg md:text-2xl text-civora-teal font-medium mb-8 text-center max-w-2xl animate-fade-in"
          style={{ fontFamily: "Inter, Poppins, 'Open Sans', sans-serif" }}
        >
          Empowering governments, NGOs, and communities with smart civic and healthcare solutions.
          <br className="hidden md:block"/>
          We make public services faster, smarter, and accessible for everyone — from small villages to smart cities.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full max-w-sm mx-auto justify-center animate-fade-in">
          <Button
            asChild
            size="lg"
            className="bg-civora-teal text-civora-navy hover:bg-white hover:text-civora-teal transition-colors text-base font-semibold shadow-md px-7 py-3.5"
          >
            <a href="#services">Explore Our Solutions</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-civora-teal text-white hover:bg-civora-teal hover:text-civora-navy hover:border-civora-teal/80 transition-colors text-base font-semibold shadow px-7 py-3.5"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
        <TrustBadges />
      </div>
    </section>
  );
};

export default HeroSection;

