
import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavMainItem, NavSubGroup } from "@/constants/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    className="bg-white rounded-xl shadow-soft-lg border border-border w-max px-2 py-4 flex flex-col gap-6 animate-slide-down z-50"
    tabIndex={-1}
    onKeyDown={e => { (e.key === "Escape") && close(); }}
  >
    {subGroups.map((group) => (
      <div key={group.label} className="min-w-[180px]">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide pl-3 mb-2 block">{group.label}</span>
        <ul className="space-y-1" role="group" aria-label={group.label}>
          {group.items.map((item) => (
            <li key={item.label}>
              <NavLinkItem 
                to={item.href} 
                className="block text-foreground px-3 py-2.5 rounded-lg hover:bg-primary/5 hover:text-primary font-medium text-sm transition-all duration-200" 
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

const SubMenuMobile: React.FC<{
  subGroups: NavSubGroup[];
  openGroup: string | null;
  setOpenGroup: (label: string | null) => void;
  closeMenu: () => void;
}> = ({ subGroups, openGroup, setOpenGroup, closeMenu }) => {
  return (
    <div className="pl-4 space-y-2 mt-2">
      {subGroups.map(group => (
        <div key={group.label}>
          <button
            className="w-full text-left py-3 px-3 rounded-lg flex justify-between items-center font-semibold text-sm text-primary hover:bg-primary/5 transition-colors duration-200"
            onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
            aria-expanded={openGroup === group.label}
            aria-controls={`mobile-group-${group.label}`}
            type="button"
          >
            {group.label}
            <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${openGroup === group.label ? "rotate-180" : ""}`} />
          </button>
          <div
            id={`mobile-group-${group.label}`}
            className="overflow-hidden transition-all duration-300 border-l-2 border-primary/20 ml-3"
            style={{
              maxHeight: openGroup === group.label ? 400 : 0,
            }}
            aria-hidden={openGroup !== group.label}
          >
            <ul className="py-2">
              {group.items.map(item => (
                <li key={item.label}>
                  <NavLinkItem
                    to={item.href}
                    className="block px-6 py-2.5 text-muted-foreground rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200"
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
  const base = "transition-all duration-200 focus-ring";
  const activeStyle = active
    ? "text-primary font-semibold bg-primary/10"
    : "";
  return (
    <Link to={to} className={`${base} ${activeStyle} ${className ?? ""}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<{ [main: string]: string | null }>({});
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useOutsideClick(dropdownRef, () => setDesktopDropdownOpen(null));

  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
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

  React.useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
    setDesktopDropdownOpen(null);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!mobileOpen) {
      setMobileDropdownOpen(null);
      setMobileOpenGroup({});
    }
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus-ring rounded-lg" tabIndex={0}>
          <img 
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
            alt="Civora Nexus Logo" 
            className="w-10 h-10 object-contain" 
          />
          <div>
            <span className="text-xl font-bold text-foreground font-heading">Civora Nexus</span>
            <span className="block text-xs text-primary font-semibold uppercase tracking-wide">Pvt Ltd</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-1 items-center ml-10" role="navigation" aria-label="Main menu">
          {NAVIGATION.map((main) =>
            main.subGroups ? (
              <div
                key={main.label}
                className="relative group"
                onMouseEnter={() => {
                  if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                  setDesktopDropdownOpen(main.label);
                }}
                onMouseLeave={() => {
                  dropdownTimeout.current = setTimeout(() => setDesktopDropdownOpen(null), 150);
                }}
                onFocus={() => setDesktopDropdownOpen(main.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDesktopDropdownOpen(null);
                  }
                }}
                tabIndex={-1}
              >
                <button
                  type="button"
                  onClick={() => setDesktopDropdownOpen(desktopDropdownOpen === main.label ? null : main.label)}
                  className={`px-4 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 focus-ring
                    ${desktopDropdownOpen === main.label 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground hover:bg-muted hover:text-primary"}`}
                  aria-haspopup="menu"
                  aria-expanded={desktopDropdownOpen === main.label ? true : undefined}
                  aria-controls={`dropdown-${main.label}`}
                >
                  {main.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${desktopDropdownOpen === main.label ? "rotate-180" : ""}`} />
                </button>
                {desktopDropdownOpen === main.label && (
                  <div
                    id={`dropdown-${main.label}`}
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 z-50"
                  >
                    <SubMenuDesktop subGroups={main.subGroups} close={() => setDesktopDropdownOpen(null)} />
                  </div>
                )}
              </div>
            ) : (
              <NavLinkItem 
                to={main.href ?? "#"} 
                key={main.label} 
                className="px-4 py-3 text-sm font-semibold rounded-lg text-foreground hover:bg-muted hover:text-primary"
              >
                {main.label}
              </NavLinkItem>
            )
          )}
          
          {/* Login Button */}
          <Link to="/login" className="ml-6">
            <Button className="btn-primary">
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors duration-200 focus-ring"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 bg-white border-t border-border ${
          mobileOpen ? "max-h-[80vh] py-6 px-4" : "max-h-0 overflow-hidden"
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
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg font-semibold transition-colors duration-200 focus-ring text-foreground hover:bg-muted"
                  onClick={() => {
                    setMobileDropdownOpen(mobileDropdownOpen === main.label ? null : main.label);
                  }}
                  aria-expanded={mobileDropdownOpen === main.label}
                  aria-controls={`mobile-dropdown-${main.label}`}
                >
                  {main.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === main.label ? "rotate-180" : ""}`} />
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
                  className="block px-4 py-3 font-semibold text-foreground rounded-lg hover:bg-muted hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {main.label}
                </NavLinkItem>
              </li>
            )
          )}
          
          {/* Mobile Login Button */}
          <li className="mt-4 px-4">
            <Link to="/login" className="block">
              <Button className="w-full btn-primary">
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
