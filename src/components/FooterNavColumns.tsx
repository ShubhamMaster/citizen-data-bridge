
import React from "react";
import { Link } from "react-router-dom";

type NavLink = {
  name: string;
  to: string;
};

type FooterNavColumnsProps = {
  navGroups: NavLink[][];
};

const FooterNavColumns: React.FC<FooterNavColumnsProps> = ({ navGroups }) => (
  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
    {navGroups.map((group, i) => (
      <nav key={i} aria-label={`Footer Nav ${i + 1}`}>
        <ul className="space-y-2">
          {group.map(link =>
            link.to.startsWith("/#") ? (
              <li key={link.name}>
                <a
                  href={link.to}
                  className="hover:text-civora-teal transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-civora-teal rounded"
                >
                  {link.name}
                </a>
              </li>
            ) : (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="hover:text-civora-teal transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-civora-teal rounded"
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    ))}
  </div>
);

export default FooterNavColumns;
