"use client";

import { useState } from "react";
import {
  newsreader,
  instrumentSerif,
  instrumentSans,
  fraunces,
  plusJakartaSans,
  cormorantGaramond,
  sourceSans3,
  dmSerifDisplay,
  dmSans,
  lora,
  inter,
} from "./fonts";

type ThemeView = "both" | "dark" | "light";
type LangView = "both" | "en" | "fr";

interface FontReference {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

interface Pairing {
  id: string;
  number: string;
  name: string;
  displayFont: FontReference;
  bodyFont: FontReference;
  displayName: string;
  displayClassification: string;
  bodyName: string;
  bodyClassification: string;
  vibe: string;
  editorialNote: string;
  recommendationTag?: string;
}

const PAIRINGS: Pairing[] = [
  {
    id: "pairing-1",
    number: "01",
    name: "Newsreader + Instrument Sans",
    displayFont: newsreader,
    bodyFont: instrumentSans,
    displayName: "Newsreader",
    displayClassification: "Editorial Variable Serif (Production Type)",
    bodyName: "Instrument Sans",
    bodyClassification: "Modernist Variable Neo-Grotesque",
    vibe: "Quiet, intellectual authority • Private practice • High-end monograph",
    editorialNote:
      "Crafted for continuous reading and longform editorial titles. The italic has a calligraphic fluidity that lends genuine gravity to executive ghostwriting. Extremely legible at display and body sizes.",
    recommendationTag: "Curator's Top Pick",
  },
  {
    id: "pairing-2",
    number: "02",
    name: "Instrument Serif + Instrument Sans",
    displayFont: instrumentSerif,
    bodyFont: instrumentSans,
    displayName: "Instrument Serif",
    displayClassification: "High-Contrast Luxury Serif",
    bodyName: "Instrument Sans",
    bodyClassification: "Modernist Variable Neo-Grotesque",
    vibe: "Parisian design studio • Razor-sharp luxury • Slender contrast",
    editorialNote:
      "Very chic and contemporary European editorial. Its high-contrast strokes and compact proportions feel bespoke, high-fashion and distinctive. Pairs natively with its sans counterpart.",
  },
  {
    id: "pairing-3",
    number: "03",
    name: "Fraunces + Inter",
    displayFont: fraunces,
    bodyFont: inter,
    displayName: "Fraunces",
    displayClassification: "Warm 20th-Century Soft Serif (Undercase Type)",
    bodyName: "Inter",
    bodyClassification: "Ultra-Neutral Geometric Workhorse (Rasmus Andersson)",
    vibe: "Tactile, warm, human craft • Deeply personal yet disciplined",
    editorialNote:
      "Fraunces introduces warmth and personality without looking vintage or silly. Paired with Inter's hyper-rational, neutral baseline, it communicates that a human mind is at work, not an AI template.",
  },
  {
    id: "pairing-4",
    number: "04",
    name: "Cormorant Garamond + Plus Jakarta Sans",
    displayFont: cormorantGaramond,
    bodyFont: plusJakartaSans,
    displayName: "Cormorant Garamond",
    displayClassification: "Classical French Prestige Serif (Christian Thalmann)",
    bodyName: "Plus Jakarta Sans",
    bodyClassification: "Contemporary Humanist Sans (Tokotype)",
    vibe: "Prestige institution • Gallimard literary heritage • Executive advisory",
    editorialNote:
      "A classic Garamond lineage with sharp, graceful French terminals. Feels like an established private advisory or literary review. Plus Jakarta Sans softens the baseline with contemporary warmth.",
  },
  {
    id: "pairing-5",
    number: "05",
    name: "DM Serif Display + DM Sans",
    displayFont: dmSerifDisplay,
    bodyFont: dmSans,
    displayName: "DM Serif Display",
    displayClassification: "Transitional High-Contrast Serif (Colophon Foundry)",
    bodyName: "DM Sans",
    bodyClassification: "Geometric Humanist Sans",
    vibe: "Direct, confident, assertive • Modern leadership • Architectural clarity",
    editorialNote:
      "Robust serifs and strong bracketed weights give immediate visual punch. It commands attention without being delicate. Excellent for direct, assertive LinkedIn thought leadership.",
  },
  {
    id: "pairing-6",
    number: "06",
    name: "Lora + Source Sans 3",
    displayFont: lora,
    bodyFont: sourceSans3,
    displayName: "Lora",
    displayClassification: "Brushed Calligraphic Serif (Olga Karpushina)",
    bodyName: "Source Sans 3",
    bodyClassification: "Editorial Workhorse Sans (Paul D. Hunt)",
    vibe: "Warm, balanced, approachable rigor • Publishing credibility",
    editorialNote:
      "Moderate contrast with brushed curves, reminiscent of traditional essays. Highly forgiving across various screen densities and effortlessly readable in dense French texts.",
  },
];

export default function TypeTestPage() {
  const [themeView, setThemeView] = useState<ThemeView>("both");
  const [langView, setLangView] = useState<LangView>("both");
  const [selectedPairingId, setSelectedPairingId] = useState<string>("pairing-1");

  return (
    <div
      className={`min-h-screen bg-[#070B08] text-[#EBF3EA] selection:bg-[#62D468] selection:text-[#070B08] ${newsreader.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${fraunces.variable} ${plusJakartaSans.variable} ${cormorantGaramond.variable} ${sourceSans3.variable} ${dmSerifDisplay.variable} ${dmSans.variable} ${lora.variable} ${inter.variable}`}
    >
      {/* Top sticky control bar */}
      <header className="sticky top-0 z-50 border-b border-[rgba(235,243,234,0.12)] bg-[#070B08]/95 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#62D468]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-[#62D468] font-mono">
                Helia Studio • Typography Lab
              </p>
              <h1 className="text-sm font-medium tracking-tight text-[#EBF3EA]">
                Typeface Pairing Evaluation (/type-test)
              </h1>
            </div>
          </div>

          {/* Quick jump menu */}
          <nav
            aria-label="Pairings navigation"
            className="hidden lg:flex items-center gap-1 overflow-x-auto text-xs"
          >
            {PAIRINGS.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={() => setSelectedPairingId(p.id)}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  selectedPairingId === p.id
                    ? "bg-[#62D468] text-[#070B08] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA] hover:bg-[rgba(235,243,234,0.06)]"
                }`}
              >
                {p.number} {p.displayName}
              </a>
            ))}
          </nav>

          {/* Controls: Theme & Language */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Theme switcher */}
            <div
              role="group"
              aria-label="Theme view options"
              className="flex items-center rounded border border-[rgba(235,243,234,0.12)] p-0.5 text-xs"
            >
              <button
                type="button"
                onClick={() => setThemeView("both")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  themeView === "both"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                Dual View
              </button>
              <button
                type="button"
                onClick={() => setThemeView("dark")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  themeView === "dark"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                Dark Only
              </button>
              <button
                type="button"
                onClick={() => setThemeView("light")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  themeView === "light"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                Light Only
              </button>
            </div>

            {/* Language switcher */}
            <div
              role="group"
              aria-label="Language view options"
              className="flex items-center rounded border border-[rgba(235,243,234,0.12)] p-0.5 text-xs"
            >
              <button
                type="button"
                onClick={() => setLangView("both")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  langView === "both"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                EN + FR
              </button>
              <button
                type="button"
                onClick={() => setLangView("en")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  langView === "en"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLangView("fr")}
                className={`px-2.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#62D468] ${
                  langView === "fr"
                    ? "bg-[rgba(235,243,234,0.15)] text-[#EBF3EA] font-medium"
                    : "text-[rgba(235,243,234,0.65)] hover:text-[#EBF3EA]"
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-24">
        {/* Intro notice banner */}
        <section
          aria-labelledby="eval-title"
          className="rounded border border-[rgba(235,243,234,0.12)] bg-[#0E1510] p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#62D468] font-mono">
                Design Direction • Evaluation Criteria
              </span>
              <h2 id="eval-title" className="text-2xl font-light tracking-tight text-[#EBF3EA]">
                Select the typographic voice of Helia Studio
              </h2>
              <p className="text-sm leading-relaxed text-[rgba(235,243,234,0.7)]">
                The brand feeling is <strong className="text-[#EBF3EA] font-normal">quiet, confident, editorial</strong> — a well-run private advisory, not a SaaS launch. Below, 6 curated pairings are loaded via <code className="text-[#62D468] font-mono text-xs">next/font</code> and rendered in both dark and light tokens with your exact real content across all 4 key scale levels: <em>Display</em>, <em>H2</em>, <em>Body</em>, and <em>Small</em>.
              </p>
            </div>
            <div className="rounded border border-[rgba(235,243,234,0.1)] bg-[#070B08] p-4 text-xs font-mono space-y-1.5 shrink-0">
              <div className="text-[rgba(235,243,234,0.5)]">Contrast Ratios Verified:</div>
              <div className="text-[#EBF3EA]">Dark: #EBF3EA on #070B08 = 17.4:1 (AAA)</div>
              <div className="text-[#EBF3EA]">Light: #070B08 on #EBF3EA = 17.4:1 (AAA)</div>
              <div className="text-[#62D468]">Light brand-text: #1E7A35 = 4.63:1 (AA)</div>
              <div className="text-[#62D468]">Dark brand fill: #62D468 = 11:1 (AAA)</div>
            </div>
          </div>
        </section>

        {/* Pairing Sections */}
        {PAIRINGS.map((pairing) => (
          <section
            key={pairing.id}
            id={pairing.id}
            className="scroll-mt-24 space-y-6 pt-4 border-t border-[rgba(235,243,234,0.12)]"
          >
            {/* Pairing Header */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#62D468] tracking-widest uppercase">
                    Pairing {pairing.number}
                  </span>
                  {pairing.recommendationTag && (
                    <span className="rounded-full bg-[#62D468]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#62D468] border border-[#62D468]/30">
                      {pairing.recommendationTag}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#EBF3EA] mt-1">
                  {pairing.name}
                </h2>
                <p className="text-xs text-[rgba(235,243,234,0.65)] mt-1 font-mono">
                  Display: <span className="text-[#EBF3EA]">{pairing.displayName}</span> ({pairing.displayClassification}) • Body: <span className="text-[#EBF3EA]">{pairing.bodyName}</span> ({pairing.bodyClassification})
                </p>
              </div>
              <div className="max-w-md text-xs text-[rgba(235,243,234,0.7)] leading-relaxed italic border-l border-[rgba(235,243,234,0.15)] pl-3">
                {pairing.editorialNote}
              </div>
            </div>

            {/* Themes Grid */}
            <div
              className={`grid gap-6 ${
                themeView === "both"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {/* DARK THEME PANEL */}
              {(themeView === "both" || themeView === "dark") && (
                <div className="rounded-lg border border-[rgba(235,243,234,0.12)] bg-[#070B08] p-6 sm:p-10 text-[#EBF3EA] transition-all">
                  {/* Panel Meta */}
                  <div className="flex items-center justify-between border-b border-[rgba(235,243,234,0.12)] pb-3 mb-8 text-xs font-mono">
                    <span className="flex items-center gap-2 text-[#62D468]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#62D468]" />
                      DARK THEME • paper: #070B08 • ink: #EBF3EA
                    </span>
                    <span className="text-[rgba(235,243,234,0.5)]">
                      weight: 350 / leading: +5%
                    </span>
                  </div>

                  <div className="space-y-10">
                    {/* 1. SMALL SIZE */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(235,243,234,0.4)] block">
                        Level: Small (Eyebrow & Meta)
                      </span>
                      <p
                        className={`${pairing.bodyFont.className} text-xs sm:text-sm uppercase tracking-widest text-[rgba(235,243,234,0.65)] font-medium`}
                      >
                        {langView !== "fr" && (
                          <span>01 / STRATEGIC POSITIONING • HELIA STUDIO • BRUSSELS & PARIS</span>
                        )}
                        {langView === "both" && <span className="mx-2 text-[rgba(235,243,234,0.2)]">|</span>}
                        {langView !== "en" && (
                          <span>01 / POSITIONNEMENT STRATÉGIQUE • HELIA STUDIO • BRUXELLES & PARIS</span>
                        )}
                      </p>
                    </div>

                    {/* 2. DISPLAY SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(235,243,234,0.4)] block">
                        Level: Display (Hero Headline)
                      </span>

                      {langView !== "fr" && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-[rgba(235,243,234,0.4)] mb-1">English</p>
                          <h3
                            className={`${pairing.displayFont.className} text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight leading-[1.08] text-[#EBF3EA]`}
                          >
                            Your <span className="italic">expertise</span>, finally visible on LinkedIn.
                          </h3>
                        </div>
                      )}

                      {langView !== "en" && (
                        <div className={langView === "both" ? "pt-4 border-t border-[rgba(235,243,234,0.08)]" : ""}>
                          <p className="text-[10px] uppercase font-mono text-[rgba(235,243,234,0.4)] mb-1">Français</p>
                          <h3
                            className={`${pairing.displayFont.className} text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight leading-[1.08] text-[#EBF3EA]`}
                          >
                            Votre <span className="italic">expertise</span>, enfin visible sur LinkedIn.
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* 3. H2 SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(235,243,234,0.4)] block">
                        Level: H2 (Section Heading)
                      </span>

                      {langView !== "fr" && (
                        <h4
                          className={`${pairing.displayFont.className} text-xl sm:text-2xl font-light tracking-tight text-[#EBF3EA] leading-snug`}
                        >
                          Thought leadership tailored for founders and executive voices.
                        </h4>
                      )}

                      {langView !== "en" && (
                        <h4
                          className={`${pairing.displayFont.className} text-xl sm:text-2xl font-light tracking-tight text-[#EBF3EA] leading-snug`}
                        >
                          Ghostwriting & positionnement stratégique pour dirigeants.
                        </h4>
                      )}
                    </div>

                    {/* 4. BODY SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(235,243,234,0.4)] block">
                        Level: Body (Editorial Paragraph)
                      </span>

                      {langView !== "fr" && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-[rgba(235,243,234,0.4)] mb-1">English</p>
                          <p
                            className={`${pairing.bodyFont.className} text-base sm:text-[17px] leading-[1.75] font-light text-[rgba(235,243,234,0.7)]`}
                          >
                            You have built rare, hard-won expertise over years of focused practice. But translating tacit knowledge into an authoritative weekly presence takes hours you simply cannot spare. Helia Studio distills your thinking, shapes your editorial voice, and establishes your profile as the definitive benchmark in your sector.
                          </p>
                        </div>
                      )}

                      {langView !== "en" && (
                        <div className={langView === "both" ? "pt-3 border-t border-[rgba(235,243,234,0.08)]" : ""}>
                          <p className="text-[10px] uppercase font-mono text-[rgba(235,243,234,0.4)] mb-1">Français</p>
                          <p
                            className={`${pairing.bodyFont.className} text-base sm:text-[17px] leading-[1.75] font-light text-[rgba(235,243,234,0.7)]`}
                          >
                            Vous avez bâti une expertise rare et exigeante au fil d&apos;années de pratique. Mais transformer ce savoir tacite en prises de parole régulières réclame un temps précieux. Helia Studio clarifie vos idées, affine votre voix éditoriale et fait de votre profil un repère incontournable pour votre écosystème.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 5. NAME: Héléna Clinckart */}
                    <div className="pt-2 border-t border-[rgba(235,243,234,0.12)] flex items-baseline justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(235,243,234,0.4)] block">
                          Founder Name
                        </span>
                        <p
                          className={`${pairing.displayFont.className} text-2xl sm:text-3xl font-light text-[#EBF3EA]`}
                        >
                          Héléna Clinckart
                        </p>
                      </div>
                      <p
                        className={`${pairing.bodyFont.className} text-xs uppercase tracking-wider text-[rgba(235,243,234,0.55)]`}
                      >
                        Fondatrice & Ghostwriter • Helia Studio
                      </p>
                    </div>

                    {/* 6. GUILLEMETS & œ DIAGNOSTICS */}
                    <div className="rounded border border-[rgba(235,243,234,0.1)] bg-[#0E1510] p-4 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#62D468] block">
                        French Typography & Character Verification (« guillemets » with œ)
                      </span>
                      <blockquote
                        className={`${pairing.displayFont.className} text-lg italic font-light text-[#EBF3EA] leading-snug`}
                      >
                        « Le cœur d’une posture de dirigeant ne s’improvise pas : il s’incarne à travers chaque œuvre et chaque mot mis en œuvre avec clarté. »
                      </blockquote>
                      <div
                        className={`${pairing.bodyFont.className} text-xs font-mono text-[rgba(235,243,234,0.6)] pt-1 border-t border-[rgba(235,243,234,0.08)]`}
                      >
                        Glyphs: « œ • Œ • cœur • sœur • œuvre • vœu • bœuf • é • è • ê • ç • à • î • ô • ù »
                      </div>
                    </div>

                    {/* 7. BRAND GREEN TOKEN TEST */}
                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(235,243,234,0.12)]">
                      <span className="text-xs font-mono text-[rgba(235,243,234,0.5)]">
                        Brand token on dark (#62D468 fill):
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className={`${pairing.bodyFont.className} rounded-full bg-[#62D468] px-5 py-2 text-xs font-medium text-[#070B08] transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-[#62D468]`}
                        >
                          Prendre contact →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LIGHT THEME PANEL */}
              {(themeView === "both" || themeView === "light") && (
                <div className="rounded-lg border border-[rgba(7,11,8,0.14)] bg-[#EBF3EA] p-6 sm:p-10 text-[#070B08] transition-all">
                  {/* Panel Meta */}
                  <div className="flex items-center justify-between border-b border-[rgba(7,11,8,0.14)] pb-3 mb-8 text-xs font-mono">
                    <span className="flex items-center gap-2 text-[#1E7A35]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1E7A35]" />
                      LIGHT THEME • paper: #EBF3EA • ink: #070B08
                    </span>
                    <span className="text-[rgba(7,11,8,0.55)]">
                      brand-text: #1E7A35 (4.6:1 AA)
                    </span>
                  </div>

                  <div className="space-y-10">
                    {/* 1. SMALL SIZE */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(7,11,8,0.45)] block">
                        Level: Small (Eyebrow & Meta)
                      </span>
                      <p
                        className={`${pairing.bodyFont.className} text-xs sm:text-sm uppercase tracking-widest text-[rgba(7,11,8,0.65)] font-medium`}
                      >
                        {langView !== "fr" && (
                          <span>01 / STRATEGIC POSITIONING • HELIA STUDIO • BRUSSELS & PARIS</span>
                        )}
                        {langView === "both" && <span className="mx-2 text-[rgba(7,11,8,0.2)]">|</span>}
                        {langView !== "en" && (
                          <span>01 / POSITIONNEMENT STRATÉGIQUE • HELIA STUDIO • BRUXELLES & PARIS</span>
                        )}
                      </p>
                    </div>

                    {/* 2. DISPLAY SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(7,11,8,0.45)] block">
                        Level: Display (Hero Headline)
                      </span>

                      {langView !== "fr" && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-[rgba(7,11,8,0.45)] mb-1">English</p>
                          <h3
                            className={`${pairing.displayFont.className} text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight leading-[1.08] text-[#070B08]`}
                          >
                            Your <span className="italic">expertise</span>, finally visible on LinkedIn.
                          </h3>
                        </div>
                      )}

                      {langView !== "en" && (
                        <div className={langView === "both" ? "pt-4 border-t border-[rgba(7,11,8,0.08)]" : ""}>
                          <p className="text-[10px] uppercase font-mono text-[rgba(7,11,8,0.45)] mb-1">Français</p>
                          <h3
                            className={`${pairing.displayFont.className} text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight leading-[1.08] text-[#070B08]`}
                          >
                            Votre <span className="italic">expertise</span>, enfin visible sur LinkedIn.
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* 3. H2 SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(7,11,8,0.45)] block">
                        Level: H2 (Section Heading)
                      </span>

                      {langView !== "fr" && (
                        <h4
                          className={`${pairing.displayFont.className} text-xl sm:text-2xl font-normal tracking-tight text-[#070B08] leading-snug`}
                        >
                          Thought leadership tailored for founders and executive voices.
                        </h4>
                      )}

                      {langView !== "en" && (
                        <h4
                          className={`${pairing.displayFont.className} text-xl sm:text-2xl font-normal tracking-tight text-[#070B08] leading-snug`}
                        >
                          Ghostwriting & positionnement stratégique pour dirigeants.
                        </h4>
                      )}
                    </div>

                    {/* 4. BODY SIZE */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(7,11,8,0.45)] block">
                        Level: Body (Editorial Paragraph)
                      </span>

                      {langView !== "fr" && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-[rgba(7,11,8,0.45)] mb-1">English</p>
                          <p
                            className={`${pairing.bodyFont.className} text-base sm:text-[17px] leading-[1.65] font-normal text-[rgba(7,11,8,0.7)]`}
                          >
                            You have built rare, hard-won expertise over years of focused practice. But translating tacit knowledge into an authoritative weekly presence takes hours you simply cannot spare. Helia Studio distills your thinking, shapes your editorial voice, and establishes your profile as the definitive benchmark in your sector.
                          </p>
                        </div>
                      )}

                      {langView !== "en" && (
                        <div className={langView === "both" ? "pt-3 border-t border-[rgba(7,11,8,0.08)]" : ""}>
                          <p className="text-[10px] uppercase font-mono text-[rgba(7,11,8,0.45)] mb-1">Français</p>
                          <p
                            className={`${pairing.bodyFont.className} text-base sm:text-[17px] leading-[1.65] font-normal text-[rgba(7,11,8,0.7)]`}
                          >
                            Vous avez bâti une expertise rare et exigeante au fil d&apos;années de pratique. Mais transformer ce savoir tacite en prises de parole régulières réclame un temps précieux. Helia Studio clarifie vos idées, affine votre voix éditoriale et fait de votre profil un repère incontournable pour votre écosystème.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 5. NAME: Héléna Clinckart */}
                    <div className="pt-2 border-t border-[rgba(7,11,8,0.14)] flex items-baseline justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(7,11,8,0.45)] block">
                          Founder Name
                        </span>
                        <p
                          className={`${pairing.displayFont.className} text-2xl sm:text-3xl font-normal text-[#070B08]`}
                        >
                          Héléna Clinckart
                        </p>
                      </div>
                      <p
                        className={`${pairing.bodyFont.className} text-xs uppercase tracking-wider text-[rgba(7,11,8,0.6)]`}
                      >
                        Fondatrice & Ghostwriter • Helia Studio
                      </p>
                    </div>

                    {/* 6. GUILLEMETS & œ DIAGNOSTICS */}
                    <div className="rounded border border-[rgba(7,11,8,0.1)] bg-[#E1EBE0] p-4 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#1E7A35] block">
                        French Typography & Character Verification (« guillemets » with œ)
                      </span>
                      <blockquote
                        className={`${pairing.displayFont.className} text-lg italic font-normal text-[#070B08] leading-snug`}
                      >
                        « Le cœur d’une posture de dirigeant ne s’improvise pas : il s’incarne à travers chaque œuvre et chaque mot mis en œuvre avec clarté. »
                      </blockquote>
                      <div
                        className={`${pairing.bodyFont.className} text-xs font-mono text-[rgba(7,11,8,0.65)] pt-1 border-t border-[rgba(7,11,8,0.08)]`}
                      >
                        Glyphs: « œ • Œ • cœur • sœur • œuvre • vœu • bœuf • é • è • ê • ç • à • î • ô • ù »
                      </div>
                    </div>

                    {/* 7. BRAND GREEN TOKEN TEST */}
                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(7,11,8,0.14)]">
                      <span className="text-xs font-mono text-[rgba(7,11,8,0.55)]">
                        Brand tokens on light (#62D468 fill + #1E7A35 text):
                      </span>
                      <div className="flex items-center gap-4">
                        <span
                          className={`${pairing.bodyFont.className} text-xs font-medium text-[#1E7A35] underline underline-offset-4`}
                        >
                          Découvrir la méthode →
                        </span>
                        <button
                          type="button"
                          className={`${pairing.bodyFont.className} rounded-full bg-[#62D468] px-5 py-2 text-xs font-medium text-[#070B08] transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E7A35]`}
                        >
                          Prendre contact →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* SIDE-BY-SIDE MATRIX COMPARISON */}
        <section
          aria-labelledby="matrix-title"
          className="pt-12 border-t border-[rgba(235,243,234,0.12)] space-y-8"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#62D468] font-mono">
              Direct Comparison Matrix
            </span>
            <h2 id="matrix-title" className="text-2xl font-light text-[#EBF3EA]">
              All 6 Display Fonts at a Glance (Display scale)
            </h2>
            <p className="text-xs text-[rgba(235,243,234,0.65)]">
              Scan down to compare line weight, italic flair, x-height, and rhythm across the exact same headline.
            </p>
          </div>

          <div className="divide-y divide-[rgba(235,243,234,0.1)] rounded-lg border border-[rgba(235,243,234,0.12)] bg-[#0E1510] p-6 sm:p-8 space-y-6">
            {PAIRINGS.map((p) => (
              <div key={`matrix-${p.id}`} className="pt-6 first:pt-0 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#62D468]">
                    {p.number} — {p.displayName} + {p.bodyName}
                  </span>
                  <span className="text-[rgba(235,243,234,0.4)]">{p.vibe}</span>
                </div>
                <p
                  className={`${p.displayFont.className} text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#EBF3EA] leading-tight`}
                >
                  Your <span className="italic">expertise</span>, finally visible on LinkedIn.
                </p>
                <p
                  className={`${p.displayFont.className} text-lg sm:text-xl font-light text-[rgba(235,243,234,0.7)] leading-tight`}
                >
                  Votre <span className="italic">expertise</span>, enfin visible sur LinkedIn. « Le cœur d’une posture de dirigeant »
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <footer className="border-t border-[rgba(235,243,234,0.12)] pt-8 pb-16 text-center text-xs font-mono text-[rgba(235,243,234,0.5)]">
          <p>Helia Studio Typography Testing Route — Temporary inspection environment.</p>
          <p className="mt-1 text-[rgba(235,243,234,0.35)]">
            Delete <code className="text-[#62D468]">src/app/type-test</code> once the final pairing is selected.
          </p>
        </footer>
      </main>
    </div>
  );
}
