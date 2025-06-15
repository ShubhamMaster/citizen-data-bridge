import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for login/logout and update isLoggedIn
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Innovation Lab', href: '/innovation-lab' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <img 
                  src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
                  alt="Civora Nexus Logo" 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-civora-teal/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-civora-navy group-hover:text-civora-teal transition-colors duration-300">
                  Civora Nexus
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Intelligent Innovation
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              item.href.startsWith('/#') ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 ${
                    isActive(item.href) 
                      ? 'text-civora-teal bg-civora-teal/10' 
                      : 'text-gray-700 hover:text-civora-navy'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 ${
                    isActive(item.href) 
                      ? 'text-civora-teal bg-civora-teal/10' 
                      : 'text-gray-700 hover:text-civora-navy'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/admin" 
                  className="text-gray-700 hover:text-civora-navy transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                </Link>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setIsLoggedIn(false);
                    navigate("/");
                  }}
                  className="border-gray-300 hover:border-civora-teal hover:text-civora-teal"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-gray-300 hover:border-civora-teal hover:text-civora-teal">
                    Login
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-civora-teal to-civora-navy hover:from-civora-teal/90 hover:to-civora-navy/90 text-white shadow-lg" size="sm">
                    Contact Us
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-civora-navy p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-2 pt-4">
              {navigation.map((item) => (
                item.href.startsWith('/#') ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`font-medium transition-all duration-200 text-left px-4 py-3 rounded-lg ${
                      isActive(item.href) 
                        ? 'text-civora-teal bg-civora-teal/10' 
                        : 'text-gray-700 hover:text-civora-navy hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium transition-all duration-200 px-4 py-3 rounded-lg block ${
                      isActive(item.href) 
                        ? 'text-civora-teal bg-civora-teal/10' 
                        : 'text-gray-700 hover:text-civora-navy hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              <div className="pt-4 space-y-3 border-t border-gray-100">
                {isLoggedIn ? (
                  <>
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-gray-300 hover:border-civora-teal hover:text-civora-teal" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-300 hover:border-civora-teal hover:text-civora-teal"
                      size="sm"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-gray-300 hover:border-civora-teal hover:text-civora-teal" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-gradient-to-r from-civora-teal to-civora-navy hover:from-civora-teal/90 hover:to-civora-navy/90 text-white w-full shadow-lg" size="sm">
                        Contact Us
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
