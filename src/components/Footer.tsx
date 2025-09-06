import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import FooterBrandSection from "./FooterBrandSection";
import FooterConnectSection from "./FooterConnectSection";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const COMPANY_ID = "9622904d-4f26-4e99-8909-7beb93f7babf";
  const LINKEDIN_ID = "social_linkedin_761586";
  const INSTAGRAM_ID = "social_instagram_856952";
  const TWITTER_ID = "social_twitter_652832";
  const YOUTUBE_ID = "social_youtube_435962";
  const ADDRESS_ID = "head_office_422605";
  const CONTACT_ID = "support_contact_125625";

  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);
  const [address, setAddress] = useState<string>("Loading...");
  const [contact, setContact] = useState<{ email: string; phone: string }>({
    email: "Loading...",
    phone: "Loading..."
  });

  const fetchData = async () => {
    // Fetch social links
    const { data: socialData } = await supabase
      .from("civora_nexus_social_links")
      .select("social_id, url")
      .in("social_id", [LINKEDIN_ID, INSTAGRAM_ID, TWITTER_ID, YOUTUBE_ID]);

    if (socialData) {
      const mapped = socialData.map(item => {
        let platform = "";
        switch (item.social_id) {
          case LINKEDIN_ID: platform = "linkedin"; break;
          case INSTAGRAM_ID: platform = "instagram"; break;
          case TWITTER_ID: platform = "twitter"; break;
          case YOUTUBE_ID: platform = "youtube"; break;
        }
        return { platform, url: item.url };
      });
      setSocialLinks(mapped);
    }

    // Fetch Address
    const { data: addressData } = await supabase
      .from("civora_nexus_company_addresses")
      .select("*")
      .eq("address_id", ADDRESS_ID)
      .single();

    if (addressData) {
      setAddress(`${addressData.street_address}, ${addressData.city}, ${addressData.state}`);
    }

    // Fetch Contact
    const { data: contactData } = await supabase
      .from("civora_nexus_company_contacts")
      .select("email, phone")
      .eq("contact_id", CONTACT_ID)
      .single();

    if (contactData) {
      setContact({
        email: contactData.email || "contact@civoranexus.com",
        phone: "+91 " + contactData.phone
      });
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime subscriptions
    const channel = supabase.channel('footer-updates');

    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'civora_nexus_social_links' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'civora_nexus_company_addresses' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'civora_nexus_company_contacts' },
        () => fetchData()
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Footer nav and render (same as your code)

  const functionalNavItems = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about-us" },
    { name: "Services", to: "/services" },
    { name: "Contact", to: "/contact" },
    { name: "AI Solutions", to: "/services/ai-solutions" },
    { name: "Automation", to: "/services/automation" },
    { name: "SaaS Development", to: "/services/saas-development" },
    { name: "Careers", to: "/careers" },
    { name: "Leadership", to: "/about-us/leadership" },
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" }
  ];

  const itemsPerColumn = Math.ceil(functionalNavItems.length / 3);
  const navGroups = [
    functionalNavItems.slice(0, itemsPerColumn),
    functionalNavItems.slice(itemsPerColumn, itemsPerColumn * 2),
    functionalNavItems.slice(itemsPerColumn * 2)
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <FooterBrandSection email={contact.email} phone={contact.phone} address={address} />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {navGroups.map((group, i) => (
              <nav key={i} aria-label={`Footer Nav ${i + 1}`}>
                <ul className="space-y-3">
                  {group.map(link => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-white/80 hover:text-accent transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="md:col-span-1">
            <FooterConnectSection email={contact.email} socialLinks={socialLinks} />
          </div>
        </div>
      </div>

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
              <Link to="/compliance/accessibility" className="text-sm text-white/70 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded">
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
