
import React from "react";
import { Mail, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type FooterConnectSectionProps = {
  email: string;
};

const socialLinks = [
  {
    Icon: Facebook,
    url: "https://facebook.com/",
    label: "Facebook"
  },
  {
    Icon: Instagram,
    url: "https://instagram.com/",
    label: "Instagram"
  },
  {
    Icon: Linkedin,
    url: "https://linkedin.com/",
    label: "LinkedIn"
  },
  {
    Icon: Twitter,
    url: "https://twitter.com/",
    label: "Twitter"
  },
  {
    Icon: Youtube,
    url: "https://youtube.com/",
    label: "YouTube"
  }
];

const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  email
}) => (
  <div className="flex flex-col items-start mt-8 md:mt-0">
    <div className="mb-6">
      <h3 className="font-semibold text-lg text-brand-navy mb-2">Let's Connect</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Empowering communities through smart civic & healthcare technology.
      </p>
    </div>
    
    <div className="flex gap-3 mt-2">
      <a 
        href={`mailto:${email}`} 
        aria-label="Email Us" 
        className="inline-flex items-center justify-center rounded-full bg-brand-navy text-white hover:bg-brand-navy-light transition-colors duration-200 w-10 h-10 focus-ring"
      >
        <Mail className="w-4 h-4" />
      </a>
      {socialLinks.map(({ Icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center justify-center rounded-full bg-muted text-brand-navy hover:bg-brand-teal hover:text-white transition-colors duration-200 w-10 h-10 focus-ring"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  </div>
);

export default FooterConnectSection;
