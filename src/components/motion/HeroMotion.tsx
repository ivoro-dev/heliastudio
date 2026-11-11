"use client";

/**
 * HeroMotion — "coming into focus", on load.
 *
 * One timeline: the three headline lines rise out of their masks, the
 * emphasised phrase starts as a faint ghost and resolves to full strength,
 * then the supporting copy settles in. After that, the headline drifts and
 * dims slightly as the visitor scrolls away (scrubbed, transform + opacity).
 *
 * Content is never gated: the hero is hidden pre-paint only when the `js`
 * class is present and motion is allowed (globals.css), it is released the
 * moment this runs, and the `motion-failed` failsafe shows it regardless.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRELOADER_EVENT } from "@/components/motion/PagePreloader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeroMotionProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroMotion({ children, className }: HeroMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);
        const ghost = root.querySelector<HTMLElement>("[data-hero-ghost]");
        const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", root);
        const drift = root.querySelector<HTMLElement>("[data-hero-drift]");

        // With the preloader up, the intro waits for the curtain to lift.
        const curtainUp =
          document.querySelector("[data-preloader]") !== null &&
          document.documentElement.dataset.preloader !== "lifted";

        const intro = gsap.timeline({
          defaults: { ease: "expo.out" },
          paused: curtainUp,
        });
        intro.from(lines, { yPercent: 130, duration: 1.15, stagger: 0.11 });
        if (ghost) {
          intro.fromTo(
            ghost,
            { opacity: 0.16 },
            { opacity: 1, duration: 1, ease: "power2.out" },
            0.35
          );
        }
        intro.from(
          fades,
          { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.08 },
          0.75
        );

        // Release the pre-paint hold now that the from-states are applied.
        root.setAttribute("data-ready", "");

        if (drift) {
          gsap.to(drift, {
            yPercent: -14,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        const play = () => intro.play();
        const fallback = curtainUp ? setTimeout(play, 5000) : undefined;
        if (curtainUp) {
          window.addEventListener(PRELOADER_EVENT, play, { once: true });
        }

        return () => {
          window.removeEventListener(PRELOADER_EVENT, play);
          if (fallback) clearTimeout(fallback);
          root.removeAttribute("data-ready");
        };
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} data-hero className={className}>
      {children}
    </div>
  );
}
