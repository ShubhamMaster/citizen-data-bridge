
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

// Decorative background SVG (fluid-waves)
const FluidWaveBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1440 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    style={{ zIndex: 0 }}
  >
    <defs>
      <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#2EA6AA" stopOpacity="0.18" />
        <stop offset="1" stopColor="#112B52" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    <path
      d="M0,300 Q400,220 800,320 T1440,290 L1440,0 L0,0 Z"
      fill="url(#hero-gradient)"
    />
    <ellipse
      cx="1200"
      cy="80"
      rx="130"
      ry="46"
      fill="#2EA6AA"
      fillOpacity="0.10"
    />
    <ellipse
      cx="200"
      cy="100"
      rx="90"
      ry="34"
      fill="#00D1B2"
      fillOpacity="0.07"
    />
  </svg>
);

// Placeholder for a tech illustration
const HeroIllustration = () => (
  <div className="relative w-full max-w-[400px] mx-auto mt-8 md:mt-0 drop-shadow-xl animate-fade-in">
    <img
      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
      alt="Laptop Hero"
      className="rounded-2xl object-cover w-full h-64 md:h-72 border-4 border-white ring-4 ring-civora-teal/10"
      loading="lazy"
    />
    {/* Glow effect */}
    <div className="absolute -inset-2 -z-10 blur-2xl opacity-60 bg-civora-teal rounded-2xl pointer-events-none" />
  </div>
);

const HeroSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("hero");

  if (loading) {
    return (
      <section className="min-h-[340px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-civora-teal rounded-full border-t-transparent" />
      </section>
    );
  }

  // Use dynamic content or fallback text
  const title =
    content?.title ||
    "Enabling Smarter Governance for the Next Generation";
  const subtitle =
    content?.subtitle ||
    "We create user-first, digital solutions for transformative change in governance, health, and society.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-civora-navy to-[#17305e] text-white pt-24 pb-14 px-4 md:px-0 flex items-center min-h-[570px] md:min-h-[630px]">
      {/* Decorative SVG background */}
      <span className="absolute inset-0 pointer-events-none select-none">
        <FluidWaveBg />
      </span>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center md:gap-14">
        {/* Left: Headings and CTA */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight md:leading-[1.13] tracking-tight mb-5 font-sans">
            <span className="block pb-1 bg-gradient-to-r from-civora-teal/80 via-civora-teal/90 to-white bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-civora-teal mb-7 max-w-2xl mx-auto md:mx-0">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs md:max-w-none md:w-fit mx-auto md:mx-0">
            <ScheduleCallDialog />
            {/* See our services */}
            <a
              href="#services"
              className="w-full sm:w-auto inline-block text-civora-teal border-2 border-civora-teal hover:bg-civora-teal hover:text-white bg-transparent rounded-md font-semibold text-base px-6 py-2 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-civora-teal/30"
            >
              Our Services
            </a>
          </div>
        </div>
        {/* Spacer on mobile */}
        <div className="h-6 md:hidden" />
        {/* Right: Tech Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
