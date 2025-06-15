import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavItem } from "@/constants/navigation";
import { Menu, X } from "lucide-react";

// SubMenu for Desktop: handles up to 2 levels
const SubMenu: React.FC<{
  items: NavItem[];
  closeMenu: () => void;
  level?: number;
}> = ({ items, closeMenu, level = 1 }) => (
  <ul className={level === 1 ? "space-y-2" : "pl-4 space-y-0"}>
    {items.map((item) => (
      <li key={item.label} className="relative">
        {item.children ? (
          <>
            <span
              className="block py-1.5 px-4 rounded hover:bg-civora-teal/10 hover:text-civora-teal font-semibold cursor-default"
              tabIndex={-1}
            >
              {item.label}
            </span>
            <SubMenu items={item.children} closeMenu={closeMenu} level={level + 1} />
          </>
        ) : (
          <Link
            to={item.href ?? "#"}
            className="block py-1.5 px-4 rounded hover:bg-civora-teal/10 hover:text-civora-teal focus:bg-civora-teal/10 focus:text-civora-teal transition-colors"
            tabIndex={0}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        )}
      </li>
    ))}
  </ul>
);

// SubMenu for Mobile Accordion: Handles unlimited nesting
const MobileSubMenu: React.FC<{
  item: NavItem;
  openItems: Record<string, boolean>;
  setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  closeMenu: () => void;
}> = ({ item, openItems, setOpenItems, closeMenu }) => {
  const isOpen = !!openItems[item.label];
  return (
    <li>
      {item.children ? (
        <>
          <button
            className={`w-full flex justify-between items-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-civora-teal
              ${isOpen ? "text-civora-teal bg-civora-teal/10" : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"}`}
            onClick={() =>
              setOpenItems((prev) => ({
                ...prev,
                [item.label]: !isOpen,
              }))
            }
            aria-expanded={isOpen}
          >
            {item.label}
            <svg
              className={`ml-2 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          {isOpen && (
            <ul className="pl-2 border-l ml-2 flex flex-col gap-1 mt-1">
              {item.children.map((child) => (
                <MobileSubMenu
                  key={child.label}
                  item={child}
                  openItems={openItems}
                  setOpenItems={setOpenItems}
                  closeMenu={closeMenu}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          to={item.href ?? "#"}
          className="block px-6 py-2 rounded-md transition-colors hover:bg-civora-teal/10 hover:text-civora-teal focus:bg-civora-teal/10 focus:text-civora-teal"
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [dropdownHovering, setDropdownHovering] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({});

  // Nav item highlighting
  const isLinkActive = (href?: string) =>
    href && location.pathname === href;

  // Desktop: handle menu open/close logic robustly
  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdown(label);
    setDropdownHovering(true);
  };
  const closeDropdown = () => {
    setDropdownHovering(false);
    closeTimer.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 180);
  };

  // Keyboard support: ESC closes dropdown, arrow navigation, tab cycle
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopDropdown(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Render Desktop menu (mega dropdown)
  const renderDesktopMenu = (item: NavItem) => {
    if (item.children) {
      const open = desktopDropdown === item.label;
      return (
        <div
          key={item.label}
          className="relative group"
          onMouseEnter={() => openDropdown(item.label)}
          onMouseLeave={closeDropdown}
          onFocus={() => openDropdown(item.label)}
          onBlur={closeDropdown}
          tabIndex={-1}
        >
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors focus:outline-civora-teal
            ${open
              ? "text-civora-teal bg-civora-teal/10"
              : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"}`}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={`desktop-dropdown-${item.label}`}
            onClick={() => setDesktopDropdown(open ? null : item.label)}
            tabIndex={0}
            type="button"
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
          {/* Mega menu: opens on hover/focus/click, stays open until intent to leave */}
          {open && (
            <div
              id={`desktop-dropdown-${item.label}`}
              role="menu"
              aria-label={item.label}
              className="absolute left-0 mt-2 min-w-[270px] bg-white border border-gray-200 shadow-xl rounded-lg p-5 z-50 animate-fade-in"
              onMouseEnter={() => setDropdownHovering(true)}
              onMouseLeave={closeDropdown}
              onClick={(e) => {
                // If the click was a menu item, close; if submenu, keep open
                if ((e.target as HTMLElement).closest("a")) setDesktopDropdown(null);
              }}
            >
              <SubMenu
                items={item.children}
                closeMenu={() => setDesktopDropdown(null)}
              />
            </div>
          )}
        </div>
      );
    }
    // Plain link
    return (
      <Link
        key={item.label}
        to={item.href ?? "#"}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isLinkActive(item.href)
            ? "text-civora-teal bg-civora-teal/10"
            : "text-gray-800 hover:bg-gray-50 hover:text-civora-teal"
        } focus:outline-civora-teal`}
        tabIndex={0}
      >
        {item.label}
      </Link>
    );
  };

  // Render Mobile Accordion menu
  const renderMobileMenu = (item: NavItem) => (
    <MobileSubMenu
      key={item.label}
      item={item}
      openItems={mobileAccordions}
      setOpenItems={setMobileAccordions}
      closeMenu={() => setMobileOpen(false)}
    />
  );

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 border-b border-gray-200 backdrop-blur-md"
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-civora-teal"
          tabIndex={0}
        >
          <img
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png"
            alt="Civora Nexus Pvt Ltd Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="ml-1">
            <span className="text-xl font-bold text-civora-navy">Civora Nexus</span>
            <span className="block text-xs text-civora-teal font-semibold">Pvt Ltd</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-1 items-center ml-6" role="navigation" aria-label="Main navigation">
          {NAVIGATION.map(renderDesktopMenu)}
          {/* CTAs */}
          <Link
            to="/request-demo"
            className="ml-4 px-5 py-2 font-semibold text-white bg-civora-teal hover:bg-civora-navy transition-colors rounded-lg shadow focus:outline-civora-teal"
            tabIndex={0}
          >
            Request Demo
          </Link>
          <Link
            to="/login"
            className="ml-2 px-5 py-2 font-semibold text-civora-teal border-2 border-civora-teal hover:bg-civora-teal hover:text-white transition-colors rounded-lg shadow focus:outline-civora-teal"
            tabIndex={0}
          >
            Login
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded text-civora-navy hover:bg-gray-200 hover:text-civora-teal focus:outline-civora-teal"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
          aria-expanded={isMobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 bg-white border-t border-gray-100 shadow ${isMobileOpen ? "max-h-[900px] py-4 px-2" : "max-h-0 overflow-hidden"}`}
      >
        <ul className="flex flex-col gap-2">
          {NAVIGATION.map(renderMobileMenu)}
          {/* CTAs */}
          <li className="mt-2">
            <Link
              to="/request-demo"
              className="block w-full text-center px-6 py-3 font-semibold text-white bg-civora-teal hover:bg-civora-navy transition-colors rounded-lg shadow focus:outline-civora-teal"
              onClick={() => setMobileOpen(false)}
              tabIndex={0}
            >
              Request Demo
            </Link>
            <Link
              to="/login"
              className="block w-full text-center mt-2 px-6 py-3 font-semibold text-civora-teal border-2 border-civora-teal hover:bg-civora-teal hover:text-white transition-colors rounded-lg shadow focus:outline-civora-teal"
              onClick={() => setMobileOpen(false)}
              tabIndex={0}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
