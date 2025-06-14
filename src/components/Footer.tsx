
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-civora-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">Civora Nexus</div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting citizens through intelligent innovation. Building civic and healthcare 
              technology for governments, NGOs, and communities.
            </p>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-civora-teal" />
              <a 
                href="mailto:civoranexus@gmail.com" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                civoranexus@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#industries" className="text-gray-300 hover:text-white transition-colors">Industries</a></li>
              <li><a href="#careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Partnerships */}
          <div>
            <h3 className="font-semibold mb-4">Partnerships</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Swachh Bharat</li>
              <li className="text-gray-300">Ayushman Bharat</li>
              <li className="text-gray-300">Smart City Missions</li>
              <li className="text-gray-300">Various NGOs</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Civora Nexus Pvt. Ltd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="border-civora-teal text-civora-teal hover:bg-civora-teal hover:text-white">
              Visit www.civoranexus.com
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
