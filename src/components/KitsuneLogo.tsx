"use client";

import Image from "next/image";

export default function KitsuneLogo({
  className = "",
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Tufan Studio"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
