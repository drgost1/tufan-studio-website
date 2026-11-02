import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BloxBridgeContent from "@/components/bloxbridge/BloxBridgeContent";
import { BLOX_BRIDGE, BLOX_BRIDGE_FAQS } from "@/lib/bloxBridge";
import { SITE_URL } from "@/lib/servicePages";

const PAGE_URL = `${SITE_URL}/${BLOX_BRIDGE.slug}`;
const SOCIAL_IMAGE_URL = `${SITE_URL}${BLOX_BRIDGE.images.social.src}`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}#software`,
      name: BLOX_BRIDGE.name,
      alternateName: "Tufan Roblox Studio MCP",
      description: BLOX_BRIDGE.metaDescription,
      url: PAGE_URL,
      downloadUrl: BLOX_BRIDGE.npmUrl,
      installUrl: BLOX_BRIDGE.releasesUrl,
      sameAs: [BLOX_BRIDGE.githubUrl, BLOX_BRIDGE.npmUrl],
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Roblox Studio MCP server and plugin",
      operatingSystem: "Windows, macOS",
      softwareRequirements: "Node.js 18 or newer, Roblox Studio",
      license: "https://opensource.org/licenses/MIT",
      image: SOCIAL_IMAGE_URL,
      screenshot: `${SITE_URL}${BLOX_BRIDGE.images.studio.src}`,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Tufan Studio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Roblox Studio MCP", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: BLOX_BRIDGE_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: BLOX_BRIDGE.metaTitle },
  description: BLOX_BRIDGE.metaDescription,
  keywords: [
    "Roblox Studio MCP",
    "Roblox MCP server",
    "Roblox Studio MCP plugin",
    "Roblox Studio AI",
    "Claude Code Roblox Studio",
    "Cursor Roblox Studio",
    "Roblox backdoor scanner",
    "Tufan-Blox-Bridge",
  ],
  alternates: { canonical: `/${BLOX_BRIDGE.slug}` },
  openGraph: {
    title: BLOX_BRIDGE.metaTitle,
    description: BLOX_BRIDGE.metaDescription,
    url: PAGE_URL,
    type: "website",
    siteName: "Tufan Studio",
    locale: "en_US",
    images: [
      {
        url: BLOX_BRIDGE.images.social.src,
        width: BLOX_BRIDGE.images.social.width,
        height: BLOX_BRIDGE.images.social.height,
        alt: BLOX_BRIDGE.images.social.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BLOX_BRIDGE.metaTitle,
    description: BLOX_BRIDGE.metaDescription,
    images: [BLOX_BRIDGE.images.social.src],
  },
};

export default function RobloxStudioMcpPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      <Navigation />
      <main className="scroll-container scroll-container--free">
        <BloxBridgeContent />
      </main>
    </>
  );
}
