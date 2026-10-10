import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import MusicPlayer from "@/components/MusicPlayer";
import ClickBurst from "@/components/ClickBurst";
import { BRAND, CONTACT_EMAIL, SOCIALS } from "@/lib/constants";
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

const SITE_URL = "https://www.tufanstudio.net";
const SITE_TITLE = "Tufan Studio — FiveM Servers, Scripts, GTA V Cinematics & Web";
const SITE_DESCRIPTION =
  "Tufan Studio is a game development and digital studio. We build FiveM servers, sell market-ready FiveM scripts, produce GTA V-style cinematics, make Roblox games and craft high-end websites. We are the storm.";
const SHARE_DESCRIPTION =
  "Game development, FiveM servers & scripts, GTA V cinematics, Roblox and web — crafted with the force of a storm.";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Tufan Studio",
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND.name,
  keywords: [
    "Tufan Studio",
    "game development studio",
    "FiveM server development",
    "FiveM scripts",
    "FiveM server setup",
    "Qbox scripts",
    "QBCore scripts",
    "GTA V cinematics",
    "Roblox game development",
    "web development",
    "game server management",
    "3D modeling",
    "level design",
  ],
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "/",
  },
  // Icons and the share image come from the file conventions in app/
  // (favicon.ico, icon.png, apple-icon.png, opengraph-image.tsx).
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: BRAND.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: SHARE_DESCRIPTION,
  },
};

// Organization + WebSite structured data — gives Google the brand name, logo
// and official profiles for the knowledge panel / site-name line in results.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      alternateName: ["Tufan", "Tufan Studio TS"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
      slogan: BRAND.tagline,
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      sameAs: [SOCIALS.youtube, SOCIALS.tebex, SOCIALS.discord],
      knowsAbout: ["FiveM", "GTA V", "Roblox", "Game development", "Web development", "3D modeling"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      alternateName: "Tufan",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
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
      <body className="h-full overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
        {/* Lives in the layout so audio survives route changes — pages remount, layouts don't */}
        <MusicPlayer />
        {/* Global so the click feedback survives route changes, same as the audio */}
        <ClickBurst />
        {children}
      </body>
    </html>
  );
}
