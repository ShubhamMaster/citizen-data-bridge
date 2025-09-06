
import React from 'react';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  className = '', 
  size = 'md',
  fullScreen = false 
}) => {
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
      <div className={`loader ${sizeClasses[size]} animate-spin transition-all duration-200`} />
    </div>
  );
};

export default Loading;
