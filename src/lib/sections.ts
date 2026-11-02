import { useEffect, type MouseEvent } from "react";

/** The form is shorter than its section, so it reads best centred in the viewport. */
function blockFor(id: string): ScrollLogicalPosition {
  return id === "contact-form" ? "center" : "start";
}

/** Smooth-scroll to an element on the current page. Returns false if it is not here. */
export function scrollToTarget(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: "smooth", block: blockFor(id) });
  return true;
}

/**
 * Click handler for in-page anchors. Smooth scrolling lives here rather than in
 * CSS: `scroll-behavior: smooth` also animates the browser's jump to a URL hash,
 * and GSAP ScrollTrigger's refresh on window load then cancels that animation
 * and leaves the page at the top.
 */
export function scrollToId(event: MouseEvent<HTMLAnchorElement>, id: string) {
  // Leave ctrl/cmd/shift-click alone so "open in new tab" still works
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (scrollToTarget(id)) event.preventDefault();
}

/**
 * Honour the URL hash when the home page mounts: a nav link from another page, a
 * deep link from another site, or Back from another page. The browser only does
 * this itself on a full page load, and never for `#contact-form?type=...`, which
 * is not a real element id. Jumps instantly so the visitor never sees the hero
 * first; on a full load this happens behind the intro shutter.
 */
export function useHashArrival() {
  useEffect(() => {
    const id = window.location.hash.slice(1).split("?")[0];
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const jump = () => target.scrollIntoView({ behavior: "instant", block: blockFor(id) });
    jump();

    // Images and fonts still loading can shift the sections above the target
    if (document.readyState === "complete") return;
    window.addEventListener("load", jump, { once: true });
    return () => window.removeEventListener("load", jump);
  }, []);
}
