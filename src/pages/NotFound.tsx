import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Phone, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    console.error('404 Error: Missing route:', location.pathname);

    const handleScroll = () => {
      setShowFooter(window.scrollY > 50); // show footer only if user scrolled
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <Link to="/" className="mb-10 block hover:opacity-90 transition">
          <img src="/logo.svg" alt="Company Logo" className="h-16 w-auto" />
        </Link>

        <h1 className="text-[120px] font-extrabold text-primary leading-none animate-fade-in">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-lg">
          Sorry, the page{" "}
          <span className="font-mono text-destructive">{location.pathname}</span>{" "}
          does not exist or has been moved.
        </p>

        {/* Action Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="hover:shadow-md">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover:shadow-md">
            <Link to="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Contact Support
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div> */}

        {/* Help Text */}
        <p className="text-sm text-muted-foreground mt-10">
          Need help?{" "}
          <Link
            to="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our team
          </Link>
        </p>
      </main>

      {/* Footer only shows when scrolled */}
      {showFooter && <Footer />}
    </div>
  );
};

export default NotFound;
