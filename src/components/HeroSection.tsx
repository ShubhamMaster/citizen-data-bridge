
import React from "react";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

// --- CREATIVE BACKGROUND LAYERS ---
const CreativeBg = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
    {/* Animated soft blob, top-right */}
    <div className="absolute -top-24 -right-24 w-[430px] h-[430px] rounded-full bg-gradient-to-br from-civora-teal/40 via-civora-teal/20 to-civora-navy/10 blur-3xl opacity-50 animate-blob" />
    {/* Animated geometric grid, bottom left */}
    <svg
      className="absolute -bottom-32 -left-32 w-[430px] h-[430px] opacity-30"
      width="430"
      height="430"
      viewBox="0 0 430 430"
      fill="none"
    >
      <defs>
        <linearGradient id="grid" x1="0" y1="0" x2="430" y2="430" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2EA6AA" stopOpacity="0.13" />
          <stop offset="1" stopColor="#112B52" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="430" height="430" fill="none" stroke="url(#grid)" strokeDasharray="12 12" strokeWidth="2" rx="32" />
      <line x1="40" y1="0" x2="40" y2="430" stroke="url(#grid)" strokeDasharray="6 10" strokeWidth="1.1" />
      <line x1="80" y1="0" x2="80" y2="430" stroke="url(#grid)" strokeDasharray="6 10" strokeWidth="1.1" />
      <line x1="120" y1="0" x2="120" y2="430" stroke="url(#grid)" strokeDasharray="6 10" strokeWidth="1.1" />
      {/* Add more subtle lines if desired */}
    </svg>
    {/* Glassmorphic diagonal accent */}
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[60vw] max-w-3xl h-[160px] rounded-[2rem] bg-gradient-to-r from-white/20 to-civora-navy/20 backdrop-blur-sm border border-white/10 shadow-lg opacity-70 rotate-[-12deg]" />
    {/* Fine highlight border, top-left */}
    <div className="absolute top-0 left-0 w-[120px] h-[4px] bg-gradient-to-r from-civora-teal/50 via-white/60 to-transparent rounded-full opacity-70" />
    {/* Subtle bottom ring */}
    <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[220px] h-[80px] rounded-full border-4 border-civora-teal/20 border-dashed opacity-20 blur-sm" />
  </div>
);

const HeroSection: React.FC = () => {
  const title = (
    <>
      <span className="block bg-gradient-to-r from-civora-teal via-white to-civora-teal/70 bg-clip-text text-transparent drop-shadow font-extrabold">
        Unlock Tomorrow's{' '}
        <span className="inline-block px-2 py-1 bg-white/10 rounded-lg text-civora-teal font-bold shadow border border-civora-teal/20">Governance</span>
      </span>
      <span className="block mt-2 md:mt-3 animate-fade-in" style={{ animationDelay: '120ms' }}>
        <span className="text-white">Today.</span>
      </span>
    </>
  );

  const subtitle =
    "Civora Nexus crafts next-gen civic and healthcare tech for modern governments, citizens, and innovation leaders. Experience seamless, intelligent, truly human-first solutions.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-civora-navy via-civora-navy/95 to-civora-navy/80 min-h-[520px] md:min-h-[660px] flex items-center px-4 sm:px-8 md:px-0">
      <CreativeBg />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center py-16 md:py-32">
        {/* HEADLINE */}
        <h1 className="font-sans font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-7xl leading-tight md:leading-[1.12] tracking-tight animate-fade-in mb-5 md:mb-7 drop-shadow-lg select-text">
          {title}
        </h1>
        {/* SUBTITLE */}
        <p className="mt-1 mb-12 text-base xs:text-lg md:text-2xl text-civora-teal/90 font-medium max-w-2xl w-full mx-auto animate-fade-in" style={{ animationDelay: '180ms' }}>
          {subtitle}
        </p>
        {/* CTAs, responsively stacked */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '320ms' }}>
          <ScheduleCallDialog />
          <a
            href="#services"
            className="inline-flex items-center justify-center text-civora-teal font-semibold border-2 border-civora-teal/80 bg-white/95 hover:bg-civora-teal hover:text-white rounded-md text-base px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-inset ring-white/25 focus-visible:ring-2 focus-visible:ring-civora-teal/50"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
