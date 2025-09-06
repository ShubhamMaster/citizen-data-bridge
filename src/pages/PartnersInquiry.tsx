
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import PartnersInquiryForm from '@/components/forms/PartnersInquiryForm';

const PartnersInquiry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Partnership Inquiry"
        subtitle="Join forces with us to create innovative solutions and drive mutual growth."
        breadcrumb="Partners / Inquiry"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <PartnersInquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnersInquiry;
