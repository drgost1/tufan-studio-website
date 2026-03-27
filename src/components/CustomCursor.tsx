"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (no touch)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${e.clientX}px`;
        trailRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    const addListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, .glass-card, .portfolio-card, .team-card");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", onMove);

    // Initial + observe DOM changes
    let interactives = addListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      interactives = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [visible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? "hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={trailRef}
        className="custom-cursor-trail"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
