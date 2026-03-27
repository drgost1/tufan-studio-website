import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Display font for headings — bold, cinematic
const heading = localFont({
  src: [
    {
      path: "../fonts/bebas-neue.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

// Body font — clean and modern
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://217.217.253.236:6900"),
  title: {
    default: "Tufan Studio | We Are The Storm",
    template: "%s | Tufan Studio",
  },
  description:
    "Tufan Studio is a game development and digital services studio. We build FiveM servers, create GTA V-style cinematics, develop market-ready scripts, and craft high-end websites. We are the storm.",
  keywords: [
    "Tufan Studio",
    "game development",
    "FiveM server",
    "FiveM scripts",
    "GTA V cinematics",
    "Roblox game development",
    "web development",
    "game server management",
    "gaming community",
    "3D modeling",
    "level design",
    "graphic design",
    "digital studio",
  ],
  authors: [{ name: "Tufan Studio" }],
  creator: "Tufan Studio",
  publisher: "Tufan Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Tufan Studio | We Are The Storm",
    description:
      "Game development, FiveM servers, GTA V cinematics, and web development — crafted with the force of a storm.",
    type: "website",
    siteName: "Tufan Studio",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Tufan Studio - Kitsune Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Tufan Studio | We Are The Storm",
    description:
      "Game development, FiveM servers, GTA V cinematics, and web development — crafted with the force of a storm.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
