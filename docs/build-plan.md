# Build plan

Work in milestones, in this order. One milestone per session with the editor. After each one, run the site and review it before moving on.

## Review loop (after every milestone)
1. Run `npm run dev`. Take screenshots at 375px, 768px and 1440px, in dark and light, in English and French.
2. Check reduced motion on and off.
3. Bring the screenshots back to the creative director (Claude) for critique before the next milestone. Fix what is wrong first.
4. Commit.

## Prompt template
```
Read AGENTS.md and docs/<the docs for this task>.
Task: <one concern>.
Constraints: <anything specific>.
Acceptance: <what must be true when done>.
Do not touch anything outside <scope>.
When finished, list the files changed, anything you were unsure about, and anything you did not do.
```

## M0. Prepare the project
```
Read AGENTS.md.
Task: prepare the project. No UI yet.
1) Check the Tailwind 4 setup works with Next 16. postcss.config.mjs should use @tailwindcss/postcss. If package.json lists @tailwindcss/turbopack and the build fails or the package does not exist, replace it with the documented package.
2) Install: gsap @gsap/react lenis @phosphor-icons/react clsx tailwind-merge next-intl.
3) Confirm AGENTS.md is at the root and the docs are in /docs.
4) Rename files in public/assets descriptively and list them for me. Do not use the green-screen portrait anywhere.
5) Run lint and build.
Acceptance: lint and build pass. Report installed versions and anything unexpected.
```

## M1. Foundations
```
Read AGENTS.md, docs/design-direction.md, docs/structure.md, docs/seo-aeo-geo.md (routing section).
Task: foundations only, no sections.
- globals.css: colour tokens, type scale and spacing in @theme. Dark and light themes via a data-theme attribute on <html>, a pre-paint inline script (saved choice, else system), color-scheme, per-theme theme-color.
- Fonts with next/font: DM Serif Display (400, normal and italic) and DM Sans (variable, optical size), subsets latin and latin-ext.
- next-intl routing for /en and /fr, message files messages/en.json and messages/fr.json with the header, footer and hero strings from docs/copy.md.
- Root layout with correct <html lang>, base metadata, skip link, Header, Footer, ThemeToggle, LocaleSwitcher (a real link).
Acceptance: both locales and both themes render with no flash of the wrong theme. Contrast of ink and brand-text on paper is 4.5:1 or better in both themes (report the measured values). A test page shows the full type scale with the real French accents "Héléna Clinckart — « Votre expertise »".
```

## M2. Motion foundation
```
Read AGENTS.md, docs/motion.md (house rules and "content is never gated").
Task: motion infrastructure only, no section animations.
- SmoothScroll client provider: Lenis wired to the GSAP ticker and ScrollTrigger as specified, disabled under reduced motion, smooth touch off.
- The pre-paint `js` class and the `motion-failed` failsafe.
- A reusable LineReveal component for headings (split by lines, aria-label on the heading, aria-hidden on spans, re-split after fonts load and on resize).
- Link underline and primary button hover styles.
- Anchor scrolling through Lenis with a header offset.
Acceptance: with JavaScript disabled, all text is visible. With reduced motion on, nothing animates and nothing is hidden. No console errors on route and locale changes.
```

## M3. Hero
Docs: copy.md (hero), structure.md (section 1 notes), motion.md (signature moment 1), design-direction.md (photography).
Needs: the cut-out portrait with a dark-theme and a light-theme background version. If it is not ready, build the hero with a clearly marked portrait slot.
Acceptance: h1 is four lines at most in both languages at 375px and 1440px. The ghost-to-focus effect runs once, under 1.8s. One primary button.

## M4. Problem and The shift
Docs: copy.md (sections 2 and 3), motion.md (signature moment 2).
Acceptance: pin works on desktop only, releases cleanly, causes no layout shift. Both headlines are in the HTML. Mobile and reduced-motion versions stack as specified. Test the French copy for line breaks.

## M5. What I do and The work
Docs: copy.md (sections 4 and 5), structure.md (notes 4 and 5), motion.md (supporting effect A).
Acceptance: the two offers are ruled blocks, not cards. Screenshots are her real images with correct alt text, figures, dates and source line. The carousel transcription is real text. No client logo or quote anywhere unless the docs say so.

## M6. How we work and About
Docs: copy.md (sections 6 and 7), motion.md (supporting effect B).
Acceptance: the line draws and the numerals respond. The About section shows the definition caption and the [TODO] for her personal intro as a visible code comment only.

## M7. Pricing, FAQ, final call and footer
Docs: copy.md (sections 8 to 10), structure.md (notes 8 to 10).
Acceptance: all plan buttons go to the same booking link. Prices exactly as in copy.md; EUR shown only when confirmed, otherwise French temporarily shows the same figures flagged with a code comment. FAQ answers are in the DOM when collapsed. No scarcity badge.

## M8. SEO, AEO and GEO layer
Docs: seo-aeo-geo.md in full.
Acceptance: metadata and Open Graph per locale, hreflang and canonicals, sitemap, robots, JSON-LD per locale validated, generated Open Graph image. Report validator results.

## M9. QA and launch checklist
- Lighthouse 95+ (all categories) on mobile for /en and /fr.
- Contrast check in both themes. Keyboard-only walkthrough. Screen-reader check of the h1 and split headings.
- Reduced motion, throttled CPU, resize between breakpoints, refresh mid-page.
- Every [TODO] in docs/copy.md resolved or consciously left out.
- Héléna has approved the English copy, the French copy, and the prices.
- Privacy policy and legal notice exist before launch.