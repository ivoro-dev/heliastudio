import LineReveal from "@/components/motion/LineReveal";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/links";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Section 10 — Final call
 *
 * The one place the brand green owns a whole region: a full-width field with
 * the closing headline at its largest and the single booking action.
 * Dark text on the green fill in both themes.
 *
 * Copy: messages (finalCta.*), verbatim from docs/copy.md section 10.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface FinalCtaSectionProps {
  locale?: Locale;
}

export default function FinalCtaSection({ locale = "en" }: FinalCtaSectionProps) {
  const t = messages[locale].finalCta;

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      data-field
      className="bg-brand text-ink-on-brand"
      style={{
        paddingTop: "calc(var(--section-py) * 1.25)",
        paddingBottom: "calc(var(--section-py) * 1.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
          <LineReveal className="lg:col-start-1 lg:col-span-11">
            <h2
              id="book-heading"
              data-split-target
              aria-label={t.h2}
              className="font-serif font-normal text-ink-on-brand mb-0 text-[clamp(2.75rem,7.4vw,6rem)] leading-[0.98] tracking-[-0.02em]"
              style={{ textWrap: "balance" }}
            >
              {t.h2}
            </h2>
          </LineReveal>

          <div className="lg:col-start-1 lg:col-span-12 mt-12 lg:mt-20 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Button
              variant="on-brand"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.primaryCta}
            </Button>
            {/* TODO: Héléna's LinkedIn profile URL is not known yet
                (docs/copy.md section 10). The line is plain text until it
                exists; make it a link then. */}
            <p className="font-sans text-body-lg text-ink-on-brand mb-0">
              {t.secondaryCta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
