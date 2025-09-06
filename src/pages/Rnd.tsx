
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';

const Rnd = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Research & Development"
        subtitle="Pioneering innovative solutions through cutting-edge research and development initiatives."
        breadcrumb="Innovation Lab / R&D"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Research & Development</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our R&D team explores emerging technologies and develops innovative solutions for tomorrow's challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Emerging Technologies</h3>
              <p className="text-muted-foreground">Research into AI, blockchain, IoT, and quantum computing applications.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Innovation Projects</h3>
              <p className="text-muted-foreground">Collaborative projects pushing the boundaries of technology.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rnd;
