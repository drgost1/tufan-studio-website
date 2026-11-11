"use client";

import { BLOX_BRIDGE } from "@/lib/bloxBridge";
import { ExternalLinkIcon } from "./Icons";
import ProductPromo from "./ProductPromo";

export default function BloxBridgePromo() {
  return (
    <ProductPromo
      id="roblox-mcp"
      name={BLOX_BRIDGE.name}
      punchline="Roblox Studio MCP server and plugin."
      pitch={BLOX_BRIDGE.homePitch}
      footnote="Free · MIT · 87 tools · Claude Code, Cursor, any MCP client"
      learnMoreHref={`/${BLOX_BRIDGE.slug}`}
      image={{
        src: BLOX_BRIDGE.images.studio.src,
        alt: BLOX_BRIDGE.images.studio.alt,
        width: BLOX_BRIDGE.images.studio.width,
        height: BLOX_BRIDGE.images.studio.height,
      }}
      primaryAction={
        <a
          href={BLOX_BRIDGE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sheen glow-btn inline-flex items-center gap-2.5 px-7 py-3.5 bg-storm-red hover:bg-storm-red-dark text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:scale-[1.03]"
        >
          GitHub
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      }
    />
  );
}
