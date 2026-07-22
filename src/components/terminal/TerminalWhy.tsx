"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TUFAN_TERMINAL_BENEFITS, TUFAN_TERMINAL_THEMES } from "@/lib/constants";
import { DiamondIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".why-item");
      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-storm-black py-16 sm:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,57,70,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto min-w-0">
        <div className="mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Why It&apos;s Different
            </span>
            <DiamondIcon className="text-storm-red w-2 h-2" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            NOT ANOTHER{" "}
            <span className="text-storm-red">TAB BAR</span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16"
        >
          {TUFAN_TERMINAL_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="why-item glass-card rounded-xl p-6 min-w-0"
            >
              <div className="w-2 h-2 rounded-full bg-storm-red mb-4" />
              <h3 className="text-base font-bold text-storm-light mb-2">{benefit.title}</h3>
              <p className="text-sm text-storm-muted leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Theme swatches */}
        <div className="why-item flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {TUFAN_TERMINAL_THEMES.map((theme) => (
            <div key={theme.name} className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                style={{ backgroundColor: theme.color }}
              />
              <span className="text-xs sm:text-sm tracking-wide text-storm-muted">
                {theme.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
