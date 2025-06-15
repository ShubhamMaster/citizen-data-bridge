
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

type FooterBrandSectionProps = {
  email: string;
  phone: string;
  address: string;
};

const FooterBrandSection: React.FC<FooterBrandSectionProps> = ({
  email,
  phone,
  address,
}) => (
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
);

export default FooterBrandSection;
