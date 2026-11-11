# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who sell their own expertise and whose next client checks their LinkedIn before deciding to get in touch: founders, consultants, coaches, advisors and independent professionals. The audience is defined by that situation, not by title or industry. They read in English or French.

Job seekers are a secondary audience. They are served only by the one-time Profile Blueprint, never by the headline or hero.

## Product Purpose

Helia Studio is the one-person LinkedIn studio of Héléna Clinckart. It offers two things only:

1. Done-for-you LinkedIn content: finding topics, writing posts that sound like the client, designing visuals, scheduling.
2. LinkedIn profile optimization: headline, About section, banner, and making it clear what the client does and who they help.

This repository is its single bilingual landing page. Success is one action: the visitor books a free 30-minute discovery call (https://cal.com/helenaclinckart/discovery-call). The only secondary action is a LinkedIn DM. Every button leads to one of these two.

Other services she has listed elsewhere (graphic design, email marketing, lead generation) are deliberately not on this page.

## Positioning

The client works directly with Héléna. She writes, designs, schedules and publishes everything herself, in English and French. No team, no account managers, no middlemen. She reviews the prospect's profile before the discovery call.

## Operating Context

- Visitors usually arrive from LinkedIn and are deciding whether to trust one person with their public voice.
- The page has ten sections in a fixed order (docs/structure.md): Hero, Problem, The shift, What I do, The work, How we work, About, Pricing, FAQ, Final call and footer.
- Routes are /en and /fr, each with its own content and metadata; the language switch is a real link.
- Booking opens cal.com in a new tab.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router), React 19, Tailwind 4, TypeScript strict. Server Components by default.
- Copy comes from docs/copy.md, used exactly, in both languages. Every user-facing string lives in messages/en.json and messages/fr.json. Where copy.md says [TODO], render only what exists and leave a `{/* TODO */}` comment.
- All content is in the server-rendered HTML and stays visible if JavaScript fails.
- Approved dependencies: gsap, @gsap/react, lenis, @phosphor-icons/react, clsx, tailwind-merge, next-intl. Ask before adding any other.
- Names, always exact: "Héléna Clinckart" and "Helia Studio".
- Product names stay in English in both languages: Trust Engine, Strategic Advisor, LinkedIn Profile Blueprint.
- Done means lint and build pass, checked at 375px, 768px and 1440px, in both themes, both languages, with reduced motion on and off.

Undecided (waiting on Héléna):
- Whether prices are public; EUR amounts; the price of the English + French option.
- Her LinkedIn profile URL.
- Her one client: name, permission, and any quote.
- Her personal intro for the About section.
- Review of all French text.
- Whether process steps 2 to 4 match her real process.
- Domain, privacy policy, legal notice.
- Analytics choice (no cookies and no consent banner until decided).

## Brand Commitments

- Voice, English: plain, direct, warm, first person, short sentences, no hype, no exclamation marks. Banned words: elevate, unlock, empower, seamless, supercharge, game-changing, transform your, take your X to the next level, journey, leverage.
- Voice, French: vouvoiement, natural French reviewed by Héléna, gender-neutral where possible.
- No emoji and no Unicode "bold" or "italic" characters.
- Binding visual constraints (set by the user, 11 Nov 2026): the theme and the fonts from AGENTS.md and docs/design-direction.md stay fixed.
  - Theme: two designed themes, dark and light, via a data-theme attribute and a pre-paint script, with the colour tokens in globals.css (paper #070B08 / #EBF3EA, ink #EBF3EA / #070B08, brand #62D468, brand-text #62D468 dark / #1E7A35 light).
  - Fonts: DM Serif Display for headlines (one weight, never bold) and DM Sans for everything else.
- Everything else visual (layout, section design, motion, and the forbidden-pattern list in the project docs) is delegated to Impeccable's design guidance, per the user.
- Assets: logo-dark.png, logo-light.png, monogram-dark.png, monogram-light.png, profile-pic.png in public/assets.

## Evidence on Hand

- Post 1: carousel "4 types of writers you can hire", published 4 Oct 2026: 20,004 impressions, 256 reactions, 65 comments, 21 reposts. Source: LinkedIn analytics screenshot, 29 Oct 2026. Screenshot in public/assets.
- Post 2: "Reminder to self: You don't need to publish more LinkedIn content", published 8 Oct 2026: 10,209 impressions, 83 reactions, 48 comments, 6 reposts. Same source and date. Screenshot in public/assets.
- Post 3, client work: "Video Editor Hiring Checklist", published under Alex Oztop (DecimaLabs). Shown with the client's permission, confirmed by the site owner on 11 Nov 2026. Only the counts visible on the screenshot exist: 70 reactions, 24 comments, 1 repost. Screenshot: public/assets/post-1.png.
- Full carousel transcription (English) in docs/copy.md.
- Prices from her old page, to be confirmed: Trust Engine $1,700 per month, Strategic Advisor $850 per month, Profile Blueprint $500 one-time.
- One portrait of Héléna (public/assets/profile-pic.png).

Absent, never to be fabricated: testimonials, client names or logos, reviews or ratings, any figure without a source and date, scarcity claims. Hypothetical examples are labelled "Illustrative example".

## Product Principles

1. One narrow offer, one action. Two services, one call to book.
2. Honest proof only. Her own results, shown as real artifacts with source and date.
3. Her presence is the product. First-person voice and her face carry the direct-work promise.
4. Plain words in two languages. English and French are equal, and every layout must hold in both.
5. Content never depends on JavaScript or motion to be read.

## Accessibility & Inclusion

- 4.5:1 minimum text contrast in both themes, measured with a tool.
- One h1 per page, semantic landmarks, a skip link, visible focus states.
- prefers-reduced-motion respected: content simply appears.
- Meaningful alt text in the page's language.
