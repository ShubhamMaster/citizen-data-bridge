
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Hospital, Globe, Users, Shield, Heart } from "lucide-react";

// Animated abstract SVG Illustration
const HeroIllustration = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg
      className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] max-w-full"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Digital Transformation Blob Shape */}
      <g>
        <defs>
          <radialGradient id="bgblob" cx="50%" cy="50%" r="62%" fx="60%" fy="40%">
            <stop offset="0%" stopColor="#2ea6aa44" />
            <stop offset="100%" stopColor="#2EA6AA10" />
          </radialGradient>
        </defs>
        <ellipse
          cx="210"
          cy="200"
          rx="180"
          ry="140"
          fill="url(#bgblob)"
          className="animate-pulse"
          opacity="0.95"
        />
      </g>
      {/* Smart city buildings (abstract) */}
      <g className="animate-[fade-in_0.9s_ease-in]">
        <rect x="80" y="200" width="30" height="80" rx="7" fill="#BFE9EA" />
        <rect x="120" y="170" width="32" height="110" rx="8" fill="#2EA6AA" opacity="0.9" />
        <rect x="164" y="210" width="20" height="70" rx="5" fill="#2EA6AA" opacity="0.5" />
        <rect x="196" y="152" width="60" height="128" rx="14" fill="#112B52" opacity="0.8"/>
        <rect x="268" y="230" width="24" height="50" rx="6" fill="#BFE9EA" />
        <rect x="298" y="180" width="40" height="100" rx="10" fill="#2EA6AA" />
      </g>
      {/* Health + engagement icons (bubbles) */}
      <g className="animate-[fade-in_1.1s_ease-in]">
        <circle cx="105" cy="148" r="19" fill="#fff" opacity="0.78" />
        <g>
          <Globe x={90} y={134} size={18} color="#2EA6AA" strokeWidth={1.8} />
        </g>
        <circle cx="345" cy="205" r="17" fill="#fff" opacity="0.80" />
        <g>
          <Heart x={335} y={192} size={16} color="#2EA6AA" strokeWidth={1.7} />
        </g>
        <circle cx="180" cy="106" r="13" fill="#fff" opacity="0.90" />
        <g>
          <Users x={171} y={96} size={13} color="#2EA6AA" strokeWidth={1.7} />
        </g>
      </g>
      {/* Connection lines */}
      <polyline points="120,170 180,106 196,152" stroke="#2EA6AA" strokeWidth="2.5" strokeDasharray="7 6" />
      <polyline points="298,180 345,205 320,230" stroke="#2EA6AA" strokeWidth="2.5" strokeDasharray="6 9" />
      {/* Base */}
      <ellipse cx="210" cy="336" rx="140" ry="22" fill="#2EA6AA22" />
    </svg>
  </div>
);

const TrustBadges = () => (
  <div className="flex items-center gap-5 flex-wrap mt-7 md:mt-8">
    {/* Trust message */}
    <span className="flex items-center text-xs font-semibold text-gray-700 bg-civora-teal/10 border border-civora-teal/20 rounded px-3 py-1.5">
      <Shield className="mr-2 text-civora-teal" size={17} />
      Trusted by Governments & NGOs
    </span>
    {/* Example partner logos/initials */}
    <span className="flex items-center gap-2">
      <Hospital className="text-civora-teal" size={18} />
      <Handshake className="text-civora-teal" size={18} />
      <span className="rounded bg-civora-teal/10 px-2 py-0.5 text-[11px] font-bold text-civora-teal">CityHealth</span>
      <span className="rounded bg-civora-teal/10 px-2 py-0.5 text-[11px] font-bold text-civora-teal">CivicOne</span>
      {/* Add more if real logos/partners */}
    </span>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[630px] bg-white py-10 md:py-20 w-full flex items-center">
      <div className="absolute inset-0 pointer-events-none select-none -z-10">
        {/* Subtle gradient ribbons for depth */}
        <div className="hidden md:block absolute left-[40%] top-12 w-[120px] h-[320px] rounded-full blur-3xl bg-gradient-to-b from-civora-teal/30 via-white/0 to-white/0 z-10 rotate-12"/>
        <div className="block absolute right-6 top-6 w-[70px] h-[220px] rounded-full blur-2xl bg-gradient-to-br from-civora-teal/30 via-civora-navy/0 to-white/0 z-10 rotate-[20deg]"/>
        <div className="absolute bottom-2 left-1/6 w-[300px] h-[30px] rounded-full bg-civora-teal/5 blur-xl opacity-60"/>
      </div>
      <div className="z-10 container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-3 max-w-6xl">
        {/* Left - Text Content */}
        <div className="flex-1 max-w-xl w-full flex flex-col items-start justify-center text-left px-2 sm:px-0">
          <h1
            className="font-sans font-extrabold text-[2.25rem] xs:text-4xl sm:text-5xl md:text-6xl leading-[1.13] tracking-tight text-civora-navy mb-4 animate-fade-in"
            style={{ fontFamily: "Inter, Poppins, 'Open Sans', sans-serif" }}
          >
            Connecting Citizens <br className="hidden sm:block"/> Through Intelligent Innovation
          </h1>
          <p
            className="text-lg md:text-xl text-civora-teal font-medium mb-7 md:mb-9 pr-2 animate-fade-in"
            style={{ fontFamily: "Inter, Poppins, 'Open Sans', sans-serif" }}
          >
            Empowering governments, NGOs, and communities with smart civic and healthcare solutions.<br className="hidden md:block"/> We make public services faster, smarter, and accessible for everyone — from small villages to smart cities.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full max-w-sm animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-civora-teal text-white hover:bg-civora-navy transition-colors text-base font-semibold shadow-md px-7 py-3.5"
            >
              <a href="#services">Explore Our Solutions</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-civora-teal text-civora-teal hover:bg-civora-teal hover:text-white hover:border-civora-teal/80 transition-colors text-base font-semibold shadow px-7 py-3.5"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
          <TrustBadges />
        </div>
        {/* Right - Illustration */}
        <div className="flex-1 flex items-center justify-center w-full max-w-lg min-h-[320px] md:min-h-[410px] animate-fade-in">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
