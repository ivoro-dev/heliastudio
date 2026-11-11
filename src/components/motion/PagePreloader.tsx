"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * PagePreloader — the four-column curtain shown while the page loads.
 *
 * Restored from the original component. Three things changed:
 *  - Colours come from the theme tokens (ink panels, paper text) instead of
 *    hard-coded white and black, so it works in both themes.
 *  - It is only ever visible when JavaScript is running and motion is
 *    allowed (see .preloader in globals.css). Without JS, under reduced
 *    motion, or if animation fails to start, the page is simply there.
 *  - When the curtain starts to lift it announces it (PRELOADER_EVENT), so
 *    the hero intro plays as the page is uncovered.
 */

export const PRELOADER_EVENT = "helia:preloader-lift";

interface PagePreloaderProps {
  /** Text set across the four columns. */
  label: string;
  minDisplayTime?: number;
}

export default function PagePreloader({
  label,
  minDisplayTime = 900,
}: PagePreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  // Wait for the page to load and for the minimum display time, with a
  // safety timeout so a slow asset can never hold the curtain down.
  useEffect(() => {
    const startTime = Date.now();
    const MAX_TIMEOUT = 2500;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const triggerExit = () => {
      if (exitTimer) return;
      const remaining = Math.max(0, minDisplayTime - (Date.now() - startTime));
      exitTimer = setTimeout(() => setIsReadyToExit(true), remaining);
    };

    const safetyTimer = setTimeout(triggerExit, MAX_TIMEOUT);
    if (document.readyState === "complete") {
      triggerExit();
    } else {
      window.addEventListener("load", triggerExit, { once: true });
    }

    return () => {
      window.removeEventListener("load", triggerExit);
      clearTimeout(safetyTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [minDisplayTime]);

  // Text break, then the curtain sweep.
  useEffect(() => {
    if (!isReadyToExit) return;
    const container = containerRef.current;
    if (!container) return;

    const announceLift = () => {
      document.documentElement.dataset.preloader = "lifted";
      window.dispatchEvent(new Event(PRELOADER_EVENT));
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      announceLift();
      const frame = requestAnimationFrame(() => setIsFinished(true));
      return () => cancelAnimationFrame(frame);
    }

    const columns = container.querySelectorAll<HTMLElement>(".preloader-col");
    const textSlices = container.querySelectorAll<HTMLElement>(
      ".preloader-text-slice"
    );
    const topBars = container.querySelectorAll<HTMLElement>(".preloader-top");

    const tl = gsap.timeline({ onComplete: () => setIsFinished(true) });

    // 1. Top bar items slide up and out.
    tl.to(topBars, {
      y: -28,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    // 2. The centred text fractures along the column seams and shoots up.
    tl.to(
      textSlices,
      { yPercent: -130, duration: 0.85, stagger: 0.08, ease: "power3.inOut" },
      "-=0.25"
    );

    // 3. The four panels sweep upward, left to right.
    tl.addLabel("lift", "-=0.6");
    tl.call(announceLift, undefined, "lift+=0.35");
    tl.to(
      columns,
      { yPercent: -100, duration: 1.1, stagger: 0.08, ease: "power4.inOut" },
      "lift"
    );

    return () => {
      tl.kill();
    };
  }, [isReadyToExit]);

  if (isFinished) return null;

  const columnIndices = [0, 1, 2, 3];

  return (
    <div
      ref={containerRef}
      data-preloader
      aria-hidden="true"
      className="preloader fixed inset-0 z-[60] pointer-events-none w-screen h-screen overflow-hidden select-none"
    >
      {columnIndices.map((colIndex) => (
        <div
          key={colIndex}
          className="preloader-col relative h-full w-1/4 overflow-hidden bg-ink border-r border-paper/10 last:border-r-0"
          style={{ willChange: "transform" }}
        >
          {/* Each column shows its own quarter of one full-screen canvas:
              400% of the column width is 100vw. */}
          <div
            className="absolute top-0 h-full w-[400%]"
            style={{ left: `${-colIndex * 100}%` }}
          >
            {colIndex === 0 && (
              <div className="preloader-top absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center">
                {/* The panels are the ink colour, so the wordmark is the one
                    made for the opposite theme. */}
                <Image
                  src="/assets/logo-light.png"
                  alt=""
                  width={696}
                  height={112}
                  priority
                  className="hidden dark:block h-5 sm:h-6 w-auto object-contain"
                />
                <Image
                  src="/assets/logo-dark.png"
                  alt=""
                  width={683}
                  height={101}
                  priority
                  className="block dark:hidden h-5 sm:h-6 w-auto object-contain"
                />
              </div>
            )}

            {colIndex === 3 && (
              <div className="preloader-top absolute top-8 right-8 sm:top-12 sm:right-12">
                <svg
                  className="w-5 h-5 text-paper"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="overflow-hidden py-4 px-2">
                <span className="preloader-text-slice block font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.35em] sm:tracking-[0.45em] text-paper uppercase whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
