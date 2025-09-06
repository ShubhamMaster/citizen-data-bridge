import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCompanyProjects } from '@/hooks/useCompanyProjects';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectsSection = () => {
  const { data: projects, isLoading, error } = useCompanyProjects();
  const [currentPage, setCurrentPage] = useState(0);

  if (isLoading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !projects || projects.length === 0) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Projects</h2>
            <p className="text-muted-foreground">No projects available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Pagination logic
  const firstSlot = projects.slice(0, 3);
  const nextSlots = [];
  for (let i = 3; i < projects.length; i += 3) {
    nextSlots.push(projects.slice(i, i + 3));
  }

  const allSlots = [firstSlot, ...nextSlots];
  const displayedProjects = allSlots[currentPage];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions that have transformed businesses and communities worldwide.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects?.map((project) => (
            <div
              key={project.id}
              className="card-modern overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              {project.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.short_description || project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.industry && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {project.industry}
                    </span>
                  )}
                  {project.project_status && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.project_status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.project_status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.project_status.charAt(0).toUpperCase() + project.project_status.slice(1)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Link to={`/project/${project.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-accent group-hover:text-white transition-colors"
                    >
                      Learn More
                    </Button>
                  </Link>
                  {project.link && (
                    <Link to={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                        View Live →
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          {currentPage > 0 && (
            <Button onClick={() => setCurrentPage(currentPage - 1)} variant="outline" size="lg" className="px-8">
              Previous
            </Button>
          )}
          {currentPage < allSlots.length - 1 && (
            <Button onClick={() => setCurrentPage(currentPage + 1)} variant="outline" size="lg" className="px-8">
              Show More
            </Button>
          )}
          <Link to="/projects">
            <Button variant="default" size="lg" className="px-8">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
