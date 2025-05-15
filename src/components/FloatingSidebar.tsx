"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Code, Award, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingSidebarProps {
  className?: string;
}

const FloatingSidebar = ({ className = "" }: FloatingSidebarProps) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "hero", label: "Home", icon: <Home size={20} />, href: "#hero" },
    { id: "about", label: "About", icon: <Award size={20} />, href: "#about" },
    {
      id: "projects",
      label: "Projects",
      icon: <Briefcase size={20} />,
      href: "#projects",
    },
    {
      id: "skills",
      label: "Skills",
      icon: <Code size={20} />,
      href: "#skills",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail size={20} />,
      href: "#contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-background border border-border shadow-md md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden",
          isMobileMenuOpen
            ? "flex flex-col items-center justify-center"
            : "hidden",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={cn(
                "flex items-center gap-3 text-lg font-medium p-3 rounded-lg transition-colors",
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
              onClick={() => handleNavClick(item.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Desktop sidebar */}
      <motion.aside
        className={cn(
          "fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg",
          className,
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            <motion.button
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
              onClick={() => handleNavClick(item.href)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={item.label}
            >
              {item.icon}
              {activeSection === item.id && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary dark:shadow-glow"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-background border border-border rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
              {item.label}
            </div>
          </div>
        ))}
      </motion.aside>
    </>
  );
};

export default FloatingSidebar;
