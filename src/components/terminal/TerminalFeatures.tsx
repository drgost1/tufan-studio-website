"use client";

import { TUFAN_TERMINAL_FEATURES } from "@/lib/constants";
import { useReveal } from "@/lib/useReveal";
import { TERMINAL_FEATURE_ICONS, DiamondIcon } from "../Icons";

export default function TerminalFeatures() {
  // IntersectionObserver reveals — reliable inside the custom scroll container.
  const titleRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>({
    selector: ".terminal-feature-card",
    stagger: 0.06,
  });

  return (
    <section className="relative bg-storm-dark pt-14 sm:pt-20 pb-16 sm:pb-20 px-6 section-fade-top">
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
