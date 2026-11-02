"use client";

import { TUFAN_TERMINAL } from "@/lib/constants";
import { DownloadIcon } from "./Icons";
import ProductPromo from "./ProductPromo";

export default function TufanTerminalPromo() {
  return (
    <ProductPromo
      id="terminal"
      name={TUFAN_TERMINAL.name}
      punchline={TUFAN_TERMINAL.punchline}
      pitch={TUFAN_TERMINAL.homePitch}
      footnote={TUFAN_TERMINAL.requirements}
      learnMoreHref="/tufan-terminal"
      image={{
        src: "/images/tufan-terminal-screenshot.png",
        alt: "Tufan Terminal with a projects sidebar and split terminal panes",
        width: 1394,
        height: 894,
      }}
      primaryAction={
        <a
          href={TUFAN_TERMINAL.downloadUrl}
          download
          className="sheen glow-btn inline-flex items-center gap-2.5 px-7 py-3.5 bg-storm-red hover:bg-storm-red-dark text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:scale-[1.03]"
        >
          <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          Download
        </a>
      }
    />
  );
}
