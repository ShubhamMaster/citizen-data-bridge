
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Footer: React.FC = () => {
  const { content, loading } = useWebsiteContent("contact");

  // Fallbacks for public contact info
  const email = content?.email || "civoranexus@gmail.com";
  const phone = content?.phone || "+91-9146 2687 10";
  const address = content?.address || "Sangamner, Maharashtra";

  return (
    <footer className="bg-civora-navy text-white py-10 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h4 className="text-xl font-bold mb-1">Civora Nexus</h4>
        <p className="mb-1">{address}</p>
        <p className="mb-1">
          Email:{" "}
          <a href={`mailto:${email}`} className="underline text-civora-teal">{email}</a>
        </p>
        <p>
          Phone: <a href={`tel:${phone}`} className="underline text-civora-teal">{phone}</a>
        </p>
        <div className="mt-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
