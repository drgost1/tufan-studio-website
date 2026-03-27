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
  title: "Tufan Studio | We Are The Storm",
  description:
    "Game development, cinematics, graphic design, and digital experiences — crafted with the force of a storm. Tufan Studio builds games, manages FiveM servers, creates cinematics, and grows gaming communities.",
  keywords: [
    "Tufan Studio",
    "game development",
    "FiveM",
    "Roblox",
    "cinematics",
    "graphic design",
    "game server management",
    "gaming community",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Tufan Studio | We Are The Storm",
    description:
      "Game development, cinematics, and digital experiences crafted with storm-force intensity.",
    type: "website",
    siteName: "Tufan Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tufan Studio | We Are The Storm",
    description:
      "Game development, cinematics, and digital experiences crafted with storm-force intensity.",
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
