import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import TerminalHero from "@/components/terminal/TerminalHero";
import TerminalFeatures from "@/components/terminal/TerminalFeatures";
import TerminalWhy from "@/components/terminal/TerminalWhy";
import TerminalCTA from "@/components/terminal/TerminalCTA";
import { TUFAN_TERMINAL } from "@/lib/constants";

const PAGE_URL = "https://www.tufanstudio.net/tufan-terminal";
const SCREENSHOT_URL = "https://www.tufanstudio.net/images/tufan-terminal-screenshot.png";

// SoftwareApplication data — lets Google read this page as a free Windows app listing
// (price, OS, download) instead of a plain article. Publisher points at the
// Organization node the root layout already emits.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: TUFAN_TERMINAL.name,
  description: TUFAN_TERMINAL.subhead,
  url: PAGE_URL,
  downloadUrl: TUFAN_TERMINAL.downloadUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows 10, Windows 11",
  fileSize: "6MB",
  image: SCREENSHOT_URL,
  screenshot: SCREENSHOT_URL,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://www.tufanstudio.net/#organization" },
};

export const metadata: Metadata = {
  title: "Tufan Terminal",
  description:
    "Tufan Terminal is a free, GPU-accelerated Windows terminal workspace. Group PowerShell, CMD, Git Bash, and WSL shells by project, split panes any direction, and keep everything running in the background. Free download, auto-updates.",
  keywords: [
    "Tufan Terminal",
    "Windows terminal app",
    "terminal emulator",
    "PowerShell terminal",
    "WSL terminal",
    "Git Bash terminal",
    "terminal multiplexer",
    "developer tools",
    "Tauri app",
    "free terminal app",
    "project-based terminal",
  ],
  alternates: {
    canonical: "/tufan-terminal",
  },
  openGraph: {
    title: "Tufan Terminal — One window. Every shell. Zero chaos.",
    description:
      "A free, GPU-accelerated Windows terminal workspace. Group your shells by project, split panes any direction, and never lose a running process again.",
    url: "https://www.tufanstudio.net/tufan-terminal",
    type: "website",
    siteName: "Tufan Studio",
    locale: "en_US",
    images: [
      {
        url: "/images/tufan-terminal-screenshot.png",
        width: 1394,
        height: 894,
        alt: "Tufan Terminal with a projects sidebar and split terminal panes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tufan Terminal — One window. Every shell. Zero chaos.",
    description:
      "A free, GPU-accelerated Windows terminal workspace built by Tufan Studio. Download free, auto-updates.",
    images: ["/images/tufan-terminal-screenshot.png"],
  },
};

export default function TufanTerminalPage() {
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
        <TerminalHero />
        <TerminalFeatures />
        <TerminalWhy />
        <TerminalCTA />
      </main>
    </>
  );
}
