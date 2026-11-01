import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import FloatingEmbers from "@/components/FloatingEmbers";
import { DiamondIcon } from "@/components/Icons";
import { SOCIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* globals.css hides the native cursor on hover devices, so this page needs its own */}
      <CustomCursor />
      <div className="noise-overlay" />

      <main className="relative h-full overflow-y-auto overflow-x-hidden bg-storm-dark">
        <div className="absolute inset-0 diamond-grid opacity-30 pointer-events-none" />
        <FloatingEmbers count={16} />
        <span className="section-watermark" aria-hidden="true">
          404
        </span>

        <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-6 flex items-center gap-3">
            <DiamondIcon className="h-2 w-2 text-storm-red" />
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-storm-red">
              Error 404
            </span>
            <DiamondIcon className="h-2 w-2 text-storm-red" />
          </div>

          <h1 className="mb-4 text-5xl font-black tracking-tight text-storm-light sm:text-6xl md:text-7xl">
            LOST IN THE <span className="text-storm-red">STORM</span>
          </h1>

          <p className="mb-10 max-w-md text-lg text-storm-muted">
            This page doesn&apos;t exist or has moved. Head back and we&apos;ll get you on course.
          </p>

          <Link
            href="/"
            className="glow-btn inline-flex items-center gap-3 rounded-2xl bg-storm-red px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-storm-red-dark"
          >
            Back to Tufan Studio
          </Link>

          <nav aria-label="More from Tufan Studio" className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <Link
              href="/tufan-terminal"
              className="text-sm tracking-wide text-storm-muted transition-colors duration-300 hover:text-storm-red"
            >
              Tufan Terminal
            </Link>
            <a
              href={SOCIALS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide text-storm-muted transition-colors duration-300 hover:text-storm-red"
            >
              Join our Discord
            </a>
          </nav>
        </div>
      </main>
    </>
  );
}
