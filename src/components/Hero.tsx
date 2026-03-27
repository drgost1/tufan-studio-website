"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticleCanvas from "./ParticleCanvas";
import KitsuneLogo from "./KitsuneLogo";
import { BRAND } from "@/lib/constants";
import { DiamondIcon } from "./Icons";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Logo scale in
      tl.from(logoRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // Title glitch reveal
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Tagline fade up
      tl.from(
        taglineRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="scroll-section flex flex-col items-center justify-center bg-storm-black relative"
    >
      {/* Storm background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Particle background */}
      <ParticleCanvas />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0A0A_80%)] z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <div ref={logoRef}>
          <KitsuneLogo size={120} className="mb-8 drop-shadow-[0_0_30px_rgba(230,57,70,0.3)]" />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="glitch-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.1em] sm:tracking-[0.15em] uppercase text-storm-light mb-6"
          data-text={BRAND.name}
        >
          {BRAND.name.split(" ").map((word, wi) => {
            const charOffset = BRAND.name.indexOf(word);
            return (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2 + (charOffset + ci) * 0.05,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                {wi < BRAND.name.split(" ").length - 1 && (
                  <span className="inline-block w-[0.3em]" />
                )}
              </span>
            );
          })}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-storm-red"
        >
          {BRAND.tagline}
        </p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-storm-red to-transparent"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-xs tracking-[0.3em] uppercase text-storm-muted">Scroll</span>
        <DiamondIcon className="text-storm-red w-3 h-3" />
      </div>
    </section>
  );
}
