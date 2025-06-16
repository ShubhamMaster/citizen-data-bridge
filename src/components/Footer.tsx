
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import FooterBrandSection from "./FooterBrandSection";
import FooterNavColumns from "./FooterNavColumns";
import FooterConnectSection from "./FooterConnectSection";

const Footer: React.FC = () => {
  const { content: contactContent } = useWebsiteContent("contact");

  const email = contactContent?.email || "civoranexus@gmail.com";
  const phone = contactContent?.phone || "+91-9146 2687 10";
  const address = contactContent?.address || "Sangamner, Maharashtra";

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Projects", to: "/#projects" },
    { name: "Innovation Lab", to: "/innovation-lab" },
    { name: "Careers", to: "/careers" },
    { name: "Contact", to: "/contact" },
    { name: "Privacy", to: "/privacy" },
    { name: "Terms", to: "/terms" },
  ];

  const navGroups = [
    navLinks.slice(0, 3),
    navLinks.slice(3, 6),
    navLinks.slice(6, 9),
  ];

  return (
    <footer className="bg-gradient-to-br from-muted/50 to-background border-t border-border mt-16">
      {/* Main Footer Content */}
      <div className="container-custom section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          <FooterBrandSection email={email} phone={phone} address={address} />
          <FooterNavColumns navGroups={navGroups} />
          <FooterConnectSection email={email} />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border bg-muted/30">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
