
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CaseStudyLoading = () => {
  return (
    <section className="section-padding-sm bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Skeleton */}
          <div className="animate-fade-in">
            <Skeleton className="w-full h-64 lg:h-80 rounded-2xl mb-4" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-4/5 mb-3" />
              <Skeleton className="h-5 w-3/5 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Content sections */}
            <div className="space-y-4">
              <div>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div>
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <Skeleton className="h-5 w-1/3 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLoading;
