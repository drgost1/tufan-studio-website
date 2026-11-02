"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingEmbers from "@/components/FloatingEmbers";
import { BLOX_BRIDGE_FEATURE_ICONS, DiscordIcon, ExternalLinkIcon } from "@/components/Icons";
import { SOCIALS } from "@/lib/constants";
import { scrollToId } from "@/lib/sections";
import {
  BLOX_BRIDGE,
  BLOX_BRIDGE_AI_PROMPT,
  BLOX_BRIDGE_COMPARISON,
  BLOX_BRIDGE_FAQS,
  BLOX_BRIDGE_FEATURES,
  BLOX_BRIDGE_FLOW,
  BLOX_BRIDGE_OUTPUT,
  BLOX_BRIDGE_STATS,
  BLOX_BRIDGE_STEPS,
} from "@/lib/bloxBridge";
import { useReveal } from "@/lib/useReveal";

const COPIED_RESET_MS = 1800;

function SectionHeading({ kicker, lead, accent }: { kicker: string; lead: string; accent: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mb-10 sm:mb-14">
      <span className="hud-kicker mb-3">{kicker}</span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
        {lead} <span className="text-storm-red">{accent}</span>
      </h2>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard blocked by the browser: the text stays on screen to select by hand.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="min-h-11 shrink-0 rounded-lg border border-white/15 px-4 text-xs font-semibold uppercase tracking-widest text-storm-light transition-colors duration-300 hover:border-storm-red/50 hover:bg-white/5"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function BridgeDiagram() {
  const ref = useReveal<HTMLOListElement>({ selector: ".flow-node", stagger: 0.12 });
  return (
    <ol ref={ref} className="grid gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
      {BLOX_BRIDGE_FLOW.map((node) => (
        <li key={node.title} className="contents">
          <div className="flow-node glass-card min-w-0 rounded-xl p-6">
            <h3 className="mb-2 text-2xl font-bold text-storm-light sm:text-3xl">{node.title}</h3>
            <p className="text-sm leading-relaxed text-storm-muted">{node.detail}</p>
          </div>
          {node.link && (
            <div className="flow-node flex min-w-0 items-center gap-4 px-6 py-3 lg:w-44 lg:flex-col lg:justify-center lg:gap-3 lg:px-3 lg:py-0">
              <span aria-hidden="true" className="bridge-link" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-storm-red lg:text-center">
                {node.link}
              </span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function BloxBridgeContent() {
  const stepsRef = useReveal<HTMLOListElement>({ selector: ".step-reveal", stagger: 0.1 });
  const featuresRef = useReveal<HTMLDivElement>({ selector: ".feature-reveal", stagger: 0.05 });
  const proofRef = useReveal<HTMLDivElement>({ selector: ".proof-reveal", stagger: 0.1 });
  const compareRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>({ selector: ".faq-reveal", stagger: 0.05 });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-storm-black px-6 pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(230,57,70,0.14),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 diamond-grid opacity-40" />
        <FloatingEmbers count={14} />

        <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <span className="rise-in hud-kicker mb-5">
              {BLOX_BRIDGE.name}
            </span>
            <h1
              className="rise-in [animation-delay:80ms] mb-6 text-5xl font-black uppercase leading-[0.95] tracking-[0.03em] text-storm-light sm:text-6xl md:text-7xl"
            >
              Roblox Studio <span className="text-storm-red">MCP server</span> and plugin
            </h1>
            <p className="rise-in [animation-delay:180ms] mb-8 max-w-xl text-base leading-relaxed text-storm-muted sm:text-lg">
              {BLOX_BRIDGE.intro}
            </p>

            <div className="rise-in [animation-delay:260ms] mb-5 flex flex-wrap items-center gap-4">
              <a
                href={BLOX_BRIDGE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen glow-btn inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-storm-red px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-storm-red-dark sm:text-base"
              >
                View on GitHub
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
              <a
                href="#install"
                onClick={(event) => scrollToId(event, "install")}
                className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-storm-light transition-all duration-300 hover:border-storm-red/50 hover:bg-white/5 sm:text-base"
              >
                Install it
              </a>
            </div>

            <dl className="rise-in [animation-delay:340ms] flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
              {BLOX_BRIDGE_STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-heading text-4xl leading-none text-storm-light">{stat.value}</dd>
                  <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-storm-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise-in [animation-delay:300ms] relative min-w-0">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-storm-red/10 blur-3xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BLOX_BRIDGE.images.studio.src}
              alt={BLOX_BRIDGE.images.studio.alt}
              width={BLOX_BRIDGE.images.studio.width}
              height={BLOX_BRIDGE.images.studio.height}
              fetchPriority="high"
              className="relative h-auto w-full rounded-xl border border-white/10 shadow-2xl shadow-black/70"
            />
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="relative scroll-mt-16 bg-storm-dark px-6 py-16 sm:py-24 section-fade-top">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="One Command" lead="CONNECT CLAUDE CODE OR CURSOR TO" accent="ROBLOX STUDIO" />

          <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <ol ref={stepsRef} className="min-w-0">
              {BLOX_BRIDGE_STEPS.map((step, index) => (
                <li key={step.title} className="step-reveal grid grid-cols-[3rem_minmax(0,1fr)] gap-2 border-t border-white/10 py-6">
                  <span aria-hidden="true" className="font-heading text-3xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(230,57,70,0.55)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-2xl font-bold text-storm-light">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-storm-muted sm:text-base">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="min-w-0 space-y-5">
              <div className="rounded-xl border border-white/10 bg-storm-black/70 p-4 sm:p-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-storm-red">Run this</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <code className="min-w-0 break-all font-mono text-sm text-storm-light sm:text-base">
                    {BLOX_BRIDGE.installCommand}
                  </code>
                  <CopyButton text={BLOX_BRIDGE.installCommand} label="Copy the install command" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-storm-black/70 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-storm-red">Or paste this into your AI agent</p>
                  <CopyButton text={BLOX_BRIDGE_AI_PROMPT} label="Copy the prompt for your AI agent" />
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-storm-muted sm:text-sm">
                  {BLOX_BRIDGE_AI_PROMPT}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-storm-black px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 diamond-grid opacity-25" />
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="Under The Hood" lead="HOW THE PLUGIN AND MCP SERVER" accent="WORK TOGETHER" />
          <BridgeDiagram />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-storm-muted sm:text-base">
            Everything runs on your machine. Your AI calls a tool, the server queues a command, the plugin picks it up
            inside Studio and sends back the result. Run several Claude or Cursor sessions at once and the server handles
            their commands one at a time, so they never collide.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="relative bg-storm-dark px-6 py-16 sm:py-24 section-fade-top">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="85 Tools" lead="WHAT YOUR AI CAN DO IN" accent="ROBLOX STUDIO" />
          <div ref={featuresRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {BLOX_BRIDGE_FEATURES.map((feature) => {
              const IconComponent = BLOX_BRIDGE_FEATURE_ICONS[feature.icon];
              return (
                <article
                  key={feature.title}
                  className="feature-reveal glass-card accent-line card-shimmer group relative min-w-0 overflow-hidden rounded-xl p-6 pl-8"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-storm-red/10 transition-colors duration-300 group-hover:bg-storm-red/20">
                    {IconComponent && <IconComponent className="h-5 w-5 text-storm-red" />}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-storm-light transition-colors duration-300 group-hover:text-storm-red sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-storm-muted">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real output and the plugin itself */}
      <section className="relative bg-storm-black px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="On A Real Place" lead="WHAT IT LOOKS LIKE" accent="IN STUDIO" />
          <div ref={proofRef} className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-12">
            <figure className="proof-reveal min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BLOX_BRIDGE.images.widget.src}
                alt={BLOX_BRIDGE.images.widget.alt}
                width={BLOX_BRIDGE.images.widget.width}
                height={BLOX_BRIDGE.images.widget.height}
                loading="lazy"
                className="mx-auto h-auto w-full max-w-[282px] rounded-xl border border-white/10"
              />
              <figcaption className="mt-3 text-center text-sm text-storm-muted">
                The plugin panel: connection status, git buttons and a live activity feed.
              </figcaption>
            </figure>

            <div className="proof-reveal min-w-0">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-storm-dark">
                {BLOX_BRIDGE_OUTPUT.map((block) => (
                  <div key={block.command} className="border-b border-white/5 p-5 last:border-b-0">
                    <p className="mb-2 font-mono text-sm font-semibold text-storm-red">{block.command}</p>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-storm-light/85 sm:text-sm">
                      {block.lines.join("\n")}
                    </pre>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-storm-muted">
                Real output from two read-only tools, run on{" "}
                <Link href="/roblox-developer" className="text-storm-light underline transition-colors hover:text-storm-red">
                  Gram Bangla, the Roblox game we&apos;re building
                </Link>
                {" "}with this same bridge. We trimmed the place ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative bg-storm-dark px-6 py-16 sm:py-24 section-fade-top">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="Better Together" lead="ROBLOX'S BUILT-IN STUDIO MCP" accent="AND TUFAN" />
          <p className="-mt-4 mb-8 max-w-3xl text-base leading-relaxed text-storm-muted sm:text-lg">
            Roblox&apos;s built-in server is excellent at running and seeing your game. Tufan is the add-on for building
            it safely and keeping it versioned. Install both, because they cover different jobs.
          </p>
          <div ref={compareRef} className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-storm-black/60 text-[11px] uppercase tracking-[0.18em] text-storm-muted">
                <tr>
                  <th scope="col" className="p-4 font-semibold">You want to</th>
                  <th scope="col" className="p-4 font-semibold">Built-in Studio MCP</th>
                  <th scope="col" className="p-4 font-semibold text-storm-red">Tufan add-on</th>
                </tr>
              </thead>
              <tbody>
                {BLOX_BRIDGE_COMPARISON.map((row) => (
                  <tr key={row.job} className="border-t border-white/5">
                    <th scope="row" className="p-4 font-medium text-storm-light">{row.job}</th>
                    <td className="p-4 text-storm-muted">{row.builtIn}</td>
                    <td className="p-4 text-storm-light">{row.tufan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-storm-muted">
            Based on each server&apos;s published tool list in November 2026. Roblox updates its server often, so check its tool list for changes.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-storm-black px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading kicker="Good To Know" lead="ROBLOX MCP" accent="QUESTIONS" />
          <div ref={faqRef} className="min-w-0">
            {BLOX_BRIDGE_FAQS.map((faq, index) => (
              <details key={faq.question} open={index === 0} className="faq-reveal group border-t border-white/10 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red-light [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span aria-hidden="true" className="text-2xl font-light leading-none text-storm-red transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-storm-muted sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Get it */}
      <section className="relative overflow-hidden bg-storm-dark px-6 pb-20 pt-16 sm:pb-24 sm:pt-20 section-fade-top">
        <div className="pointer-events-none absolute inset-0 diamond-grid opacity-30" />
        <FloatingEmbers count={12} />
        <div className="relative z-10 mx-auto flex max-w-2xl min-w-0 flex-col items-center text-center">
          <span className="hud-kicker mb-5">Free And Open Source</span>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-storm-light sm:text-5xl md:text-6xl">
            TRY IT ON <span className="text-storm-red">YOUR GAME</span>
          </h2>
          <p className="mb-8 max-w-md text-base text-storm-muted sm:text-lg">
            Read the code, star the repo, or tell us what tools you want next.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={BLOX_BRIDGE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-storm-red px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-storm-red-dark sm:text-base"
            >
              GitHub
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <a
              href={BLOX_BRIDGE.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-storm-light transition-all duration-300 hover:border-storm-red/50 hover:bg-white/5 sm:text-base"
            >
              npm
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIALS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-storm-light transition-all duration-300 hover:border-storm-red/50 hover:bg-white/5 sm:text-base"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
          </div>
          <Link href="/roblox-developer" className="mt-7 py-3 text-sm tracking-wide text-storm-muted transition-colors duration-300 hover:text-storm-red">
            Need a Roblox game or system built? Hire a Roblox developer &rarr;
          </Link>
          <Link href="/" className="py-3 text-sm tracking-wide text-storm-muted transition-colors duration-300 hover:text-storm-red">
            &larr; Back to Tufan Studio
          </Link>
        </div>
      </section>
    </>
  );
}
