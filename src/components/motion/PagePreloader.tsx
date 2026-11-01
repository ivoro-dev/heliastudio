"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PagePreloaderProps {
  onComplete?: () => void;
  loadingText?: string;
  minDisplayTime?: number;
}

export default function PagePreloader({
  onComplete,
  loadingText = "E I N E N   M O M E N T",
  minDisplayTime = 900,
}: PagePreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  // Requirement 5: Loading Behavior
  // Wait until page is loaded + minimum display time has elapsed, with safety timeout
  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    const MAX_TIMEOUT = 2500;

    const triggerExit = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      const timer = setTimeout(() => {
        if (isMounted) {
          setIsReadyToExit(true);
        }
      }, remainingTime);

      return () => clearTimeout(timer);
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        triggerExit();
      } else {
        const onLoad = () => triggerExit();
        window.addEventListener("load", onLoad, { once: true });
        const safetyTimer = setTimeout(triggerExit, MAX_TIMEOUT);

        return () => {
          isMounted = false;
          window.removeEventListener("load", onLoad);
          clearTimeout(safetyTimer);
        };
      }
    }

    return () => {
      isMounted = false;
    };
  }, [minDisplayTime]);

  // Requirement 2 & 3: Text-Breaking Animation & Curtain Exit Sequence
  useEffect(() => {
    if (!isReadyToExit) return;

    const container = containerRef.current;
    if (!container) return;

    // Requirement 5: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      container.style.display = "none";
      const frame = requestAnimationFrame(() => {
        setIsFinished(true);
        onComplete?.();
      });
      return () => cancelAnimationFrame(frame);
    }

    const columns = container.querySelectorAll<HTMLElement>(".preloader-col");
    const textSlices = container.querySelectorAll<HTMLElement>(".preloader-text-slice");
    const topBars = container.querySelectorAll<HTMLElement>(".preloader-top");
    const heroElements = document.querySelectorAll<HTMLElement>(".hero-reveal");

    // Single coordinated master timeline for pristine animation quality
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        onComplete?.();
      },
    });

    // 1. Top bar items exit with upward slide into mask
    tl.to(topBars, {
      y: -28,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    // 2. The Text-Breaking Animation:
    // The centered text fractures across the 4 vertical column seams
    // and shoots upward in staggered pieces into its clipping container
    tl.to(
      textSlices,
      {
        yPercent: -130,
        duration: 0.85,
        stagger: 0.08, // Staggered from Column 0 to Column 3
        ease: "power3.inOut",
      },
      "-=0.25"
    );

    // 3. Preloader background curtain exit:
    // The 4 white column panels sweep upward in the exact same staggered sequence
    tl.to(
      columns,
      {
        yPercent: -100,
        duration: 1.1,
        stagger: 0.08, // Left-to-right staggered curtain sweep
        ease: "power4.inOut",
      },
      "-=0.6" // Overlaps as the text finishes its upward break
    );

    // 4. Hero Reveal:
    // Coordinated entrance of homepage hero elements as the curtains pull away
    if (heroElements.length > 0) {
      tl.fromTo(
        heroElements,
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.75"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReadyToExit, onComplete]);

  if (isFinished) {
    return null;
  }

  // 4 vertical columns, each projecting its exact 25vw slice of the viewport
  const columnIndices = [0, 1, 2, 3];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none flex w-screen h-screen overflow-hidden bg-transparent select-none"
    >
      {columnIndices.map((colIndex) => {
        // Offset each 400% projection container to form a seamless full-screen canvas
        const leftOffsetPercent = -colIndex * 100;

        return (
          <div
            key={colIndex}
            className="preloader-col relative h-full w-1/4 overflow-hidden bg-white border-r border-black/[0.07] last:border-r-0"
            style={{ willChange: "transform" }}
          >
            {/* Viewport projection canvas: 400% of column width = 100vw */}
            <div
              className="absolute top-0 h-full w-[400%]"
              style={{
                left: `${leftOffsetPercent}%`,
              }}
            >
              {/* Column 0: Brand Logo from public/assets in top-left */}
              {colIndex === 0 && (
                <div className="preloader-top absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center">
                  <Image
                    src="/assets/logo-dark.png"
                    alt="Helia Studio"
                    width={150}
                    height={22}
                    priority
                    className="h-5 sm:h-6 w-auto object-contain"
                  />
                </div>
              )}

              {/* Column 3: Close mark ✕ in top-right */}
              {colIndex === 3 && (
                <div className="preloader-top absolute top-8 right-8 sm:top-12 sm:right-12">
                  <svg
                    className="w-5 h-5 text-black"
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

              {/* Centered Large Text with overflow clipping mask */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="overflow-hidden py-4 px-2">
                  <span className="preloader-text-slice block font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.35em] sm:tracking-[0.45em] text-black uppercase">
                    {loadingText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
