import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-32 sm:pt-40 md:pt-44 overflow-hidden"
      style={{ paddingBottom: "var(--section-py)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Two-line Colossal Headline (Maximized scale, strictly 2 lines) */}
        <h1 className="font-serif uppercase tracking-[-0.04em] select-none flex flex-col">
          <span className="text-[clamp(2.25rem,6.6vw,6rem)] font-normal text-ink leading-[1.0] mb-1 sm:mb-2">
            Stories that
          </span>
          <span className="text-[clamp(3.25rem,10.2vw,10.75rem)] font-normal leading-[0.85] whitespace-nowrap">
            <span className="text-brand-text mr-2 sm:mr-4">
              Sell
            </span>
            <span className="text-ink">Business</span>
          </span>
        </h1>

        {/* Content Block Directly Below Headline */}
        <div className="mt-8 max-w-[545px]">
          {/* Sub-headline description */}
          <p className="text-xs sm:text-sm md:text-[0.9375rem] uppercase tracking-wider font-sans font-medium text-ink-muted leading-relaxed mb-8 md:mb-10">
            Done-for-you LinkedIn content and profile optimization for founders
            and professionals. Everything written and designed by me, personally.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-end gap-6 sm:gap-8">
            <Button
              variant="underline-link"
              href="https://cal.com/helenaclinckart/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book free consultation
            </Button>

            <Button
              variant="square-outline"
              href="#how-it-works"
            >
              See how it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
