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

    // All formations use `T` (time) for continuous animation
    const T = time * 0.01;

    switch (formation) {
      case "vortex": {
        // Spiraling with breathing radius
        const r = (40 + t * scale * 0.3) + Math.sin(T + i * 0.1) * 15;
        const a = angle * 3 + T * 0.3 + Math.sin(T * 0.5) * 0.5;
        targets.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        break;
      }
      case "explosion": {
        // Pulsing outward and inward like breathing
        const breathe = Math.sin(T * 0.8) * 0.3 + 1;
        const r = (50 + t * scale * 0.35) * breathe;
        const a = angle + Math.sin(T * 0.3 + i * 0.05) * 0.15;
        targets.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        break;
      }
      case "rain": {
        // Falling rain with horizontal sway
        const x = (i % 40) * (w / 40) + Math.sin(T + i * 0.3) * 15;
        const y = ((i * 37 + time * 1.5) % (h + 50)) - 25;
        targets.push([x, y]);
        break;
      }
      case "wave": {
        // Double wave with traveling motion
        const x = ((t * w + time * 0.8) % (w + 50)) - 25;
        const y = cy + Math.sin(t * Math.PI * 4 + T * 0.6) * scale * 0.15
          + Math.cos(t * Math.PI * 2 + T * 0.3) * scale * 0.05;
        targets.push([x, y]);
        break;
      }
      case "converge": {
        // Orbiting tight cluster
        const cr = 15 + Math.sin(T * 2 + i * 0.5) * 25;
        const ca = angle + T * 0.5;
        targets.push([cx + Math.cos(ca) * cr, cy + Math.sin(ca) * cr]);
        break;
      }
      case "helix": {
        // Rotating double helix
        const hx = cx + Math.cos(t * Math.PI * 6 + T * 0.4) * scale * 0.12;
        const hy = ((t * h + time * 0.5) % (h + 50)) - 25;
        targets.push([hx, hy]);
        break;
      }
      case "grid": {
        // Breathing grid with wave distortion
        const cols = Math.ceil(Math.sqrt(count * (w / h)));
        const rows = Math.ceil(count / cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gx = (col / cols) * w * 0.7 + w * 0.15 + Math.sin(T * 0.5 + row * 0.3) * 12;
        const gy = (row / rows) * h * 0.7 + h * 0.15 + Math.cos(T * 0.4 + col * 0.3) * 12;
        targets.push([gx, gy]);
        break;
      }
      case "ring": {
        // Rotating ring that breathes
        const rr = scale * 0.22 + Math.sin(T * 0.6 + i * 0.1) * 20;
        const ra = angle + T * 0.2;
        targets.push([cx + Math.cos(ra) * rr, cy + Math.sin(ra) * rr]);
        break;
      }
      case "fountain": {
        // Erupting upward and falling
        const age = (time * 0.02 + i * 0.15) % 4;
        const fx = cx + Math.sin(i * 2.4) * age * scale * 0.08;
        const fy = cy + scale * 0.3 - age * scale * 0.2 + age * age * scale * 0.03;
        targets.push([fx, fy]);
        break;
      }
      case "scatter": {
        // Drifting scatter — slowly orbiting random positions
        const sx = (Math.sin(i * 7.3 + T * 0.1) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 5.7 + T * 0.08) * 0.5 + 0.5) * h;
        targets.push([sx, sy]);
        break;
      }
      case "tornado": {
        // Spinning tornado climbing up
        const tr = ((1 - t) * scale * 0.25 + 10) + Math.sin(T + i * 0.2) * 10;
        const ta = t * Math.PI * 8 + T * 0.5;
        const ty = ((t * h + time * 0.3) % (h + 50)) - 25;
        targets.push([cx + Math.cos(ta) * tr, ty]);
        break;
      }
      case "galaxy": {
        // Rotating spiral arms
        const arm = i % 3;
        const armAngle = (arm / 3) * Math.PI * 2;
        const gr = t * scale * 0.32 + Math.sin(T * 0.3 + i * 0.1) * 10;
        const gs = armAngle + t * Math.PI * 3 + T * 0.15;
        targets.push([cx + Math.cos(gs) * gr, cy + Math.sin(gs) * gr * 0.6]);
        break;
      }
      case "pulse": {
        // Pulsating rings expanding and contracting
        const pr = scale * 0.15 + Math.sin(T * 1.2 + t * Math.PI * 6) * scale * 0.12;
        const pa = angle + Math.sin(T * 0.3) * 0.3;
        targets.push([cx + Math.cos(pa) * pr, cy + Math.sin(pa) * pr]);
        break;
      }
      case "zigzag": {
        // Traveling zigzag with vertical bounce
        const zx = ((t * w + time * 0.6) % (w + 50)) - 25;
        const zigAmp = scale * 0.1 + Math.sin(T * 0.5) * scale * 0.04;
        const zigH = ((Math.floor(t * 20) % 2) === 0 ? 1 : -1) * zigAmp;
        targets.push([zx, cy + zigH]);
        break;
      }
      case "diamond": {
        // Rotating diamond that scales
        const dSize = scale * 0.2 + Math.sin(T * 0.7) * scale * 0.05;
        const dt = (t + T * 0.05) * 4;
        const seg = Math.floor(dt) % 4;
        const segT = dt - Math.floor(dt);
        let dx = 0, dy = 0;
        if (seg === 0) { dx = segT * dSize; dy = -segT * dSize; }
        else if (seg === 1) { dx = (1 - segT) * dSize; dy = -(1 - segT) * dSize + segT * dSize; }
        else if (seg === 2) { dx = -segT * dSize; dy = (1 - segT) * dSize; }
        else { dx = -(1 - segT) * dSize; dy = -(segT) * dSize; }
        const rot = T * 0.2;
        targets.push([cx + dx * Math.cos(rot) - dy * Math.sin(rot), cy + dx * Math.sin(rot) + dy * Math.cos(rot)]);
        break;
      }
      case "infinity": {
        // Flowing figure-eight
        const infT = t * Math.PI * 2 + T * 0.3;
        const infS = scale * 0.2 + Math.sin(T * 0.5) * scale * 0.03;
        const ix = infS * Math.cos(infT) / (1 + Math.sin(infT) * Math.sin(infT));
        const iy = infS * Math.sin(infT) * Math.cos(infT) / (1 + Math.sin(infT) * Math.sin(infT));
        targets.push([cx + ix, cy + iy]);
        break;
      }
      case "heartbeat": {
        // Beating heart — scales up and down
        const beat = 1 + Math.sin(T * 3) * 0.15;
        const ht = angle;
        const hx = 16 * Math.pow(Math.sin(ht), 3) * beat;
        const hy = -(13 * Math.cos(ht) - 5 * Math.cos(2 * ht) - 2 * Math.cos(3 * ht) - Math.cos(4 * ht)) * beat;
        const hScale = scale * 0.012;
        targets.push([cx + hx * hScale, cy + hy * hScale - scale * 0.05]);
        break;
      }
      case "matrix": {
        // Falling columns at varying speeds
        const cols2 = 30;
        const col2 = i % cols2;
        const speed = 0.5 + (col2 % 5) * 0.3;
        const x3 = (col2 / cols2) * w + Math.sin(T * 0.2 + col2) * 5;
        const y3 = ((i * 73 + time * speed) % (h + 100)) - 50;
        targets.push([x3, y3]);
        break;
      }
      case "orbit": {
        // Multiple orbiting rings at different speeds
        const ring = i % 5;
        const orbitR = ((ring + 1) / 5) * scale * 0.28 + Math.sin(T * 0.4 + ring) * 10;
        const orbitSpeed = 0.1 + ring * 0.08;
        const orbitA = angle + T * orbitSpeed;
        targets.push([cx + Math.cos(orbitA) * orbitR, cy + Math.sin(orbitA) * orbitR * 0.5]);
        break;
      }
      case "phoenix": {
        // Flapping wings
        const side = i < count / 2 ? -1 : 1;
        const lt = (i % (count / 2)) / (count / 2);
        const flap = Math.sin(T * 1.5) * 0.3;
        const wingX = side * lt * scale * 0.32;
        const wingY = (-Math.abs(wingX) * (0.4 + flap)) + lt * scale * 0.08
          + Math.sin(T * 0.8 + lt * 3) * 8;
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
