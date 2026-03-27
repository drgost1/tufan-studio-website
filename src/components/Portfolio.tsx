"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { DiamondIcon, ExternalLinkIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -420 : 420;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollButtons, 400);
  };

  // Mouse drag to scroll on desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
      el.style.userSelect = "";
      updateScrollButtons();
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("scroll", updateScrollButtons, { passive: true });

    updateScrollButtons();

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [updateScrollButtons]);

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

      const cards = scrollRef.current?.querySelectorAll(".portfolio-card");
      if (cards) {
        gsap.set(cards, { scale: 0.9, opacity: 0 });
        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollRef.current,
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
      id="portfolio"
      className="scroll-section flex flex-col items-center justify-center bg-storm-dark relative py-20"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/20 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Portfolio
            </span>
            <DiamondIcon className="text-storm-red w-2 h-2" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
            OUR{" "}
            <span className="text-storm-red">CREATIONS</span>
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollBy("left")}
            className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-storm-gray/80 border border-white/10 text-storm-light transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:bg-storm-red hover:border-storm-red cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy("right")}
            className={`hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-storm-gray/80 border border-white/10 text-storm-light transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:bg-storm-red hover:border-storm-red cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Horizontal scroll carousel */}
          <div
            ref={scrollRef}
            className="horizontal-scroll gap-6 pb-6 px-4 cursor-grab"
          >
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div
                key={index}
                className="portfolio-card relative w-[300px] sm:w-[400px] aspect-[16/10] rounded-2xl overflow-hidden group select-none"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-storm-black via-storm-black/70 to-storm-black/20 z-10" />
                  {/* Hover border glow */}
                  <div className="absolute inset-0 border border-storm-red/0 group-hover:border-storm-red/30 transition-all duration-500 rounded-2xl z-20" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  {/* Category tag */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase mb-2 ${
                      item.comingSoon ? "text-storm-red/60" : "text-storm-red"
                    }`}
                  >
                    <DiamondIcon className="w-1.5 h-1.5" />
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-storm-light mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-storm-muted">
                    {item.description}
                  </p>

                  {/* Link */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-storm-red hover:text-storm-red-light transition-colors"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      View Project
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation hint */}
        <div className="flex items-center justify-center gap-3 mt-6 text-storm-muted text-xs tracking-widest uppercase">
          <span className="hidden md:inline">Drag or use arrows</span>
          <span className="md:hidden">Swipe to explore</span>
          <span className="text-storm-red">→</span>
        </div>
      </div>
    </section>
  );
}
