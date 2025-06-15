
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

  // Provide fallback/default text if content not set
  const title = content?.title || "Enabling Smarter Governance";
  const subtitle = content?.subtitle || "Building citizen-centric, digital-first solutions for India's evolving urban needs.";

  return (
    <section className="bg-civora-navy text-white px-4 py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
      <p className="text-lg md:text-2xl text-civora-teal mb-6">{subtitle}</p>
    </section>
  );
};

export default HeroSection;
