# SEO, AEO and GEO

One page has to do three jobs: rank in classic search (SEO), be quoted as the direct answer in answer boxes and assistants (AEO), and be understood and cited correctly by generative AI engines (GEO). All three reward the same things: clear structure, plain-text facts, a consistent entity, and a fast page.

## The entity
Search and AI engines need to know exactly who and what this is. Use these strings identically everywhere (page, metadata, schema, her LinkedIn profile):
- Person: **Héléna Clinckart**
- Brand: **Helia Studio**
- What it is: **LinkedIn ghostwriting and profile optimization** for founders and professionals, in English and French

Her LinkedIn profile spells her name "Héléna" in places and "Helena" in others. Her headline and About section should say the same thing as the page's h1 and sub-headline.

## Routing and languages
- Routes: /en and /fr, each a stable, crawlable URL with its own content, title and description. Use next-intl and follow its current setup guide for Next 16.
- The root path `/` redirects once by Accept-Language and defaults to English. Never force a redirect after the visitor has chosen a language.
- `<html lang>` matches the locale.
- hreflang alternates: en, fr, and x-default pointing to /en. Self-referencing canonical per locale.
- The language switcher is a real link to the same page in the other language.
- Translate everything: metadata, Open Graph, schema text, alt text, aria-labels.

## Metadata (use exactly; Héléna reviews the French)
| | EN | FR |
|---|---|---|
| Title | LinkedIn Ghostwriting & Profile Optimization \| Helia Studio | Ghostwriting LinkedIn & optimisation de profil \| Helia Studio |
| Description | Done-for-you LinkedIn content and profile optimization for founders and professionals. Written and designed by Héléna Clinckart. Book a free 30-minute call. | Contenu LinkedIn clé en main et optimisation de profil pour fondateurs et experts. Par Héléna Clinckart. Réservez un appel gratuit de 30 minutes. |

- Open Graph and Twitter cards per locale, with a generated opengraph-image in the brand colours and DM Serif Display (a typographic card, not a stock image).
- Set metadataBase once the domain is known ([TODO] domain).
- app/sitemap.ts with both locales and their alternates. app/robots.ts allowing all crawlers.

## Heading and content structure
- One h1 (the hero headline). One h2 per section. h3 only inside a section (offer titles, pricing plans, FAQ questions).
- Every section's first paragraph is answer-first: it states the point in one or two plain sentences before anything else.
- The first 100 words of the page say who it is for and what it offers (the hero sub-headline does this).
- The About section carries the one-sentence definition of Héléna and Helia Studio (see copy.md). This is the sentence AI engines are most likely to reuse.
- Prices, durations and what is included are real HTML text, never only in an image.
- The transcribed carousel text (copy.md, The work) is real HTML text next to the screenshot, so the content of her posts is indexable.
- Meaningful alt text on every image, in the page's language. Decorative elements get empty alt.
- Link text is descriptive ("Book a free 30-minute call"), never "click here".

## Structured data (JSON-LD, one @graph per locale, in the page, server-rendered)
- **Person:** name, jobTitle ("Founder, Helia Studio"), worksFor (the organization), image, knowsLanguage (en, fr), sameAs (her LinkedIn URL, [TODO]).
- **ProfessionalService (Helia Studio):** name, url, description, founder (the Person), knowsLanguage, sameAs, contact via the booking URL.
- **Service** (three): Trust Engine, Strategic Advisor, LinkedIn Profile Blueprint, each with provider and an Offer (price and currency) ONLY if prices are public, and the values must equal the visible prices exactly.
- **WebSite and WebPage:** inLanguage per locale.
- **FAQPage:** the eight questions and answers from copy.md, word for word as they appear on the page.
- Never mark up anything that is not visible on the page. No aggregateRating or Review schema unless real, permitted reviews exist on the page.
- Validate every locale with Google's Rich Results Test and the Schema.org validator.

## GEO specifics
- Keep facts consistent across the site and her LinkedIn profile. AI engines weigh agreement between sources.
- Write sentences that stand alone when quoted: they name the subject ("Helia Studio writes...") instead of relying on "it" or "we".
- Robots: allow the major AI crawlers and search bots by default (visibility is the business). This is a decision for Héléna; if she disagrees, change robots.ts.
- Optional: a short /llms.txt describing the entity and linking the two locale URLs. Low cost, uncertain benefit, so keep it factual and do not rely on it.
- Dated, sourced figures (post metrics with "October 2026" and the source) are more citable than round claims.

## Performance (part of SEO)
- Targets on mobile: LCP 2.0s or less, CLS 0.05 or less, INP 200ms or less, Lighthouse 95+ in all categories.
- The LCP element is the h1 text, not an image. Preload fonts through next/font. Portrait through next/image with priority and correct sizes.
- Pinning and scrub effects must not cause layout shift. Reserve space for every image.
- Load GSAP and Lenis in client wrappers only. Do not block the first paint with them.

## Accessibility (also ranks)
Semantic landmarks (header, main, footer, nav), a skip link, visible focus, 4.5:1 contrast in both themes, accordion buttons with aria-expanded, split-text headings keep an aria-label with the full text, prefers-reduced-motion respected.

## Measurement
- Google Search Console and Bing Webmaster Tools for both locales.
- Analytics: choose a cookie-free option, or none ([TODO] decide). Until decided there are no cookies and no consent banner.
- Track clicks on the booking link by position (hero, work, pricing, final).

## After launch
1. Submit the sitemap. Check indexing of both /en and /fr.
2. Query search engines and AI assistants: "Héléna Clinckart", "Helia Studio", "LinkedIn ghostwriter French English". Note what they say and fix the page or her profiles when it is wrong.
3. Re-check schema and hreflang after any copy change.

## Never
Keyword stuffing, hidden text, fake reviews or ratings, schema for content that is not on the page, duplicate untranslated pages, Unicode "bold" text.