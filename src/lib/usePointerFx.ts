"use client";

import { useEffect, useRef } from "react";

function finePointerWithMotion() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Feeds the pointer position into `--mx` / `--my` on whichever card matching
 * `selector` is under the cursor — `.spot-card` CSS turns that into a
 * following glow + lit border. One delegated listener per grid.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>(selector: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !finePointerWithMotion()) return;

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(selector);
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, [selector]);

  return ref;
}

/**
 * 3D tilt + glare for every `selector` card inside the container. Writes the
 * inline transform of that element, so put it on an inner wrapper — never on
 * an element GSAP is animating.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(selector: string, maxDegrees = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !finePointerWithMotion()) return;

    let activeCard: HTMLElement | null = null;

    const reset = (card: HTMLElement) => {
      card.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "";
    };

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(selector);
      if (activeCard && activeCard !== card) reset(activeCard);
      activeCard = card && root.contains(card) ? card : null;
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      activeCard.style.transition = "transform 0.12s ease-out";
      activeCard.style.transform = `perspective(900px) rotateX(${(0.5 - y) * maxDegrees}deg) rotateY(${(x - 0.5) * maxDegrees}deg) scale3d(1.02, 1.02, 1.02)`;
      activeCard.style.setProperty("--gx", `${x * 100}%`);
      activeCard.style.setProperty("--gy", `${y * 100}%`);
    };

    const onLeave = () => {
      if (activeCard) reset(activeCard);
      activeCard = null;
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [selector, maxDegrees]);

  return ref;
}
