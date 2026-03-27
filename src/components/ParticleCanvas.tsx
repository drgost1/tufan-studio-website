"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  drift: number;
}

// Kitsune mask shape defined as coordinate points (simplified)
const MASK_POINTS: [number, number][] = [];

function generateMaskPoints(cx: number, cy: number, scale: number) {
  const points: [number, number][] = [];
  // Fox face outline
  for (let i = 0; i < 200; i++) {
    const t = (i / 200) * Math.PI * 2;
    // Egg-shaped head
    const rx = 80 * scale;
    const ry = 90 * scale;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t) * 0.9;
    points.push([x, y]);
  }
  // Left ear
  for (let i = 0; i < 30; i++) {
    const t = i / 30;
    const x = cx - 55 * scale + t * 20 * scale;
    const y = cy - 80 * scale - t * 60 * scale + t * t * 30 * scale;
    points.push([x, y]);
  }
  // Right ear
  for (let i = 0; i < 30; i++) {
    const t = i / 30;
    const x = cx + 55 * scale - t * 20 * scale;
    const y = cy - 80 * scale - t * 60 * scale + t * t * 30 * scale;
    points.push([x, y]);
  }
  // Diamond pattern on forehead
  const dSize = 20 * scale;
  const dY = cy - 30 * scale;
  for (let i = 0; i < 40; i++) {
    const t = (i / 40) * Math.PI * 2;
    points.push([cx + dSize * Math.cos(t), dY + dSize * Math.sin(t) * 0.7]);
  }
  // Eyes (left)
  for (let i = 0; i < 20; i++) {
    const t = (i / 20) * Math.PI * 2;
    points.push([cx - 30 * scale + 15 * scale * Math.cos(t), cy + 5 * scale + 8 * scale * Math.sin(t)]);
  }
  // Eyes (right)
  for (let i = 0; i < 20; i++) {
    const t = (i / 20) * Math.PI * 2;
    points.push([cx + 30 * scale + 15 * scale * Math.cos(t), cy + 5 * scale + 8 * scale * Math.sin(t)]);
  }
  return points;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const phaseRef = useRef<"forming" | "dissolving" | "storm">("forming");
  const phaseTimerRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) / 500;
    const points = generateMaskPoints(cx, cy, scale);
    const particles: Particle[] = [];

    for (let i = 0; i < points.length; i++) {
      const [tx, ty] = points[i];
      particles.push({
        x: cx + (Math.random() - 0.5) * width,
        y: cy + (Math.random() - 0.5) * height,
        targetX: tx,
        targetY: ty,
        originX: tx,
        originY: ty,
        size: Math.random() * 2.5 + 0.5,
        color: Math.random() > 0.3 ? "#E63946" : "#FAFAFA",
        alpha: Math.random() * 0.5 + 0.5,
        vx: 0,
        vy: 0,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 200,
        drift: Math.random() * 0.5,
      });
    }

    // Extra ambient particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        color: Math.random() > 0.5 ? "rgba(230,57,70,0.3)" : "rgba(255,255,255,0.15)",
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 300,
        maxLife: 300,
        drift: Math.random() * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!visibleRef.current) {
        animFrameRef.current = 0;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      phaseTimerRef.current++;

      // Cycle phases
      if (phaseTimerRef.current > 400 && phaseRef.current === "forming") {
        phaseRef.current = "dissolving";
        phaseTimerRef.current = 0;
      } else if (phaseTimerRef.current > 200 && phaseRef.current === "dissolving") {
        phaseRef.current = "storm";
        phaseTimerRef.current = 0;
      } else if (phaseTimerRef.current > 200 && phaseRef.current === "storm") {
        phaseRef.current = "forming";
        phaseTimerRef.current = 0;
      }

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (dist > 0 && dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 2;
          p.vy -= (dy / dist) * force * 2;
        }

        if (phaseRef.current === "forming") {
          // Move toward target (mask shape)
          p.vx += (p.targetX - p.x) * 0.02;
          p.vy += (p.targetY - p.y) * 0.02;
        } else if (phaseRef.current === "dissolving") {
          // Drift away
          p.vx += (Math.random() - 0.5) * 0.8;
          p.vy += (Math.random() - 0.5) * 0.8 - 0.2;
        } else {
          // Storm: swirl around center
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          const toCenterX = cx - p.x;
          const toCenterY = cy - p.y;
          const angle = Math.atan2(toCenterY, toCenterX);
          p.vx += Math.cos(angle + Math.PI / 2) * 0.3 + toCenterX * 0.001;
          p.vy += Math.sin(angle + Math.PI / 2) * 0.3 + toCenterY * 0.001;
        }

        // Damping
        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Flicker alpha
        p.life++;
        const flicker = 0.7 + 0.3 * Math.sin(p.life * 0.05 + p.drift * 10);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * flicker;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
