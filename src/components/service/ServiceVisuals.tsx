"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTilt } from "@/lib/usePointerFx";
import type { ServiceSlug } from "@/lib/servicePages";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ------------------------------- //
// Code panel shared by two heroes //
// ------------------------------- //

const TOKEN_PATTERN = /(--.*$|'[^']*'|\b(?:local|function|if|not|then|return|end)\b)/g;

function highlightLine(line: string) {
  return line.split(TOKEN_PATTERN).map((part, index) => {
    let color = "";
    if (part.startsWith("--")) color = "text-storm-muted";
    else if (part.startsWith("'")) color = "text-amber-300/90";
    else if (/^(local|function|if|not|then|return|end)$/.test(part)) color = "text-storm-red-light";
    return (
      <span key={index} className={color}>
        {part}
      </span>
    );
  });
}

function CodePanel({ fileName, lines, className = "" }: { fileName: string; lines: string[]; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`rounded-xl border border-white/10 bg-storm-black/90 shadow-2xl shadow-black/70 backdrop-blur-md overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2 w-2 rotate-45 bg-storm-red shadow-[0_0_10px_#E63946]" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-wide text-storm-muted">{fileName}</span>
      </div>
      <pre className="overflow-hidden px-4 py-3 font-mono text-[10.5px] leading-[1.7] text-storm-light/85 sm:text-xs">
        <code>
          {lines.map((line, index) => (
            <motion.span
              key={index}
              className="block whitespace-pre"
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.7 + index * 0.09, ease: EASE_OUT }}
            >
              {highlightLine(line) }
              {line === "" ? " " : null}
            </motion.span>
          ))}
        </code>
      </pre>
    </div>
  );
}

// ------------ //
// FiveM visual //
// ------------ //

const FIVEM_CODE = [
  "RegisterNetEvent('heist:claim', function()",
  "  local src = source",
  "  -- The client asks. The server decides.",
  "  local ped = GetPlayerPed(src)",
  "  local spot = GetEntityCoords(ped)",
  "  if #(spot - VAULT) > 3.0 then return end",
  "  if not HeistIsOpen(src) then return end",
  "  PayReward(src)",
  "end)",
];

function FivemVisual() {
  const tiltRef = useTilt<HTMLDivElement>(".service-tilt", 6);

  return (
    <div ref={tiltRef} className="relative pb-48 sm:pb-44">
      <div className="absolute -inset-6 rounded-[40px] bg-storm-red/10 blur-3xl pointer-events-none" />
      <div className="service-tilt relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/work-fivem-multichar.webp"
          alt="Tufan character select screen running in GTA V"
          width={880}
          height={425}
          className="w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/70"
        />
      </div>
      <CodePanel
        fileName="server/main.lua"
        lines={FIVEM_CODE}
        className="absolute bottom-0 right-0 w-full sm:w-[64%]"
      />
    </div>
  );
}

// ---------- //
// Web visual //
// ---------- //

const WEB_FRAMES = [
  {
    image: "/images/work-thala.jpg",
    host: "resturantbilling.virtualonline.website",
    alt: "Thala POS website",
    position: "left-0 top-0 w-[62%] -rotate-3 z-[1]",
    delay: 0.3,
  },
  {
    image: "/images/work-prs.jpg",
    host: "perfectnresults.com",
    alt: "PRS Result Software website",
    position: "right-0 top-[12%] w-[62%] rotate-2 z-[2]",
    delay: 0.45,
  },
  {
    image: "/images/work-yopekka-stores.jpg",
    host: "yopekka.com",
    alt: "YoPekka marketplace website",
    position: "left-[12%] bottom-0 w-[72%] z-[3]",
    delay: 0.6,
  },
] as const;

function WebVisual() {
  const tiltRef = useTilt<HTMLDivElement>(".service-tilt", 7);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={tiltRef} className="relative aspect-[5/4] w-full">
      <div className="absolute -inset-6 rounded-[40px] bg-storm-red/10 blur-3xl pointer-events-none" />
      {WEB_FRAMES.map((frame) => (
        <motion.div
          key={frame.host}
          className={`absolute ${frame.position}`}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: frame.delay, ease: EASE_OUT }}
        >
          <div className="service-tilt overflow-hidden rounded-lg border border-white/10 bg-storm-gray shadow-2xl shadow-black/80">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-storm-red" aria-hidden="true" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="ml-2 truncate font-mono text-[9px] text-storm-muted sm:text-[10px]">{frame.host}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.image} alt={frame.alt} width={1280} height={800} className="block w-full h-auto" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ------------- //
// Roblox visual //
// ------------- //

const ROBLOX_CODE = [
  "tryOn.OnServerEvent:Connect(function(plr, id)",
  "  -- The client asks. The server decides.",
  "  if not Catalog.isValid(id) then return end",
  "  Avatar.apply(plr, id)",
  "end)",
];

function RobloxVisual() {
  const tiltRef = useTilt<HTMLDivElement>(".service-tilt", 6);

  return (
    <div ref={tiltRef} className="relative pb-24 sm:pb-20">
      <div className="absolute -inset-6 rounded-[40px] bg-storm-red/10 blur-3xl pointer-events-none" />
      <div className="service-tilt relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/work-gram-bangla-shops.jpg"
          alt="3D render of a Bengal village market from Gram Bangla, with Bangla shop signs and tin roofs"
          width={1110}
          height={690}
          className="w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/70"
        />
        <span className="absolute left-3 top-3 rounded-full bg-storm-black/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-storm-light backdrop-blur-md">
          Gram Bangla, coming soon
        </span>
      </div>
      <CodePanel
        fileName="ServerScriptService/TryOn.lua"
        lines={ROBLOX_CODE}
        className="absolute bottom-0 right-0 w-full sm:w-[80%]"
      />
    </div>
  );
}

const SERVICE_VISUALS: Record<ServiceSlug, React.FC> = {
  "fivem-developer": FivemVisual,
  "web-developer": WebVisual,
  "roblox-developer": RobloxVisual,
};

export default function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  const Visual = SERVICE_VISUALS[slug];
  return <Visual />;
}
