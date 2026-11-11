import LineReveal from "@/components/motion/LineReveal";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/links";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Section 8 — Pricing
 *
 * Set like a printed rate card. The Trust Engine is the lead entry under a
 * heavy rule, with its price at display scale. The other two plans are
 * quieter ruled rows beneath it. Every plan leads to the same booking link.
 *
 * Copy: messages (pricing.*), verbatim from docs/copy.md section 8.
 * Motion: the h2 line reveal only.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

/** "$1,700 per month" -> ["$1,700", "per month"] */
function splitPrice(price: string): [string, string] {
  const i = price.indexOf(" ");
  return i === -1 ? [price, ""] : [price.slice(0, i), price.slice(i + 1)];
}

function toRows(includes: string): string[] {
  return includes
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);
}

interface PricingSectionProps {
  locale?: Locale;
}

export default function PricingSection({ locale = "en" }: PricingSectionProps) {
  const t = messages[locale].pricing;
  const flagship = t.trustEngine;
  const [flagshipAmount, flagshipPeriod] = splitPrice(flagship.price);
  const others = [t.strategicAdvisor, t.profileBlueprint];

  // TODO: EUR amounts are not confirmed (docs/copy.md section 8). Until
  // Héléna confirms them, French shows the same USD figures as English.
  // TODO: the price of the English + French option is not confirmed, so only
  // the option sentence is rendered.
  // TODO: scarcity badge only if true. Default: none.

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 gap-y-6 lg:items-end mb-16 lg:mb-24">
          <LineReveal className="lg:col-start-1 lg:col-span-8">
            <h2
              id="pricing-heading"
              data-split-target
              aria-label={t.h2}
              className="font-serif font-normal text-h2 text-ink mb-0"
              style={{ textWrap: "balance" }}
            >
              {t.h2}
            </h2>
          </LineReveal>
          <p className="font-sans text-body-lg text-ink-muted mb-0 lg:col-start-9 lg:col-span-4 lg:pb-2">
            {t.sub}
          </p>
        </div>

        {/* Lead entry: the Trust Engine. */}
        <div data-rule aria-hidden="true" className="h-0.5 bg-ink" />
        <article className="pt-8 lg:pt-10 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 gap-y-12">
          <div className="lg:col-start-1 lg:col-span-6">
            <h3 className="font-serif font-normal text-h3 text-ink mb-0">
              {flagship.title}
            </h3>
            <p className="font-sans text-body-lg text-ink-muted mt-3 mb-0">
              {flagship.tagline}
            </p>
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-12 lg:mt-20 mb-0">
              <span className="font-serif font-normal text-ink text-[clamp(4rem,9vw,6rem)] leading-none tracking-[-0.02em]">
                {flagshipAmount}
              </span>
              <span className="font-sans text-body-lg text-ink-muted">
                {flagshipPeriod}
              </span>
            </p>
            <p className="font-sans text-small text-ink-muted mt-4 mb-0">
              {flagship.terms}
            </p>
          </div>

          <div className="lg:col-start-8 lg:col-span-5">
            <ul className="font-sans text-body text-ink list-none pl-0 m-0 border-b border-hairline">
              {toRows(flagship.includes).map((item) => (
                <li
                  key={item}
                  data-row
                  className="py-3.5 border-t border-hairline first:border-t-0 first:pt-0"
                  style={{ textWrap: "pretty" }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="font-sans text-small text-ink-muted mt-5 mb-0"
              style={{ textWrap: "pretty" }}
            >
              {flagship.option}
            </p>
            <Button
              variant="solid"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10"
            >
              {flagship.cta}
            </Button>
          </div>
        </article>

        {/* The two quieter plans, as ruled rows. */}
        <div className="border-b border-hairline">
          {others.map((plan) => {
            const [amount, period] = splitPrice(plan.price);
            return (
              <article
                key={plan.title}
                data-row
                className="border-t border-hairline py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-8"
              >
                <div className="md:col-span-6 lg:col-span-4">
                  <h3 className="font-serif font-normal text-h3 text-ink mb-0">
                    {plan.title}
                  </h3>
                  <p
                    className="font-sans text-body text-ink-muted mt-3 mb-0"
                    style={{ textWrap: "pretty", maxWidth: "36ch" }}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <ul className="font-sans text-small text-ink list-none pl-0 m-0 md:col-span-6 lg:col-start-6 lg:col-span-4">
                  {toRows(plan.includes).map((item) => (
                    <li
                      key={item}
                      className="py-3 border-t border-hairline first:border-t-0 first:pt-1"
                      style={{ textWrap: "pretty" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="md:col-span-12 lg:col-start-10 lg:col-span-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 lg:flex-col lg:items-end lg:justify-start">
                  <p className="flex items-baseline gap-x-2 mb-0">
                    <span className="font-serif font-normal text-h3 text-ink leading-none">
                      {amount}
                    </span>
                    <span className="font-sans text-small text-ink-muted">
                      {period}
                    </span>
                  </p>
                  <Button
                    variant="underline-link"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
