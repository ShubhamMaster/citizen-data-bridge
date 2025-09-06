
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Users, Target, CheckCircle, ExternalLink, MapPin, Calendar } from "lucide-react";
import { WebsiteCaseStudy } from '@/hooks/useCaseStudies';
import { Link } from "react-router-dom";
import ExpandableText from './ExpandableText';

interface CaseStudyCardProps {
  project: WebsiteCaseStudy;
  index: number;
}

const CaseStudyCard = ({ project, index }: CaseStudyCardProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const isReverse = index % 2 === 1;
  
  // Parse JSON fields safely
  const results = project.results as Record<string, string> || {};
  const technologies = project.technologies as string[] || [];
  const keyFeatures = project.key_features as string[] || [];
  const galleryImages = project.gallery_images as string[] || [];
  
  // All images for gallery
  const allImages = [
    project.main_image || '/lovable-uploads/d5ddd61f-899e-4acf-a773-b03d953ab99f.png',
    ...galleryImages
  ].filter(Boolean);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  
  return (
    <section className={`section-padding-sm ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Section */}
          <div className={`${isReverse ? 'lg:order-2' : ''} animate-fade-in`}>
            <div className="relative rounded-2xl overflow-hidden shadow-soft group">
              <img 
                src={allImages[selectedImageIndex]} 
                alt={project.title}
                className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {project.category && (
                <Badge className="absolute top-4 left-4 bg-accent/90 text-white border-0">
                  {project.category}
                </Badge>
              )}
            </div>
            
            {/* Gallery Preview with Toggle */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                {allImages.slice(0, 5).map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${project.title} gallery ${imgIndex + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer transition-all duration-200 ${
                      imgIndex === selectedImageIndex 
                        ? 'border-2 border-accent ring-2 ring-accent/20' 
                        : 'border-2 border-transparent hover:border-accent/50'
                    }`}
                    loading="lazy"
                    onClick={() => handleThumbnailClick(imgIndex)}
                  />
                ))}
                {allImages.length > 5 && (
                  <div className="w-20 h-20 bg-muted/50 rounded-lg flex items-center justify-center text-sm text-muted-foreground flex-shrink-0">
                    +{allImages.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className={`${isReverse ? 'lg:order-1' : ''} space-y-6 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {project.duration}
                  </div>
                )}
                {project.team_size && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {project.team_size} members
                  </div>
                )}
                {project.industry && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {project.industry}
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3 leading-tight">
                {project.title}
              </h2>
              
              {project.subtitle && (
                <p className="text-lg text-muted-foreground mb-2">{project.subtitle}</p>
              )}
              
              {project.client_name && (
                <p className="text-accent font-medium">Client: {project.client_name}</p>
              )}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4">
              {project.challenge && (
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Challenge
                  </h3>
                  <ExpandableText 
                    text={project.challenge} 
                    maxLength={150}
                    className="text-muted-foreground leading-relaxed"
                  />
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Solution
                  </h3>
                  <ExpandableText 
                    text={project.solution} 
                    maxLength={150}
                    className="text-muted-foreground leading-relaxed"
                  />
                </div>
              )}
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 6).map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                  {technologies.length > 6 && (
                    <Badge variant="outline" className="text-muted-foreground">
                      +{technologies.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {Object.keys(results).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Key Results
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(results).slice(0, 4).map(([key, value], resultIndex) => (
                    <div key={resultIndex} className="bg-gradient-to-br from-accent/5 to-neon-blue/5 rounded-lg p-3 border border-accent/10">
                      <div className="text-lg lg:text-xl font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground">{key.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to={`/case-studies/${project.case_id}`} className="flex-1">
                <Button variant="default" className="w-full">
                  View Full Case Study
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact" className="flex-1">
                <Button variant="outline" className="w-full">
                  Start Similar Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Sections for Key Features and Testimonial */}
        {(keyFeatures.length > 0 || project.testimonial) && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Key Features */}
            {keyFeatures.length > 0 && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Key Features Delivered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {keyFeatures.slice(0, 5).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                    {keyFeatures.length > 5 && (
                      <li className="text-sm text-accent font-medium">
                        +{keyFeatures.length - 5} more features...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ExpandableText 
                    text={`"${project.testimonial}"`}
                    maxLength={200}
                    className="text-muted-foreground italic leading-relaxed"
                  />
                  {project.testimonial_author && (
                    <div className="flex items-center space-x-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-neon-blue/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm">{project.testimonial_author}</div>
                        {project.testimonial_role && (
                          <div className="text-xs text-muted-foreground">{project.testimonial_role}</div>
                        )}
                        {project.client_name && (
                          <div className="text-xs text-accent">{project.client_name}</div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudyCard;
