
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial = stored === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
};

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about-us',
    submenu: [
      { name: 'Our Story', href: '/about-us' },
      { name: 'Leadership', href: '/about-us/leadership' },
      { name: 'Board of Directors', href: '/about-us/board-of-directors' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    submenu: [
      { name: 'AI Solutions', href: '/services/ai-solutions' },
      { name: 'SaaS Development', href: '/services/saas-development' },
      { name: 'Automation', href: '/services/automation' },
    ]
  },
  { 
    name: 'Projects', 
    href: '/projects',
    submenu: [
      { name: 'Case Studies', href: '/projects/case-studies' },
      { name: 'Success Stories', href: '/projects/client-success-stories' },
    ]
  },
  { 
    name: 'Careers', 
    href: '/careers',
    submenu: [
      { name: 'Open Positions', href: '/careers/jobs' },
      { name: 'Internships', href: '/careers/internships' },
      { name: 'Life at Civora', href: '/careers/life' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

const ModernHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <header className={`nav-modern transition-all duration-300 ${scrolled ? 'shadow-medium' : 'shadow-soft'}`}>
      <div className="container-modern">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-xl p-2"
          >
            <img 
              src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
              alt="Civora Nexus Logo" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200" 
            />
            <div>
              <span className="text-xl font-bold text-primary font-heading group-hover:text-accent transition-colors">
                Civora Nexus
              </span>
              <span className="block text-xs text-accent font-semibold uppercase tracking-wide">
                Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
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
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-large border border-gray-100 py-2 z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-3 text-sm text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors rounded-xl mx-2 ${
                              isActiveLink(subItem.href) ? 'text-accent bg-accent/5 font-semibold' : ''
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
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-xl"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            
            <Link to="/contact">
              <Button className="btn-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-large z-50">
            <div className="container-modern py-6">
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
                                  isActiveLink(subItem.href) ? 'text-accent font-semibold' : 'text-gray-600'
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
                
                <div className="pt-4 border-t border-gray-200 mt-4">
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

export default ModernHeader;
