# Structure and customer journey

One page, ten sections, one job each. The order follows what a visitor wonders next: Is this for me? Do I have this problem? What would change? What exactly do you do? Can you do it? What happens next? Who are you? What does it cost? What if I doubt? How do I start?

## Navigation
Header: logo wordmark "Helia Studio" · How it works · The work · About · Pricing · FAQ · Book a call (primary button) · EN/FR · theme toggle.
Transparent at the top, hides when scrolling down, returns when scrolling up, hairline underneath once past the hero. Anchors: #how-it-works, #work, #about, #pricing, #faq, #book.
The EN/FR switch is a real link to the same section in the other language, not a JavaScript toggle.
No ticker, no announcement bar.

## Sections

| # | Section | Visitor's question | Its one job | Anchor |
|---|---|---|---|---|
| 1 | Hero | Is this for me? | State who it is for and what changes. Get the call booked or the scroll started. | top |
| 2 | Problem | Do I really have this problem? | Make the cost of an unclear profile feel true. | none |
| 3 | The shift | What would change? | Show a vague headline becoming a clear one. | none |
| 4 | What I do | What exactly will you do? | Two offers, stated plainly. | none |
| 5 | The work | Can you actually do this? | Show real results and real work. | #work |
| 6 | How we work | What happens next? | Remove the unknowns of starting. | #how-it-works |
| 7 | About | Who am I trusting? | Her face, her voice, the direct-work promise. | #about |
| 8 | Pricing | What does it cost? | Fixed prices, three ways in, all leading to the same call. | #pricing |
| 9 | FAQ | What about my doubts? | Answer objections in plain words. | #faq |
| 10 | Final call + footer | How do I start? | One clear action. | #book |

## Section notes

**1. Hero.** The h1 dominates; the page is typographic. Sub-headline states who and what in one sentence. One primary button, one quiet text link ("See how it works"). Micro-line under the button: she reviews your profile before the call. Tight portrait of Héléna on the right, bleeding off the bottom edge on desktop and below the headline on mobile. Content is visible without JavaScript.

**2. Problem.** Centred h2 (cols 2–11 on the 12-column grid, left-aligned below 768px), paragraph on the right (cols 7–12), closing line on the left (cols 1–6) stepping down immediately below the paragraph (24–32px gap). No hairlines. No illustration. The h2 is animated (line-by-line reveal); nothing else moves.

**3. The shift.** The first signature moment (see docs/motion.md): three vague headlines are each struck through and replaced by a clear one. Labelled "Illustrative examples". All six headlines exist in the HTML.
  - Intro (normal flow): h2 left (cols 1–8, h2 token, text-wrap: balance, ink, no emphasis colour) and one-sentence body right (cols 9–12, DM Sans body-lg, muted ink, narrow measure), tops aligned. No hairline, eyebrow or icon.
  - Stage (directly after the intro): block exactly 100svh tall on desktop, content vertically centred, no background change. This is the part that pins.
  - Stage desktop: an <ol> of three rows, each row reserving its full height from the start (no shift). Per row: BEFORE (cols 1–10, DM Serif Display clamp(1.5rem–2rem), ink, one line, marked up as `s` with a visually hidden "Before:" prefix) and AFTER (cols 1–10, DM Serif Display clamp(1.75rem, min(3.6vw, 5.5vh), 3.25rem), ink, up to two lines balance, only the key phrase italic in brand-text, marked up as `<p>` with a visually hidden "After:" prefix). Each row has its own decorative strike line: separate aria-hidden span, 2px ink, middle of x-height, text width, animated scaleX 0→1 (NOT text-decoration). Margin notes (small DM Sans, muted ink) in cols 11–12 aligned with each row's BEFORE first line; the final note "Clear in seconds." sits in cols 11–12 beside the last AFTER. Rows separated by 1px hairlines (ink at 12%). Permanent caption bottom-left: "Illustrative examples." / "Exemples illustratifs."
  - Pins only on min-width 768px AND min-height 720px AND prefers-reduced-motion: no-preference; scrubs opacity + transform only, pin ~2.2× viewport height. Mobile / reduced motion / no JS: no pin, stacked single column, each BEFORE struck through at 25% opacity with its note and AFTER at full strength; with motion allowed each AFTER gets one reveal on enter.

**4. What I do.** Two offers as two large ruled blocks, not cards, each with a heading, one sentence and a plain one-line list of what is included. Not three equal columns. No icons.

**5. The work.** Her two real posts shown as her real screenshots, offset on the grid, each with its figures set in the serif beside it, with source and date. Below, the transcribed text of the carousel as real HTML text for search and AI engines. A single sentence of context ("my own content: everything I do for clients, I do first for myself"). If a verified client quote exists, it goes here, never a placeholder. Inline link: "Book a call".

**6. How we work.** Four numbered steps along a drawn line (supporting motion). Large serif numerals, no circles or boxes.

**7. About.** Wider portrait, the promise ("You work with me. Directly."), languages, the third-person definition line for search engines. Her short personal intro goes here when she provides it ([TODO] in copy.md).

**8. Pricing.** Asymmetric: the Trust Engine as the large flagship block, the other two as quieter ruled rows below it. Same layout in both themes. Every plan button opens the same booking link, worded per plan. No currency toggle: English shows USD and French shows EUR, once Héléna confirms the EUR amounts. No scarcity badge unless true.

**9. FAQ.** Eight questions, answers visible in the HTML (accordion by CSS grid-rows or <details>, never content removed from the DOM). Marked up with FAQPage schema.

**10. Final call.** One headline, the primary button, a quiet "or send me a DM" link. Footer: wordmark, one-line description, LinkedIn, booking link, privacy, legal notice, language switch, © 2026.

## Call to action rules
- Primary action everywhere: book the call. Label "Book a free 30-minute call" (header uses the short "Book a call").
- Appears in: header, hero, an inline link at the end of The work, every pricing plan, final call. Same destination each time.
- Opens in a new tab with rel="noopener". (An embedded booking widget can be considered later.)
- Never more than one primary button per viewport.

## Not on the page
Services list beyond the two offers, "trusted by" strip, ticker, fake score, newsletter signup, blog teaser, chat widget, cookie banner (no cookies until analytics is decided), pop-ups of any kind.

## Suggested file layout
- app/[locale]/layout.tsx, page.tsx
- components/sections/: Hero, Problem, Shift, Offers, Work, Process, About, Pricing, Faq, FinalCta
- components/ui/: Header, Footer, Button, ThemeToggle, LocaleSwitcher
- components/motion/: SmoothScroll, LineReveal, and one component per signature moment
- messages/en.json, messages/fr.json (copy from docs/copy.md)
- lib/seo.ts, lib/schema.ts
Adjust to current Next 16 conventions, and follow next-intl's current setup guide for routing.