
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { NAVIGATION } from "@/constants/navigation";
import FooterBrandSection from "./FooterBrandSection";
import FooterConnectSection from "./FooterConnectSection";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { content: contactContent } = useWebsiteContent("contact");

  const email = contactContent?.email || "contact@civoranexus.com";
  const phone = contactContent?.phone || "+91-9146 2687 10";
  const address = contactContent?.address || "Sangamner, Maharashtra";

  // Flatten all navigation items including sub-items
  const getAllNavItems = () => {
    const allItems: { name: string; to: string }[] = [];
    
    NAVIGATION.forEach(main => {
      if (main.href) {
        allItems.push({ name: main.label, to: main.href });
      }
      
      if (main.subGroups) {
        main.subGroups.forEach(group => {
          group.items.forEach(item => {
            allItems.push({ name: item.label, to: item.href });
          });
        });
      }
    });
    
    return allItems;
  };

  const allNavItems = getAllNavItems();
  
  // Group navigation items into columns
  const itemsPerColumn = Math.ceil(allNavItems.length / 4);
  const navGroups = [
    allNavItems.slice(0, itemsPerColumn),
    allNavItems.slice(itemsPerColumn, itemsPerColumn * 2),
    allNavItems.slice(itemsPerColumn * 2, itemsPerColumn * 3),
    allNavItems.slice(itemsPerColumn * 3),
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 items-start">
          {/* Brand Section - Takes 2 columns */}
          <div className="md:col-span-2">
            <FooterBrandSection email={email} phone={phone} address={address} />
          </div>
          
          {/* Navigation Columns - Takes 3 columns */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {navGroups.map((group, i) => (
              <nav key={i} aria-label={`Footer Nav ${i + 1}`}>
                <ul className="space-y-3">
                  {group.map(link =>
                    link.to.startsWith("/#") ? (
                      <li key={link.name}>
                        <a
                          href={link.to}
                          className="text-white/80 hover:text-accent transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded block py-1"
                        >
                          {link.name}
                        </a>
                      </li>
                    ) : (
                      <li key={link.name}>
                        <Link
                          to={link.to}
                          className="text-white/80 hover:text-accent transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded block py-1"
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
          
          {/* Connect Section - Takes 1 column */}
          <div className="md:col-span-1">
            <FooterConnectSection email={email} />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 bg-primary/90">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-sm text-white/70 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-white/70 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-sm text-white/70 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
