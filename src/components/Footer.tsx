
import React from "react";
import { Link } from "react-router-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  // Dynamically fetch contact info from Supabase 'website_content'
  const { content: contactContent } = useWebsiteContent("contact");

  // Fetch only once for performance. Provide fallback if data missing.
  const email = contactContent?.email || "civoranexus@gmail.com";
  const phone = contactContent?.phone || "+91-9146 2687 10";
  const address = contactContent?.address || "Sangamner, Maharashtra";

  // All navigation links
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/#services" },
    { name: "Industries", to: "/#industries" },
    { name: "Innovation Lab", to: "/innovation-lab" },
    { name: "Careers", to: "/careers" },
    { name: "Contact", to: "/contact" },
    { name: "Privacy", to: "/privacy" },
    { name: "Terms", to: "/terms" },
  ];

  // Group links for column layout
  const navGroups = [
    navLinks.slice(0, 3), // Home, About Us, Services
    navLinks.slice(3, 6), // Industries, Innovation Lab, Careers
    navLinks.slice(6, 9), // Contact, Privacy, Terms
  ];

  return (
    <footer className="bg-civora-navy text-white border-t border-civora-teal/10 mt-8 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

        {/* Brand / About block */}
        <div className="mb-8 md:mb-0 flex flex-col gap-2">
          {/* Logo as simple text, replace with <img> if logo is available */}
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <span className="sr-only">Civora Nexus Home</span>
            <span className="font-bold text-2xl tracking-tight group-hover:text-civora-teal transition-colors">Civora Nexus</span>
          </Link>
          <p className="text-civora-teal font-medium mb-0">{address}</p>
          <div className="flex items-center gap-2 mt-2">
            <Mail className="w-4 h-4 text-civora-teal" />
            <a href={`mailto:${email}`} className="underline hover:text-civora-teal transition-colors text-sm">{email}</a>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Phone className="w-4 h-4 text-civora-teal" />
            <a href={`tel:${phone}`} className="underline hover:text-civora-teal transition-colors text-sm">{phone}</a>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-civora-teal" />
            <span className="text-sm text-gray-200">{address}</span>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {navGroups.map((group, i) => (
            <nav key={i} aria-label={`Footer Nav ${i + 1}`}>
              <ul className="space-y-2">
                {group.map(link =>
                  link.to.startsWith("/#") ? (
                    <li key={link.name}>
                      <a
                        href={link.to}
                        className="hover:text-civora-teal transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-civora-teal rounded"
                      >
                        {link.name}
                      </a>
                    </li>
                  ) : (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="hover:text-civora-teal transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-civora-teal rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* Newsletter Signup or tagline */}
        <div className="flex flex-col items-start mt-8 md:mt-0">
          <div className="mb-3">
            <span className="font-semibold text-lg text-civora-teal">Let's Connect</span>
            <p className="text-sm text-gray-200 mb-2 mt-1">
              Empowering communities through <br />smart civic & healthcare technology.
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <a href={`mailto:${email}`} aria-label="Email Us" className="hover:text-civora-teal transition-colors text-lg">
              <Mail className="w-5 h-5" />
            </a>
            {/* Add social icons if needed */}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-8 pt-5 border-t border-civora-teal/10 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
