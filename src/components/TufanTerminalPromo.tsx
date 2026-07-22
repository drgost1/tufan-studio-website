"use client";

import Link from "next/link";
import { TUFAN_TERMINAL } from "@/lib/constants";
import { useReveal } from "@/lib/useReveal";
import { DiamondIcon, DownloadIcon } from "./Icons";

export default function TufanTerminalPromo() {
  const contentRef = useReveal<HTMLDivElement>({
    selector: ".promo-line",
    stagger: 0.12,
  });
  const mockupRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="terminal"
      className="scroll-section flex flex-col items-center justify-center bg-storm-dark relative py-20 section-fade-top"
    >
      <div className="absolute inset-0 diamond-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          {/* Copy */}
          <div ref={contentRef} className="min-w-0">
            <div className="promo-line flex items-center gap-3 mb-4">
              <DiamondIcon className="text-storm-red w-2 h-2" />
              <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
                Our Own Creation
              </span>
            </div>

            <h2 className="promo-line text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light mb-5">
              {TUFAN_TERMINAL.name.toUpperCase()}
            </h2>

            <p className="promo-line text-lg text-storm-red font-light tracking-wide mb-4">
              {TUFAN_TERMINAL.punchline}
            </p>

            <p className="promo-line text-base sm:text-lg text-storm-muted leading-relaxed mb-8 max-w-lg">
              {TUFAN_TERMINAL.homePitch}
            </p>

            <div className="promo-line flex flex-wrap items-center gap-4">
              <a
                href={TUFAN_TERMINAL.downloadUrl}
                download
                className="glow-btn inline-flex items-center gap-2.5 px-7 py-3.5 bg-storm-red hover:bg-storm-red-dark text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:scale-[1.03]"
              >
                <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Download
              </a>
              <Link
                href="/tufan-terminal"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-storm-red/50 text-storm-light text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                Learn more
              </Link>
            </div>

            <p className="promo-line mt-5 text-xs tracking-widest uppercase text-storm-muted">
              {TUFAN_TERMINAL.requirements}
            </p>
          </div>

          {/* Product screenshot */}
          <div ref={mockupRef} className="relative min-w-0">
            <div className="absolute -inset-4 bg-storm-red/10 blur-3xl rounded-[32px] pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tufan-terminal-screenshot.png"
              alt="Tufan Terminal with a projects sidebar and split terminal panes"
              width={1394}
              height={894}
              className="relative w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
