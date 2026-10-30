# Helia Studio landing page

Next.js 16 (App Router), React 19, Tailwind 4, TypeScript. A single landing page for Héléna Clinckart's LinkedIn ghostwriting and profile optimization studio. The brand is "Helia Studio", never "Hela".

## Before any task
Read docs/brief.md, docs/design-direction.md and docs/structure.md. For section work also read docs/copy.md and docs/motion.md. Do not fall back on your own idea of what a landing page looks like.

## How to work
- One section or one concern per task. Never build the whole page at once.
- Use the copy in docs/copy.md exactly. Never write placeholder copy, and never invent testimonials, client names, logos, numbers or scarcity claims.
- Ask before adding any dependency. Approved: gsap, @gsap/react, lenis, @phosphor-icons/react, clsx, tailwind-merge. Not allowed: other animation or scroll libraries, component kits.
- If a doc is ambiguous, stop and ask instead of guessing.

## Design rules (full list in docs/design-direction.md)
- No gradient blobs, glowing orbs, grid backgrounds, marquee tickers, identical three-card rows, icons in circles, or emoji.
- Colors, type scale and spacing come from tokens in globals.css (@theme). No hard-coded values in components.

## Motion rules
- GSAP with ScrollTrigger for scroll animation; Lenis for smooth scroll, synced to the GSAP ticker.
- Animate transform and opacity only. Nothing that shifts layout.
- Respect prefers-reduced-motion: no smooth scroll, no scroll-driven movement, content simply appears.
- All content must exist in the server-rendered HTML. Animation enhances visible content and must never hide text that search engines and AI crawlers need.
- Use useGSAP so every ScrollTrigger is cleaned up on unmount.

## Code rules
- Server Components by default; "use client" only for interactive or animated wrappers.
- TypeScript strict, no any.
- next/image for images, next/font for fonts, one h1 per page, semantic landmarks, visible focus states, 4.5:1 minimum text contrast.
- Assets live in public/assets with descriptive names.

## Done means
npm run lint and npm run build pass, 375px mobile and desktop checked, reduced motion checked, no console errors.