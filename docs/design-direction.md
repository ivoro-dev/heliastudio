# Design direction

## Feeling
Quiet, confident, editorial. A well-run private practice, not a SaaS launch. Large type, generous space, very little decoration. Brand green is a signal, used on roughly 5% of any screen. Distinctiveness comes from scale, restraint, whitespace and motion, because the font pairing itself is common.

## Themes
Two designed themes, not an inversion. Default to the visitor's system setting. Header toggle, saved choice, applied before first paint (no flash). Implement with a data-theme attribute on <html>, a tiny inline pre-paint script, CSS variables, the color-scheme property and a theme-color meta per theme. No theme library. In Tailwind 4, use a custom dark variant keyed to [data-theme=dark].

| Token | Dark | Light |
|---|---|---|
| paper (page background) | #070B08 | #EBF3EA |
| ink (main text) | #EBF3EA | #070B08 |
| muted text | ink at 65% | ink at 65% |
| hairline | ink at 12% | ink at 14% |
| brand (fills) | #62D468 | #62D468 |
| brand-text | #62D468 | #1E7A35 (verify with a contrast tool) |
| surface (rare, one step off paper) | tune by eye | tune by eye |

- Dark text on green fills in both themes.
- Never use #62D468 as text or line colour on the light theme (about 1.7:1 contrast). Use brand-text there.
- No pure black or white. Neutrals carry a slight green tint.
- Every text colour reaches 4.5:1 in both themes, measured with a tool, not by eye.

## Typography
- **Display:** DM Serif Display. One weight (400), normal and italic. NEVER apply bold, semibold or any weight class to it (no faux bold). Never below 24px (1.5rem): it is high-contrast and breaks down small. Used for h1, h2, h3, large numerals and pull quotes.
- **Italic emphasis:** one phrase per heading at most, in brand-text colour.
- **Text:** DM Sans, variable with the optical-size axis on. Weights 400 and 500. 600 for buttons only.
- Load both with next/font, subsets latin and latin-ext (French accents: é è ê ç œ « »).
- Scale (fluid, clamp):
  - display (h1): clamp(3.25rem, 9vw, 9rem), line-height 0.95, letter-spacing -0.02em
  - h2: clamp(2.5rem, 6vw, 5.5rem), line-height 1.0, letter-spacing -0.015em
  - h3: clamp(1.5rem, 2.6vw, 2.25rem), line-height 1.15
  - body-lg: 1.1875rem. body: 1.0625rem, line-height 1.6, max 62ch. small: 0.875rem
- Dark theme: DM Sans slightly lighter (weight 400, never 500 for body) and line-height +0.05.
- The h1 is four lines at most in BOTH English and French. French runs 15 to 25% longer, so test every layout in both.

## Layout
- Asymmetric 12-column grid. Text blocks hug one side; whitespace does the work. Not everything centred.
- Structure comes from hairlines and spacing, not boxed cards. Lists are ruled rows, like a table of contents.
- One small radius value site-wide. Buttons are rectangular with radius 0.
- No shadows in dark theme, minimal in light.
- Fluid, generous section padding (clamp(4rem, 8vw, 8rem) vertical — roughly 64 to 128px). Defined as --section-py in globals.css @theme.

## Buttons and links
- Primary booking action: plain text link in brand-text colour with an animated underline built from an inner span (sitting a few pixels under the text). On hover and focus-visible, the line redraws left to right (scaleX 0 to 1, transform-origin left, ~0.4s strong ease-out) and exits to the right on leave (transform-origin right). Under reduced motion, the line is static and visible.
- Buttons: rectangular with radius 0 (border-radius 0). Hairline border, uppercase tracking-wider text. On hover, a brand-colour fill rises from the bottom (no scale) and the text turns dark (#070b08) in both themes.
- Focus: 2px ring with offset, visible in both themes.

## Photography
- One portrait of Héléna, cleanly cut out (no green fringe at the hair edges) and set on the page's own background. Prepare a tight crop (hero) and a wider crop (About), in both a dark-theme and a light-theme background.
- Her real posts appear as real artifacts (her screenshots, simply framed), never redrawn as fake UI.

## Forbidden (the slop list)
Gradient text, glow or blur orbs, grid or dot backgrounds, glassmorphism, marquee tickers, eyebrow pills above every heading, three equal feature cards, icons in circles, check-mark lists in rounded boxes, counter-stat rows, fake dashboards or scores, "trusted by" strips, emoji, uniform fade-up on everything, hover-scale on everything, and the words elevate, unlock, empower, seamless, supercharge.

## Icons
Almost none. Phosphor, light weight, only where an icon replaces words (arrow, external link).