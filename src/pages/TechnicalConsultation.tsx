
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';

const TechnicalConsultation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Technical Consultation"
        subtitle="Expert technical guidance for your development challenges and architecture decisions."
        breadcrumb="Services / Technical Consultation"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground">
              Get professional technical consultation for your projects.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnicalConsultation;
