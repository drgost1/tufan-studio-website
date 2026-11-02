"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type ProductPromoProps = {
  id: string;
  name: string;
  punchline: string;
  pitch: string;
  footnote: string;
  primaryAction: ReactNode;
  learnMoreHref: string;
  image: { src: string; alt: string; width: number; height: number };
};

// Home-page band for one of the studio's own products: copy on one side, a real
// product screenshot on the other.
export default function ProductPromo({
  id,
  name,
  punchline,
  pitch,
  footnote,
  primaryAction,
  learnMoreHref,
  image,
}: ProductPromoProps) {
  const contentRef = useReveal<HTMLDivElement>({
    selector: ".promo-line",
    stagger: 0.12,
  });
  const mockupRef = useReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      className="scroll-section flex flex-col items-center justify-center bg-storm-dark relative py-20 section-fade-top"
    >
      <div className="absolute inset-0 diamond-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          {/* Copy */}
          <div ref={contentRef} className="min-w-0">
            <div className="promo-line mb-4">
              <span className="hud-kicker">Our Own Creation</span>
            </div>

            <h2 className="promo-line text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light mb-5">
              {name.toUpperCase()}
            </h2>

            <p className="promo-line text-lg text-storm-red font-light tracking-wide mb-4">
              {punchline}
            </p>

            <p className="promo-line text-base sm:text-lg text-storm-muted leading-relaxed mb-8 max-w-lg">
              {pitch}
            </p>

            <div className="promo-line flex flex-wrap items-center gap-4">
              {primaryAction}
              <Link
                href={learnMoreHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-storm-red/50 text-storm-light text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                Learn more
              </Link>
            </div>

            <p className="promo-line mt-5 text-xs tracking-widest uppercase text-storm-muted">
              {footnote}
            </p>
          </div>

          {/* Product screenshot */}
          <div ref={mockupRef} className="relative min-w-0">
            <div className="absolute -inset-4 bg-storm-red/10 blur-3xl rounded-[32px] pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="relative w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
