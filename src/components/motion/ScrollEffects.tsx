"use client";

/**
 * ScrollEffects — the page's shared scroll choreography, declared in markup.
 *
 *   data-rule    a hairline or heavy rule that draws from the left on enter
 *   data-row     ruled rows that arrive in batches as they enter (stagger)
 *   data-plate   an image plate that unmasks upward while its image settles
 *   data-field   a colour field that widens to full bleed as it scrolls in
 *
 * Mounted once around the page so its ScrollTriggers are created after the
 * sections' own (the pinned Shift stage in particular) and refresh in page
 * order. Everything runs inside gsap.matchMedia, so nothing is hidden or
 * animated under prefers-reduced-motion, and all of it reverts on unmount.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollEffects({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const all = <T extends HTMLElement>(selector: string) =>
          gsap.utils.toArray<T>(selector, root);

        all("[data-rule]").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: rule, start: "top 90%", once: true },
          });
        });

        const rows = all("[data-row]");
        if (rows.length) {
          gsap.set(rows, { autoAlpha: 0, y: 20 });
          ScrollTrigger.batch(rows, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.07,
                overwrite: true,
              }),
          });
        }

        all("[data-plate]").forEach((plate) => {
          const image = plate.querySelector("img");
          const tl = gsap.timeline({
            defaults: { duration: 1.5, ease: "expo.out" },
            scrollTrigger: { trigger: plate, start: "top 82%", once: true },
          });
          tl.fromTo(
            plate,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)" }
          );
          if (image) tl.from(image, { scale: 1.18 }, 0);
        });

        all("[data-field]").forEach((field) => {
          gsap.fromTo(
            field,
            { clipPath: "inset(0% 6% 0% 6%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: field,
                start: "top bottom",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
