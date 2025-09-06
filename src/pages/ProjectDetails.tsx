
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import ImageGallery from '@/components/ImageGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Globe, MapPin, ArrowLeft } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) throw new Error('Project ID is required');
      
      const { data, error } = await supabase
        .from('company_project')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <UniformHeroSection 
          title=""
          subtitle=""
          breadcrumb="Projects"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <UniformHeroSection 
          title="Error"
          subtitle=""
          breadcrumb="Projects"
        />
        <div className="container mx-auto px-4 py-16">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <UniformHeroSection 
          title="Not Found"
          subtitle=""
          breadcrumb="Projects"
        />
        <div className="container mx-auto px-4 py-16">
          <p>Project with id {id} not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection 
        title={project.title}
        subtitle={project.short_description || ""}
        breadcrumb="Projects"
      />

      {project.project_gallery && Array.isArray(project.project_gallery) && project.project_gallery.length > 0 && (
        <ImageGallery title={project.title} images={project.project_gallery as string[]} />
      )}

      <div className="container mx-auto px-4 py-16 space-y-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/projects')}
          className="mb-6 hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
        <div className="flex items-center space-x-4">
          {project.project_status && (
            <Badge>{project.project_status}</Badge>
          )}
          {project.start_date && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(project.start_date).toLocaleDateString()}</span>
            </div>
          )}
          {project.team_size && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{project.team_size}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About the Project</h2>
          <p>{project.description || project.full_description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Key Technologies</h3>
            <ul className="list-disc list-inside space-y-2">
              {project.technologies_used && Array.isArray(project.technologies_used) && project.technologies_used.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Project Details</h3>
            <div className="space-y-2">
              {project.link && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Visit Website
                  </a>
                </div>
              )}
              {project.industry && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.industry}</span>
                </div>
              )}
              {project.client_name && (
                <div>
                  <h4 className="font-semibold">Client:</h4>
                  <p>{project.client_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
