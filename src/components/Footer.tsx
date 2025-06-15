import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import FooterBrandSection from "./FooterBrandSection";
import FooterNavColumns from "./FooterNavColumns";
import FooterConnectSection from "./FooterConnectSection";

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
    { name: "Services", to: "/services" },
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
        <FooterBrandSection email={email} phone={phone} address={address} />
        <FooterNavColumns navGroups={navGroups} />
        <FooterConnectSection email={email} />
      </div>
      <div className="max-w-7xl mx-auto text-center mt-8 pt-5 border-t border-civora-teal/10 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
