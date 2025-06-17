import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavMainItem, NavSubGroup } from "@/constants/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, close: () => void) => {
  useEffect(() => {
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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({
  subGroups,
  close,
  onMouseEnter,
  onMouseLeave
}) => <div role="menu" className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 w-max px-8 py-6 flex flex-col gap-6 z-50 min-w-[320px] backdrop-blur-sm bg-white/95" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} tabIndex={-1} onKeyDown={e => {
  e.key === "Escape" && close();
}}>
    {subGroups.map(group => <div key={group.label}>
        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">{group.label}</span>
        <ul className="space-y-2" role="group" aria-label={group.label}>
          {group.items.map(item => <li key={item.label}>
              <NavLinkItem to={item.href} className="block text-gray-700 px-4 py-2 rounded-lg hover:bg-accent/10 hover:text-accent font-medium text-sm transition-all duration-200" onClick={close}>
                {item.label}
              </NavLinkItem>
            </li>)}
        </ul>
      </div>)}
  </div>;
const SubMenuMobile: React.FC<{
  subGroups: NavSubGroup[];
  openGroup: string | null;
  setOpenGroup: (label: string | null) => void;
  closeMenu: () => void;
}> = ({
  subGroups,
  openGroup,
  setOpenGroup,
  closeMenu
}) => {
  return <div className="pl-4 space-y-2 mt-2">
      {subGroups.map(group => <div key={group.label}>
          <button className="w-full text-left py-3 px-4 rounded-lg flex justify-between items-center font-semibold text-sm text-accent hover:bg-accent/10 transition-colors duration-200" onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)} aria-expanded={openGroup === group.label} aria-controls={`mobile-group-${group.label}`} type="button">
            {group.label}
            <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${openGroup === group.label ? "rotate-180" : ""}`} />
          </button>
          <div id={`mobile-group-${group.label}`} className="overflow-hidden transition-all duration-300 border-l-2 border-accent/20 ml-4" style={{
        maxHeight: openGroup === group.label ? 400 : 0
      }} aria-hidden={openGroup !== group.label}>
            <ul className="py-2">
              {group.items.map(item => <li key={item.label}>
                  <NavLinkItem to={item.href} className="block px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-accent transition-all duration-200" onClick={closeMenu}>
                    {item.label}
                  </NavLinkItem>
                </li>)}
            </ul>
          </div>
        </div>)}
    </div>;
};
const NavLinkItem: React.FC<React.PropsWithChildren<{
  to: string;
  className?: string;
  onClick?: () => void;
}>> = ({
  to,
  className,
  children,
  onClick
}) => {
  const location = useLocation();

  // Check if current path matches the link (for main nav items)
  const isActive = location.pathname === to;

  // Check if we're in a sub-page of this main section
  const isInSection = to !== "/" && location.pathname.startsWith(to);
  const active = isActive || isInSection;
  const baseStyle = "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg";
  const activeStyle = active ? "text-accent font-bold bg-accent/10" : "";
  return <Link to={to} className={`${baseStyle} ${activeStyle} ${className ?? ""}`} onClick={onClick}>
      {children}
    </Link>;
};
export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<{
    [main: string]: string | null;
  }>({});
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  useOutsideClick(dropdownRef, () => setDesktopDropdownOpen(null));
  const dropdownTimeouts = useRef<{
    [key: string]: NodeJS.Timeout;
  }>({});
  const handleMouseEnter = (label: string) => {
    if (dropdownTimeouts.current[label]) {
      clearTimeout(dropdownTimeouts.current[label]);
      delete dropdownTimeouts.current[label];
    }
    setDesktopDropdownOpen(label);
  };
  const handleMouseLeave = (label: string) => {
    dropdownTimeouts.current[label] = setTimeout(() => {
      setDesktopDropdownOpen(null);
      delete dropdownTimeouts.current[label];
    }, 150);
  };
  const handleDropdownMouseEnter = () => {
    Object.keys(dropdownTimeouts.current).forEach(key => {
      clearTimeout(dropdownTimeouts.current[key]);
      delete dropdownTimeouts.current[key];
    });
  };
  const handleDropdownMouseLeave = () => {
    setDesktopDropdownOpen(null);
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
  useEffect(() => {
    if (!mobileOpen) {
      setMobileDropdownOpen(null);
      setMobileOpenGroup({});
    }
  }, [mobileOpen]);

  // Check if current location matches any dropdown item to keep parent highlighted
  const isInDropdownSection = (main: NavMainItem) => {
    if (!main.subGroups) return false;
    return main.subGroups.some(group => group.items.some(item => {
      if (item.href === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.href);
    }));
  };
  return <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl p-2 hover:bg-gray-50 transition-colors duration-200" tabIndex={0}>
          <img src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" alt="Civora Nexus Logo" className="w-10 h-10 object-contain" />
          <div>
            <span className="text-xl font-bold text-primary font-heading">Civora Nexus</span>
            <span className="block text-xs text-accent font-semibold uppercase tracking-wide">Pvt Ltd</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-2 items-center ml-10" role="navigation" aria-label="Main menu">
          {NAVIGATION.map(main => main.subGroups ? <div key={main.label} className="relative" onMouseEnter={() => handleMouseEnter(main.label)} onMouseLeave={() => handleMouseLeave(main.label)}>
                
                {desktopDropdownOpen === main.label && <div id={`dropdown-${main.label}`} ref={dropdownRef} className="relative z-50">
                    <SubMenuDesktop subGroups={main.subGroups} close={() => setDesktopDropdownOpen(null)} onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave} />
                  </div>}
              </div> : <NavLinkItem to={main.href ?? "#"} key={main.label} className="px-4 py-3 text-sm font-semibold rounded-lg text-gray-700 hover:bg-gray-50 hover:text-accent">
                {main.label}
              </NavLinkItem>)}
          
          {/* Login Button */}
          <Link to="/login" className="ml-6">
            <Button className="bg-accent hover:bg-accent/90 text-white text-sm px-6 py-2 rounded-lg transition-colors duration-200 font-semibold">
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(open => !open)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav id="mobile-menu" className={`lg:hidden transition-all duration-300 bg-white/98 backdrop-blur-md border-t border-gray-100 ${mobileOpen ? "max-h-[80vh] py-6 px-4" : "max-h-0 overflow-hidden"}`} aria-hidden={!mobileOpen} role="menu">
        <ul className="flex flex-col gap-2">
          {NAVIGATION.map(main => main.subGroups ? <li key={main.label}>
                <button type="button" className="w-full flex justify-between items-center px-4 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-gray-700 hover:bg-gray-50" onClick={() => {
            setMobileDropdownOpen(mobileDropdownOpen === main.label ? null : main.label);
          }} aria-expanded={mobileDropdownOpen === main.label} aria-controls={`mobile-dropdown-${main.label}`}>
                  {main.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === main.label ? "rotate-180" : ""}`} />
                </button>
                {mobileDropdownOpen === main.label && <SubMenuMobile subGroups={main.subGroups} openGroup={mobileOpenGroup[main.label] || null} setOpenGroup={label => setMobileOpenGroup(prev => ({
            ...prev,
            [main.label]: prev[main.label] === label ? null : label
          }))} closeMenu={() => {
            setMobileOpen(false);
            setMobileDropdownOpen(null);
            setMobileOpenGroup(prev => ({
              ...prev,
              [main.label]: null
            }));
          }} />}
              </li> : <li key={main.label}>
                <NavLinkItem to={main.href ?? "#"} className="block px-4 py-3 font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-accent" onClick={() => setMobileOpen(false)}>
                  {main.label}
                </NavLinkItem>
              </li>)}
          
          {/* Mobile Login Button */}
          <li className="mt-4 px-4">
            <Link to="/login" className="block">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold">
                Login
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>;
};
export default Header;