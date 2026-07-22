"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import KitsuneLogo from "../KitsuneLogo";
import { TUFAN_TERMINAL_PROJECTS } from "@/lib/constants";

type PaneLine = { text: string; color: string };

const DEV_PANE: PaneLine[] = [
  { text: "$ bun run dev", color: "text-storm-light/80" },
  { text: "▲ ready in 312ms", color: "text-emerald-400" },
  { text: "○ compiling / ...", color: "text-storm-muted" },
  { text: "✓ compiled successfully", color: "text-emerald-400" },
  { text: "GET / 200 in 48ms", color: "text-storm-muted" },
];

const GIT_PANE: PaneLine[] = [
  { text: "$ git status", color: "text-storm-light/80" },
  { text: "On branch feat/tufan-terminal", color: "text-storm-muted" },
  { text: "  modified: src/app/page.tsx", color: "text-storm-red-light" },
  { text: "  modified: src/lib/constants.ts", color: "text-storm-red-light" },
];

const MONITOR_PANE: PaneLine[] = [
  { text: "$ htop", color: "text-storm-light/80" },
  { text: "CPU [||||||      ] 41%", color: "text-emerald-400" },
  { text: "MEM [||||        ] 28%", color: "text-cyan-400" },
  { text: "bun    0.4%", color: "text-storm-muted" },
];

function PaneHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5 bg-white/[0.015]">
      <span className="w-1.5 h-1.5 rounded-full bg-storm-red/70" />
      <span className="text-[10px] tracking-widest uppercase text-storm-muted">{label}</span>
    </div>
  );
}

function PaneBody({ lines, cursor = false }: { lines: PaneLine[]; cursor?: boolean }) {
  return (
    <div className="flex-1 px-3 py-2 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className={`${line.color} whitespace-nowrap`}>
          {line.text}
        </div>
      ))}
      {cursor && (
        <span className="inline-block w-[6px] h-[13px] bg-storm-red/80 animate-pulse align-middle" />
      )}
    </div>
  );
}

export default function TerminalMockup({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isCompact = variant === "compact";

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`w-full min-w-0 rounded-2xl border border-white/10 bg-storm-dark/70 backdrop-blur-xl shadow-[0_30px_90px_-20px_rgba(230,57,70,0.25)] overflow-hidden ${className}`}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-2 h-9 px-3 border-b border-white/5 bg-white/[0.02] min-w-0">
        <KitsuneLogo size={14} className="shrink-0 opacity-90" />
        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
          {TUFAN_TERMINAL_PROJECTS.slice(0, isCompact ? 2 : 3).map((project, i) => (
            <span
              key={project.name}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide shrink-0 ${
                i === 0
                  ? "bg-storm-red/15 text-storm-light border border-storm-red/30"
                  : "text-storm-muted"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <span>{project.name}</span>
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-storm-muted/50 shrink-0">
          <span className="w-2.5 h-px bg-current" />
          <span className="w-2.5 h-2.5 border border-current rounded-[2px]" />
          <span className="text-xs leading-none">&times;</span>
        </div>
      </div>

      <div className="flex min-w-0">
        {/* Sidebar */}
        {!isCompact && (
          <div className="hidden sm:flex w-[120px] shrink-0 flex-col gap-1 border-r border-white/5 bg-white/[0.01] p-2">
            <span className="px-1.5 py-1 text-[9px] tracking-[0.2em] uppercase text-storm-muted/70">
              Projects
            </span>
            {TUFAN_TERMINAL_PROJECTS.map((project, i) => (
              <div
                key={project.name}
                className={`flex items-center gap-1.5 px-1.5 py-1.5 rounded-md text-[10px] truncate ${
                  i === 0 ? "bg-storm-red/10 text-storm-light" : "text-storm-muted"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Panes */}
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-px bg-white/5">
          <div
            className={`${isCompact ? "" : "row-span-2"} bg-storm-dark/90 flex flex-col min-w-0`}
          >
            <PaneHeader label="bun run dev" />
            <PaneBody lines={DEV_PANE} cursor />
          </div>
          <div className="bg-storm-dark/90 flex flex-col min-w-0">
            <PaneHeader label="git status" />
            <PaneBody lines={GIT_PANE} />
          </div>
          {!isCompact && (
            <div className="bg-storm-dark/90 flex flex-col min-w-0">
              <PaneHeader label="htop" />
              <PaneBody lines={MONITOR_PANE} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
