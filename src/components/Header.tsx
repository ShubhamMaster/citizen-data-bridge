import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavMainItem, NavSubGroup } from "@/constants/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Utility: Close menu on outside click
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  close: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, close]);
};

// Navigation Link Component
const NavLinkItem: React.FC<{
  to: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ to, className = "", onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isInSection = to !== "/" && location.pathname.startsWith(to);
  const active = isActive || isInSection;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`transition-all duration-200 rounded-md focus:outline-none ${
        active ? "text-primary font-semibold bg-primary/5" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
};

// Desktop Dropdown
const SubMenuDesktop: React.FC<{
  subGroups: NavSubGroup[];
  close: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ subGroups, close, onMouseEnter, onMouseLeave }) => (
  <div
    role="menu"
    tabIndex={-1}
    className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-max px-6 py-6 flex flex-col gap-6 z-50 min-w-[280px]"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onKeyDown={(e) => {
      if (e.key === "Escape") close();
    }}
  >
    {subGroups.map((group) => (
      <div key={group.label}>
        <span className="text-xs font-semibold text-primary/70 uppercase tracking-wide mb-3 block">
          {group.label}
        </span>
        <ul className="space-y-1">
          {group.items.map((item) => (
            <li key={item.label}>
              <NavLinkItem
                to={item.href}
                className="block text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 hover:text-primary font-medium text-sm"
                onClick={close}
              >
                {item.label}
              </NavLinkItem>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// Mobile Dropdown
const SubMenuMobile: React.FC<{
  subGroups: NavSubGroup[];
  openGroup: string | null;
  setOpenGroup: (label: string | null) => void;
  closeMenu: () => void;
}> = ({ subGroups, openGroup, setOpenGroup, closeMenu }) => (
  <div className="pl-4 space-y-2 mt-2">
    {subGroups.map((group) => (
      <div key={group.label}>
        <button
          type="button"
          className="w-full text-left py-2 px-3 rounded-md flex justify-between items-center font-medium text-sm text-primary hover:bg-gray-50"
          onClick={() =>
            setOpenGroup(openGroup === group.label ? null : group.label)
          }
        >
          {group.label}
          <ChevronDown
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${
              openGroup === group.label ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300 border-l-2 border-gray-200 ml-3"
          style={{ maxHeight: openGroup === group.label ? 400 : 0 }}
        >
          <ul className="py-2">
            {group.items.map((item) => (
              <li key={item.label}>
                <NavLinkItem
                  to={item.href}
                  className="block px-4 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-primary"
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

// Main Header Component
export const Header: React.FC = () => {
  const location = useLocation();
const dropdownRef = useRef<HTMLDivElement>(null);
const mobileNavRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<{ [main: string]: string | null }>({});
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const dropdownTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useOutsideClick(dropdownRef, () => setDesktopDropdownOpen(null));

  useOutsideClick(mobileNavRef, () => {
  if (mobileOpen) {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
    setMobileOpenGroup({});
  }
});


  const clearAllTimeouts = () => {
  Object.values(dropdownTimeouts.current).forEach(clearTimeout);
  dropdownTimeouts.current = {};
};

const handleMouseEnter = (label: string) => {
  clearAllTimeouts();
  setDesktopDropdownOpen(label); // open immediately when hovering
};

const handleMouseLeave = (label: string) => {
  clearAllTimeouts();
  dropdownTimeouts.current[label] = setTimeout(() => {
    setDesktopDropdownOpen((prev) => (prev === label ? null : prev));
  }, 150); // small delay to avoid flicker
};


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopDropdownOpen(null);
        setMobileDropdownOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
    setDesktopDropdownOpen(null);
  }, [location.pathname]);

  const isInDropdownSection = (main: NavMainItem) =>
    main.subGroups?.some((group) =>
      group.items.some((item) =>
        item.href === "/"
          ? location.pathname === "/"
          : location.pathname.startsWith(item.href)
      )
    );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container-custom flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 p-2">
          <img
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png"
            alt="Civora Nexus Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <span className="text-xl font-bold text-primary">Civora Nexus</span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-cyan-600">
              Pvt Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex gap-1 items-center ml-10"
          role="navigation"
          aria-label="Main menu"
        >
          {NAVIGATION.map((main) =>
            main.subGroups ? (
              <div
                key={main.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(main.label)}
                onMouseLeave={() => handleMouseLeave(main.label)}
              >
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${
                    desktopDropdownOpen === main.label || isInDropdownSection(main)
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {main.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      desktopDropdownOpen === main.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {desktopDropdownOpen === main.label && (
                  <div ref={dropdownRef}>
                    <SubMenuDesktop
                      subGroups={main.subGroups}
                      close={() => setDesktopDropdownOpen(null)}
                      onMouseEnter={() => handleMouseEnter(main.label)}
                      onMouseLeave={() => handleMouseLeave(main.label)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <NavLinkItem
                key={main.label}
                to={main.href ?? "#"}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                {main.label}
              </NavLinkItem>
            )
          )}

          <Link to="/login" className="ml-6">
            <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-2 rounded-md">
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
     <nav
  ref={mobileNavRef}
  className={`lg:hidden transition-all duration-300 bg-white border-t border-gray-200 ${
    mobileOpen ? "max-h-[80vh] py-6 px-4" : "max-h-0 overflow-hidden"
  }`}
  aria-hidden={!mobileOpen}
>

        <ul className="flex flex-col gap-1">
          {NAVIGATION.map((main) =>
            main.subGroups ? (
              <li key={main.label}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() =>
                    setMobileDropdownOpen(
                      mobileDropdownOpen === main.label ? null : main.label
                    )
                  }
                >
                  {main.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileDropdownOpen === main.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdownOpen === main.label && (
                  <SubMenuMobile
                    subGroups={main.subGroups}
                    openGroup={mobileOpenGroup[main.label] || null}
                    setOpenGroup={(label) =>
                      setMobileOpenGroup((prev) => ({
                        ...prev,
                        [main.label]: prev[main.label] === label ? null : label,
                      }))
                    }
                    closeMenu={() => {
                      setMobileOpen(false);
                      setMobileDropdownOpen(null);
                      setMobileOpenGroup((prev) => ({
                        ...prev,
                        [main.label]: null,
                      }));
                    }}
                  />
                )}
              </li>
            ) : (
              <li key={main.label}>
                <NavLinkItem
                  to={main.href ?? "#"}
                  className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {main.label}
                </NavLinkItem>
              </li>
            )
          )}

          <li className="mt-4 px-3">
            <Link to="/login" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Login
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
