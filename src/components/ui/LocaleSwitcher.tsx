"use client";

import { LOCALES, MESSAGES, type Locale } from "@/lib/i18n";

/**
 * Language switch: two real links, /en and /fr. They work without
 * JavaScript; with it, the click keeps the visitor on the same section by
 * carrying the current #anchor across.
 */

interface LocaleSwitcherProps {
  locale: Locale;
}

export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const label = MESSAGES[locale].nav.languageLabel;

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {LOCALES.map((code) => {
        const isCurrent = code === locale;
        return (
          // A plain link on purpose: a full page load swaps the <html lang>.
          <a
            key={code}
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            aria-current={isCurrent ? "page" : undefined}
            onClick={(event) => {
              if (window.location.hash) {
                event.currentTarget.href = `/${code}${window.location.hash}`;
              }
            }}
            className={`inline-flex items-center justify-center h-8 min-w-8 px-1.5 font-sans text-sm font-medium uppercase tracking-wide border-b transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text ${
              isCurrent
                ? "text-ink border-brand-text"
                : "text-ink-muted border-transparent hover:text-ink"
            }`}
          >
            {code}
          </a>
        );
      })}
    </nav>
  );
}
