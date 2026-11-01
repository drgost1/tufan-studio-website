"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLinkIcon } from "@/components/Icons";
import { GALLERY_WEBSITES, WEBSITE_SECTORS, websiteThumbnail, type WebsiteSector } from "@/lib/websiteGallery";

type Filter = WebsiteSector | "All";

const COLLAPSED_COUNT = 12;

export default function WebsiteGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const filters: { label: Filter; count: number }[] = [
    { label: "All", count: GALLERY_WEBSITES.length },
    ...WEBSITE_SECTORS.map((sector) => ({
      label: sector,
      count: GALLERY_WEBSITES.filter((site) => site.sector === sector).length,
    })),
  ];
  const matching = GALLERY_WEBSITES.filter((site) => filter === "All" || site.sector === filter);
  const isCollapsed = filter === "All" && !expanded;

  return (
    <section id="websites" className="relative scroll-mt-16 bg-storm-black px-6 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 diamond-grid opacity-25" />
      <div className="relative z-10 mx-auto max-w-7xl min-w-0">
        <span className="hud-kicker mb-3">Live Websites</span>
        <h2 className="text-4xl font-black tracking-tight text-storm-light sm:text-5xl md:text-6xl">
          {GALLERY_WEBSITES.length} YOU CAN <span className="text-storm-red">OPEN NOW</span>
        </h2>
        <p className="mb-8 mt-4 max-w-2xl text-base leading-relaxed text-storm-muted sm:text-lg">
          We have built 80+ websites. These are public and live today, so click any of them. The rest are private,
          awaiting client sign-off or no longer online.
        </p>

        <div role="group" aria-label="Filter websites by sector" className="mb-8 flex flex-wrap gap-2">
          {filters.map(({ label, count }) => {
            const active = filter === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(label)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-storm-red bg-storm-red text-white shadow-[0_0_18px_rgba(230,57,70,0.45)]"
                    : "border-white/10 text-storm-muted hover:border-storm-red/50 hover:text-storm-light"
                }`}
              >
                {label} <span className={active ? "text-white/75" : "text-storm-muted/60"}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Collapsed cards stay in the HTML, so search engines can still follow every link */}
        <motion.div
          key={filter}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {matching.map((site, index) => (
            <a
              key={site.domain}
              href={`https://${site.domain}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-storm-gray/50 transition-all duration-300 hover:-translate-y-1 hover:border-storm-red/50 hover:shadow-[0_12px_32px_rgba(230,57,70,0.18)] ${
                isCollapsed && index >= COLLAPSED_COUNT ? "hidden" : "block"
              }`}
            >
              <span className="flex items-center gap-1 border-b border-white/5 px-2.5 py-1.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-storm-red" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </span>
              <span className="block overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={websiteThumbnail(site.domain)}
                  alt={`${site.name} website homepage`}
                  width={640}
                  height={400}
                  loading="lazy"
                  className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="block p-3 sm:p-4">
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0 text-sm font-semibold leading-snug text-storm-light transition-colors duration-300 group-hover:text-storm-red-light sm:text-base">
                    {site.name}
                  </span>
                  <ExternalLinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-storm-muted" />
                </span>
                <span className="mt-1 block truncate text-xs text-storm-muted">{site.domain}</span>
              </span>
            </a>
          ))}
        </motion.div>

        {isCollapsed && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center rounded-2xl border border-white/15 px-7 py-4 text-base font-semibold text-storm-light transition-colors duration-300 hover:border-storm-red/60 hover:text-storm-red-light"
            >
              Show all {GALLERY_WEBSITES.length} websites
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
