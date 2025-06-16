
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
  <div className="mb-8 md:mb-0 flex flex-col gap-4">
    {/* Logo */}
    <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
      <img 
        src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
        alt="Civora Nexus Logo" 
        className="w-8 h-8 object-contain" 
      />
      <div>
        <span className="font-bold text-xl tracking-tight text-brand-navy group-hover:text-brand-teal transition-colors">
          Civora Nexus
        </span>
        <span className="block text-xs text-brand-teal font-medium uppercase tracking-wide">
          Pvt Ltd
        </span>
      </div>
    </Link>

    <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xs">
      Empowering communities through smart civic & healthcare technology solutions.
    </p>

    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
        <a 
          href={`mailto:${email}`} 
          className="text-sm text-muted-foreground hover:text-brand-navy transition-colors duration-200"
        >
          {email}
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
        <a 
          href={`tel:${phone}`} 
          className="text-sm text-muted-foreground hover:text-brand-navy transition-colors duration-200"
        >
          {phone}
        </a>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0" />
        <span className="text-sm text-muted-foreground">{address}</span>
      </div>
    </div>
  </div>
);

export default FooterBrandSection;
