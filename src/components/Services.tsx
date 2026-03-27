"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { SERVICE_ICONS, DiamondIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      // Title slam in
      gsap.from(titleRef.current, {
        x: -200,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

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
      className="scroll-section flex flex-col items-center justify-center bg-storm-black diamond-grid relative py-20 section-fade-top"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-storm-black via-transparent to-storm-black z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Section title */}
        <div ref={titleRef} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Our Expertise
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            WHAT WE{" "}
            <span className="text-storm-red">BUILD</span>
          </h2>
        </div>

        {/* Service cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {SERVICES.map((service) => {
            const IconComponent = SERVICE_ICONS[service.icon];
            return (
              <div
                key={service.title}
                className="service-card glass-card accent-line rounded-xl p-6 pl-8 group cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-storm-red/10 flex items-center justify-center mb-4 group-hover:bg-storm-red/20 transition-colors duration-300">
                  {IconComponent && (
                    <IconComponent className="text-storm-red w-6 h-6" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-storm-light mb-2 group-hover:text-storm-red transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-storm-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
