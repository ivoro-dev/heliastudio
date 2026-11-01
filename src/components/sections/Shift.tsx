"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface ShiftExample {
  before: string;
  beforeNote: string;
  afterLead: string;
  afterEm: string;
}

interface ShiftData {
  h2: string;
  body: string;
  examples: ShiftExample[];
  finalNote: string;
  caption: string;
}

interface ShiftSectionProps {
  locale?: Locale;
}

const IS_DEV = process.env.NODE_ENV === "development";

/** Dev-only diagnostics + override.
   __DEV_DIAG__ logs every setup step (no-console gated, removed before commit).
   ?motion=force forces the pinned condition to match regardless of viewport
   height / prefers-reduced-motion, so the pin can be tested at any size. */
const __DEV_DIAG__ = IS_DEV;

function devForceMotion(): boolean {
  if (!IS_DEV) return false;
  if (typeof window === "undefined") return false;
  return window.location.search.includes("motion=force");
}

export default function ShiftSection({ locale = "en" }: ShiftSectionProps) {
  const t = messages[locale].shift as unknown as ShiftData;
  const stageRef = useRef<HTMLDivElement>(null);

  // `js` class enables the pre-paint hidden states in globals.css. Added
  // client-side before first paint so nothing flashes visible then hidden.
  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      if (__DEV_DIAG__) {
        console.log("[shift] useGSAP effect running, stage present:", !!stage);
      }

      gsap.registerPlugin(ScrollTrigger);
      if (__DEV_DIAG__) {
        console.log(
          "[shift] ScrollTrigger registered, plugin count:",
          gsap.plugins ? Object.keys(gsap.plugins).length : 0
        );
      }

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
          if (__DEV_DIAG__) {
            console.log("[shift] fonts ready, ScrollTrigger.refresh called");
          }
        });
      }

      const strikes = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-shift='strike']")
      );
      const befores = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-shift='before']")
      );
      const notes = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-shift='note']")
      );
      const finalNote = stage.querySelector<HTMLElement>(
        "[data-shift='final-note']"
      );
      const afterWordEls = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-shift='after-word']")
      );

      if (__DEV_DIAG__) {
        console.log("[shift] targets:", {
          strikes: strikes.length,
          befores: befores.length,
          notes: notes.length,
          finalNote: !!finalNote,
          afterWords: afterWordEls.length,
          jsClass: document.documentElement.classList.contains("js"),
        });
      }

      // Split word spans per example row, matching DOM order (lead then em).
      const wordsByExample: HTMLElement[][] = t.examples.map(() => []);
      let wordCursor = 0;
      t.examples.forEach((ex, i) => {
        const count =
          ex.afterLead.split(" ").filter(Boolean).length +
          ex.afterEm.split(" ").filter(Boolean).length;
        wordsByExample[i] = afterWordEls.slice(wordCursor, wordCursor + count);
        wordCursor += count;
      });

      const force = devForceMotion();

      // Log each sub-condition separately so the user can see which fails.
      const widthQuery = window.matchMedia("(min-width: 768px)");
      const heightQuery = window.matchMedia("(min-height: 600px)");
      const motionQuery = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
      );
      if (__DEV_DIAG__) {
        console.log("[shift] matchMedia sub-conditions:", {
          "min-width 768px": widthQuery.matches,
          "min-height 720px": heightQuery.matches,
          "prefers-reduced-motion no-preference": motionQuery.matches,
          forceOverride: force,
        });
      }

      const condition = force
        ? "(min-width: 768px)"
        : "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";

      const mm = gsap.matchMedia();

      mm.add(
        condition,
        () => {
          if (__DEV_DIAG__) {
            console.log("[shift] matchMedia MATCHED, building timeline");
          }

          // Initial hidden states (mirror the CSS .js rules).
          gsap.set(strikes, { scaleX: 0, transformOrigin: "left" });
          gsap.set(afterWordEls, { opacity: 0, y: 4 });
          gsap.set([...notes, finalNote].filter(Boolean), { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=220%",
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: 1,
            },
          });

          if (__DEV_DIAG__) {
            const all = ScrollTrigger.getAll();
            const st = all[all.length - 1];
            console.log("[shift] ScrollTrigger count:", all.length);
            console.log("[shift] trigger start/end:", st?.start, st?.end);
            console.log(
              "[shift] pin spacer present:",
              !!stage.parentElement?.querySelector(".gsap-pin-spacer")
            );
          }

          // Three beats of ~28% each: 8–36, 36–64, 64–92.
          // In each beat: first 40% strike+settle+note; remaining 60% after words.
          const beatStarts = [0.08, 0.36, 0.64];
          beatStarts.forEach((start, i) => {
            const strikeSettleEnd = start + 0.112; // first 40% of the 28% beat
            tl.to(strikes[i], { scaleX: 1, duration: 0.112 }, start);
            tl.to(befores[i], { opacity: 0.25, duration: 0.112 }, start);
            tl.to(notes[i], { opacity: 1, duration: 0.06 }, start + 0.052);
            tl.to(wordsByExample[i], {
              opacity: 1,
              y: 0,
              duration: 0.14,
              stagger: 0.02,
            }, strikeSettleEnd);
          });

          // Final note 92–98%, then hold to 100%.
          tl.to(finalNote, { opacity: 1, duration: 0.06 }, 0.92);
          tl.to({}, { duration: 0.02 }, 0.98);
        }
      );

      // Mobile / short screen + motion allowed: each row's AFTER reveals once on enter.
      mm.add(
        force ? "(max-width: 767px)" : "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          wordsByExample.forEach((words) => {
            gsap.fromTo(
              words,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.7,
                ease: "expo.out",
                stagger: 0.03,
                scrollTrigger: {
                  trigger: stage,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          });
          gsap.fromTo(
            finalNote,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.7,
              ease: "expo.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: stageRef }
  );

  return (
    <section
      id="the-shift"
      aria-labelledby="shift-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Intro (normal flow) ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-start-1 lg:col-span-8">
            <h2
              id="shift-heading"
              className="font-serif font-normal text-h2 text-ink mb-0"
              style={{
                lineHeight: "var(--text-h2--line-height, 1.0)",
                letterSpacing: "var(--text-h2--letter-spacing, -0.015em)",
                textWrap: "balance",
              }}
            >
              {t.h2}
            </h2>
          </div>
          <div className="lg:col-start-9 lg:col-span-4">
            <p
              className="font-sans text-body-lg text-ink-muted"
              style={{ textWrap: "pretty", maxWidth: "38ch" }}
            >
              {t.body}
            </p>
          </div>
        </div>

        {/* ── Stage (pins on desktop) ──────────────────────────────────── */}
        <div ref={stageRef} className="relative lg:h-[100svh] mt-20">
          {/* Vertically centred content inside the 100svh stage. */}
          <div className="inset-0 flex items-center justify-center h-full w-full lg:h-full px-6">
            <ol
              className="grid w-full lg:grid-rows-[repeat(3,1fr)] lg:gap-[clamp(1rem,4vh,2rem)]"
            >
              {t.examples.map((ex, i) => {
                const isLast = i === t.examples.length - 1;

                return (
                  <li
                    key={i}
                    className="border-b border-hairline last:border-b-0 lg:border-hairline lg:grid lg:grid-cols-12 lg:grid-rows-2 lg:gap-y-4 lg:items-start"
                  >
                    {/* BEFORE — row 1, cols 1–10. Wrapper bounds strike to text width. */}
                    <div className="lg:col-start-1 lg:col-span-10 lg:row-start-1">
                      <span className="sr-only">Before:</span>
                      <span className="relative inline-block">
                        <s
                          data-shift="before"
                          className="font-serif font-normal text-ink leading-none"
                          style={{
                            fontSize: "clamp(1.5rem, 2vw, 2rem)",
                            lineHeight: "var(--text-h3--line-height, 1.15)",
                            textDecoration: "none",
                          }}
                        >
                          {ex.before}
                        </s>
                        {/* Bug A fix: strike spans the text only, never into the margin column. */}
                        <span
                          data-shift="strike"
                          aria-hidden="true"
                          className="absolute left-0 w-full h-[2px] bg-ink origin-left scale-x-100"
                          style={{ top: "48%" }}
                        />
                      </span>
                    </div>

                    {/* Example note — row 1, cols 11–12, aligned with BEFORE's first line. */}
                    <div
                      className="hidden lg:block lg:col-start-11 lg:col-span-2 lg:row-start-1 lg:self-start"
                      data-shift="note"
                    >
                      <p className="font-sans text-small text-ink-muted">
                        {ex.beforeNote}
                      </p>
                    </div>

                    {/* AFTER — row 2, cols 1–10 */}
                    <div className="lg:col-start-1 lg:col-span-10 lg:row-start-2">
                      <span className="sr-only">After:</span>
                      <p
                        data-shift="after"
                        className="font-serif font-normal text-ink mb-0"
                        style={{
                          fontSize: "clamp(1.75rem, min(3.6vw, 5.5vh), 3.25rem)",
                          lineHeight: "var(--text-h2--line-height, 1.0)",
                          letterSpacing:
                            "var(--text-h2--letter-spacing, -0.015em)",
                          textWrap: "balance",
                        }}
                      >
                        {/* Bug B fix: build a single word list so a real space separates
                              every word, including between lead and italic phrase. */}
                        {[
                          ...ex.afterLead.split(" ").filter(Boolean).map((w) => ({
                            word: w,
                            cls: "",
                          })),
                          ...ex.afterEm.split(" ").filter(Boolean).map((w) => ({
                            word: w,
                            cls: "italic text-brand-text",
                          })),
                        ].map((w, idx) => (
                          <span
                            key={`${i}-${idx}`}
                            data-shift="after-word"
                            className={w.cls}
                          >
                            {w.word}{idx < 
                            (ex.afterLead.split(" ").filter(Boolean).length +
                              ex.afterEm.split(" ").filter(Boolean).length -
                              1)
                              ? " "
                              : ""}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Final note — row 2, cols 11–12, beside the last AFTER (last row only). */}
                    {isLast && (
                      <div
                        className="hidden lg:block lg:col-start-11 lg:col-span-2 lg:row-start-2 lg:self-start"
                        data-shift="final-note"
                      >
                        <p className="font-sans text-small text-ink-muted">
                          {t.finalNote}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
