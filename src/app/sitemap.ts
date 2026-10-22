import type { MetadataRoute } from "next";

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
  ];
}
