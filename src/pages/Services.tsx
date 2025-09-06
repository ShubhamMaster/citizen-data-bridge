
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import ServicesSection from '@/components/ServicesSection';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Our Services"
        subtitle="Comprehensive technology solutions tailored to your business needs."
        breadcrumb="Services"
      />

      <ServicesSection />

      <Footer />
    </div>
  );
};

export default Services;
