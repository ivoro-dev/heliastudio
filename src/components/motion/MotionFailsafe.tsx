"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Motion failsafe.
 *
 * The pre-paint script in the layout adds the `js` class only when the
 * visitor has not asked for reduced motion; this mirrors that decision after
 * hydration. It then watches whether GSAP is actually running: if its ticker
 * has not ticked within about 3 seconds, the `motion-failed` class is added,
 * which releases every pre-paint hold (the hero, the preloader, the Shift
 * rows) so no content is ever left hidden.
 */

export default function MotionFailsafe() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reducedMotion) root.classList.add("js");

    let ticks = 0;
    const onTick = () => {
      ticks += 1;
      if (ticks > 2) gsap.ticker.remove(onTick);
    };
    gsap.ticker.add(onTick);

    const timer = setTimeout(() => {
      if (ticks <= 2) root.classList.add("motion-failed");
    }, 3000);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}
