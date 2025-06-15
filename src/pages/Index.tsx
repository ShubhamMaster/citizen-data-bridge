
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import IndustriesSection from '@/components/IndustriesSection';
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
        <section id="industries" className="scroll-mt-24">
          <IndustriesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
