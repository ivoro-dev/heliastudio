import LineReveal from "@/components/motion/LineReveal";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Problem section — Section 2
 *
 * Editorial spread: one big statement, one narrow paragraph, one closing line,
 * and a lot of empty space. No decoration.
 *
 * Layout (12-column asymmetric grid, desktop):
 *  Row 1 — h2:            cols 2–11, centred (text-align: center).
 *  Row 2 — body:          cols 7–12, large gap below the h2 (≥ headline line-height).
 *  Row 3 — closing <p>:   cols 1–6, small gap (24–32px) below the paragraph.
 *
 * Mobile (<768px): single column, left-aligned, same order.
 *
 * No hairlines in this section (removed per revision).
 * Motion: line-by-line h2 reveal only. Nothing else moves.
 *
 * Copy: from messages/en.json + messages/fr.json (problem.*).
 * NOTE: next-intl not yet installed. Locale prop selects the message set.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

/**
 * Emphasis boundaries for the h2.
 * EN: "Your next client has already looked at your profile."
 *   → lead: "Your next client has "  em: "already looked"  trail: " at your profile."
 * FR: "Votre prochain client a déjà regardé votre profil."
 *   → lead: "Votre prochain client a "  em: "déjà regardé"  trail: " votre profil."
 */
const H2_EMPHASIS: Record<Locale, { lead: string; em: string; trail: string }> =
  {
    en: {
      lead: "Your next client has ",
      em: "already looked",
      trail: " at your profile.",
    },
    fr: {
      lead: "Votre prochain client a ",
      em: "déjà regardé",
      trail: " votre profil.",
    },
  };

/**
 * Closing line split: only the final question is italic.
 * EN plain: "You're great at what you do. "  italic: "Does your profile show it?"
 * FR plain: "Vous excellez dans votre domaine. "  italic: "Votre profil le montre-t-il ?"
 */
const CLOSING_SPLIT: Record<Locale, { plain: string; italic: string }> = {
  en: {
    plain: "You\u2019re great at what you do. ",
    italic: "Does your profile show it?",
  },
  fr: {
    plain: "Vous excellez dans votre domaine. ",
    italic: "Votre profil le montre-t-il\u00a0?",
  },
};

interface ProblemSectionProps {
  locale?: Locale;
}

export default function ProblemSection({ locale = "en" }: ProblemSectionProps) {
  const t = messages[locale].problem;
  const h2Parts = H2_EMPHASIS[locale];
  const closingParts = CLOSING_SPLIT[locale];

  // Full plain-text for aria-label — screen readers get the unsplit string
  const h2AriaLabel = t.h2;

  return (
    <section
      aria-labelledby="problem-heading"
      style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── 12-column grid ──────────────────────────────────────────────
            Desktop: 12 equal columns, 24px gap.
            Mobile: single column, same px-6 left edge for all rows.
        ──────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">

          {/* ── Row 1 — h2: cols 2–11 (desktop), centred ───────────────
              DM Serif Display at h2 token.
              lineHeight 1.0, letterSpacing -0.015em (CSS vars from @theme).
              text-align: center at lg, left on mobile.
              text-wrap: balance, hyphens off.
              Only "already looked" / "déjà regardé" is italic + brand-text.
          ──────────────────────────────────────────────────────────── */}
          <LineReveal className="lg:col-start-2 lg:col-span-10 lg:row-start-1">
            <h2
              id="problem-heading"
              data-split-target
              aria-label={h2AriaLabel}
              className="font-serif font-normal text-h2 text-ink mb-0 lg:text-center"
              style={{
                lineHeight: "var(--text-h2--line-height, 1.0)",
                letterSpacing: "var(--text-h2--letter-spacing, -0.015em)",
                textWrap: "balance",
                hyphens: "none",
                WebkitHyphens: "none",
              }}
            >
              {h2Parts.lead}
              {/* The ONLY emphasis in the section: italic + brand-text */}
              <em className="italic text-brand-text">{h2Parts.em}</em>
              {h2Parts.trail}
            </h2>
          </LineReveal>

          {/* ── Row 2 — body paragraph: cols 7–12 ──────────────────────
              DM Sans body-lg, muted ink.
              Starts at col 7 — deliberate void to the left.
              max-width ≈ 38ch → ~34–40 chars/line at body-lg.
              Top gap: ≥ h2 line-height (5.5rem max × 1.0 = 88px).
              mt-24 (6rem = 96px) on lg — comfortably above the floor.
              text-wrap: pretty. No animation.
          ──────────────────────────────────────────────────────────── */}
          <div
            className="lg:col-start-7 lg:col-span-6 lg:row-start-2 mt-16 md:mt-20 lg:mt-24"
          >
            <p
              className="font-sans text-body-lg text-ink-muted leading-relaxed"
              style={{ textWrap: "pretty", maxWidth: "38ch" }}
            >
              {t.body}
            </p>
          </div>

          {/* ── Row 3 — closing line: cols 1–6 ──────────────────────────
              <p> (not a heading). DM Serif Display at h3 token.
              lineHeight 1.15, hyphens off.
              Only the final question is italic — no colour change.
              Top: 24–32px below the paragraph's last line (mt-6/mt-8).
              Placed in row-start-3 to prevent grid auto-placing it beside
              the paragraph (which would be row 2, cols 1–6 — same row).
              Mobile: full-width, left-aligned, same order.
          ──────────────────────────────────────────────────────────── */}
          <div
            className="lg:col-start-1 lg:col-span-6 lg:row-start-3 mt-6 md:mt-8"
          >
            <p
              className="font-serif font-normal text-h3 text-ink"
              style={{
                lineHeight: "var(--text-h3--line-height, 1.15)",
                hyphens: "none",
                WebkitHyphens: "none",
              }}
            >
              {closingParts.plain} <br />
              <em className="italic text-brand">{closingParts.italic}</em>
            </p>
          </div>

        </div>{/* /grid */}
      </div>{/* /container */}
    </section>
  );
}
