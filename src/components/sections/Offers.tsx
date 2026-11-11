import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";
import LineReveal from "@/components/motion/LineReveal";
import Button from "@/components/ui/Button";

/**
 * Section 4 — What I do
 *
 * Two offers as two ruled blocks, not cards. Hairlines and spacing only.
 *
 * Layout (12-column asymmetric grid, desktop):
 *  Section h2: full width, above the blocks.
 *  Per block:
 *    Row 1 — full-width hairline (opens the block).
 *    Row 2 — index (cols 1–2) sits above the headline.
 *    Row 3 — headline (cols 1–6) beside the content block (cols 8–12).
 *              Body, deliverable rows and pricing link stack inside cols 8–12.
 *  Mobile (<1024px): single column, order: hairline, index, headline, body,
 *  deliverables, link. At 768px the content block offsets to cols 4–12 to keep
 *  the asymmetry without overlapping.
 *
 * Copy: messages/en.json + messages/fr.json (offers.*). Verbatim from copy.md
 * section 4. No prices here; pricing lives in section 8.
 *
 * Motion: none. Section 4's motion budget is spent. Hairlines render statically
 * so content is visible without JavaScript.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface OfferData {
  index: string;
  title: string;
  body: string;
  includes: string;
}

interface OffersSectionProps {
  locale?: Locale;
}

const OFFERS: Record<Locale, OfferData[]> = {
  en: [
    {
      index: "01",
      title: enMessages.offers.offer1.title,
      body: enMessages.offers.offer1.body,
      includes: enMessages.offers.offer1.includes,
    },
    {
      index: "02",
      title: enMessages.offers.offer2.title,
      body: enMessages.offers.offer2.body,
      includes: enMessages.offers.offer2.includes,
    },
  ],
  fr: [
    {
      index: "01",
      title: frMessages.offers.offer1.title,
      body: frMessages.offers.offer1.body,
      includes: frMessages.offers.offer1.includes,
    },
    {
      index: "02",
      title: frMessages.offers.offer2.title,
      body: frMessages.offers.offer2.body,
      includes: frMessages.offers.offer2.includes,
    },
  ],
};

export default function OffersSection({ locale = "en" }: OffersSectionProps) {
  const t = messages[locale].offers;
  const offers = OFFERS[locale];

  return (
    <section
      aria-labelledby="offers-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <LineReveal className="mb-16 lg:mb-24">
          <h2
            id="offers-heading"
            data-split-target
            aria-label={`${t.h2Lead}${t.h2Em}`}
            className="font-serif font-normal text-h2 text-ink mb-0"
            style={{
              lineHeight: "var(--text-h2--line-height, 1.0)",
              letterSpacing: "var(--text-h2--letter-spacing, -0.015em)",
              textWrap: "pretty",
              overflowWrap: "break-word",
              hyphens: "none",
              WebkitHyphens: "none",
            }}
          >
            {t.h2Lead}<em className="italic text-brand-text">{t.h2Em}</em>
          </h2>
        </LineReveal>

        {offers.map((offer, i) => {
          const isLast = i === offers.length - 1;
          const deliverables = offer.includes
            .split("·")
            .map((item) => item.trim())
            .filter(Boolean);

          return (
            <article
              key={offer.index}
              className={`relative mb-20 lg:mb-40 ${isLast ? "mb-0" : ""}`}
            >
              {/* Full-width hairline that opens the block. */}
              <div data-rule aria-hidden="true" className="border-t border-hairline mb-6 lg:mb-8" />

              <div
                className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 lg:gap-x-6"
              >
                {/* Index — label, sits above the headline (cols 1–2). */}
                <div
                  className="font-sans text-small text-brand-text lg:row-start-1 lg:col-start-1 lg:col-span-2 md:col-start-1 md:col-span-12"
                >
                  {offer.index}
                </div>

                {/* Headline — DM Serif Display, cols 1–6. */}
                <div
                  className="min-w-0 lg:row-start-2 lg:col-start-1 lg:col-span-6 md:col-start-1 md:col-span-12"
                >
                  <h3
                    className="font-serif font-normal text-h3 text-ink mb-0 leading-tight"
                    style={{
                      lineHeight: "var(--text-h3--line-height, 1.15)",
                      letterSpacing:
                        "var(--text-h3--letter-spacing, -0.015em)",
                      textWrap: "pretty",
                      overflowWrap: "break-word",
                      hyphens: "none",
                      WebkitHyphens: "none",
                    }}
                  >
                    {offer.title}
                  </h3>
                </div>

                {/* Content block — body, deliverables, pricing link (cols 8–12). */}
                <div
                  className="min-w-0 lg:row-start-2 lg:col-start-8 lg:col-span-5 md:col-start-4 md:col-span-9 sm:col-span-12"
                >
                  <p
                    className="font-sans text-body-lg text-ink-muted mb-8 lg:mb-10"
                    style={{
                      lineHeight: "var(--text-body--line-height, 1.6)",
                      textWrap: "pretty",
                      maxWidth: "42ch",
                    }}
                  >
                    {offer.body}
                  </p>

                  {/* Deliverables — plain text rows, hairline-separated, no markers. */}
                  <ul
                    className="font-sans text-small text-ink divide-y divide-hairline list-none pl-0 m-0 mb-10 lg:mb-12"
                    style={{ lineHeight: "var(--text-body--line-height, 1.6)" }}
                  >
                    {deliverables.map((item, j) => (
                      <li
                        key={j}
                        data-row
                        className="py-3 last:pb-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Quiet text link to pricing — same span-based underline as the Hero's first CTA. */}
                  <Button
                    variant="underline-link"
                    href="#pricing"
                    className="inline-block"
                  >
                    {t.pricingLink}
                    <span className="sr-only">{`, ${offer.title}`}</span>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
