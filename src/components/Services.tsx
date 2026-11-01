"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { useSpotlight } from "@/lib/usePointerFx";
import { SERVICE_ICONS } from "./Icons";
import FloatingEmbers from "./FloatingEmbers";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useSpotlight(".spot-card");

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      // Title reveal with clip-path curtain
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger in
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="scroll-section flex flex-col items-center justify-center bg-storm-black diamond-grid relative py-20 lg:pt-20 lg:pb-8 section-fade-top"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-storm-black via-transparent to-storm-black z-[1]" />
      <span aria-hidden="true" className="section-watermark">BUILD</span>
      <FloatingEmbers count={12} />

      <div ref={spotlightRef} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Section title */}
        <div ref={titleRef} className="mb-8 sm:mb-16 lg:mb-6">
          <span className="hud-kicker mb-3">Our Expertise</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            WHAT WE{" "}
            <span className="text-storm-red">BUILD</span>
          </h2>
        </div>

        {/* Service cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {SERVICES.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.icon];
            return (
              <div
                key={service.title}
                className={`service-card spot-card p-6 pl-8 lg:p-5 lg:pl-8 group cursor-default ${
                  index < 2 ? "lg:col-span-3" : "lg:col-span-2"
                } ${index === SERVICES.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <span className="spot-card__notch" aria-hidden="true" />

                {/* Lit accent rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 bottom-6 w-[3px] bg-storm-red shadow-[0_0_14px_#E63946] origin-center scale-y-[0.35] group-hover:scale-y-100 transition-transform duration-500"
                />

                {/* Outline index number */}
                <span
                  aria-hidden="true"
                  className="font-heading absolute top-4 right-8 text-6xl sm:text-7xl lg:text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(230,57,70,0.35)] group-hover:[-webkit-text-stroke:1px_rgba(255,107,107,0.9)] transition-all duration-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 lg:w-10 lg:h-10 rounded-lg bg-storm-red/10 border border-storm-red/20 flex items-center justify-center mb-5 lg:mb-3 group-hover:bg-storm-red group-hover:shadow-[0_0_24px_rgba(230,57,70,0.6)] transition-all duration-300">
                    {IconComponent && (
                      <IconComponent className="text-storm-red group-hover:text-white w-6 h-6 transition-colors duration-300" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-2xl font-bold text-storm-light mb-2 lg:mb-1 group-hover:text-storm-red-light transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-sm text-storm-muted leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  {service.href && (
                    <Link
                      href={service.href}
                      className="mt-3 lg:mt-2 inline-flex items-center gap-2 text-sm font-semibold text-storm-red-light hover:text-white transition-colors duration-300"
                    >
                      {service.linkLabel}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
