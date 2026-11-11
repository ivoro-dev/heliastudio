import Image from "next/image";
import LineReveal from "@/components/motion/LineReveal";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Section 7 — About
 *
 * A magazine profile spread: her portrait as a plate on the left with the
 * definition sentence set beneath it as the photo caption, and the promise
 * in her own voice on the right.
 *
 * Copy: messages (about.*), verbatim from docs/copy.md section 7.
 * Motion: the h2 line reveal only.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface AboutSectionProps {
  locale?: Locale;
}

export default function AboutSection({ locale = "en" }: AboutSectionProps) {
  const t = messages[locale].about;
  const portraitAlt = messages[locale].hero.portraitAlt;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-12 md:items-end">
          <figure className="m-0 md:col-start-1 md:col-span-5">
            <div data-plate className="overflow-hidden rounded-sm">
            <Image
              src="/assets/profile-pic.png"
              width={1254}
              height={1254}
              alt={portraitAlt}
              sizes="(min-width: 1280px) 510px, (min-width: 768px) 40vw, 100vw"
              className="block w-full aspect-[4/5] object-cover object-top"
            />
            </div>
            <figcaption
              className="font-sans text-small text-ink-muted mt-4"
              style={{ textWrap: "pretty", maxWidth: "46ch" }}
            >
              {t.definitionCaption}
            </figcaption>
          </figure>

          <div className="md:col-start-7 md:col-span-6 lg:col-start-7 lg:col-span-6">
            <LineReveal>
              <h2
                id="about-heading"
                data-split-target
                aria-label={t.h2}
                className="font-serif font-normal text-h2 text-ink mb-0"
                style={{ textWrap: "balance" }}
              >
                {t.h2}
              </h2>
            </LineReveal>

            <p
              className="font-sans text-body-lg text-ink mt-10 lg:mt-14 mb-0"
              style={{ textWrap: "pretty", maxWidth: "44ch" }}
            >
              {t.body}
            </p>

            {/* TODO: personal intro, two or three sentences in Héléna's own
                words, EN and FR (docs/copy.md section 7). Nothing is rendered
                until she provides it. */}

            <p className="font-serif font-normal italic text-h3 text-brand-text mt-10 lg:mt-14 mb-0 pt-6 border-t border-hairline">
              {t.languages}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
