import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/constants";

// 1200x630 is the ratio Facebook, WhatsApp, Discord and X all crop to —
// the old 640x640 square banner was letterboxed or cropped everywhere.
export const alt = "Tufan Studio — We Are The Storm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICES_LINE = ["FiveM Servers", "Scripts", "GTA V Cinematics", "Websites"];

export default async function OpengraphImage() {
  const [bebas, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/BebasNeue-Regular.ttf")),
    readFile(join(process.cwd(), "public/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0A0A0A",
          fontFamily: "Bebas",
          color: "#FAFAFA",
        }}
      >
        {/* Storm glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 24% 50%, rgba(230,57,70,0.45) 0%, rgba(193,18,31,0.18) 28%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 92% 0%, rgba(230,57,70,0.22) 0%, transparent 45%)",
          }}
        />

        {/* HUD corner brackets */}
        {[
          { top: 28, left: 28, borderTop: "3px solid #E63946", borderLeft: "3px solid #E63946" },
          { top: 28, right: 28, borderTop: "3px solid #E63946", borderRight: "3px solid #E63946" },
          { bottom: 28, left: 28, borderBottom: "3px solid #E63946", borderLeft: "3px solid #E63946" },
          { bottom: 28, right: 28, borderBottom: "3px solid #E63946", borderRight: "3px solid #E63946" },
        ].map((corner, index) => (
          <div key={index} style={{ position: "absolute", width: 44, height: 44, display: "flex", ...corner }} />
        ))}

        <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "0 80px", gap: 48 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={250} height={250} alt="" style={{ filter: "drop-shadow(0 0 40px rgba(230,57,70,0.55))" }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 7, color: "#E63946" }}>
              <div style={{ width: 14, height: 14, background: "#E63946", transform: "rotate(45deg)", display: "flex" }} />
              GAME DEVELOPMENT STUDIO
            </div>
            <div style={{ fontSize: 126, lineHeight: 0.9, letterSpacing: 3, marginTop: 10, display: "flex" }}>
              {BRAND.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 50, letterSpacing: 12, color: "#E63946", marginTop: 6, display: "flex" }}>
              {BRAND.tagline.toUpperCase()}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, fontSize: 25, letterSpacing: 2, color: "#BBBBBB" }}>
              {SERVICES_LINE.map((service, index) => (
                <div key={service} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {index > 0 && <div style={{ width: 8, height: 8, background: "#E63946", transform: "rotate(45deg)", display: "flex" }} />}
                  {service.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 90,
            fontSize: 28,
            letterSpacing: 6,
            color: "#888888",
            display: "flex",
          }}
        >
          TUFANSTUDIO.NET
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bebas", data: bebas, style: "normal", weight: 400 }],
    },
  );
}
