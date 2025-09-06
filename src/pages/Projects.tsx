import React, { useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, ExternalLink, Calendar, Users, Search, X, Filter, Grid, Layers, Star, TrendingUp, Zap, Code, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCompanyProjects } from '@/hooks/useCompanyProjects';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 12;

const Projects = () => {
  const { data: projects, isLoading, error } = useCompanyProjects();
  const projectsRef = useRef<HTMLElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | string>('All');
  const [domainFilter, setDomainFilter] = useState<'All' | string>('All');
  const [page, setPage] = useState(0);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const sortedProjects = useMemo(() => {
    if (!projects?.length) return [];
    return [...projects].sort(
      (a: any, b: any) => (a.preference_number ?? 999) - (b.preference_number ?? 999)
    );
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    sortedProjects.forEach((p: any) => {
      if (p?.categories) set.add(String(p.categories));
    });
    return ['All', ...Array.from(set)];
  }, [sortedProjects]);

  const domains = useMemo(() => {
    const set = new Set<string>();
    sortedProjects.forEach((p: any) => {
      if (p?.domain) set.add(String(p.domain));
    });
    return ['All', ...Array.from(set)];
  }, [sortedProjects]);

  const filteredProjects = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return sortedProjects.filter((p: any) => {
      const matchesSearch =
        !needle ||
        String(p.title ?? '').toLowerCase().includes(needle) ||
        String(p.short_description ?? p.description ?? '').toLowerCase().includes(needle) ||
        String(p.categories ?? '').toLowerCase().includes(needle) ||
        String(p.domain ?? '').toLowerCase().includes(needle) ||
        String(p.industry ?? '').toLowerCase().includes(needle);

      const matchesCategory = categoryFilter === 'All' || String(p.categories ?? '') === categoryFilter;
      const matchesDomain = domainFilter === 'All' || String(p.domain ?? '') === domainFilter;

      return matchesSearch && matchesCategory && matchesDomain;
    });
  }, [sortedProjects, searchTerm, categoryFilter, domainFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const paginatedProjects = useMemo(
    () => filteredProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [filteredProjects, page]
  );

  const onClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setDomainFilter('All');
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((p) => {
      const newPage = Math.max(p - 1, 0);
      setTimeout(scrollToProjects, 100);
      return newPage;
    });
  };

  const handleNextPage = () => {
    setPage((p) => {
      const newPage = Math.min(p + 1, totalPages - 1);
      setTimeout(scrollToProjects, 100);
      return newPage;
    });
  };

  const onChangeCategory = (val: string) => {
    setCategoryFilter(val as any);
    setPage(0);
  };

  const onChangeDomain = (val: string) => {
    setDomainFilter(val as any);
    setPage(0);
  };

  const hasActiveFilters = searchTerm || categoryFilter !== 'All' || domainFilter !== 'All';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <UniformHeroSection
          title="Our Projects"
          subtitle="Discover how we've helped businesses transform their operations with innovative technology solutions."
          breadcrumb="Projects"
        />

        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (error || !projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <UniformHeroSection
          title="Our Projects"
          subtitle="Discover how we've helped businesses transform their operations with innovative technology solutions."
          breadcrumb="Projects"
        />

        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Layers className="h-12 w-12 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">No Projects Available</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We're currently updating our project portfolio. Please check back soon for detailed insights into our most impactful projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-primary">
                  <Link to="/contact">Discuss Your Project</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <UniformHeroSection
        title="Our Projects"
        subtitle="Discover how we've helped businesses transform their operations with innovative technology solutions."
        breadcrumb="Projects"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/case-studies">View Case Studies</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-accent/5 via-background to-neon-blue/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{filteredProjects.length}+</div>
              <div className="text-sm text-muted-foreground font-medium">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Support</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground font-medium">Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search & Filters */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Find the Perfect Project</h2>
              <p className="text-muted-foreground text-lg">Discover projects that match your industry and requirements</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                placeholder="Search by title, description, technology, or industry..."
                className="pl-12 h-14 text-base border-2 border-muted focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-200 focus:shadow-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-6 border border-border/50">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="flex items-center gap-3 text-primary font-semibold">
                  <Filter className="h-5 w-5" />
                  <span>Filter Projects:</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-primary mb-2">Category</label>
                    <select
                      className="w-full h-11 border-2 border-border focus:border-accent/50 rounded-lg px-4 text-sm bg-background shadow-sm hover:border-accent/30 transition-all duration-200"
                      value={categoryFilter}
                      onChange={(e) => onChangeCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c === 'All' ? 'All Categories' : c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-primary mb-2">Domain</label>
                    <select
                      className="w-full h-11 border-2 border-border focus:border-accent/50 rounded-lg px-4 text-sm bg-background shadow-sm hover:border-accent/30 transition-all duration-200"
                      value={domainFilter}
                      onChange={(e) => onChangeDomain(e.target.value)}
                    >
                      {domains.map((d) => (
                        <option key={d} value={d}>
                          {d === 'All' ? 'All Domains' : d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="h-11 hover:bg-accent hover:text-white transition-all duration-200 border-2"
                      >
                        <X className="w-4 h-4 mr-2" /> Clear All
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Summary */}
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Showing <span className="font-semibold text-primary">{paginatedProjects.length}</span> of{' '}
                  <span className="font-semibold text-primary">{filteredProjects.length}</span> projects
                </span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Filtered Results
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="section-padding bg-background">
        <div className="container-custom">
          {paginatedProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">No Projects Found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn't find any projects matching your search criteria. Try adjusting your filters or search terms.
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={onClearFilters} className="btn-secondary">
                  <X className="w-4 h-4 mr-2" /> Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedProjects.map((project: any, index: number) => (
                  <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20 hover:-translate-y-1 bg-background/80 backdrop-blur-sm">
                    <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
                      <img
                        src={
                          project.image_url ||
                          '/lovable-uploads/d5ddd61f-899e-4acf-a773-b03d953ab99f.png'
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge
                          variant={(project.project_status ?? 'completed') === 'completed' ? 'default' : 'secondary'}
                          className="bg-background/90 backdrop-blur-sm"
                        >
                          {String(project.project_status ?? 'completed').charAt(0).toUpperCase()}
                          {String(project.project_status ?? 'completed').slice(1)}
                        </Badge>
                        {project.is_featured && (
                          <Badge className="bg-accent/90 text-white backdrop-blur-sm">
                            <Star className="w-3 h-3 mr-1" /> Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl group-hover:text-accent transition-colors duration-200 line-clamp-2">{project.title}</CardTitle>
                      </div>
                      <CardDescription className="line-clamp-3 text-base leading-relaxed">
                        {project.short_description || project.description}
                      </CardDescription>
                      
                      {(project.categories || project.domain) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.categories && (
                            <Badge variant="outline" className="text-xs bg-accent/5 border-accent/20 text-accent">
                              {project.categories}
                            </Badge>
                          )}
                          {project.domain && (
                            <Badge variant="outline" className="text-xs bg-neon-blue/5 border-neon-blue/20 text-neon-blue">
                              {project.domain}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{project.duration_months ?? '—'} months</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{project.team_size ?? '—'} team</span>
                          </div>
                        </div>

                        {Array.isArray(project.technologies_used) && project.technologies_used.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-primary flex items-center gap-2">
                              <Code className="w-4 h-4" /> Technologies
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies_used.slice(0, 3).map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-xs bg-muted/50">
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies_used.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-muted/50">
                                  +{project.technologies_used.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                          <Link to={`/project/${project.id}`} className="flex-1">
                            <Button variant="default" size="sm" className="w-full group-hover:bg-accent group-hover:text-white transition-all duration-200">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          {project.link && (
                            <Link to={project.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="text-accent hover:bg-accent hover:text-white transition-all duration-200">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={handlePreviousPage}
                    className="hover:bg-accent hover:text-white transition-colors border-2"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-sm font-medium text-primary">
                      Page {Math.min(page + 1, totalPages)} of {totalPages}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages - 1}
                    onClick={handleNextPage}
                    className="hover:bg-accent hover:text-white transition-colors border-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 via-background to-neon-blue/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology solutions that drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/consultation">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;