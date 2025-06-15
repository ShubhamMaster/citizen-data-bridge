
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

// New background component
const AbstractShapesBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div
      className="absolute top-0 -left-1/4 w-96 h-96 bg-civora-teal/10 rounded-full filter blur-3xl opacity-50 animate-blob"
      style={{ animationDelay: '0s' }}
    />
    <div
      className="absolute -bottom-1/4 right-0 w-96 h-96 bg-civora-navy/20 rounded-full filter blur-3xl opacity-50 animate-blob"
      style={{ animationDelay: '2s' }}
    />
    <div
      className="absolute top-1/2 -right-1/4 w-96 h-96 bg-civora-teal/5 rounded-full filter blur-3xl opacity-50 animate-blob"
      style={{ animationDelay: '4s' }}
    />
  </div>
);

// New illustration component
const ModernHeroIllustration = () => (
  <div className="relative w-full max-w-md mx-auto mt-12 md:mt-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
    <div className="relative p-2 bg-white/5 rounded-2xl backdrop-blur-sm ring-1 ring-white/10">
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
        alt="Modern Tech Workspace"
        className="rounded-xl object-cover w-full h-auto"
        loading="lazy"
      />
    </div>
    {/* Decorative elements */}
    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-civora-teal rounded-full opacity-30 filter blur-xl -z-10"></div>
    <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-civora-teal/20 rounded-2xl -rotate-12 -z-10"></div>
  </div>
);

const HeroSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("hero");

  if (loading) {
    return (
      <section className="min-h-[340px] flex items-center justify-center bg-civora-navy">
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
    <section className="relative overflow-hidden bg-civora-navy text-white pt-28 pb-20 px-4 md:px-0 flex items-center min-h-[600px] md:min-h-[700px]">
      <AbstractShapesBg />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center md:gap-14">
        {/* Left: Headings and CTA */}
        <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight md:leading-[1.1] tracking-tight mb-6 font-sans">
            <span className="block pb-2 bg-gradient-to-r from-white via-civora-teal to-civora-teal/80 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm md:max-w-none md:w-fit mx-auto md:mx-0">
            <ScheduleCallDialog />
            {/* See our services */}
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center text-white border-2 border-white/50 hover:bg-white/10 hover:border-white bg-transparent rounded-md font-semibold text-base px-6 py-2.5 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Our Services
            </a>
          </div>
        </div>
        
        {/* Right: Tech Illustration */}
        <div className="w-full md:w-2/5 lg:w-1/2 flex justify-center items-center">
          <ModernHeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
