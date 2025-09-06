
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';

const SaaSDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="SaaS Development"
        subtitle="Build scalable, cloud-native Software as a Service solutions with our expert team."
        breadcrumb="Services / SaaS Development"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SaaS Development Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We help businesses create powerful SaaS platforms that scale globally and deliver exceptional user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Multi-Tenant Architecture</h3>
              <p className="text-muted-foreground">Scalable architecture supporting multiple clients efficiently.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Cloud Integration</h3>
              <p className="text-muted-foreground">Seamless integration with major cloud providers.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">API Development</h3>
              <p className="text-muted-foreground">Robust APIs for third-party integrations and mobile apps.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaaSDevelopment;
