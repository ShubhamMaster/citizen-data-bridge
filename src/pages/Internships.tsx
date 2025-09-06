import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Internships = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Internship Program"
        subtitle="Join our innovation journey and gain valuable experience"
        breadcrumb="Careers / Internships"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold text-muted-foreground">
                  No Internships Available
                </CardTitle>
                <CardDescription className="text-lg">
                  We're currently not accepting internship applications at this time.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Thank you for your interest in joining our team. While we don't have any 
                    internship positions available right now, we encourage you to check back 
                    regularly for future opportunities.
                  </p>
                  <p className="text-muted-foreground">
                    In the meantime, feel free to explore our other career opportunities or 
                    connect with us on our social media channels to stay updated on new openings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Internships;