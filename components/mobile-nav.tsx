"use client";

import { useState } from "react";
import { Menu, X, User, Briefcase, Award, FolderOpen } from "lucide-react";

const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Certifications", href: "#certifications", icon: Award },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold text-foreground">MGF</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-3 text-xl font-medium text-foreground 
                         hover:text-primary transition-all duration-200 
                         ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${index * 0.1}s` : "0s" }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
