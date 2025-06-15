import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with professional spacing */}
        <HeroSection />
        {/* Key sections spaced for clarity */}
        <section id="services" className="scroll-mt-24">
          <ServicesSection />
        </section>
        <section id="projects" className="scroll-mt-24">
          <ProjectsSection />
        </section>
        {/* Partners Section */}
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
