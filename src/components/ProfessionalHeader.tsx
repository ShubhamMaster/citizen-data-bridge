
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    submenu: [
      { name: 'Our Story', href: '/about' },
      { name: 'Leadership', href: '/leadership' },
      { name: 'Mission & Vision', href: '/about#mission' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    submenu: [
      { name: 'AI Solutions', href: '/services#ai' },
      { name: 'Web Development', href: '/services#web' },
      { name: 'Consulting', href: '/services#consulting' },
    ]
  },
  { 
    name: 'Opportunities', 
    href: '/careers',
    submenu: [
      { name: 'Careers', href: '/careers' },
      { name: 'Internships', href: '/internships' },
      { name: 'Projects', href: '/projects' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

const ProfessionalHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`header-professional transition-all duration-300 ${scrolled ? 'shadow-medium' : ''}`}>
      <div className="container-professional">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus-ring rounded-xl p-2"
          >
            <img 
              src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
              alt="Civora Nexus Logo" 
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200" 
            />
            <div>
              <span className="text-xl font-bold text-neutral-800 group-hover:text-blue-600 transition-colors">
                Civora Nexus
              </span>
              <span className="block text-xs text-blue-600 font-semibold uppercase tracking-wide">
                Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className={`nav-link flex items-center gap-1 ${isActiveLink(item.href) ? 'active' : ''}`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-neutral-100 py-2 z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm text-neutral-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg mx-2 ${
                              isActiveLink(subItem.href) ? 'text-blue-600 bg-blue-50 font-medium' : ''
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`nav-link ${isActiveLink(item.href) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-xl text-neutral-600 hover:text-blue-600 hover:bg-blue-50"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <Link to="/contact">
              <Button className="btn-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl text-neutral-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-neutral-100 shadow-large z-50">
            <div className="container-professional py-6">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="w-full text-left nav-link flex items-center justify-between"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {activeDropdown === item.name && (
                          <div className="ml-4 mt-2 space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className={`block nav-link text-sm ${
                                  isActiveLink(subItem.href) ? 'text-blue-600 font-medium' : 'text-neutral-600'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={`nav-link ${isActiveLink(item.href) ? 'active' : ''}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-neutral-200 mt-4">
                  <Link to="/contact" className="block">
                    <Button className="btn-primary w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfessionalHeader;
