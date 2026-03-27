"use client";

const ITEMS = [
  "FIVEM SERVERS",
  "FIVEM SCRIPTS",
  "GTA V CINEMATICS",
  "WEBSITES",
  "3D MODELING",
  "LEVEL DESIGN",
  "GAME DEVELOPMENT",
  "COMMUNITY MANAGEMENT",
];

export default function Marquee() {
  const content = ITEMS.map((item) => (
    <span key={item} className="flex items-center gap-6 shrink-0">
      <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-storm-light/80">
        {item}
      </span>
      <span className="w-1.5 h-1.5 bg-storm-red rounded-full shrink-0" />
    </span>
  ));

  return (
    <div className="relative w-full overflow-hidden bg-storm-dark/80 border-y border-white/5 py-4">
      <div className="flex gap-6 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
