"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
  baseSize: number;
}

type Formation =
  | "vortex"
  | "explosion"
  | "rain"
  | "wave"
  | "converge"
  | "helix"
  | "grid"
  | "ring"
  | "fountain"
  | "scatter"
  | "tornado"
  | "galaxy"
  | "pulse"
  | "zigzag"
  | "diamond"
  | "infinity"
  | "heartbeat"
  | "matrix"
  | "orbit"
  | "phoenix";

const FORMATIONS: Formation[] = [
  "vortex", "explosion", "rain", "wave", "converge", "helix",
  "grid", "ring", "fountain", "scatter", "tornado", "galaxy",
  "pulse", "zigzag", "diamond", "infinity", "heartbeat", "matrix",
  "orbit", "phoenix",
];

function getFormationTargets(
  formation: Formation,
  count: number,
  w: number,
  h: number,
  time: number
): [number, number][] {
  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h);
  const targets: [number, number][] = [];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2;

    switch (formation) {
      case "vortex": {
        const r = 40 + t * scale * 0.35;
        const a = angle * 3 + time * 0.001;
        targets.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        break;
      }
      case "explosion": {
        const r = 50 + t * scale * 0.45;
        targets.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
        break;
      }
      case "rain": {
        const x = (i % 40) * (w / 40) + 10;
        const y = ((i * 37) % h);
        targets.push([x, y]);
        break;
      }
      case "wave": {
        const x = t * w;
        const y = cy + Math.sin(t * Math.PI * 4 + time * 0.002) * scale * 0.15;
        targets.push([x, y]);
        break;
      }
      case "converge": {
        const r = 5 + Math.random() * 30;
        const a = Math.random() * Math.PI * 2;
        targets.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        break;
      }
      case "helix": {
        const x = cx + Math.cos(t * Math.PI * 6) * scale * 0.12;
        const y = t * h;
        targets.push([x, y]);
        break;
      }
      case "grid": {
        const cols = Math.ceil(Math.sqrt(count * (w / h)));
        const rows = Math.ceil(count / cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gx = (col / cols) * w * 0.7 + w * 0.15;
        const gy = (row / rows) * h * 0.7 + h * 0.15;
        targets.push([gx, gy]);
        break;
      }
      case "ring": {
        const r = scale * 0.25;
        targets.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
        break;
      }
      case "fountain": {
        const spread = (Math.random() - 0.5) * scale * 0.4;
        const height = Math.random() * h * 0.7;
        targets.push([cx + spread, h - height]);
        break;
      }
      case "scatter": {
        targets.push([Math.random() * w, Math.random() * h]);
        break;
      }
      case "tornado": {
        const r2 = (1 - t) * scale * 0.3 + 10;
        const a2 = t * Math.PI * 8;
        const y2 = t * h;
        targets.push([cx + Math.cos(a2) * r2, y2]);
        break;
      }
      case "galaxy": {
        const arm = i % 3;
        const armAngle = (arm / 3) * Math.PI * 2;
        const r3 = t * scale * 0.35;
        const spiral = armAngle + t * Math.PI * 3;
        targets.push([cx + Math.cos(spiral) * r3, cy + Math.sin(spiral) * r3 * 0.6]);
        break;
      }
      case "pulse": {
        const r4 = scale * 0.15 + Math.sin(t * Math.PI * 8) * scale * 0.1;
        targets.push([cx + Math.cos(angle) * r4, cy + Math.sin(angle) * r4]);
        break;
      }
      case "zigzag": {
        const x2 = t * w;
        const zigHeight = ((Math.floor(t * 20) % 2) === 0 ? 1 : -1) * scale * 0.1;
        targets.push([x2, cy + zigHeight]);
        break;
      }
      case "diamond": {
        const dSize = scale * 0.25;
        const dt = t * 4;
        const seg = Math.floor(dt) % 4;
        const segT = dt - Math.floor(dt);
        let dx = 0, dy = 0;
        if (seg === 0) { dx = segT * dSize; dy = -segT * dSize; }
        else if (seg === 1) { dx = (1 - segT) * dSize; dy = -(1 - segT) * dSize + segT * dSize; }
        else if (seg === 2) { dx = -segT * dSize; dy = (1 - segT) * dSize; }
        else { dx = -(1 - segT) * dSize; dy = -(segT) * dSize; }
        targets.push([cx + dx, cy + dy]);
        break;
      }
      case "infinity": {
        const infT = t * Math.PI * 2;
        const infScale = scale * 0.2;
        const ix = infScale * Math.cos(infT) / (1 + Math.sin(infT) * Math.sin(infT));
        const iy = infScale * Math.sin(infT) * Math.cos(infT) / (1 + Math.sin(infT) * Math.sin(infT));
        targets.push([cx + ix, cy + iy]);
        break;
      }
      case "heartbeat": {
        const ht = angle;
        const hx = 16 * Math.pow(Math.sin(ht), 3);
        const hy = -(13 * Math.cos(ht) - 5 * Math.cos(2 * ht) - 2 * Math.cos(3 * ht) - Math.cos(4 * ht));
        const hScale = scale * 0.012;
        targets.push([cx + hx * hScale, cy + hy * hScale - scale * 0.05]);
        break;
      }
      case "matrix": {
        const cols2 = 30;
        const col2 = i % cols2;
        const x3 = (col2 / cols2) * w;
        const y3 = ((i * 73 + time * 0.5) % (h + 100)) - 50;
        targets.push([x3, y3]);
        break;
      }
      case "orbit": {
        const orbitR = (((i % 5) + 1) / 5) * scale * 0.3;
        const orbitA = angle + (i % 5) * 0.5;
        targets.push([cx + Math.cos(orbitA) * orbitR, cy + Math.sin(orbitA) * orbitR * 0.5]);
        break;
      }
      case "phoenix": {
        // Wing shape
        const side = i < count / 2 ? -1 : 1;
        const lt = (i % (count / 2)) / (count / 2);
        const wingX = side * lt * scale * 0.35;
        const wingY = -Math.abs(wingX) * 0.4 + lt * scale * 0.1;
        targets.push([cx + wingX, cy + wingY]);
        break;
      }
    }
  }
  return targets;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const timeRef = useRef(0);
  const formationRef = useRef<Formation>("vortex");
  const formationTimer = useRef(0);
  const transitionSpeed = useRef(0.02);

  const PARTICLE_COUNT = 220;

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        targetX: x,
        targetY: y,
        size: Math.random() * 2 + 0.5,
        baseSize: Math.random() * 2 + 0.5,
        color: Math.random() > 0.3 ? "#E63946" : "#FAFAFA",
        alpha: Math.random() * 0.6 + 0.2,
        vx: 0, vy: 0,
        life: Math.random() * 1000,
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

    const switchFormation = () => {
      const current = formationRef.current;
      let next: Formation;
      do {
        next = FORMATIONS[Math.floor(Math.random() * FORMATIONS.length)];
      } while (next === current);
      formationRef.current = next;

      // Vary transition speed for different feels
      transitionSpeed.current = 0.015 + Math.random() * 0.03;
    };

    const animate = () => {
      if (!visibleRef.current) {
        animFrameRef.current = 0;
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      timeRef.current++;
      formationTimer.current++;

      // Switch formation every 4-7 seconds (240-420 frames)
      if (formationTimer.current > 240 + Math.random() * 180) {
        switchFormation();
        formationTimer.current = 0;
      }

      const particles = particlesRef.current;
      const targets = getFormationTargets(
        formationRef.current,
        particles.length,
        w, h,
        timeRef.current
      );
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const speed = transitionSpeed.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update targets
        if (targets[i]) {
          p.targetX = targets[i][0];
          p.targetY = targets[i][1];
        }

        // Move toward target with easing
        p.vx += (p.targetX - p.x) * speed;
        p.vy += (p.targetY - p.y) * speed;

        // Mouse repulsion
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 4;
          p.vy -= (dy / dist) * force * 4;
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Flicker
        p.life++;
        const flicker = 0.6 + 0.4 * Math.sin(p.life * 0.03 + i * 0.5);

        // Size pulse during transitions
        const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        p.size = p.baseSize + Math.min(velocity * 0.3, 2);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * flicker;
        ctx.fill();

        // Glow for moving particles
        if (velocity > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * flicker * 0.06;
          ctx.fill();
        }

        // Motion trail
        if (velocity > 2) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.15;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }
      }

      // Connect nearby particles with lines
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 2; j < particles.length; j += 2) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
          if (d < 60) {
            ctx.globalAlpha = (1 - d / 60) * 0.1;
            ctx.strokeStyle = "rgba(230, 57, 70, 0.4)";
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
