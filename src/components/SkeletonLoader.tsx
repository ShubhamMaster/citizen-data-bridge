
import React from "react";

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'image';
  lines?: number;
  width?: string;
  height?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = "",
  variant = 'text',
  lines = 1,
  width = "100%",
  height = "auto"
}) => {
  const baseClass = "skeleton rounded";
  
  const variants = {
    text: "h-4",
    card: "h-48 rounded-2xl",
    avatar: "w-12 h-12 rounded-full",
    button: "h-10 rounded-xl",
    image: "aspect-video rounded-2xl"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClass} ${variants.text}`}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} ${variants[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

// Specific skeleton components for common use cases
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`card-modern ${className}`}>
    <SkeletonLoader variant="image" className="mb-6" />
    <SkeletonLoader variant="text" className="mb-4" width="60%" />
    <SkeletonLoader variant="text" lines={3} className="mb-6" />
    <SkeletonLoader variant="button" width="120px" />
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background">
    {/* Header skeleton */}
    <div className="nav-modern">
      <div className="container-modern py-4 flex items-center justify-between">
        <SkeletonLoader variant="text" width="150px" />
        <div className="hidden lg:flex gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonLoader key={i} variant="text" width="80px" />
          ))}
        </div>
        <SkeletonLoader variant="button" width="120px" />
      </div>
    </div>

    {/* Hero section skeleton */}
    <div className="section-padding">
      <div className="container-modern text-center">
        <SkeletonLoader variant="text" className="mb-6 mx-auto" width="300px" height="60px" />
        <SkeletonLoader variant="text" lines={3} className="mb-8 mx-auto max-w-3xl" />
        <div className="flex gap-4 justify-center mb-16">
          <SkeletonLoader variant="button" width="140px" />
          <SkeletonLoader variant="button" width="140px" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <SkeletonLoader variant="text" className="mb-2" width="60px" height="40px" />
              <SkeletonLoader variant="text" width="80px" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Content section skeleton */}
    <div className="section-padding-sm bg-gray-50">
      <div className="container-modern">
        <div className="text-center mb-16">
          <SkeletonLoader variant="text" className="mb-4 mx-auto" width="300px" height="40px" />
          <SkeletonLoader variant="text" lines={2} className="mx-auto max-w-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
