
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-civora-navy via-civora-navy to-civora-navy/90 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img 
                  src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
                  alt="Civora Nexus Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">Civora Nexus</div>
                <div className="text-sm text-civora-teal font-medium">Intelligent Innovation</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              Connecting citizens through intelligent innovation. Building civic and healthcare 
              technology for governments, NGOs, and communities worldwide.
            </p>
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
              <Mail size={18} className="text-civora-teal flex-shrink-0" />
              <a 
                href="mailto:civoranexus@gmail.com" 
                className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all"
              >
                civoranexus@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg text-civora-teal">Quick Links</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/innovation-lab" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Innovation Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Account */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg text-civora-teal">Legal & Account</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
            © 2024 Civora Nexus Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="border-civora-teal text-civora-teal hover:bg-civora-teal hover:text-white text-xs sm:text-sm px-4 sm:px-6 transition-all duration-300"
            >
              Visit www.civoranexus.com
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
