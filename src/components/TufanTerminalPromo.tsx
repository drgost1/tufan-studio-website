"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TUFAN_TERMINAL } from "@/lib/constants";
import { DiamondIcon, DownloadIcon } from "./Icons";
import TerminalMockup from "./terminal/TerminalMockup";

gsap.registerPlugin(ScrollTrigger);

export default function TufanTerminalPromo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      const lines = contentRef.current?.querySelectorAll(".promo-line");
      if (lines) {
        gsap.from(lines, {
          x: -40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.from(mockupRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: container,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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

          {/* Compact mockup */}
          <div ref={mockupRef} className="min-w-0">
            <TerminalMockup variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
