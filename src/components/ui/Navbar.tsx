"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import { BOOKING_URL } from "@/lib/links";
import { MESSAGES, type Locale } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar({ locale = "en" }: { locale?: Locale }) {
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

  const navRef = useRef<HTMLElement>(null);

  // The header steps out of the way while reading down the page and returns
  // on any scroll up, or as soon as keyboard focus moves into it.
  useGSAP(
    () => {
      const el = navRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hide = gsap.to(el, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
          paused: true,
        });
        ScrollTrigger.create({
          start: 160,
          end: "max",
          onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
          onLeaveBack: () => hide.reverse(),
        });
        const onFocus = () => hide.reverse();
        el.addEventListener("focusin", onFocus);
        return () => el.removeEventListener("focusin", onFocus);
      });
    },
    { scope: navRef }
  );

  const nav = MESSAGES[locale].nav;
  const navItems: NavItem[] = [
    { label: nav.howItWorks, href: "#how-it-works" },
    { label: nav.work, href: "#work" },
    { label: nav.about, href: "#about" },
    { label: nav.pricing, href: "#pricing" },
    { label: nav.faq, href: "#faq" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-hairline bg-paper pt-3"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
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
              className="relative text-sm font-medium text-ink transition-colors hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />

          <ThemeToggle />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-none bg-brand px-5 py-2.5 text-sm font-medium text-ink-on-brand transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
          >
            {nav.bookCall}
          </a>
        </div>
      </div>
    </nav>
  );
}