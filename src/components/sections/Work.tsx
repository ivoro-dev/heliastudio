"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/links";

import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";

/**
 * Section 5: The work
 *
 * Héléna Clinckart's real LinkedIn work as proof. Two artifacts (carousel +
 * text post) shown as uncropped real screenshots, never redrawn. All copy via
 * next-intl message files; figures are exact numbers formatted per locale.
 *
 * Desktop: asymmetric 12-column magazine spread, one artifact per grid row with
 * explicit static placement and align-items: start (no stretch).
 *   Artifact 1 (carousel): screenshot cols 1-5 row 1, figures cols 7-12 row 1,
 *   caption cols 1-5 row 2; details row 2, cols 7-12, max measure ~65ch.
 *   Artifact 2 (post): figures cols 2-5 row 1, screenshot cols 7-11 row 1,
 *   caption cols 7-11 row 2.
 * Mobile / tablet: single column, DOM order = caption, screenshot, lead figure,
 * dl, source caption, (artifact 1) disclosure.
 *
 * Motion: screenshot-only translateY parallax, desktop + no-reduced-motion, via
 * gsap.matchMedia inside useGSAP. Reverts on unmount.
 */

type Locale = "en" | "fr";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface Artifact {
  title: string;
  dateISO: string;
  caption: string;
  alt: string;
  /** Lead figure. Absent for client work, where only the visible counts exist. */
  impressions?: number;
  impressionsLabel?: string;
  /** Shown in place of the lead figure when there is none. */
  lead?: string;
  reactions: number;
  reactionsLabel: string;
  comments: number;
  commentsLabel: string;
  reposts: number;
  repostsLabel: string;
  source: string;
  transcriptionSummary?: string;
  transcription?: { title: string; body: string }[];
}

const ARTIFACTS: Record<Locale, Artifact[]> = {
  en: [
    {
      title: messages.en.work.artifacts.carousel.title,
      dateISO: messages.en.work.artifacts.carousel.dateISO,
      caption: messages.en.work.artifacts.carousel.caption,
      alt: messages.en.work.artifacts.carousel.alt,
      impressions: messages.en.work.artifacts.carousel.impressions,
      impressionsLabel: messages.en.work.artifacts.carousel.impressionsLabel,
      reactions: messages.en.work.artifacts.carousel.reactions,
      reactionsLabel: messages.en.work.artifacts.carousel.reactionsLabel,
      comments: messages.en.work.artifacts.carousel.comments,
      commentsLabel: messages.en.work.artifacts.carousel.commentsLabel,
      reposts: messages.en.work.artifacts.carousel.reposts,
      repostsLabel: messages.en.work.artifacts.carousel.repostsLabel,
      source: messages.en.work.artifacts.carousel.source,
      transcriptionSummary:
        messages.en.work.artifacts.carousel.transcriptionSummary,
      transcription: messages.en.work.artifacts.carousel.transcription,
    },
    {
      title: messages.en.work.artifacts.post.title,
      dateISO: messages.en.work.artifacts.post.dateISO,
      caption: messages.en.work.artifacts.post.caption,
      alt: messages.en.work.artifacts.post.alt,
      impressions: messages.en.work.artifacts.post.impressions,
      impressionsLabel: messages.en.work.artifacts.post.impressionsLabel,
      reactions: messages.en.work.artifacts.post.reactions,
      reactionsLabel: messages.en.work.artifacts.post.reactionsLabel,
      comments: messages.en.work.artifacts.post.comments,
      commentsLabel: messages.en.work.artifacts.post.commentsLabel,
      reposts: messages.en.work.artifacts.post.reposts,
      repostsLabel: messages.en.work.artifacts.post.repostsLabel,
      source: messages.en.work.artifacts.post.source,
    },
  ],
  fr: [
    {
      title: messages.fr.work.artifacts.carousel.title,
      dateISO: messages.fr.work.artifacts.carousel.dateISO,
      caption: messages.fr.work.artifacts.carousel.caption,
      alt: messages.fr.work.artifacts.carousel.alt,
      impressions: messages.fr.work.artifacts.carousel.impressions,
      impressionsLabel: messages.fr.work.artifacts.carousel.impressionsLabel,
      reactions: messages.fr.work.artifacts.carousel.reactions,
      reactionsLabel: messages.fr.work.artifacts.carousel.reactionsLabel,
      comments: messages.fr.work.artifacts.carousel.comments,
      commentsLabel: messages.fr.work.artifacts.carousel.commentsLabel,
      reposts: messages.fr.work.artifacts.carousel.reposts,
      repostsLabel: messages.fr.work.artifacts.carousel.repostsLabel,
      source: messages.fr.work.artifacts.carousel.source,
      transcriptionSummary:
        messages.fr.work.artifacts.carousel.transcriptionSummary,
      transcription: messages.fr.work.artifacts.carousel.transcription,
    },
    {
      title: messages.fr.work.artifacts.post.title,
      dateISO: messages.fr.work.artifacts.post.dateISO,
      caption: messages.fr.work.artifacts.post.caption,
      alt: messages.fr.work.artifacts.post.alt,
      impressions: messages.fr.work.artifacts.post.impressions,
      impressionsLabel: messages.fr.work.artifacts.post.impressionsLabel,
      reactions: messages.fr.work.artifacts.post.reactions,
      reactionsLabel: messages.fr.work.artifacts.post.reactionsLabel,
      comments: messages.fr.work.artifacts.post.comments,
      commentsLabel: messages.fr.work.artifacts.post.commentsLabel,
      reposts: messages.fr.work.artifacts.post.reposts,
      repostsLabel: messages.fr.work.artifacts.post.repostsLabel,
      source: messages.fr.work.artifacts.post.source,
    },
  ],
};

interface WorkSectionProps {
  locale?: Locale;
}

export default function WorkSection({ locale = "en" }: WorkSectionProps) {
  const t = messages[locale].work;
  const [carousel, post] = ARTIFACTS[locale];
  const clientMessages = t.artifacts.client;
  const client: Artifact = {
    title: clientMessages.caption,
    dateISO: "",
    ...clientMessages,
    lead: clientMessages.label,
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  const shot1Ref = useRef<HTMLImageElement>(null);
  const shot2Ref = useRef<HTMLImageElement>(null);
  const shot3Ref = useRef<HTMLImageElement>(null);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(n);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            shot1Ref.current,
            { y: -12 },
            {
              y: 12,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            shot3Ref.current,
            { y: -14 },
            {
              y: 14,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            shot2Ref.current,
            { y: -20 },
            {
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  const renderFigures = (artifact: Artifact) => {
    const deliverables = [
      { label: artifact.reactionsLabel, value: artifact.reactions },
      { label: artifact.commentsLabel, value: artifact.comments },
      { label: artifact.repostsLabel, value: artifact.reposts },
    ];

    return (
      <>
        {artifact.impressions !== undefined ? (
          <div className="mb-6 lg:mb-8">
            <span className="block font-serif font-normal text-ink text-[clamp(3.5rem,7vw,6rem)] leading-none tracking-[-0.02em] tabular-nums">
              {formatNumber(artifact.impressions)}
            </span>
            <span className="block font-sans text-body text-ink-muted mt-2">
              {artifact.impressionsLabel}
            </span>
          </div>
        ) : (
          <p className="font-serif font-normal italic text-h3 text-brand-text mb-6 lg:mb-8">
            {artifact.lead}
          </p>
        )}
        <dl className="divide-y divide-hairline border-y border-hairline font-sans text-small mb-5">
          {deliverables.map((item, j) => (
            <div key={j} className="flex justify-between items-baseline py-3">
              <dt className="text-ink-muted">{item.label}</dt>
              <dd className="text-ink font-medium text-right tabular-nums">
                {formatNumber(item.value)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="font-sans text-small text-ink-muted mb-0 md:whitespace-nowrap">
          {artifact.source}
        </p>
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-heading"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 mb-20 lg:mb-24">
          <div className="lg:col-start-1 lg:col-span-8">
            <h2
              id="work-heading"
              className="font-serif font-normal text-h2 text-ink mb-0"
              style={{
                lineHeight: "var(--text-h2--line-height, 1.0)",
                letterSpacing: "var(--text-h2--letter-spacing, -0.015em)",
              }}
            >
              {t.h2}
            </h2>
          </div>
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

        {locale === "fr" && (
          <p className="font-sans text-small text-ink-muted mb-20 lg:mb-24">
            {t.languageNote}
          </p>
        )}

        {/* Artifact 1: the carousel. The tall screenshot runs down the left
            while its figures hold their place on the right. */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-10">
          <figure className="m-0 md:col-span-6 lg:col-start-1 lg:col-span-5">
            <Image
              src="/assets/post-2.png"
              width={724}
              height={1070}
              alt={carousel.alt}
              className="block w-full h-auto rounded-sm border border-hairline"
              sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
              ref={shot1Ref}
            />
            <figcaption className="font-sans text-small text-ink-muted mt-4">
              {carousel.caption}
            </figcaption>
          </figure>

          <div className="md:col-span-6 lg:col-start-8 lg:col-span-5 md:sticky md:top-28 md:self-start">
            {renderFigures(carousel)}

            {carousel.transcription?.length ? (
              <details className="mt-8 lg:mt-10">
                <summary
                  className="group relative inline-flex items-center gap-3 font-sans text-small font-medium text-ink cursor-pointer select-none min-h-[44px] py-2 list-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {carousel.transcriptionSummary}
                  <span aria-hidden="true" className="work-details-toggle text-brand-text" />
                  <span className="absolute left-0 bottom-0 w-full h-px bg-brand-text/40 pointer-events-none" aria-hidden="true" />
                  <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-brand-text pointer-events-none scale-x-0 origin-right transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:origin-left motion-reduce:scale-x-100 motion-reduce:origin-left motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <div className="mt-6 space-y-6">
                  {carousel.transcription.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-serif font-normal text-h3 text-ink mb-1">
                        {item.title}
                      </h3>
                      <p
                        className="font-sans text-body text-ink-muted mb-0"
                        style={{ textWrap: "pretty", maxWidth: "46ch" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </div>

        {/* Artifact 2: the text post. Mirrored: figures left, the wide
            screenshot right, bottoms aligned. */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-10 md:items-end mt-24 lg:mt-40">
          <div className="order-2 md:order-1 md:col-span-5 lg:col-start-1 lg:col-span-4">
            {renderFigures(post)}
          </div>
          <figure className="m-0 order-1 md:order-2 md:col-span-7 lg:col-start-6 lg:col-span-7">
            <Image
              src="/assets/post-3.png"
              width={1000}
              height={528}
              alt={post.alt}
              className="block w-full h-auto rounded-sm border border-hairline"
              sizes="(min-width: 1024px) 720px, (min-width: 768px) 58vw, 100vw"
              ref={shot2Ref}
            />
            <figcaption className="font-sans text-small text-ink-muted mt-4">
              {post.caption}
            </figcaption>
          </figure>
        </div>

        {/* Artifact 3: client work, shown with the client's permission
            (confirmed 11 Nov 2026). Only the counts visible on the post are
            given; there is no impressions figure or analytics date for it. */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-10 mt-24 lg:mt-40">
          <figure className="m-0 md:col-span-6 lg:col-start-1 lg:col-span-5">
            <Image
              src="/assets/post-1.png"
              width={1000}
              height={1404}
              alt={client.alt}
              className="block w-full h-auto rounded-sm border border-hairline"
              sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
              ref={shot3Ref}
            />
            <figcaption className="font-sans text-small text-ink-muted mt-4">
              {client.caption}
            </figcaption>
          </figure>
          <div className="md:col-span-6 lg:col-start-8 lg:col-span-5 md:sticky md:top-28 md:self-start">
            {renderFigures(client)}
          </div>
        </div>

        <div className="mt-20 lg:mt-28 pt-8 border-t border-hairline">
          <Button
            variant="underline-link"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
