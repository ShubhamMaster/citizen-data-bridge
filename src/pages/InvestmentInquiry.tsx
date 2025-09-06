
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import InvestmentInquiryForm from '@/components/forms/InvestmentInquiryForm';

const InvestmentInquiry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Investment Inquiry"
        subtitle="Interested in investing in innovative technology solutions? Let's discuss opportunities for partnership and growth."
        breadcrumb="About Us / Investors / Inquiry"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <InvestmentInquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestmentInquiry;
