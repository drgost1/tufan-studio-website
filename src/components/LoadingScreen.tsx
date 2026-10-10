"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KitsuneLogo from "./KitsuneLogo";
import { markIntroDone, resetIntro } from "@/lib/intro";

const FIRST_VISIT_MS = 1600;
const REPEAT_VISIT_MS = 650;
const SEEN_KEY = "tufan:intro-seen";
const SHUTTER_EASE = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetIntro();

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage blocked (private mode) — just play the full intro
    }
    const duration = seen ? REPEAT_VISIT_MS : FIRST_VISIT_MS;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (counterRef.current) counterRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const timer = window.setTimeout(() => {
      setLoading(false);
      markIntroDone();
    }, duration);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] pointer-events-auto"
          exit={{ opacity: 1, transition: { duration: 0.8 } }}
          aria-hidden="true"
        >
          {/* Shutter halves split open to reveal the hero */}
          <motion.div className="intro-shutter top-0" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: SHUTTER_EASE }} />
          <motion.div className="intro-shutter bottom-0" exit={{ y: "100%" }} transition={{ duration: 0.8, ease: SHUTTER_EASE }} />

          {/* The seam the shutter opens along */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-storm-red to-transparent shadow-[0_0_20px_#E63946]"
            initial={{ scaleX: 0, opacity: 0.6 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0, scaleY: 30, transition: { duration: 0.35 } }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.3 } }}
          >
            <div className="relative mask-breathe mb-8">
              <div className="absolute inset-0 -m-8 rounded-full bg-storm-red/20 blur-2xl" />
              <KitsuneLogo size={88} priority className="relative drop-shadow-[0_0_24px_rgba(230,57,70,0.5)]" />
            </div>

            <div className="flex items-end gap-4 sm:gap-6">
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.45em] uppercase text-storm-muted pb-1">Summoning the storm</span>
              <span ref={counterRef} className="font-heading text-4xl leading-none text-storm-light tabular-nums">
                000
              </span>
            </div>

            <div className="mt-3 w-56 sm:w-64 h-px bg-white/10 overflow-hidden">
              <div ref={barRef} className="h-full bg-storm-red origin-left shadow-[0_0_10px_#E63946]" style={{ transform: "scaleX(0)" }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
