
import React, { useState, useEffect, useRef } from 'react';
import OptimizedLoading from './OptimizedLoading';

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  timeout?: number;
}

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({ 
  children, 
  fallback,
  timeout = 2000 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if content is ready
    const checkContentReady = () => {
      if (containerRef.current) {
        const hasContent = containerRef.current.textContent?.trim().length > 0;
        const hasImages = containerRef.current.querySelectorAll('img').length > 0;
        
        if (hasContent || hasImages) {
          setIsLoaded(true);
          setShowFallback(false);
        }
      }
    };

    // Check immediately and then periodically
    checkContentReady();
    const interval = setInterval(checkContentReady, 100);

    // Timeout fallback
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setShowFallback(false);
    }, timeout);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [timeout]);

  return (
    <div className="relative">
      {showFallback && (
        <div className="absolute inset-0 z-10">
          {fallback || <OptimizedLoading fullScreen={false} />}
        </div>
      )}
      <div 
        ref={containerRef}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        data-content
      >
        {children}
      </div>
    </div>
  );
};

export default ProgressiveLoader;
