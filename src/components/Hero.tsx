"use client";

import { Fragment, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import ParticleCanvas from "./ParticleCanvas";
import LightningStrikes from "./LightningStrikes";
import KitsuneLogo from "./KitsuneLogo";
import Marquee from "./Marquee";
import { BRAND } from "@/lib/constants";
import { onIntroDone } from "@/lib/intro";

const HERO_SERVICES = ["FiveM Servers & Scripts", "GTA V Cinematics", "Roblox", "Websites"];

/** Scroll inside the snap container — the hash alone does not move it. */
function scrollToId(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: id === "contact-form" ? "center" : "start" });
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  // Entrance — waits for the intro shutter so it is actually seen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.set([".hero-logo", ".hero-kicker", ".hero-char", ".hero-tagline", ".hero-copy", ".hero-cta", ".hero-hud"], {
        autoAlpha: 0,
      });
    }, section);

    const stopWaiting = onIntroDone(() => {
      if (reduce) return;
      ctx.add(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .fromTo(".hero-logo", { autoAlpha: 0, scale: 0.2, rotation: -120 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.6)" })
          .fromTo(".hero-kicker", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.55")
          .fromTo(
            ".hero-char",
            { autoAlpha: 0, yPercent: 90, rotationX: -80 },
            { autoAlpha: 1, yPercent: 0, rotationX: 0, duration: 0.7, stagger: 0.045, ease: "back.out(1.4)" },
            "-=0.35",
          )
          .fromTo(".hero-tagline", { autoAlpha: 0, letterSpacing: "0.9em" }, { autoAlpha: 1, letterSpacing: "0.3em", duration: 0.9 }, "-=0.4")
          .fromTo(".hero-copy", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.55")
          .fromTo(".hero-cta", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .fromTo(".hero-hud", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, stagger: 0.08 }, "-=0.6");
      });
    });

    return () => {
      stopWaiting();
      ctx.revert();
    };
  }, []);

  // Mouse parallax — layers read --px/--py, fine pointers only
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--px", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
        section.style.setProperty("--py", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
      });
    };
    section.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  const handleStrike = useCallback((xRatio: number) => {
    const flash = flashRef.current;
    const content = contentRef.current;
    if (flash) {
      flash.style.setProperty("--fx", `${Math.round(xRatio * 100)}%`);
      flash.classList.remove("is-striking");
      void flash.offsetWidth; // restart the animation
      flash.classList.add("is-striking");
    }
    if (content) {
      content.classList.remove("storm-shake");
      void content.offsetWidth;
      content.classList.add("storm-shake");
    }
  }, []);

  const words = BRAND.name.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="scroll-section flex flex-col items-center justify-center bg-storm-black relative [--px:0] [--py:0]"
    >
      {/* Storm background image — deepest parallax layer */}
      <div
        className="absolute -inset-8 bg-cover bg-center opacity-40 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          transform: "translate3d(calc(var(--px) * -24px), calc(var(--py) * -16px), 0) scale(1.04)",
        }}
      />

      <ParticleCanvas />
      <LightningStrikes onStrike={handleStrike} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#0A0A0A_80%)] z-[1]" />
      <div ref={flashRef} className="storm-flash" aria-hidden="true" />
      <div className="hud-scan" aria-hidden="true" />

      {/* HUD frame */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 sm:inset-x-8 top-20 bottom-24 z-[3] pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: "translate3d(calc(var(--px) * 10px), calc(var(--py) * 8px), 0)" }}
      >
        <span className="hero-hud absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-storm-red/70" />
        <span className="hero-hud absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-storm-red/70" />
        <span className="hero-hud absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-storm-red/70" />
        <span className="hero-hud absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-storm-red/70" />

        <span className="hero-hud hidden md:block absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left translate-x-3 text-[10px] tracking-[0.5em] uppercase text-storm-light/40 whitespace-nowrap">
          Storm // 01 — Tufan Studio
        </span>
        <span className="hero-hud hidden md:flex absolute right-4 top-4 items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-storm-light/50">
          <span className="hud-blink w-1.5 h-1.5 rounded-full bg-storm-red shadow-[0_0_8px_#E63946]" />
          Storm active
        </span>
        <span className="hero-hud hidden md:block absolute left-4 bottom-4 text-[10px] tracking-[0.4em] uppercase text-storm-light/35">
          Game dev · FiveM · Cinematics · Web
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 transition-transform duration-500 ease-out"
        style={{ transform: "translate3d(calc(var(--px) * 12px), calc(var(--py) * 10px), 0)" }}
      >
        <div ref={contentRef} className="flex flex-col items-center">
          <div className="hero-logo relative mb-5 [@media(max-height:760px)]:mb-3">
            <div className="absolute inset-0 -m-6 rounded-full bg-storm-red/25 blur-2xl" />
            <KitsuneLogo
              size={112}
              priority
              className="relative w-20 h-20 sm:w-28 sm:h-28 [@media(max-height:760px)]:w-20 [@media(max-height:760px)]:h-20 drop-shadow-[0_0_30px_rgba(230,57,70,0.45)]"
            />
          </div>

          <span className="hero-kicker hud-kicker mb-4">Game Development Studio</span>

          <h1
            className="glitch-text text-[3.4rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem] [@media(max-height:760px)]:lg:text-8xl font-black tracking-[0.06em] sm:tracking-[0.1em] uppercase text-storm-light mb-4 [perspective:600px]"
            data-text={BRAND.name}
          >
            {/* A real space between words so crawlers read "Tufan Studio", not "TufanStudio" */}
            {words.map((word, wordIndex) => (
              <Fragment key={word}>
                {wordIndex > 0 && " "}
                <span className={`inline-block whitespace-nowrap ${wordIndex > 0 ? "ml-[0.14em]" : ""}`}>
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex} className="hero-char inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </h1>

          <p className="hero-tagline text-base sm:text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-storm-red drop-shadow-[0_0_18px_rgba(230,57,70,0.5)]">
            {BRAND.tagline}
          </p>

          <div className="hero-copy mt-5 max-w-xl text-sm sm:text-base text-storm-light/60 leading-relaxed">
            <p className="flex flex-wrap justify-center gap-x-2 gap-y-0.5">
              {HERO_SERVICES.map((service, index) => (
                <span key={service} className="whitespace-nowrap">
                  {index > 0 && <span className="mr-2 text-storm-red" aria-hidden="true">◆</span>}
                  {service}
                </span>
              ))}
            </p>
            <p className="mt-1 text-storm-light/45">Built with the force of a storm.</p>
          </div>

          <div className="mt-8 [@media(max-height:760px)]:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="#contact-form"
              onClick={(event) => scrollToId(event, "contact-form")}
              className="hero-cta sheen glow-btn inline-flex items-center gap-2.5 px-8 py-3.5 bg-storm-red hover:bg-storm-red-dark text-white font-bold tracking-wide rounded-xl transition-[background-color,scale] duration-300 hover:scale-[1.04]"
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#portfolio"
              onClick={(event) => scrollToId(event, "portfolio")}
              className="hero-cta inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 hover:border-storm-red/60 bg-white/[0.03] hover:bg-storm-red/10 backdrop-blur-sm text-storm-light font-semibold tracking-wide rounded-xl transition-colors duration-300"
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden="true" className="hero-hud hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 [@media(max-height:760px)]:hidden">
        <span className="text-[10px] tracking-[0.5em] uppercase text-storm-light/40 pl-[0.5em]">Scroll</span>
        <span className="scroll-rail" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Marquee />
      </div>
    </section>
  );
}
