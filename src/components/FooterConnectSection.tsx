
import React from "react";
import { Mail } from "lucide-react";

type FooterConnectSectionProps = {
  email: string;
};

const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({ email }) => (
  <div className="flex flex-col items-start mt-8 md:mt-0">
    <div className="mb-3">
      <span className="font-semibold text-lg text-civora-teal">Let's Connect</span>
      <p className="text-sm text-gray-200 mb-2 mt-1">
        Empowering communities through <br />smart civic & healthcare technology.
      </p>
    </div>
    <div className="flex gap-3 mt-2">
      <a href={`mailto:${email}`} aria-label="Email Us" className="hover:text-civora-teal transition-colors text-lg">
        <Mail className="w-5 h-5" />
      </a>
      {/* Add social icons if needed */}
    </div>
  </div>
);

export default FooterConnectSection;
