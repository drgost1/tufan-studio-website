"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  speed: number;
  drift: number;
  life: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const particles: Particle[] = [];

    // Vortex particles — spiraling storm
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * Math.min(width, height) * 0.4;
      particles.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.25 ? "#E63946" : "#FAFAFA",
        alpha: Math.random() * 0.6 + 0.2,
        vx: 0,
        vy: 0,
        angle,
        radius,
        speed: 0.002 + Math.random() * 0.004,
        drift: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 1000,
      });
    }

    // Ember particles — small bright dots drifting upward
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3,
        color: i % 3 === 0 ? "#FF6B6B" : "rgba(230,57,70,0.5)",
        alpha: Math.random() * 0.4 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.1),
        angle: 0,
        radius: 0,
        speed: 0,
        drift: Math.random() * 2,
        life: Math.random() * 500,
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

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      timeRef.current++;

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.speed > 0) {
          // Vortex particle — orbit around center
          p.angle += p.speed;
          // Slowly pulse radius
          const pulseRadius = p.radius + Math.sin(timeRef.current * 0.005 + p.drift * 10) * 20;
          const targetX = cx + Math.cos(p.angle) * pulseRadius;
          const targetY = cy + Math.sin(p.angle) * pulseRadius;
          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;
        } else {
          // Ember particle — drift upward
          p.x += p.vx + Math.sin(timeRef.current * 0.01 + p.drift * 5) * 0.2;
          p.y += p.vy;
          // Wrap around
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }

        // Mouse repulsion
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }

        // Flicker
        p.life++;
        const flicker = 0.7 + 0.3 * Math.sin(p.life * 0.04 + p.drift * 8);

        // Draw with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * flicker;
        ctx.fill();

        // Glow for larger particles
        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * flicker * 0.08;
          ctx.fill();
        }
      }

      // Draw faint vortex lines connecting nearby particles
      ctx.strokeStyle = "rgba(230, 57, 70, 0.03)";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 1;
      for (let i = 0; i < Math.min(particles.length, 100); i++) {
        for (let j = i + 1; j < Math.min(particles.length, 100); j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
          if (d < 80) {
            ctx.globalAlpha = (1 - d / 80) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
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
