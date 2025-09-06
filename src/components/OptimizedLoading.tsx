
import React, { useState, useEffect } from 'react';

interface OptimizedLoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  timeout?: number;
  onTimeout?: () => void;
}

const OptimizedLoading: React.FC<OptimizedLoadingProps> = ({ 
  className = '', 
  size = 'md',
  fullScreen = false,
  timeout = 3000,
  onTimeout
}) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Auto-hide loading after timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setShowLoading(false);
      onTimeout?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  // Use IntersectionObserver to detect when content becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.textContent) {
            // Hide loading when meaningful content appears
            setShowLoading(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all content elements that might contain page content
    const contentElements = document.querySelectorAll('main, .content, [data-content]');
    contentElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!showLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center w-full h-full min-h-[200px]';

  return (
    <div className={`${containerClasses} ${className} animate-fade-in`}>
      <div className={`loader ${sizeClasses[size]} animate-spin`} />
    </div>
  );
};

export default OptimizedLoading;
