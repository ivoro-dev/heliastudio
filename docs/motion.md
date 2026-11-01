# Motion

The rule: motion explains, it never decorates. The page has two signature moments and two supporting effects. Everything else is still or nearly still. If an effect cannot say what idea it carries, it does not ship.

## House rules
- GSAP + ScrollTrigger for scroll animation. Lenis for smooth scroll.
- Lenis: duration about 1.1s, smooth wheel on, smooth touch OFF (native scrolling on phones). Wire it to GSAP: Lenis scroll events call ScrollTrigger.update, Lenis runs on the GSAP ticker, lag smoothing off.
- Anchor links scroll through Lenis with an offset for the header. Stop Lenis while any overlay or menu is open.
- Animate transform and opacity only. No animated blur, filter, box-shadow or layout properties.
- One house ease for entrances: a strong ease-out (cubic-bezier 0.16, 1, 0.3, 1 or GSAP's expo.out). Scrubbed motion uses power2.inOut or linear. Durations 0.7 to 1.2s. Staggers 0.06 to 0.1s.
- Use useGSAP with a scope so every tween and trigger is reverted on unmount. Use gsap.matchMedia for breakpoints and reduced motion.
- Call ScrollTrigger.refresh after fonts load, after a locale change, and after images size themselves.

## Content is never gated by JavaScript
- Server-rendered HTML is fully visible. Initial hidden states apply only after a pre-paint script adds a `js` class to <html> and only when reduced motion is off.
- Failsafe: if the animation setup has not run within about 3 seconds, add a `motion-failed` class that shows everything.
- Split-text headings: the heading keeps an aria-label with the full text; the split spans are aria-hidden. Re-split after fonts load and on resize (debounced), because line breaks differ in English and French. Use GSAP's SplitText if it is available in the installed version, otherwise a small custom splitter.

## Default behaviour (everything not listed below)
- **Section headings (h2):** reveal once by line, each line rising out of a mask, when about 85% down the viewport. Not scrubbed.
- **Body text, lists, images:** no animation.
- **Links:** underline draws left to right on hover.
- **Primary button:** brand fill rises from the bottom on hover (about 0.35s). No scale, no glow.
- **Header:** hides on scroll down, returns on scroll up. Hairline appears once past the hero.
- **Theme toggle:** 250ms colour transition on the page and main surfaces only.
- **FAQ accordion:** height opens by CSS grid-rows transition. Content stays in the DOM.

## Signature moment 1: Coming into focus (Hero, on load)
Idea: your expertise, finally visible.
- Headline lines rise out of their masks in sequence. The italic phrase ("finally visible" / "enfin visible") appears as a faint ghost (about 15% opacity, ink colour) and, once the lines have settled, resolves to full strength and to brand-text colour over about 1.1s. Two stacked layers crossfading by opacity. No blur.
- Then the sub-headline, the button and the micro-line fade in together, then the portrait fades in with a small upward drift (no more than 3%).
- Total under 1.8s. No loader screen. Reduced motion or no JavaScript: the final state, immediately.

## Signature moment 2: The headline rewrite (The shift, on scroll)
Idea: from vague to clear, shown rather than told.
- Structure: an intro in normal flow (h2 left, cols 1–8; one-sentence body right, cols 9–12, tops aligned) followed by a stage block exactly 100svh tall with its content vertically centred — this is the part that pins.
- Desktop only, via `gsap.matchMedia` with `(min-width: 768px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)`, set up inside `useGSAP` with a scope so everything reverts on unmount. Pin the stage for about 2.2× the viewport height, start "top top", `pinSpacing` on, `anticipatePin` on, `invalidateOnRefresh` on, scrub about 1. One GSAP timeline. ScrollTrigger markers removed.
  - 0 to 8%: hold. All three BEFOREs visible; AFTERs and notes hidden (opacity 0).
  - Three beats of ~28% each (8–36%, 36–64%, 64–92%). In each beat:
    - first 40%: that row's strike line draws across its BEFORE (scaleX 0→1, origin left), the BEFORE settles to ~25% opacity, its margin note fades in;
    - remaining 60%: that row's AFTER appears word by word (words are inline spans; each fades 0→1 with an upward drift ≤ 0.15em, short stagger), the italic key phrase last.
  - 92 to 98%: the final note "Clear in seconds." fades in beside the last AFTER.
  - 98 to 100%: hold, then release the pin.
- Animate opacity and transform only. No blur, filter, or colour animation on the text.
- Per row: BEFORE (cols 1–10, DM Serif Display, ink) and AFTER (cols 1–10, DM Serif Display, ink, up to two lines balance, one italic phrase in brand-text). Margin notes in cols 11–12 (small DM Sans, muted ink), each aligned with its row's BEFORE first line; the final note beside the last AFTER.
- Each row has its own decorative strike line (aria-hidden span, 2px ink, middle of x-height, text width, NOT text-decoration). BEFORE marked up as `s` with a visually hidden "Before:" prefix; AFTER as `<p>` with a visually hidden "After:" prefix.
- All text real, from the message files in EN and FR. No hard-coded strings. All six headlines exist in the server-rendered HTML at all times; animation changes only opacity and the decorative lines.
- Hidden start states apply only through the `js` class and only when motion is allowed. Call `ScrollTrigger.refresh` after fonts load and on locale change.
- Mobile, short screens, reduced motion, no JavaScript: no pin. Stack in order — three rows, each with BEFORE struck through by a static full-width line at 25% opacity, its note, and the AFTER at full strength — left aligned, one column. With motion allowed, each row's AFTER gets one simple reveal when it enters the viewport; otherwise simply visible.

## Supporting effect A: Posts as artifacts (The work)
- The two screenshots sit offset on the grid. On desktop each drifts with a very small parallax (about 4 to 8%, transform only, scrubbed). Each post's figures reveal by line when the post enters. No count-up numbers.
- Mobile and reduced motion: no parallax, figures are simply visible.

## Supporting effect B: The drawn line (How we work)
- A vertical hairline in brand-text colour scales from 0 to 1 (scaleY, scrubbed) along the four steps. Each step's numeral goes from about 20% to full opacity as the line reaches it.
- Reduced motion: the line is fully drawn and every numeral is at full opacity. This effect may stay on mobile (it is cheap).

## Never
Parallax on text, scroll-jacking beyond the one pin, custom cursors, magnetic buttons, tilt cards, floating shapes, auto-playing video, count-up statistics, animated gradients, uniform fade-up on every element, hover-scale on everything.

## Mobile, reduced motion, performance
- Below 768px: no pinning, no parallax. Entrance reveals stay but are short.
- prefers-reduced-motion: Lenis off, no scrub, no parallax, no ghost state. Everything visible at once. Test by toggling the OS setting.
- Test with 4x CPU throttling: scroll stays smooth. No layout shift from pinning (CLS 0 from motion). Refreshing mid-page restores a correct state. Back and forward navigation works. Resizing between breakpoints does not leave broken pins.
- No will-change except on the few elements actively animating.