"use client";

import { motion } from "framer-motion";
import { TUFAN_TERMINAL } from "@/lib/constants";
import { DiamondIcon, DownloadIcon } from "../Icons";
import FloatingEmbers from "../FloatingEmbers";

export default function TerminalHero() {
  return (
    <section className="relative bg-storm-black overflow-hidden pt-28 sm:pt-36 pb-14 sm:pb-16 px-6">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(230,57,70,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 diamond-grid opacity-40 pointer-events-none" />
      <FloatingEmbers count={14} />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
        {/* Left: copy */}
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-5"
          >
            <DiamondIcon className="text-storm-red w-2 h-2" />
            <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
              Free For Windows
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[0.03em] uppercase text-storm-light leading-[0.95] mb-6"
          >
            {TUFAN_TERMINAL.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl sm:text-2xl font-light text-storm-red tracking-wide mb-6"
          >
            {TUFAN_TERMINAL.punchline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base sm:text-lg text-storm-muted leading-relaxed mb-10 max-w-xl"
          >
            {TUFAN_TERMINAL.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <a
              href={TUFAN_TERMINAL.downloadUrl}
              download
              className="glow-btn inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-storm-red hover:bg-storm-red-dark text-white text-base sm:text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-[1.03]"
            >
              <DownloadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              Download for Windows
            </a>
            <p className="mt-4 text-xs sm:text-sm tracking-widest uppercase text-storm-muted">
              {TUFAN_TERMINAL.requirements}
            </p>
          </motion.div>
        </div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <div className="absolute -inset-6 bg-storm-red/10 blur-3xl rounded-[40px] pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tufan-terminal-screenshot.png"
            alt="Tufan Terminal running three split PowerShell panes with a projects sidebar"
            width={1394}
            height={894}
            className="relative w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/70"
          />
        </motion.div>
      </div>
    </section>
  );
}
