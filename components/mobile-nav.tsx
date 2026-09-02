"use client";

import { useState } from "react";
import { Award, Briefcase, FolderOpen, GraduationCap, Menu, User, X } from "lucide-react";
import { useI18n } from "./i18n-provider";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: { ui } } = useI18n();

  const navItems = [
    { label: ui.about, href: "#about", icon: User },
    { label: ui.projects, href: "/projects", icon: FolderOpen },
    { label: ui.experience, href: "#experience", icon: Briefcase },
    { label: ui.education, href: "#education", icon: GraduationCap },
    { label: ui.certifications, href: "#certifications", icon: Award },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-border/70 bg-background/80 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-5">
          <a href="#about" className="font-mono text-sm font-semibold tracking-tight text-foreground">
            mgff01<span className="text-primary">.</span>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="grid size-10 place-items-center text-foreground transition-colors hover:text-primary"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex h-full flex-col justify-center gap-3 px-6 pt-16">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-4 rounded-2xl border border-transparent px-5 py-4 text-lg font-medium text-foreground transition-all duration-200 hover:border-border hover:bg-card hover:text-primary
                         ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${index * 0.1}s` : "0s" }}
            >
              <item.icon className="size-5 text-primary" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
