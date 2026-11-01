"use client";

import Image from "next/image";
import { PORTFOLIO_FEATURED, PORTFOLIO_MORE } from "@/lib/constants";
import { useTilt } from "@/lib/usePointerFx";
import { useReveal } from "@/lib/useReveal";
import { DiamondIcon, ExternalLinkIcon } from "./Icons";

// Internal pages stay in this tab; everything else opens a new one.
function linkTarget(href: string) {
  return href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export default function Portfolio() {
  const titleRef = useReveal<HTMLDivElement>();
  const featuredRevealRef = useReveal<HTMLDivElement>({ selector: ".featured-reveal", stagger: 0.12 });
  const moreRevealRef = useReveal<HTMLDivElement>({ selector: ".more-reveal", stagger: 0.05, y: 16 });
  const tiltRef = useTilt<HTMLDivElement>(".tilt", 5);

  return (
    <section
      id="portfolio"
      className="scroll-section flex flex-col items-center justify-center bg-storm-dark relative py-20 lg:pt-20 lg:pb-8"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(230,57,70,0.08),transparent_60%)] pointer-events-none" />
      <span aria-hidden="true" className="section-watermark">WORK</span>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 min-w-0">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-6">
          <span className="hud-kicker mb-3">Portfolio</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            OUR{" "}
            <span className="text-storm-red">CREATIONS</span>
          </h2>
        </div>

        {/* One highlight per division, all the same size */}
        <div ref={tiltRef}>
          <div ref={featuredRevealRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {PORTFOLIO_FEATURED.map((item) => (
              <div
                key={item.title}
                className="featured-reveal relative aspect-square md:aspect-[3/4] lg:aspect-auto lg:h-[min(46vh,23rem)] min-w-0"
              >
                <article className="tilt spin-border before:z-30 card-shimmer absolute inset-0 rounded-2xl overflow-hidden group ring-1 ring-white/5">
                  <span className="tilt-glare" aria-hidden="true" />
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-storm-black from-15% via-storm-black/80 to-transparent" />

                  <div className="absolute inset-x-5 top-5 z-20 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-storm-black/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-storm-light backdrop-blur-md">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.live ? "bg-emerald-400" : "animate-pulse bg-storm-red shadow-[0_0_8px_#E63946]"
                        }`}
                      />
                      {item.status}
                    </span>
                    {item.imageNote && (
                      <span className="rounded-full bg-storm-black/60 px-2.5 py-1 text-[10px] tracking-wide text-storm-light/70 backdrop-blur-md">
                        {item.imageNote}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-storm-red mb-2">
                      <DiamondIcon className="w-1.5 h-1.5" />
                      {item.division}
                    </span>
                    <h3 className="text-3xl font-bold text-storm-light mb-1.5">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-storm-muted">{item.description}</p>
                    <a
                      href={item.link}
                      {...linkTarget(item.link)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-storm-red-light hover:text-white transition-colors duration-300 after:absolute after:inset-0"
                    >
                      {item.linkLabel}
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* The rest of the work, deliberately quieter */}
        <div ref={moreRevealRef} className="mt-4 lg:mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PORTFOLIO_MORE.map((item) => (
            <a
              key={item.title}
              href={item.link}
              {...linkTarget(item.link)}
              className="more-reveal group relative block h-24 lg:h-[min(13vh,6.5rem)] min-w-0 overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow duration-300 hover:ring-storm-red/60"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-storm-black via-storm-black/80 to-storm-black/30" />
              <span className="absolute inset-x-3 bottom-2.5 block min-w-0">
                <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-storm-red">
                  {item.category}
                </span>
                <span className="block truncate text-sm font-semibold text-storm-light">{item.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
