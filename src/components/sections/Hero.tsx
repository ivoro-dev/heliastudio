import Button from "@/components/ui/Button";
import HeroMotion from "@/components/motion/HeroMotion";
import { BOOKING_URL } from "@/lib/links";
import { MESSAGES, type Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale?: Locale;
}

const SIDE_LINE =
  "hero-mask text-[clamp(1.75rem,6.6vw,6rem)] text-ink leading-[1.0]";

export default function HeroSection({ locale = "en" }: HeroSectionProps) {
  const t = MESSAGES[locale].hero;

  return (
    <section
      id="top"
      className="relative pt-32 sm:pt-40 md:pt-44"
      style={{ paddingBottom: "var(--section-py)" }}
    >
      <HeroMotion className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Three-tier headline: the emphasised phrase carries the scale.
            Each line sits in its own mask for the load reveal. */}
        <h1
          data-hero-drift
          className="font-serif font-normal uppercase tracking-[-0.04em] flex flex-col gap-y-1 sm:gap-y-2"
        >
          <span className={SIDE_LINE}>
            <span data-hero-line className="block">
              {t.h1Lead}
            </span>
          </span>
          <em className="hero-mask not-italic text-brand-text text-[clamp(2rem,9vw,8.25rem)] leading-[0.9] whitespace-nowrap">
            <span data-hero-line className="block">
              <span data-hero-ghost className="block">
                {t.h1Em}
              </span>
            </span>
          </em>
          <span className={SIDE_LINE}>
            <span data-hero-line className="block">
              {t.h1Trail}
            </span>
          </span>
        </h1>

        <div className="mt-8 max-w-[545px]">
          <p
            data-hero-fade
            className="text-xs sm:text-sm md:text-[0.9375rem] uppercase tracking-wider font-sans font-medium text-ink-muted leading-relaxed mb-8 md:mb-10"
          >
            {t.sub}
          </p>

          <div
            data-hero-fade
            className="flex flex-wrap items-end gap-x-6 gap-y-4 sm:gap-x-8"
          >
            <Button
              variant="underline-link"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.primaryCta}
            </Button>

            <Button variant="square-outline" href="#how-it-works">
              {t.secondaryCta}
            </Button>
          </div>

          <p
            data-hero-fade
            className="font-sans text-small text-ink-muted mt-6 mb-0"
          >
            {t.microLine}
          </p>
        </div>
      </HeroMotion>
    </section>
  );
}
