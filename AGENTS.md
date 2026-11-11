# Helia Studio landing page

Next.js 16 (App Router), React 19, Tailwind 4, TypeScript. One bilingual (EN/FR) landing page for Héléna Clinckart's LinkedIn ghostwriting and profile optimization studio.

Names, always spelled exactly: the person is "Héléna Clinckart" (both accents), the brand is "Helia Studio". Never "Hela", never "Helena" in visible copy, titles, metadata or schema.

## Before any task
Read these every time: PRODUCT.md, docs/brief.md, docs/design-direction.md (Themes and Typography sections), docs/structure.md (section order, anchors, navigation and call to action rules).
Then, depending on the task: docs/copy.md (any text), docs/seo-aeo-geo.md (metadata, schema, routing), docs/build-plan.md (what to do and in which order).

## Who decides what (set 11 Nov 2026)
- The docs are binding for: theme, fonts, copy, facts, section order, SEO, accessibility and code rules. If the docs and your instinct disagree on these, the docs win.
- Layout, section design and motion are led by the Impeccable skill (.claude/skills/impeccable). Use it for any design work. The layout notes in docs/design-direction.md and docs/structure.md, the forbidden list, and docs/motion.md are reference only; where they disagree with Impeccable, Impeccable wins.

## How to work
- One section or one concern per task. Never build the whole page at once.
- Use the copy in docs/copy.md exactly, in both languages. Never write filler copy. Never invent testimonials, client names, logos, numbers, dates or scarcity claims.
- Where copy.md says [TODO], render only the copy that exists, leave a visible `{/* TODO */}` comment, and list it in your report. Do not fill the gap.
- Every user-facing string lives in the message files (EN and FR). No hard-coded strings in components.
- Ask before adding a dependency. Approved: gsap, @gsap/react, lenis, @phosphor-icons/react, clsx, tailwind-merge, next-intl. Not allowed: other animation or scroll libraries, component kits (shadcn/ui and similar), theme libraries.
- If a doc is ambiguous or missing something, stop and ask. Do not guess.
- When finished, report: files changed, what you were unsure about, and what you did not do.

## Theme and fonts (binding; details in docs/design-direction.md)
- Fonts: DM Serif Display for headlines, DM Sans for everything else. DM Serif Display has one weight: never apply bold or semibold to it.
- Colors come from tokens in globals.css (@theme). No hard-coded values in components.
- Two designed themes (dark and light) via a data-theme attribute and a pre-paint script. No theme library.
- No emoji (this is a copy rule and stays).

## Motion (design led by Impeccable; these technical rules stay)
- Libraries: GSAP + ScrollTrigger and Lenis only. Use useGSAP so everything is cleaned up on unmount.
- prefers-reduced-motion is respected: content simply appears.
- All content exists in the server-rendered HTML and stays visible if JavaScript fails. Animation enhances visible content; it never gates it.

## Code rules
- Server Components by default. "use client" only for interactive or animated wrappers.
- TypeScript strict, no `any`.
- next/image for images, next/font for fonts (subsets: latin and latin-ext, so French accents render).
- One h1 per page, semantic landmarks, visible focus states, 4.5:1 minimum text contrast in both themes.
- Assets live in public/assets with descriptive names.

## Done means
`npm run lint` and `npm run build` pass. Checked at 375px, 768px and 1440px, in light and dark, in EN and FR, with reduced motion on and off. No console errors.