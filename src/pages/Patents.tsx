
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';

const Patents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Patents & IP"
        subtitle="Our intellectual property portfolio and patent applications driving innovation forward."
        breadcrumb="Innovation Lab / Patents"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Protecting and licensing our innovative technologies and methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Patent Portfolio</h3>
              <p className="text-muted-foreground">Our growing collection of patented technologies and innovations.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Licensing</h3>
              <p className="text-muted-foreground">Technology licensing opportunities for strategic partnerships.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">IP Strategy</h3>
              <p className="text-muted-foreground">Strategic intellectual property management and protection.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Patents;
