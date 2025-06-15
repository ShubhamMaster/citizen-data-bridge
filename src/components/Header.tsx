import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavMainItem, NavSubGroup } from "@/constants/navigation";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, close: () => void) => {
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, close]);
};

const SubMenuDesktop: React.FC<{
  subGroups: NavSubGroup[];
  close: () => void;
}> = ({ subGroups, close }) => (
  <div
    role="menu"
    className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 w-max px-1 py-3 flex gap-8 animate-fade-in"
    tabIndex={-1}
    onKeyDown={e => { (e.key === "Escape") && close(); }}
  >
    {subGroups.map((group) => (
      <div key={group.label} className="min-w-[170px]">
        <span className="text-xs font-bold text-civora-teal dark:text-civora-teal/80 pl-2">{group.label}</span>
        <ul className="mt-1.5 space-y-1" role="group" aria-label={group.label}>
          {group.items.map((item) => (
            <li key={item.label}>
              <NavLinkItem to={item.href} className="block text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-md hover:bg-civora-teal/10 hover:text-civora-teal dark:hover:bg-civora-teal/10 dark:hover:text-civora-teal font-medium text-sm transition-colors" onClick={close}>
                {item.label}
              </NavLinkItem>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const SubMenuMobile: React.FC<{
  subGroups: NavSubGroup[];
  openGroup: string | null;
  setOpenGroup: (label: string | null) => void;
  closeMenu: () => void;
}> = ({ subGroups, openGroup, setOpenGroup, closeMenu }) => {
  return (
    <div className="pl-4 space-y-1 mt-1">
      {subGroups.map(group => (
        <div key={group.label}>
          <button
            className="w-full text-left py-2 px-2 rounded flex justify-between items-center font-semibold text-sm text-civora-teal dark:text-civora-teal/80 focus:outline-civora-teal transition"
            onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
            aria-expanded={openGroup === group.label}
            aria-controls={`mobile-group-${group.label}`}
            type="button"
          >
            {group.label}
            <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`} />
          </button>
          <div
            id={`mobile-group-${group.label}`}
            className="overflow-hidden transition-[max-height] duration-300 border-l dark:border-gray-800 border-gray-200 ml-2"
            style={{
              maxHeight: openGroup === group.label ? 400 : 0,
              transitionProperty: "max-height",
            }}
            aria-hidden={openGroup !== group.label}
          >
            <ul>
              {group.items.map(item => (
                <li key={item.label}>
                  <NavLinkItem
                    to={item.href}
                    className="block px-5 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-civora-teal/10 hover:text-civora-teal dark:hover:bg-civora-teal/10 dark:hover:text-civora-teal transition"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLinkItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const NavLinkItem: React.FC<React.PropsWithChildren<{ to: string; className?: string; onClick?: () => void }>> = ({
  to,
  className,
  children,
  onClick,
}) => {
  const location = useLocation();
  const active =
    to !== "/" && location.pathname.startsWith(to)
      ? true
      : location.pathname === to;
  const base =
    "transition-colors outline-none";
  const activeStyle = active
    ? "text-civora-teal font-bold dark:text-civora-teal underline underline-offset-4"
    : "";
  return (
    <Link to={to} className={`${base} ${activeStyle} ${className ?? ""}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // New: Track which sub-group is open in mobile menu
  const [mobileOpenGroup, setMobileOpenGroup] = useState<{ [main: string]: string | null }>({});

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useOutsideClick(dropdownRef, () => setDropdownOpen(null));

  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  // Keyboard ESC support for mobile menu
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  // When you close mobile menu, also close all mobile sub groups
  React.useEffect(() => {
    if (!mobileOpen) setMobileOpenGroup({});
  }, [mobileOpen]);

  // Main render
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur supports-backdrop-blur:backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus:outline-civora-teal" tabIndex={0}>
          <img src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" alt="Civora Nexus Pvt Ltd Logo" className="w-12 h-12 object-contain" />
          <div className="ml-1">
            <span className="text-xl font-bold text-civora-navy dark:text-white">Civora Nexus</span>
            <span className="block text-xs text-civora-teal font-semibold">Pvt Ltd</span>
          </div>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-2 items-center ml-10" role="navigation" aria-label="Main menu">
          {NAVIGATION.map((main) =>
            main.subGroups ? (
              <div
                key={main.label}
                className="relative group"
                onMouseEnter={() => {
                  if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                  setDropdownOpen(main.label);
                }}
                onMouseLeave={() => {
                  dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 120);
                }}
                onFocus={() => setDropdownOpen(main.label)}
                onBlur={(e) => {
                  // Hide dropdown only if focus moves outside both the button and the menu
                  if (
                    !e.currentTarget.contains(e.relatedTarget as Node)
                  ) {
                    setDropdownOpen(null);
                  }
                }}
                tabIndex={-1}
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen(dropdownOpen === main.label ? null : main.label)}
                  className={`px-3 py-2 text-sm font-bold rounded-lg flex items-center gap-1 transition-colors focus:outline-civora-teal focus:shadow focus:ring-2 focus:ring-civora-teal/40 dark:text-gray-100
                    ${dropdownOpen === main.label ? "text-civora-teal bg-civora-teal/10 dark:text-civora-teal" : "text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-civora-teal"}`}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen === main.label ? true : undefined}
                  aria-controls={`dropdown-${main.label}`}
                >
                  {main.label}
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${dropdownOpen === main.label ? "rotate-180" : ""}`} />
                </button>
                {/* Dropdown */}
                {dropdownOpen === main.label && (
                  <div
                    id={`dropdown-${main.label}`}
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 z-50"
                  >
                    <SubMenuDesktop subGroups={main.subGroups} close={() => setDropdownOpen(null)} />
                  </div>
                )}
              </div>
            ) : (
              <NavLinkItem to={main.href ?? "#"} key={main.label} className="px-3 py-2 text-sm font-bold rounded-lg text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-civora-teal dark:text-gray-100 focus:outline-civora-teal">
                {main.label}
              </NavLinkItem>
            )
          )}
          {/* Dark mode toggle */}
          <button
            title="Toggle dark mode"
            className="ml-4 p-2 rounded-full transition-colors hover:bg-civora-teal/10 hover:text-civora-teal focus:outline-civora-teal"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-2 rounded text-civora-navy dark:text-civora-teal hover:bg-gray-200 hover:text-civora-teal focus:outline-civora-teal"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow ${
          mobileOpen ? "max-h-[850px] py-4 px-2" : "max-h-0 overflow-hidden"
        }`}
        aria-hidden={!mobileOpen}
        role="menu"
      >
        <ul className="flex flex-col gap-2">
          {NAVIGATION.map((main) =>
            main.subGroups ? (
              <li key={main.label}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-2 rounded-lg font-bold transition-colors focus:outline-civora-teal text-gray-800 dark:text-gray-100"
                  onClick={() => {
                    const isOpening = dropdownOpen !== main.label;
                    setDropdownOpen(dropdownOpen === main.label ? null : main.label);
                    // Only reset sub-groups when opening a new main dropdown
                    if (isOpening) {
                      setMobileOpenGroup((prev) => ({
                        ...prev,
                        [main.label]: null,
                      }));
                    }
                  }}
                  aria-expanded={dropdownOpen === main.label}
                  aria-controls={`mobile-dropdown-${main.label}`}
                >
                  {main.label}
                  <ChevronDown className={`ml-3 w-4 h-4 transition-transform ${dropdownOpen === main.label ? "rotate-180" : ""}`} />
                </button>
                {/* Sub-groups */}
                {dropdownOpen === main.label && (
                  <SubMenuMobile
                    subGroups={main.subGroups}
                    openGroup={mobileOpenGroup[main.label] || null}
                    setOpenGroup={label => setMobileOpenGroup(prev => ({
                      ...prev,
                      [main.label]: prev[main.label] === label ? null : label
                    }))}
                    closeMenu={() => { setMobileOpen(false); setDropdownOpen(null); }}
                  />
                )}
              </li>
            ) : (
              <li key={main.label}>
                <NavLinkItem
                  to={main.href ?? "#"}
                  className="block px-6 py-2 font-bold text-gray-800 dark:text-gray-100 rounded-md hover:bg-civora-teal/10 hover:text-civora-teal focus:bg-civora-teal/10 focus:text-civora-teal"
                  onClick={() => setMobileOpen(false)}
                >
                  {main.label}
                </NavLinkItem>
              </li>
            )
          )}
          {/* Dark mode toggle */}
          <li className="px-4 py-2 mt-2 flex items-center gap-3">
            Theme:
            <button
              title="Toggle dark mode"
              className="p-2 rounded-full transition-colors focus:outline-civora-teal hover:bg-civora-teal/10"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
