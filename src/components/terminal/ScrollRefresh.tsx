"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The loading screen and the web-font swap change the page layout AFTER each
 * section's ScrollTrigger has already computed its start/end pixel positions
 * against a `scroller: .scroll-container` element. Without a recompute, any
 * section below the fold keeps a stale trigger point that never fires — so its
 * reveal animation is stuck at the hidden "from" state (invisible cards / big
 * empty band). Refreshing a few times as things settle, plus on `load`, fixes
 * every trigger's positions. One call refreshes all ScrollTriggers globally.
 */
export default function ScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timers = [250, 800, 1800].map((ms) => window.setTimeout(refresh, ms));
    window.addEventListener("load", refresh);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
