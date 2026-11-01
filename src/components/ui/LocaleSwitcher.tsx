"use client";

import { useState, useRef, useEffect } from "react";

interface LocaleOption {
  code: "EN" | "FR";
  label: string;
}

const locales: LocaleOption[] = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
];

export default function LocaleSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<"EN" | "FR">("EN");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectLocale = (code: "EN" | "FR") => {
    setCurrentLocale(code);
    setIsOpen(false);
    // In future routing, this can navigate to /[locale]/...
    if (typeof window !== "undefined") {
      localStorage.setItem("helia-locale", code.toLowerCase());
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language. Current language is ${currentLocale === "EN" ? "English" : "French"}`}
        className="inline-flex items-center gap-2 h-8 px-2 rounded-lg border border-hairline bg-surface/80 hover:bg-surface text-ink text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {/* Wireframe Globe Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 shrink-0 text-ink-muted transition-colors group-hover:text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a14.5 14.5 0 0 1 0 18" />
          <path d="M12 3a14.5 14.5 0 0 0 0 18" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>

        {/* Current Locale Text */}
        <span className="font-sans font-medium text-ink text-sm leading-none">
          {currentLocale}
        </span>

        {/* Down Chevron */}
        <svg
          viewBox="0 0 20 20"
          className={`w-3.5 h-3.5 shrink-0 text-ink-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 mt-2 w-36 rounded-xl border border-hairline bg-surface p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          {locales.map((locale) => {
            const isSelected = locale.code === currentLocale;
            return (
              <button
                key={locale.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectLocale(locale.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-hairline text-ink font-medium"
                    : "text-ink-muted hover:text-ink hover:bg-hairline/60"
                }`}
              >
                <span>{locale.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-brand/15 text-brand-text font-bold"
                      : "text-ink-muted"
                  }`}
                >
                  {locale.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

