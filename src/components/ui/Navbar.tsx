"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const navItems: NavItem[] = [
    { label: "Process", href: "#how-it-works" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    {label: "Contact", href:"#contact"}
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50  border-white/[0.07] bg-white/[0.9] backdrop-blur-sm transition-all duration-300 pt-3"
      style={{
        backgroundColor: isDark ? "rgba(7, 11, 8, 0.9)" : "rgba(235, 243, 234, 0.9)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <Image
            src={isDark ? "/assets/logo-dark.png" : "/assets/logo-light.png"}
            alt="Helia Studio"
            width={150}
            height={22}
            className="h-6 sm:h-6 w-auto object-contain"
          />
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-brand`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          <ThemeToggle />

          <a
            href="https://cal.com/helenaclinckart/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
}