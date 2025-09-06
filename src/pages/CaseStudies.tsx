
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import CaseStudyCard from '@/components/CaseStudyCard';
import CaseStudyLoading from '@/components/CaseStudyLoading';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useCaseStudies } from '@/hooks/useCaseStudies';
import { useToast } from '@/hooks/use-toast';

const CaseStudies = () => {
  const { data: caseStudies, isLoading, error } = useCaseStudies();
  const { toast } = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error loading case studies",
        description: "Please try refreshing the page. If the problem persists, contact support.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <UniformHeroSection
        title="Success Stories That Inspire"
        subtitle="Explore our comprehensive case studies showcasing real-world solutions, measurable results, and the transformative impact we create for businesses across industries."
        breadcrumb="Projects / Case Studies"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/contact">
              Start Your Success Story
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Stats Section */}
      <section className="section-padding-sm bg-gradient-to-r from-accent/5 via-background to-neon-blue/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{caseStudies?.length || 0}+</div>
              <div className="text-sm text-muted-foreground">Case Studies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-0">
          {[1, 2, 3].map((i) => (
            <CaseStudyLoading key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Unable to Load Case Studies</h2>
              <p className="text-muted-foreground mb-6">
                We're experiencing technical difficulties. Please try again later or contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
                <Button asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Data State */}
      {!isLoading && !error && (!caseStudies || caseStudies.length === 0) && (
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">No Case Studies Available</h2>
              <p className="text-muted-foreground mb-6">
                We're currently preparing our case studies. Check back soon for detailed insights into our most impactful projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/projects">View Our Projects</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {!isLoading && !error && caseStudies && caseStudies.length > 0 && (
        <div className="space-y-0">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard 
              key={caseStudy.case_id} 
              project={caseStudy} 
              index={index} 
            />
          ))}
        </div>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how we can help you achieve similar results with a tailored solution designed specifically for your unique challenges and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/projects">View More Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
