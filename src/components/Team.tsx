"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM_MEMBERS } from "@/lib/constants";
import { DiamondIcon } from "./Icons";
import KitsuneLogo from "./KitsuneLogo";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = cardsRef.current?.querySelectorAll(".team-card");
      if (cards) {
        gsap.from(cards, {
          scale: 0.5,
          opacity: 0,
          rotation: -10,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="team"
      className="scroll-section flex flex-col items-center justify-center bg-storm-black relative py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/team-bg.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-storm-black via-transparent to-storm-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Our Team
            </span>
            <DiamondIcon className="text-storm-red w-2 h-2" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            THE{" "}
            <span className="text-storm-red">PACK</span>
          </h2>
          <p className="mt-4 text-storm-muted text-lg max-w-md mx-auto">
            The people behind the storm. Small but mighty.
          </p>
        </div>

        {/* Team cards */}
        <div
          ref={cardsRef}
          className="flex flex-wrap items-stretch justify-center gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="team-card group relative"
            >
              <div className="relative w-72 h-full bg-storm-gray/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-storm-red/30 hover:shadow-[0_0_40px_rgba(230,57,70,0.1)]">
                {/* Avatar with kitsune frame */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-storm-dark flex items-center justify-center overflow-hidden border-2 border-storm-red/20 group-hover:border-storm-red/50 transition-colors duration-300">
                    <KitsuneLogo size={60} />
                  </div>
                  {/* Glow ring on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(230,57,70,0.3)]" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-storm-light mb-1 group-hover:text-storm-red transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Username & AKA */}
                <p className="text-xs text-storm-red/70 tracking-widest uppercase mb-1">
                  @{member.username}
                </p>
                <p className="text-xs text-storm-muted/60 italic mb-3">
                  a.k.a {member.aka}
                </p>

                {/* Role */}
                <p className="text-sm text-storm-muted mb-2">
                  {member.role}
                </p>

                {/* Role tags */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-storm-red/20 text-storm-red/70 bg-storm-red/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

          {/* "Join Us" card */}
          <div className="team-card">
            <div className="relative w-64 bg-storm-gray/30 backdrop-blur-sm border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:border-storm-red/30 transition-all duration-500 cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-storm-dark/50 flex items-center justify-center mb-6 border-2 border-dashed border-white/10 group-hover:border-storm-red/30 transition-colors">
                <span className="text-3xl text-storm-muted group-hover:text-storm-red transition-colors">+</span>
              </div>
              <h3 className="text-xl font-bold text-storm-muted group-hover:text-storm-light transition-colors">
                Join The Pack
              </h3>
              <p className="text-sm text-storm-muted/60 mt-1">
                We&apos;re always looking for talent
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
