
import React, { useState, useEffect } from 'react';
import { useLogVisit } from '@/hooks/useLogVisit';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import PartnersSection from '@/components/PartnersSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { 
  HeroSkeleton, 
  ServicesSkeleton, 
  ProjectsSkeleton, 
  PartnersSkeleton, 
  EventsSkeleton 
} from '@/components/SkeletonLoaders';

const Index = () => {
  useLogVisit();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSkeleton />
          <ServicesSkeleton />
          <ProjectsSkeleton />
          <PartnersSkeleton />
          <EventsSkeleton />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <PartnersSection />
        <UpcomingEventsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
