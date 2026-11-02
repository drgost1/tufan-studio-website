import type { MetadataRoute } from "next";
import { BLOX_BRIDGE } from "@/lib/bloxBridge";
import { SERVICE_PAGE_LIST, SITE_URL } from "@/lib/servicePages";

// No lastModified: `new Date()` stamped every URL with the build time, a date
// Google learns is meaningless and then ignores for the whole sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.tufanstudio.net",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.tufanstudio.net/tufan-terminal",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${BLOX_BRIDGE.slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICE_PAGE_LIST.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
