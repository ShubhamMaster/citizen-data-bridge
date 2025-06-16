import React from "react";
import { Mail, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
type FooterConnectSectionProps = {
  email: string;
};
const socialLinks = [{
  Icon: Facebook,
  url: "https://facebook.com/",
  label: "Facebook"
}, {
  Icon: Instagram,
  url: "https://instagram.com/",
  label: "Instagram"
}, {
  Icon: Linkedin,
  url: "https://linkedin.com/",
  label: "LinkedIn"
}, {
  Icon: Twitter,
  url: "https://twitter.com/",
  label: "Twitter"
}, {
  Icon: Youtube,
  url: "https://youtube.com/",
  label: "YouTube"
}];
const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  email
}) => <div className="flex flex-col items-start mt-8 md:mt-0">
    <div className="mb-3">
      <span className="font-semibold text-lg text-civora-teal">Let's Connect</span>
      <p className="text-sm text-gray-200 mb-2 mt-1">
        Empowering communities through <br />smart civic & healthcare technology.
      </p>
    </div>
    <div className="flex gap-3 mt-2">
      <a href={`mailto:${email}`} aria-label="Email Us" className="hover:text-civora-teal transition-colors text-lg">
        
      </a>
      {socialLinks.map(({
      Icon,
      url,
      label
    }) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-civora-teal hover:text-white transition-colors w-8 h-8 mx-0">
          <Icon className="w-4 h-4" />
        </a>)}
    </div>
  </div>;
export default FooterConnectSection;