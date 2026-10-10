"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

interface Bolt {
  main: Point[];
  branches: Point[][];
  born: number;
}

const BOLT_LIFETIME_MS = 650;
const FIRST_STRIKE_MS = 2400;

/** Midpoint displacement — each pass halves the jitter, giving a natural jagged bolt. */
function buildBolt(start: Point, end: Point, displacement: number, detail: number): Point[] {
  let points: Point[] = [start, end];
  let offset = displacement;
  while (offset > detail) {
    const next: Point[] = [points[0]];
    for (let index = 0; index < points.length - 1; index++) {
      const from = points[index];
      const to = points[index + 1];
      next.push(
        {
          x: (from.x + to.x) / 2 + (Math.random() - 0.5) * offset,
          y: (from.y + to.y) / 2 + (Math.random() - 0.5) * offset * 0.25,
        },
        to,
      );
    }
    points = next;
    offset /= 2;
  }
  return points;
}

function tracePath(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index++) {
    ctx.lineTo(points[index].x, points[index].y);
  }
}

/**
 * Procedural lightning that cracks across the hero every few seconds.
 * The render loop only runs while a bolt is alive, it stops scheduling when
 * the hero is off screen or the tab is hidden, and it is skipped entirely
 * for prefers-reduced-motion.
 */
export default function LightningStrikes({
  onStrike,
}: {
  onStrike?: (xRatio: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStrikeRef = useRef(onStrike);

  useEffect(() => {
    onStrikeRef.current = onStrike;
  }, [onStrike]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let bolts: Bolt[] = [];
    let frameId = 0;
    let strikeTimer = 0;
    let inView = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      bolts = bolts.filter((bolt) => now - bolt.born < BOLT_LIFETIME_MS);

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const bolt of bolts) {
        const life = (now - bolt.born) / BOLT_LIFETIME_MS;
        // Real lightning re-strikes the same channel — flicker instead of a clean fade
        const flicker = life < 0.08 || (life > 0.18 && life < 0.3) ? 1 : 0.45 + Math.random() * 0.25;
        const alpha = (1 - life) * flicker;

        ctx.shadowColor = "rgba(230, 57, 70, 0.9)";
        ctx.shadowBlur = 24;
        ctx.strokeStyle = `rgba(230, 57, 70, ${alpha * 0.45})`;
        ctx.lineWidth = 9;
        tracePath(ctx, bolt.main);
        ctx.stroke();

        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(255, 225, 225, ${alpha})`;
        ctx.lineWidth = 2;
        tracePath(ctx, bolt.main);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 140, 140, ${alpha * 0.6})`;
        ctx.lineWidth = 1;
        for (const branch of bolt.branches) {
          tracePath(ctx, branch);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;

      if (bolts.length) {
        frameId = requestAnimationFrame(render);
      } else {
        frameId = 0;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const strike = () => {
      const startX = width * (0.08 + Math.random() * 0.84);
      const start = { x: startX, y: -10 };
      const end = {
        x: startX + (Math.random() - 0.5) * width * 0.3,
        y: height * (0.5 + Math.random() * 0.35),
      };
      const main = buildBolt(start, end, height * 0.32, 3);

      const branchCount = 2 + Math.floor(Math.random() * 3);
      const branches: Point[][] = [];
      for (let index = 0; index < branchCount; index++) {
        const origin = main[Math.floor(main.length * (0.2 + Math.random() * 0.5))];
        const direction = Math.random() > 0.5 ? 1 : -1;
        const tip = {
          x: origin.x + direction * (60 + Math.random() * 160),
          y: origin.y + 80 + Math.random() * 160,
        };
        branches.push(buildBolt(origin, tip, 70, 3));
      }

      bolts.push({ main, branches, born: performance.now() });
      onStrikeRef.current?.(startX / Math.max(width, 1));
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    const schedule = (delay: number) => {
      window.clearTimeout(strikeTimer);
      strikeTimer = window.setTimeout(() => {
        if (inView && !document.hidden) strike();
        const isSmall = window.innerWidth < 768;
        schedule((isSmall ? 6500 : 3800) + Math.random() * 4200);
      }, delay);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    observer.observe(canvas);

    schedule(FIRST_STRIKE_MS);

    return () => {
      window.clearTimeout(strikeTimer);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
    />
  );
}
