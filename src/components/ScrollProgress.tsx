"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollTop / (scrollHeight - clientHeight);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
      }
      setShowBackToTop(scrollTop > clientHeight);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <div ref={barRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} />

      {/* Back to top */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}
