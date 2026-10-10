"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, STATS } from "@/lib/constants";
import StormBand from "./StormBand";
import KitsuneLogo from "./KitsuneLogo";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container || !countRef.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: countRef.current,
      scroller: container,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return (
    <div className="text-center">
      <span
        ref={countRef}
        className="block text-3xl sm:text-4xl md:text-5xl font-black text-storm-red"
      >
        0{suffix}
      </span>
      <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-storm-black/60 mt-2 block">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      const lines = contentRef.current?.querySelectorAll(".about-line");

      if (lines) {
        gsap.from(lines, {
          x: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            scroller: container,
            start: "top 75%",
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
      id="about"
      className="scroll-section flex flex-col items-center justify-center bg-storm-light relative pt-44 pb-14 lg:pt-40 overflow-hidden"
    >
      <div className="absolute top-16 left-0 right-0 z-20">
        <StormBand />
      </div>
      <span aria-hidden="true" className="section-watermark section-watermark--light">TUFAN</span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="aspect-square max-w-[19rem] sm:max-w-sm mx-auto relative">
              {/* Glow + orbiting rings */}
              <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.28),transparent_70%)] blur-2xl" />
              <div className="orbit-ring orbit-ring--outer" />
              <div className="orbit-ring" />

              {/* Centered logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="mask-breathe">
                  <KitsuneLogo size={190} className="w-40 h-40 sm:w-[190px] sm:h-[190px] drop-shadow-[0_24px_40px_rgba(193,18,31,0.35)]" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-storm-red/40 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-storm-red/40 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-storm-red/40 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-storm-red/40 rounded-br-lg" />
            </div>
          </div>

          {/* Right: Text */}
          <div ref={contentRef}>
            <div className="about-line mb-3">
              <span className="hud-kicker">About Us</span>
            </div>

            <h2 className="about-line text-4xl sm:text-5xl font-black tracking-tight text-storm-black mb-6">
              THE STORM{" "}
              <span className="text-storm-red">BEHIND</span>
              <br />
              THE SCREENS
            </h2>

            <p className="about-line text-lg text-storm-black/70 leading-relaxed mb-4">
              {BRAND.name}{" "}isn&apos;t just a studio — it&apos;s a force. We craft games, cinematics, and digital experiences that hit different.
            </p>

            <p className="about-line text-lg text-storm-black/70 leading-relaxed mb-4">
              From GTA V-style cinematics to beast-level FiveM servers, from scripts that sell themselves to communities that thrive — we build what others talk about.
            </p>

            <p className="about-line text-lg text-storm-black/70 leading-relaxed">
              Small team. Big storms. No limits.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-12 lg:mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-storm-black/10">
          {STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
