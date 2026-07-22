import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MusicPlayer from "@/components/MusicPlayer";
import TerminalHero from "@/components/terminal/TerminalHero";
import TerminalFeatures from "@/components/terminal/TerminalFeatures";
import TerminalWhy from "@/components/terminal/TerminalWhy";
import TerminalCTA from "@/components/terminal/TerminalCTA";

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
        url: "/images/og-banner.png",
        width: 640,
        height: 640,
        alt: "Tufan Terminal — One window. Every shell. Zero chaos.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tufan Terminal — One window. Every shell. Zero chaos.",
    description:
      "A free, GPU-accelerated Windows terminal workspace built by Tufan Studio. Download free, auto-updates.",
    images: ["/images/og-banner.png"],
  },
};

export default function TufanTerminalPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <MusicPlayer />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      <Navigation />
      <main className="scroll-container">
        <TerminalHero />
        <TerminalFeatures />
        <TerminalWhy />
        <TerminalCTA />
      </main>
    </>
  );
}
