import LineReveal from "@/components/motion/LineReveal";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Section 9 — FAQ
 *
 * An index page: the heading holds the left margin while the eight questions
 * run down the right as ruled entries. Native <details>, so every answer is
 * in the server-rendered HTML whether or not the entry is open.
 *
 * Copy: messages (faq.*), verbatim from docs/copy.md section 9.
 * Also emits FAQPage JSON-LD from the same strings, word for word.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

type FaqMessages = typeof enMessages.faq;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

interface FaqSectionProps {
  locale?: Locale;
}

export default function FaqSection({ locale = "en" }: FaqSectionProps) {
  const t: FaqMessages = messages[locale].faq;
  const items = NUMBERS.map((n) => ({
    question: t[`q${n}` as keyof FaqMessages],
    answer: t[`a${n}` as keyof FaqMessages],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 gap-y-10">
          <LineReveal className="lg:col-start-1 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2
              id="faq-heading"
              data-split-target
              aria-label={t.h2}
              className="font-serif font-normal text-h2 text-ink mb-0"
            >
              {t.h2}
            </h2>
          </LineReveal>

          <div className="lg:col-start-6 lg:col-span-7 border-b border-hairline">
            {items.map((item, i) => (
              <details
                key={item.question}
                data-row
                className="faq-item group border-t border-hairline"
                open={i === 0}
              >
                <summary className="flex items-start justify-between gap-6 py-6 lg:py-7 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text">
                  <h3
                    className="font-serif font-normal text-h3 text-ink mb-0 transition-colors duration-300 group-hover:text-brand-text group-open:text-brand-text"
                    style={{ textWrap: "balance" }}
                  >
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="faq-mark relative shrink-0 w-4 h-4 mt-[0.6em] text-brand-text"
                  />
                </summary>
                <p
                  className="font-sans text-body text-ink-muted mb-0 pb-8 lg:pb-10 pr-10"
                  style={{ textWrap: "pretty", maxWidth: "62ch" }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
