"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LineReveal from "@/components/motion/LineReveal";

import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

type Locale = "en" | "fr";

interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessData {
  h2: string;
  intro: string;
  steps: ProcessStep[];
}

const PROCESS: Record<Locale, ProcessData> = {
  en: {
    h2: enMessages.process.h2,
    intro: enMessages.process.intro,
    steps: enMessages.process.steps.map((s) => ({ title: s.title, body: s.body })),
  },
  fr: {
    h2: frMessages.process.h2,
    intro: frMessages.process.intro,
    steps: frMessages.process.steps.map((s) => ({ title: s.title, body: s.body })),
  },
};

interface ProcessSectionProps {
  locale?: Locale;
}

export default function ProcessSection({ locale = "en" }: ProcessSectionProps) {
  const t = PROCESS[locale];
  const olRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const ol = olRef.current;
      if (!ol) return;

      gsap.registerPlugin(ScrollTrigger);

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const spine = ol.querySelector<HTMLElement>("[data-process-spine]");
          const hairlines = Array.from(
            ol.querySelectorAll<HTMLElement>("[data-process-hairline]")
          );
          const numerals = Array.from(
            ol.querySelectorAll<HTMLElement>("[data-process-numeral]")
          );

          if (!spine || hairlines.length === 0) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ol,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(spine, { scaleY: 0 }, { scaleY: 1, ease: "none" });

          const olHeight = ol.offsetHeight || 1;
          const positions = hairlines.map((h) => {
            const olRect = ol.getBoundingClientRect();
            const hRect = h.getBoundingClientRect();
            const p = (hRect.top - olRect.top) / olHeight;
            return Math.min(1, Math.max(0, p));
          });

          hairlines.forEach((h, i) => {
            const isLeftStep = i % 2 === 0;
            tl.fromTo(
              h,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: isLeftStep ? "right" : "left",
              },
              positions[i]
            );
          });

          numerals.forEach((numeral, i) => {
            tl.fromTo(numeral, { opacity: 0.2 }, { opacity: 1, ease: "none" }, positions[i]);
          });
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: olRef }
  );

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
          <LineReveal className="lg:col-start-1 lg:col-span-8">
            <h2
              id="process-heading"
              data-split-target
              aria-label={t.h2}
              className="font-serif font-normal text-h2 text-ink mb-0"
              style={{
                lineHeight: "var(--text-h2--line-height, 1.0)",
                letterSpacing: "var(--text-h2--letter-spacing, -0.015em)",
                textWrap: "balance",
              }}
            >
              {t.h2}
            </h2>
          </LineReveal>
          <div className="lg:col-start-9 lg:col-span-4">
            <p
              className="font-sans text-body-lg text-ink mb-0"
              style={{
                lineHeight: "var(--text-body--line-height, 1.6)",
                textWrap: "pretty",
                maxWidth: "42ch",
              }}
            >
              {t.intro}
            </p>
          </div>
        </div>

        <ol ref={olRef} className="relative mt-16 lg:mt-24">
          <div
            aria-hidden="true"
            data-process-spine
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-brand-text lg:-translate-x-1/2"
          />
          {t.steps.map((step, i) => {
            const isLeftStep = i % 2 === 0;
            return (
              <li key={i} className="relative lg:grid lg:grid-cols-12 lg:gap-x-6">
                <div
                  aria-hidden="true"
                  data-process-connector
                  className={`absolute top-1/2 -translate-y-1/2 w-10 bg-brand-text ${isLeftStep ? "left-[17px] lg:left-[calc(50%_-_2.5rem)]" : "left-[17px] lg:left-1/2"}`}
                >
                  <div
                    data-process-hairline
                    className="h-px w-full"
                    style={{ transformOrigin: isLeftStep ? "right" : "left" }}
                  />
                </div>
                <div
                  className={`${isLeftStep ? "lg:col-start-1 lg:col-span-5" : "lg:col-start-8 lg:col-span-5"} pl-14 lg:pl-0 max-w-[60ch]`}
                >
                  <span
                    data-process-numeral
                    className="font-serif font-normal text-[clamp(3rem,6vw,5rem)] text-ink leading-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-serif font-normal text-h3 text-ink mt-4 mb-0 leading-tight"
                    style={{
                      lineHeight: "var(--text-h3--line-height, 1.15)",
                      letterSpacing: "var(--text-h3--letter-spacing, -0.015em)",
                      textWrap: "pretty",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-body text-ink mt-6 mb-0"
                    style={{
                      lineHeight: "var(--text-body--line-height, 1.6)",
                      textWrap: "pretty",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}