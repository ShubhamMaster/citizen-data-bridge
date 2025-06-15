
import React from "react";
import { Link } from "react-router-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Footer: React.FC = () => {
  const { content } = useWebsiteContent("contact");

  // Fallbacks for public contact info
  const email = content?.email || "civoranexus@gmail.com";
  const phone = content?.phone || "+91-9146 2687 10";
  const address = content?.address || "Sangamner, Maharashtra";

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

  return (
    <footer className="bg-civora-navy text-white pt-12 pb-8 px-4 mt-8 border-t border-civora-teal/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h4 className="text-2xl font-bold mb-2 tracking-tight">Civora Nexus</h4>
          <div className="text-civora-teal font-medium mb-1">{address}</div>
          <div>
            <span className="font-semibold">Email: </span>
            <a href={`mailto:${email}`} className="underline text-civora-teal">{email}</a>
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            <a href={`tel:${phone}`} className="underline text-civora-teal">{phone}</a>
          </div>
        </div>
        {/* Nav Links */}
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            {navLinks.map(link =>
              link.to.startsWith("/#") ? (
                <li key={link.name}>
                  <a
                    href={link.to}
                    className="hover:text-civora-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ) : (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="hover:text-civora-teal transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
