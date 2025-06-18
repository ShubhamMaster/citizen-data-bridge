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
  address
}) => <div className="mb-8 md:mb-0 flex flex-col gap-4">
    {/* Logo */}
    <Link to="/" className="inline-flex items-center gap-3 mb-4 group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-2">
      <img src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" alt="Civora Nexus Logo" className="w-12 h-12 object-contain" />
      <div>
        <span className="sr-only">Civora Nexus Home</span>
        <span className="font-bold text-2xl tracking-tight group-hover:text-accent transition-colors text-white">Civora Nexus</span>
        <span className="block text-xs text-accent font-semibold uppercase tracking-wide">Pvt Ltd</span>
      </div>
    </Link>
    
    <p className="text-white/80 text-sm mb-4 leading-relaxed max-w-sm">
      Empowering communities through innovative civic and healthcare technology solutions.
    </p>
    
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
          <Mail className="w-4 h-4 text-accent" />
        </div>
        <a href={`mailto:${email}`} className="text-white/80 hover:text-accent transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded">
          {email}
        </a>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
          <Phone className="w-4 h-4 text-accent" />
        </div>
        <a href={`tel:${phone}`} className="text-white/80 hover:text-accent transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded">
          {phone}
        </a>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
          <MapPin className="w-4 h-4 text-accent" />
        </div>
        <span className="text-white/80 text-sm">{address}</span>
      </div>
    </div>
  </div>;
export default FooterBrandSection;