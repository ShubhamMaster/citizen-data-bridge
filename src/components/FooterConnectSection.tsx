import React from "react";
import { Mail, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type SocialLink = {
  platform: string;
  url: string;
};

type FooterConnectSectionProps = {
  email: string;
  socialLinks: SocialLink[];
};

const platformIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />
};

const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  email,
  socialLinks
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

      {socialLinks.map(({ platform, url }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform}
          className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-accent hover:text-white transition-all duration-200 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {platformIcons[platform] || <span>{platform[0]}</span>}
        </a>
      ))}
    </div>
  </div>
);

export default FooterConnectSection;
