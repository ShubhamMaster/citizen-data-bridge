
import React from "react";
import ScheduleCallDialog from "@/components/ScheduleCallDialog";

// Modern abstract background for tech feel (no image)
const AbstractShapesBg = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    {/* Top right blob */}
    <div className="absolute -top-16 -right-16 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-civora-teal/30 via-civora-teal/20 to-civora-navy/10 blur-2xl opacity-60 animate-blob" />
    {/* Bottom left ring */}
    <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full border-8 border-civora-teal/20 border-dashed opacity-20 blur-md animate-spin-slow" />
    {/* Diagonal gradient shapes */}
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[56vw] h-[250px] bg-gradient-to-r from-civora-teal/10 via-white/0 to-civora-navy/10 rotate-[-14deg] rounded-3xl" />
  </div>
);

const HeroSection: React.FC = () => {
  // Example copy, easily update for your brand
  const title = "Unlock Tomorrow's Governance, Today";
  const subtitle =
    "Civora Nexus crafts next-gen civic and healthcare tech for modern governments, citizens, and innovation leaders. Experience seamless, intelligent, truly human-first solutions.";

  return (
    <section className="relative px-4 md:px-0 min-h-[540px] md:min-h-[660px] flex items-center justify-center bg-gradient-to-b from-civora-navy via-civora-navy/90 to-civora-navy/80 text-white overflow-hidden">
      <AbstractShapesBg />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-0">
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight bg-gradient-to-r from-civora-teal via-white to-civora-teal/80 bg-clip-text text-transparent animate-fade-in">
          {title}
        </h1>
        <p className="mt-6 mb-12 text-lg md:text-2xl text-civora-teal/90 font-medium max-w-2xl w-full mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          <ScheduleCallDialog />
          <a
            href="#services"
            className="inline-flex items-center justify-center text-civora-teal font-semibold border-2 border-civora-teal/80 bg-white hover:bg-civora-teal hover:text-white rounded-md text-base px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-inset ring-white/15 focus-visible:ring-2 focus-visible:ring-civora-teal/50"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
