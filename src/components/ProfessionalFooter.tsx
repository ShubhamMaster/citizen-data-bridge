
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const ProfessionalFooter: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const opportunities = [
    { name: "Careers", href: "/careers" },
    { name: "Internships", href: "/internships" },
    { name: "Projects", href: "/projects" },
    { name: "Apply Now", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Accessibility", href: "/accessibility" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      {/* Main Footer */}
      <div className="container-professional py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
                alt="Civora Nexus Logo" 
                className="w-10 h-10 object-contain" 
              />
              <div>
                <span className="text-xl font-bold text-neutral-800">Civora Nexus</span>
                <span className="block text-xs text-blue-600 font-semibold uppercase tracking-wide">Pvt Ltd</span>
              </div>
            </Link>
            
            <p className="text-neutral-600 mb-6 max-w-md">
              Empowering communities through innovative civic and healthcare technology solutions. 
              Building the future of digital governance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <a href="mailto:contact@civoranexus.com" className="text-neutral-600 hover:text-blue-600 transition-colors">
                  contact@civoranexus.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <a href="tel:+91-9146268710" className="text-neutral-600 hover:text-blue-600 transition-colors">
                  +91-9146 2687 10
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-neutral-600">Sangamner, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-neutral-600 hover:text-blue-600 transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-4">Opportunities</h3>
            <ul className="space-y-2">
              {opportunities.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-neutral-600 hover:text-blue-600 transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-neutral-200 bg-white">
        <div className="container-professional py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors focus-ring"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              
              {/* Legal Links */}
              <div className="flex items-center gap-4 text-sm">
                {legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-neutral-500 hover:text-blue-600 transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
