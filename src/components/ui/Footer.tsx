import { ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import LineReveal from "@/components/motion/LineReveal";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import { BOOKING_URL } from "@/lib/links";
import { MESSAGES, type Locale } from "@/lib/i18n";

/**
 * Footer — the colophon, set like the last page of a magazine.
 *
 * A serif statement and two plain link columns sit above the studio's name
 * at full measure; the name is sized to the container so it always runs
 * edge to edge. A ruled baseline carries the copyright and the way back up.
 *
 * Copy: messages (footer.*, nav.*), from docs/copy.md section 10.
 */

interface FooterProps {
  locale?: Locale;
}

const LINK =
  "group inline-flex items-center gap-2 transition-colors hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text";

export default function Footer({ locale = "en" }: FooterProps) {
  const t = MESSAGES[locale].footer;
  const nav = MESSAGES[locale].nav;

  const sections = [
    { label: nav.howItWorks, href: "#how-it-works" },
    { label: nav.work, href: "#work" },
    { label: nav.about, href: "#about" },
    { label: nav.pricing, href: "#pricing" },
    { label: nav.faq, href: "#faq" },
  ];

  return (
    <footer className="bg-paper text-ink overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 lg:pt-28 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
          <p
            className="col-span-2 md:col-span-6 lg:col-span-5 font-serif font-normal text-h3 text-ink mb-0"
            style={{ textWrap: "balance" }}
          >
            {t.description}
          </p>

          <nav
            aria-label={nav.menuLabel}
            className="md:col-start-8 md:col-span-2"
          >
            <ul className="font-sans text-body text-ink list-none pl-0 m-0 space-y-2.5">
              {sections.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-start-10 md:col-span-3 lg:col-start-11 lg:col-span-2">
            <ul className="font-sans text-body text-ink list-none pl-0 m-0 space-y-2.5">
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  {t.links.book}
                  <ArrowUpRightIcon
                    weight="light"
                    aria-hidden="true"
                    className="size-4 text-brand-text transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </a>
              </li>
              {/* TODO: LinkedIn link, once Héléna's profile URL is known.
                  TODO: Privacy policy and Legal notice links, once those
                  pages exist (docs/copy.md section 10). */}
            </ul>
            <div className="mt-6 -ml-1.5">
              <LocaleSwitcher locale={locale} />
            </div>
          </div>
        </div>

        {/* The studio's name at full measure. Sized in container units so it
            spans the column at every width; the image wordmark in the header
            already names the brand for assistive tech. */}
        <div className="@container mt-20 lg:mt-28" aria-hidden="true">
          <LineReveal>
            <p
              data-split-target
              className="font-serif font-normal text-ink text-[20cqw] leading-[0.9] tracking-[-0.03em] whitespace-nowrap mb-0"
            >
              Helia <span className="text-brand-text">Studio</span>
            </p>
          </LineReveal>
        </div>

        <div className="mt-8 lg:mt-10 pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-sans text-small text-ink-muted">
          <p className="mb-0">{t.copyright}</p>
          <a href="#top" className={LINK}>
            {t.backToTop}
            <ArrowUpIcon
              weight="light"
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
