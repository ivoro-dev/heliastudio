"use client";

/**
 * LineReveal
 *
 * Scroll-triggered, line-by-line reveal for section headings. Each line rises
 * out of its own mask.
 *
 * Built on SplitText's own masking and autoSplit (GSAP 3.13+): the heading is
 * re-split when fonts load or its width changes, so line breaks stay correct
 * in English and French, and the animation is recreated in onSplit.
 *
 * The masks carry padding (see .split-line-mask in globals.css) so descenders
 * and italic overhang are never cut off at the tight heading line-height.
 *
 * Accessibility: SplitText keeps an aria-label with the full text on the
 * heading and hides the line elements from assistive tech.
 *
 * Content is never gated: nothing is hidden until this runs on the client,
 * and it does not run at all under prefers-reduced-motion.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function LineReveal({ children, className }: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const heading = container?.querySelector<HTMLElement>(
        "[data-split-target]"
      );
      if (!container || !heading) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 130,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: {
                trigger: container,
                start: "top 86%",
                once: true,
              },
            });
          },
        });

        return () => split.revert();
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
