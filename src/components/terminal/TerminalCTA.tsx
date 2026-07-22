"use client";

import Link from "next/link";
import { TUFAN_TERMINAL } from "@/lib/constants";
import { useReveal } from "@/lib/useReveal";
import { DownloadIcon, DiamondIcon } from "../Icons";
import FloatingEmbers from "../FloatingEmbers";

export default function TerminalCTA() {
  const contentRef = useReveal<HTMLDivElement>({
    selector: ".cta-animate",
    stagger: 0.1,
  });

  return (
    <section className="relative bg-storm-dark pt-16 sm:pt-20 pb-20 sm:pb-24 px-6 section-fade-top overflow-hidden">
      <div className="absolute inset-0 diamond-grid opacity-30 pointer-events-none" />
      <FloatingEmbers count={16} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/30 to-transparent" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto min-w-0"
      >
        <div className="cta-animate flex items-center gap-3 mb-6">
          <DiamondIcon className="text-storm-red w-2 h-2" />
          <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
            Get Started
          </span>
          <DiamondIcon className="text-storm-red w-2 h-2" />
        </div>

        <h2 className="cta-animate text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light mb-4">
          GRAB YOUR{" "}
          <span className="text-storm-red">TERMINAL</span>
        </h2>

        <p className="cta-animate text-lg text-storm-muted mb-10 max-w-md">
          One installer, zero friction. Every future update lands itself.
        </p>

        <a
          href={TUFAN_TERMINAL.downloadUrl}
          download
          className="cta-animate glow-btn inline-flex items-center gap-3 px-10 py-4 sm:py-5 bg-storm-red hover:bg-storm-red-dark text-white text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105"
        >
          <DownloadIcon className="w-6 h-6" />
          Download for Windows
        </a>

        <p className="cta-animate mt-4 text-xs sm:text-sm tracking-widest uppercase text-storm-muted">
          {TUFAN_TERMINAL.requirements}
        </p>

        <p className="cta-animate mt-8 text-xs text-storm-muted/70 leading-relaxed max-w-md">
          {TUFAN_TERMINAL.smartScreenNote}
        </p>

        <Link
          href="/"
          className="cta-animate mt-12 text-sm text-storm-muted hover:text-storm-red transition-colors duration-300 tracking-wide"
        >
          &larr; Back to Tufan Studio
        </Link>
      </div>
    </section>
  );
}
