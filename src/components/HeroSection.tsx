
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const HeroSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("hero");

  if (loading) {
    return (
      <section className="min-h-[340px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-civora-teal rounded-full border-t-transparent" />
      </section>
    );
  }

  // Use dynamic Hero Section content, fallback only if not set in Supabase
  const title = content?.title || "Enabling Smarter Governance";
  const subtitle = content?.subtitle || "Building citizen-centric, digital-first solutions for India's evolving urban needs.";

  return (
    <section className="bg-civora-navy text-white px-4 py-28 sm:py-36 text-center flex flex-col items-center justify-center md:min-h-[530px]">
      <h1 className="text-4xl md:text-6xl font-bold mb-5 md:mb-8 leading-tight md:leading-[1.15] tracking-tight">
        {title}
      </h1>
      <p className="text-lg md:text-2xl text-civora-teal mb-6 max-w-2xl mx-auto">
        {subtitle}
      </p>
      {/* (Optional) Add a hero call-to-action button here */}
    </section>
  );
};

export default HeroSection;
