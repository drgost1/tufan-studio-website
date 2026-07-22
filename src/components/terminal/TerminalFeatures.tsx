"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TUFAN_TERMINAL_FEATURES } from "@/lib/constants";
import { TERMINAL_FEATURE_ICONS, DiamondIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".terminal-feature-card");
      if (cards) {
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-storm-dark pt-14 sm:pt-20 pb-16 sm:pb-20 px-6 section-fade-top"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-storm-dark via-storm-black/40 to-storm-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        <div ref={titleRef} className="mb-10 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Built For Real Work
            </span>
            <DiamondIcon className="text-storm-red w-2 h-2" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            EVERYTHING YOU{" "}
            <span className="text-storm-red">NEED</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {TUFAN_TERMINAL_FEATURES.map((feature) => {
            const IconComponent = TERMINAL_FEATURE_ICONS[feature.icon];
            return (
              <div
                key={feature.title}
                className="terminal-feature-card glass-card accent-line card-shimmer rounded-xl p-6 pl-8 group cursor-default relative overflow-hidden min-w-0"
              >
                <div className="w-11 h-11 rounded-lg bg-storm-red/10 flex items-center justify-center mb-4 group-hover:bg-storm-red/20 transition-colors duration-300">
                  {IconComponent && <IconComponent className="text-storm-red w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-storm-light mb-2 group-hover:text-storm-red transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-storm-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
