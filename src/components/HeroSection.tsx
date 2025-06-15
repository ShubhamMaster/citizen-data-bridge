
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Hospital, Globe, Users, Shield, Heart, City, Network, Building2, ChevronRight, ArrowRight } from "lucide-react";

// Modern, professional "digital bridge" illustration with icons – NOT a circle/blob
const HeroIllustration = () => (
  <div className="w-full h-full flex items-center justify-center px-2 md:px-0">
    <svg
      viewBox="0 0 430 210"
      fill="none"
      className="w-[340px] h-[210px] md:w-[420px] md:h-[210px] max-w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* Subtle background gradient */}
      <defs>
        <linearGradient id="bridge-bg" x1="0" y1="0" x2="430" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FEFD" />
          <stop offset="1" stopColor="#DFF6F7" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="430" height="210" fill="url(#bridge-bg)" rx="32"/>
      
      {/* Central horizontal digital "bridge" bar */}
      <rect x="50" y="105" width="330" height="10" rx="5" fill="#2EA6AA" opacity="0.14"/>
      <rect x="50" y="108" width="330" height="4" rx="2" fill="#2EA6AA" opacity="0.34"/>
      {/* Bridge accent ping-dots */}
      <circle cx="80" cy="110" r="3.6" fill="#2EA6AA" className="animate-pulse"/>
      <circle cx="180" cy="110" r="3.6" fill="#2EA6AA" className=""/>
      <circle cx="260" cy="110" r="3.6" fill="#2EA6AA" className=""/>
      <circle cx="340" cy="110" r="3.6" fill="#2EA6AA" className="animate-pulse"/>
      
      {/* "Network" links above the bridge */}
      <line x1="80" y1="110" x2="110" y2="50" stroke="#AACEDF" strokeWidth="2" strokeDasharray="5 4" />
      <line x1="180" y1="110" x2="130" y2="80" stroke="#AACEDF" strokeWidth="2" strokeDasharray="5 4" />
      <line x1="260" y1="110" x2="310" y2="60" stroke="#AACEDF" strokeWidth="2" strokeDasharray="5 4" />
      <line x1="340" y1="110" x2="370" y2="80" stroke="#AACEDF" strokeWidth="2" strokeDasharray="5 4" />
      
      {/* Left city/building icons group */}
      <g>
        <rect x="62" y="135" width="18" height="36" rx="4" fill="#2EA6AA" opacity="0.18"/>
        <rect x="85" y="145" width="13" height="25" rx="2.2" fill="#112B52" opacity="0.15"/>
        <City x={66} y={147} size={18} color="#2EA6AA" strokeWidth={2} />
        <Building2 x={84} y={158} size={13} color="#2EA6AA" strokeWidth={1.7}/>
      </g>
      {/* Right hospital/care icons group */}
      <g>
        <rect x="325" y="135" width="18" height="36" rx="4" fill="#2EA6AA" opacity="0.18"/>
        <rect x="346" y="141" width="13" height="29" rx="2.2" fill="#112B52" opacity="0.15"/>
        <Hospital x={330} y={147} size={18} color="#2EA6AA" strokeWidth={2} />
        <Heart x={343} y={157} size={13} color="#2EA6AA" strokeWidth={1.7}/>
      </g>
      {/* People (community) and collaboration in the center */}
      <g>
        <circle cx="214" cy="92" r="14" fill="#fff" opacity="0.94" />
        <Users x={203} y={81} size={22} color="#2EA6AA" strokeWidth={2}/>
        {/* Connectivity icon */}
        <Network x={225} y={98} size={14} color="#2EA6AA" strokeWidth={1.7} />
      </g>
      {/* Dotted connection (city↔people↔health) */}
      <polyline points="75,110 200,95 214,92 230,98 340,110" stroke="#2EA6AA" strokeWidth="2" strokeDasharray="7 6" opacity="0.30"/>
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
        {/* Subtle accent gradients for depth */}
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
        {/* Right - Professional, creative, but flat digital bridge illustration */}
        <div className="flex-1 flex items-center justify-center w-full max-w-lg min-h-[180px] md:min-h-[210px] animate-fade-in">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
