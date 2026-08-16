"use client";

import { useEffect, useRef, useState } from "react";

type Burst = { id: number; x: number; y: number };

// Irregular angles on purpose — a perfectly even star reads as machine-made
const SPARK_ANGLES = [8, 62, 121, 174, 236, 301];

// Long enough for the slowest layer (delayed ring) to finish before removal
const BURST_LIFETIME = 750;

export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);
  const lastFired = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = new Set<number>();

    const onPointerDown = (event: PointerEvent) => {
      // Ignore right/middle click and rapid-fire spam
      if (event.button !== 0) return;
      const now = performance.now();
      if (now - lastFired.current < 70) return;
      lastFired.current = now;

      const burst: Burst = {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
      };
      // Cap concurrent bursts so a click-masher can never flood the DOM
      setBursts((prev) => [...prev.slice(-5), burst]);

      const timer = window.setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== burst.id));
        timers.delete(timer);
      }, BURST_LIFETIME);
      timers.add(timer);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <>
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="click-burst"
          style={{ left: burst.x, top: burst.y }}
          aria-hidden="true"
        >
          <span className="click-burst__flash" />
          <span className="click-burst__ring" />
          <span className="click-burst__ring click-burst__ring--trail" />
          {SPARK_ANGLES.map((angle) => (
            <span
              key={angle}
              className="click-burst__spark"
              style={{ ["--spark-angle" as string]: `${angle}deg` }}
            />
          ))}
        </span>
      ))}
    </>
  );
}
