
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import PartnersSection from '@/components/PartnersSection';
import SaveHereSection from '@/components/SaveHereSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Section */}
        <section id="services" className="scroll-mt-24">
          <ServicesSection />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <ProjectsSection />
        </section>
        
        {/* Partners Section */}
        <PartnersSection />
        
        {/* Save Here Section */}
        <SaveHereSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
