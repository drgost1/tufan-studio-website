const RED_WORDS = ["We Are The Storm", "FiveM", "Cinematics", "Roblox", "Websites"];
const DARK_WORDS = ["Tufan Studio", "Scripts That Sell", "Servers That Scale", "Stories That Hit"];

function Track({ words }: { words: readonly string[] }) {
  // Three copies so the -33.333% marquee loop never shows a seam
  const run = [...words, ...words, ...words];
  return (
    <div className="storm-band__track">
      {run.map((word, index) => (
        <span key={index} className="flex items-center shrink-0">
          <span className="font-heading text-2xl sm:text-3xl tracking-[0.12em] uppercase px-6">{word}</span>
          <span className="w-2 h-2 rotate-45 bg-current opacity-70 shrink-0" />
        </span>
      ))}
    </div>
  );
}

/** Two crossing marquee strips — the dark-to-light seam between sections. */
export default function StormBand() {
  return (
    <div className="storm-band" aria-hidden="true">
      <div className="storm-band__strip storm-band__strip--dark">
        <Track words={DARK_WORDS} />
      </div>
      <div className="storm-band__strip storm-band__strip--red">
        <Track words={RED_WORDS} />
      </div>
    </div>
  );
}
