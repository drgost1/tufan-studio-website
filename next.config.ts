import type { NextConfig } from "next";

const LONG_CACHE = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      { source: "/music/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      { source: "/logo.png", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
