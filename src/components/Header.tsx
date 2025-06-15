
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAVIGATION, NavItem } from "@/constants/navigation";

// Updated recursive submenu renderer for up to 3 levels
const SubMenu: React.FC<{
  items: NavItem[];
  closeMenu?: () => void;
  level?: number;
}> = ({ items, closeMenu, level = 1 }) => (
  <ul className={level === 1 ? "space-y-1" : "pl-4 space-y-0"}>
    {items.map((item) => (
      <li key={item.label} className="relative">
        {item.children ? (
          // Nested children (level 2 or 3)
          <>
            <span className="block py-1.5 px-3 rounded hover:bg-civora-teal/10 hover:text-civora-teal focus:bg-civora-teal/10 focus:text-civora-teal transition-colors font-semibold cursor-default">
              {item.label}
            </span>
            <SubMenu items={item.children} closeMenu={closeMenu} level={level + 1} />
          </>
        ) : (
          <Link
            to={item.href ?? "#"}
            className="block py-1.5 px-3 rounded hover:bg-civora-teal/10 hover:text-civora-teal focus:bg-civora-teal/10 focus:text-civora-teal transition-colors"
            tabIndex={0}
            onClick={closeMenu} // Only triggers on actual click, after navigation
          >
            {item.label}
          </Link>
        )}
      </li>
    ))}
  </ul>
);

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopDropdown, setDesktopDropdown] = React.useState<string | null>(null);
  const [dropdownHovering, setDropdownHovering] = React.useState(false);
  const [mobileAccordions, setMobileAccordions] = React.useState<Record<string, boolean>>({});
  const location = useLocation();

  const isLinkActive = (href?: string) =>
    href && location.pathname === href;

  // Updated dropdown logic for better submenu click handling
  const handleDropdownEnter = (label: string) => {
    setDesktopDropdown(label);
    setDropdownHovering(true);
  };
  const handleDropdownLeave = () => {
    setDropdownHovering(false);
    setTimeout(() => {
      if (!dropdownHovering) setDesktopDropdown(null);
    }, 100);
  };

  // Recursive Desktop Dropdown Menu
  const renderDesktopMenu = (item: NavItem) => {
    if (!item.children) {
      return (
        <Link
          key={item.label}
          to={item.href ?? "#"}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isLinkActive(item.href)
            ? "text-civora-teal bg-civora-teal/10"
            : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"
            } focus:outline-civora-teal`}
          tabIndex={0}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <div
        key={item.label}
        className="relative group"
        onMouseEnter={() => handleDropdownEnter(item.label)}
        onFocus={() => handleDropdownEnter(item.label)}
        onMouseLeave={handleDropdownLeave}
        onBlur={handleDropdownLeave}
        tabIndex={-1}
      >
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors focus:outline-civora-teal ${desktopDropdown === item.label
            ? "text-civora-teal bg-civora-teal/10"
            : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"
            }`}
          aria-haspopup="menu"
          aria-expanded={desktopDropdown === item.label}
          aria-controls={`desktop-dropdown-${item.label}`}
          onClick={() => setDesktopDropdown(item.label)}
          tabIndex={0}
        >
          {item.label}
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        {desktopDropdown === item.label && (
          <div
            id={`desktop-dropdown-${item.label}`}
            role="menu"
            aria-label={item.label}
            className="absolute left-0 mt-2 min-w-[270px] bg-white border border-gray-200 shadow-xl rounded-lg p-5 z-50"
            onMouseEnter={() => setDropdownHovering(true)}
            onMouseLeave={() => {
              setDropdownHovering(false);
              setTimeout(() => {
                if (!dropdownHovering) setDesktopDropdown(null);
              }, 100);
            }}
            // Allow clicking nested links without menu closing first
          >
            <SubMenu items={item.children} closeMenu={() => setDesktopDropdown(null)} />
          </div>
        )}
      </div>
    );
  };

  // Recursive Mobile Accordion Navigation
  const renderMobileMenu = (item: NavItem) => {
    if (!item.children) {
      return (
        <li key={item.label}>
          <Link
            to={item.href ?? "#"}
            className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isLinkActive(item.href)
              ? "text-civora-teal bg-civora-teal/10"
              : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"
              } focus:outline-civora-teal`}
            onClick={() => setMobileOpen(false)}
            tabIndex={0}
          >
            {item.label}
          </Link>
        </li>
      );
    }
    return (
      <li key={item.label}>
        <button
          className={`w-full flex justify-between items-center px-4 py-3 rounded-lg font-medium transition-colors focus:outline-civora-teal ${mobileAccordions[item.label]
            ? "text-civora-teal bg-civora-teal/10"
            : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"
            }`}
          onClick={() =>
            setMobileAccordions((prev) => ({
              ...prev,
              [item.label]: !prev[item.label],
            }))
          }
          aria-expanded={mobileAccordions[item.label] ? "true" : "false"}
          aria-controls={`mobile-submenu-${item.label}`}
          tabIndex={0}
        >
          {item.label}
          <svg
            className={`ml-2 w-4 h-4 transition-transform ${mobileAccordions[item.label] ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div
          id={`mobile-submenu-${item.label}`}
          className={`pl-4 border-l ml-2 transition-all duration-300 ${mobileAccordions[item.label]
              ? "max-h-[700px] opacity-100 mt-2"
              : "max-h-0 opacity-0 overflow-hidden"
            }`}
          role="region"
          aria-hidden={!mobileAccordions[item.label]}
        >
          <ul className="flex flex-col gap-1">
            {item.children.map((sub) => renderMobileMenu(sub))}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-gray-200 backdrop-blur-md" aria-label="Site navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus:outline-civora-teal">
          <img
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png"
            alt="Civora Nexus Pvt Ltd Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <span className="text-xl font-bold text-civora-navy">Civora Nexus</span>
            <span className="block text-xs text-civora-teal font-semibold">Pvt Ltd</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-1 items-center ml-6" role="navigation" aria-label="Main navigation">
          {NAVIGATION.map(renderDesktopMenu)}
          <Link
            to="/request-demo"
            className="ml-4 px-5 py-2 font-semibold text-white bg-civora-teal hover:bg-civora-navy transition-colors rounded-lg shadow focus:outline-civora-teal"
            tabIndex={0}
          >Request Demo</Link>
        </nav>
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded text-civora-navy hover:bg-gray-200 hover:text-civora-teal focus:outline-civora-teal"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 bg-white border-t border-gray-100 shadow ${mobileOpen ? "max-h-[900px] py-4 px-4" : "max-h-0 overflow-hidden"}`}>
        <ul className="flex flex-col gap-2">
          {NAVIGATION.map(renderMobileMenu)}
          {/* CTA */}
          <li className="mt-2">
            <Link
              to="/request-demo"
              className="block w-full text-center px-4 py-3 font-semibold text-white bg-civora-teal hover:bg-civora-navy transition-colors rounded-lg shadow focus:outline-civora-teal"
              onClick={() => setMobileOpen(false)}
              tabIndex={0}
            >Request Demo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
