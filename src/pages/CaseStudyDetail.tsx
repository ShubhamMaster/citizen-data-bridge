
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, MapPin, ExternalLink, Share2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedCaseStudy, useCaseStudies } from '@/hooks/useCaseStudies';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyLoading from '@/components/CaseStudyLoading';
import ExpandableText from '@/components/ExpandableText';
import ImageGallery from '@/components/ImageGallery';

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: caseStudy, isLoading, error } = useFeaturedCaseStudy(id || '');
  const { data: allCaseStudies } = useCaseStudies();

  if (!id) {
    return <Navigate to="/projects/case-studies" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CaseStudyLoading />
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects/case-studies">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse JSON fields safely
  const results = caseStudy.results as Record<string, string> || {};
  const technologies = caseStudy.technologies as string[] || [];
  const keyFeatures = caseStudy.key_features as string[] || [];
  const galleryImages = caseStudy.gallery_images as string[] || [];
  const tags = caseStudy.tags as string[] || [];

  // Find current case study index and get next/previous
  const currentIndex = allCaseStudies?.findIndex(cs => cs.case_id === id) ?? -1;
  const nextCaseStudy = allCaseStudies && currentIndex >= 0 && currentIndex < allCaseStudies.length - 1 
    ? allCaseStudies[currentIndex + 1] 
    : null;
  const prevCaseStudy = allCaseStudies && currentIndex > 0 
    ? allCaseStudies[currentIndex - 1] 
    : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caseStudy.title,
        text: caseStudy.subtitle || caseStudy.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span>/</span>
            <Link to="/projects/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-primary">{caseStudy.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <Link to="/projects/case-studies">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft group">
              <img 
                src={caseStudy.main_image || '/lovable-uploads/d5ddd61f-899e-4acf-a773-b03d953ab99f.png'} 
                alt={caseStudy.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                {caseStudy.category && (
                  <Badge className="bg-accent/90 text-white border-0">
                    {caseStudy.category}
                  </Badge>
                )}
              </div>
              {caseStudy.is_featured && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">Featured</Badge>
                </div>
              )}
            </div>

            {/* Case Study Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3 leading-tight">
                  {caseStudy.title}
                </h1>
                {caseStudy.subtitle && (
                  <p className="text-lg text-muted-foreground mb-4">{caseStudy.subtitle}</p>
                )}
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {caseStudy.client_name && (
                  <div>
                    <span className="text-muted-foreground">Client:</span>
                    <p className="font-medium text-accent">{caseStudy.client_name}</p>
                  </div>
                )}
                {caseStudy.industry && (
                  <div>
                    <span className="text-muted-foreground">Industry:</span>
                    <p className="font-medium">{caseStudy.industry}</p>
                  </div>
                )}
                {caseStudy.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{caseStudy.duration}</span>
                  </div>
                )}
                {caseStudy.team_size && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{caseStudy.team_size} members</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full">
                    Start Similar Project
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/projects" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-8 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudy.challenge && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    The Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpandableText 
                    text={caseStudy.challenge} 
                    maxLength={250}
                    className="text-muted-foreground leading-relaxed text-sm"
                  />
                </CardContent>
              </Card>
            )}

            {caseStudy.solution && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Eye className="h-5 w-5 text-success" />
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpandableText 
                    text={caseStudy.solution} 
                    maxLength={250}
                    className="text-muted-foreground leading-relaxed text-sm"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Technologies & Features */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Technologies */}
            {technologies.length > 0 && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Features */}
            {keyFeatures.length > 0 && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Key Features Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {Object.keys(results).length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Key Results</h2>
              <p className="text-muted-foreground">Measurable impact delivered for our client</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(results).map(([key, value], index) => (
                <Card key={index} className="card-modern text-center">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-xl lg:text-2xl font-bold text-accent mb-1">{value}</div>
                    <div className="text-xs text-muted-foreground">{key.replace(/_/g, ' ')}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-8">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <Card className="card-modern">
              <CardContent className="pt-6 pb-6">
                <blockquote className="text-lg text-muted-foreground italic leading-relaxed mb-4">
                  "{caseStudy.testimonial}"
                </blockquote>
                {caseStudy.testimonial_author && (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-neon-blue/20 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-primary text-sm">{caseStudy.testimonial_author}</div>
                      {caseStudy.testimonial_role && (
                        <div className="text-xs text-muted-foreground">{caseStudy.testimonial_role}</div>
                      )}
                      {caseStudy.client_name && (
                        <div className="text-xs text-accent">{caseStudy.client_name}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Project Gallery</h2>
            <div className="max-w-4xl mx-auto">
              <ImageGallery
                images={[
                  caseStudy.main_image || '/lovable-uploads/d5ddd61f-899e-4acf-a773-b03d953ab99f.png',
                  ...galleryImages
                ].filter(Boolean)}
                title={caseStudy.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      {(prevCaseStudy || nextCaseStudy) && (
        <section className="py-8 border-t border-border">
          <div className="container-custom max-w-2xl mx-auto">
            <div className="flex justify-between items-center gap-4">
              {prevCaseStudy ? (
                <Link to={`/case-study/${prevCaseStudy.case_id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                </Link>
              ) : <div className="flex-1"></div>}

              {nextCaseStudy ? (
                <Link to={`/case-study/${nextCaseStudy.case_id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full justify-end">
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : <div className="flex-1"></div>}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
