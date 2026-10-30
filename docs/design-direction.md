# Design direction

## Feeling
Quiet, confident, editorial. A well-run private practice, not a SaaS launch. Large type, generous space, very little decoration. Brand green is a signal, used on roughly 5% of any screen.

## Themes
Two designed themes, not an inversion. Default to the visitor's system setting, with a header toggle, a saved choice, and the theme applied before first paint (no flash).

| Token | Dark | Light |
|---|---|---|
| paper (page background) | #070B08 | #EBF3EA |
| ink (main text) | #EBF3EA | #070B08 |
| muted text | ink at 65% | ink at 65% |
| hairline | ink at 12% | ink at 14% |
| brand (fills) | #62D468 | #62D468 |
| brand-text | #62D468 | #1E7A35 (verify) |
| surface (rare, one step off paper) | tune by eye | tune by eye |

- Dark text on green fills in both themes.
- Never use #62D468 as text or line colour on the light theme (about 1.7:1). Use brand-text.
- No pure black or white. Neutrals carry a slight green tint.
- Every text colour must reach 4.5:1 in both themes, measured with a tool.

## Layout
- Asymmetric 12-column grid. Text hugs one side and whitespace does the work. Not everything centred.
- Structure comes from hairlines and spacing, not boxed cards. Lists are ruled rows, like a table of contents.
- One small radius value site-wide. Pill shapes only on buttons.
- No shadows in dark theme, minimal in light.
- Fluid, generous section padding (roughly 96 to 200px vertical).

## Type
- Two families: display (with its italic for emphasis) and text. Final pairing comes from the type test.
- Fluid scale with clamp(). Hero is four lines at most in both EN and FR.
- Dark theme: slightly lighter weight and more line height than light.
- Test every layout in both languages. Accents must render (é, è, ç, œ, « »).

## Photography
- One portrait of Héléna, cleanly cut out and placed on the page's own background. Two crops: tight and wide.
- Her real posts appear as real artifacts (screenshots, simply framed), never redrawn as fake UI.

## Forbidden
Gradient text, glow or blur orbs, grid or dot backgrounds, glassmorphism, marquee tickers, eyebrow pills above every heading, three equal feature cards, icons in circles, check-mark lists in rounded boxes, counter-stat rows, fake dashboards or scores, "trusted by" strips, emoji, uniform fade-up on everything, hover-scale on everything, and the words elevate, unlock, empower, seamless, supercharge.

## Icons
Almost none. Phosphor light weight, only where an icon replaces words (arrow, external link).
