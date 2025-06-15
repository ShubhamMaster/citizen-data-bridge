
import React from "react";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

// --- CREATIVE + ANIMATED BACKGROUND LAYERS ---
const CreativeBg = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
    {/* Vibrant animated blob top right */}
    <div className="absolute -top-36 -right-32 md:-top-56 md:-right-52 w-[360px] h-[360px] md:w-[520px] md:h-[520px] rounded-full bg-gradient-to-br from-civora-teal/40 via-civora-teal/10 to-civora-navy/10 blur-3xl opacity-40 animate-blob" />

    {/* Glass diagonal accent - animated in */}
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[66vw] max-w-3xl h-[130px] md:h-[170px] rounded-[2.2rem] bg-gradient-to-r from-white/25 via-white/5 to-civora-navy/15 backdrop-blur-md border border-white/10 shadow-lg opacity-80 rotate-[-13deg] animate-fade-in" style={{animationDelay: "350ms"}} />

    {/* Pastel grid, bottom left, with slight entrance fade */}
    <svg
      className="absolute -bottom-24 -left-24 w-[330px] h-[330px] md:w-[420px] md:h-[420px] opacity-25 animate-fade-in"
      style={{animationDelay: "450ms"}}
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
    >
      <defs>
        <linearGradient id="grid" x1="0" y1="0" x2="420" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2EA6AA" stopOpacity="0.13" />
          <stop offset="1" stopColor="#112B52" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="420" fill="none" stroke="url(#grid)" strokeDasharray="10 10" strokeWidth="1.7" rx="32" />
      <line x1="55" y1="0" x2="55" y2="420" stroke="url(#grid)" strokeDasharray="6 10" strokeWidth="0.9" />
      <line x1="180" y1="0" x2="180" y2="420" stroke="url(#grid)" strokeDasharray="6 10" strokeWidth="0.9" />
      <line x1="320" y1="0" x2="320" y2="420" stroke="url(#grid)" strokeDasharray="4 14" strokeWidth="0.8" />
    </svg>
    {/* Top border highlight */}
    <div className="absolute top-0 left-5 w-[110px] h-[4px] bg-gradient-to-r from-civora-teal/60 via-white/60 to-transparent rounded-full opacity-80" />
    {/* Subtle bottom ring */}
    <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-[210px] h-[70px] rounded-full border-4 border-civora-teal/15 border-dashed opacity-15 blur-sm" />
  </div>
);

// --- HERO SECTION ---
const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-civora-navy via-civora-navy/90 to-civora-navy/85 min-h-[520px] md:min-h-[700px] flex items-center px-3 xs:px-5 md:px-0">
      <CreativeBg />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center py-14 md:py-28">
        {/* HEADLINE */}
        <h1 className="font-sans font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl leading-tight md:leading-[1.08] tracking-tight animate-fade-in" style={{animationDelay:"100ms"}}>
          <span className="block bg-gradient-to-br from-civora-teal via-white to-civora-teal/70 bg-clip-text text-transparent drop-shadow font-extrabold">
            Unlock Tomorrow's{" "}
            <span className="inline-block px-2 py-1 bg-white/10 rounded-lg text-civora-teal font-bold shadow border border-civora-teal/20">
              Governance
            </span>
          </span>
          <span className="block mt-2 md:mt-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <span className="text-white">Today.</span>
          </span>
        </h1>
        {/* SUBTITLE */}
        <p className="mt-2 md:mt-3 mb-11 md:mb-14 text-base xs:text-lg md:text-2xl text-civora-teal/90 font-medium max-w-2xl w-full mx-auto animate-fade-in" style={{ animationDelay: "320ms" }}>
          Civora Nexus crafts next-gen civic and healthcare tech for modern governments, citizens, and innovation leaders. Experience seamless, intelligent, and truly human-first solutions.
        </p>
        {/* BUTTONS */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: "420ms" }}>
          <ScheduleCallDialog />
          <a
            href="#services"
            className="inline-flex items-center justify-center text-civora-teal font-semibold border-2 border-civora-teal/80 bg-white/95 hover:bg-civora-teal hover:text-white rounded-md text-base px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-inset ring-white/25 focus-visible:ring-2 focus-visible:ring-civora-teal/50 hover-scale"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
