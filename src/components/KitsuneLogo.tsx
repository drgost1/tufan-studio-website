"use client";

import Image from "next/image";

export default function KitsuneLogo({
  className = "",
  size = 48,
  priority = false,
}: {
  className?: string;
  size?: number;
  /** Only for above-the-fold copies (nav, loader, hero) — the rest lazy-load. */
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Tufan Studio"
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
