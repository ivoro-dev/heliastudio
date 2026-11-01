"use client";

/**
 * LineReveal
 *
 * Scroll-triggered, line-by-line reveal for h2 headings.
 * Each line rises out of a clip mask (overflow-hidden parent + translateY).
 *
 * Motion spec: docs/motion.md — "Section headings (h2): reveal once by line,
 * each line rising out of a mask, when about 85% down the viewport. Not scrubbed."
 *
 * Accessibility: the h2 carries an aria-label with the full unsplit text.
 * The DOM children used by SplitText become aria-hidden spans; the aria-label
 * is what screen readers announce.
 *
 * SSR safety: content is fully visible without JS. The hidden initial state
 * (yPercent: 110) is only applied inside a matchMedia callback that runs
 * client-side, so the text is never gated by JavaScript.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function LineReveal({ children, className }: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Target: the first heading inside this container
      const heading = container.querySelector<HTMLElement>(
        "h2[data-split-target]"
      );
      if (!heading) return;

      let split: SplitText | null = null;
      let inners: HTMLElement[] = [];
      let resizeTimer: ReturnType<typeof setTimeout>;

      gsap.matchMedia().add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          function doSplit() {
            // Revert any previous split
            split?.revert();

            split = new SplitText(heading!, {
              type: "lines",
              linesClass: "split-line-clip",
              aria: "auto", // preserves aria-label on the heading
            });

            const lines = (split.lines as HTMLElement[]);

            // Wrap each line's DOM children in an inner span for the transform
            inners = lines.map((line) => {
              const inner = document.createElement("span");
              inner.style.display = "block";
              while (line.firstChild) {
                inner.appendChild(line.firstChild);
              }
              line.style.overflow = "hidden";
              line.style.display = "block";
              line.appendChild(inner);
              return inner;
            });

            // Start hidden — below the clip
            gsap.set(inners, { yPercent: 110 });

            gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                once: true,
              },
            }).to(inners, {
              yPercent: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
            });
          }

          doSplit();

          // Re-split on resize: line breaks differ between EN and FR
          const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              doSplit();
              ScrollTrigger.refresh();
            }, 200);
          };

          window.addEventListener("resize", onResize, { passive: true });

          return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(resizeTimer);
            split?.revert();
          };
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
