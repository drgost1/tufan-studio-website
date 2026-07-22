"use client";

import { useEffect, useRef } from "react";

/**
 * Reliable scroll-reveal via IntersectionObserver.
 *
 * Replaces GSAP ScrollTrigger for card/item groups on pages that use the custom
 * `.scroll-container` (height:100vh; overflow-y:auto) as their scroller. GSAP
 * computed its trigger positions against that scroller during the loading-screen
 * / font-swap layout shift, so below-the-fold sections kept a stale trigger that
 * never fired — leaving their cards stuck at opacity:0 (invisible bands).
 *
 * IntersectionObserver observes intersection with the viewport and correctly
 * accounts for clipping by an intermediate scroll container, so it fires exactly
 * when the content becomes visible — no refresh, no scroller config, no stuck state.
 *
 * Attach the returned ref to a container; every element matching `selector`
 * inside it fades/slides in (staggered) the first time the container enters view.
 * Honors prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  selector?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const stagger = opts?.stagger ?? 0.08;
    const y = opts?.y ?? 28;
    const els = opts?.selector
      ? Array.from(root.querySelectorAll<HTMLElement>(opts.selector))
      : [root];
    if (!els.length) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduce) {
      els.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = `translateY(${y}px)`;
        el.style.transition =
          "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)";
        el.style.transitionDelay = `${i * stagger}s`;
      });
    }

    const reveal = () =>
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

    if (reduce) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(root);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
