
import React, { createContext, useContext } from 'react';

interface SEOContextType {
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  updatePageSEO: (config: any) => void;
  currentSEO: any;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export const useSEOContext = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEOContext must be used within SEOProvider');
  }
  return context;
};

interface SEOProviderProps {
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    // Basic tracking implementation
    console.log('Track event:', eventName, parameters);
  };

  const updatePageSEO = (config: any) => {
    // Basic SEO update implementation
    console.log('Update SEO:', config);
  };

  const currentSEO = {
    title: "Civora Nexus - Connecting Citizens Through Intelligent Innovation",
    description: "Civic and healthcare technology solutions for governments, NGOs, and communities."
  };

  return (
    <SEOContext.Provider value={{ trackEvent, updatePageSEO, currentSEO }}>
      {children}
    </SEOContext.Provider>
  );
};
