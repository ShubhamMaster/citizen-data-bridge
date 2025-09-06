
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import ProjectInquiryFormComponent from '@/components/forms/ProjectInquiryFormComponent';

const ProjectInquiryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Project Inquiry"
        subtitle="Have a project in mind? Let's discuss how we can help bring your vision to life with our innovative solutions."
        breadcrumb="Projects / Inquiry"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <ProjectInquiryFormComponent />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectInquiryPage;
