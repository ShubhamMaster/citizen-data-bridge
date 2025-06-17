
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
      <h3 className="font-bold text-lg text-white mb-2">Let's Connect</h3>
      <p className="text-sm text-white/80 leading-relaxed">
        Stay updated with our latest innovations and community impact stories.
      </p>
    </div>
    
    <div className="flex gap-3 flex-wrap">
      <a 
        href={`mailto:${email}`} 
        aria-label="Email Us" 
        className="inline-flex items-center justify-center rounded-xl bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all duration-200 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Mail className="w-5 h-5" />
      </a>
      
      {socialLinks.map(({ Icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-accent hover:text-white transition-all duration-200 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  </div>
);

export default FooterConnectSection;
