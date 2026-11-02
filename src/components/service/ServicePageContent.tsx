"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import FloatingEmbers from "@/components/FloatingEmbers";
import Marquee from "@/components/Marquee";
import { DiscordIcon, ExternalLinkIcon, MailIcon, SERVICE_ICONS, WhatsappIcon } from "@/components/Icons";
import { CONTACT_EMAIL, SOCIALS } from "@/lib/constants";
import { scrollToId } from "@/lib/sections";
import { SERVICE_PAGE_LIST, SERVICE_PAGES, type ServiceSlug, type ServiceWorkItem } from "@/lib/servicePages";
import { useSpotlight } from "@/lib/usePointerFx";
import { useReveal } from "@/lib/useReveal";
import ServiceVisual from "./ServiceVisuals";
import WebsiteGallery from "./WebsiteGallery";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

// Asymmetric spans so the offer cards read as a composed layout, not a uniform grid.
const OFFER_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function SectionHeading({ kicker, heading }: { kicker: string; heading: readonly [string, string] }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mb-10 sm:mb-14">
      <span className="hud-kicker mb-3">{kicker}</span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light">
        {heading[0]} <span className="text-storm-red">{heading[1]}</span>
      </h2>
    </div>
  );
}

function ImageWorkCard({ item }: { item: ServiceWorkItem }) {
  return (
    <article className="work-reveal group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-storm-gray/40">
      <div className="overflow-hidden border-b border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6 sm:p-7">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-storm-red">{item.label}</span>
        <h3 className="mt-2 text-2xl font-bold text-storm-light sm:text-3xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-storm-muted sm:text-base">{item.description}</p>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red"
          >
            {item.linkLabel}
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

function WorkRow({ item, index }: { item: ServiceWorkItem; index: number }) {
  return (
    <article className="work-reveal group relative grid gap-2 border-t border-white/10 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6 sm:py-8">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-0 bg-storm-red shadow-[0_0_12px_#E63946] transition-all duration-500 group-hover:w-full"
      />
      <span
        aria-hidden="true"
        className="font-heading text-4xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(230,57,70,0.55)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3 className="text-2xl font-bold text-storm-light transition-colors duration-300 group-hover:text-storm-red-light sm:text-3xl">
          {item.title}
        </h3>
        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.25em] text-storm-red">
          {item.label}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm leading-relaxed text-storm-muted sm:text-base">{item.description}</p>
        {item.href && (
          <Link
            href={item.href}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red"
          >
            {item.linkLabel} &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ServicePageContent({ slug }: { slug: ServiceSlug }) {
  const page = SERVICE_PAGES[slug];
  const reduceMotion = useReducedMotion();
  const statsRef = useReveal<HTMLDivElement>({ selector: ".stat-reveal", stagger: 0.08 });
  const offersRef = useSpotlight<HTMLDivElement>(".spot-card");
  const offersRevealRef = useReveal<HTMLDivElement>({ selector: ".offer-reveal", stagger: 0.08 });
  const workRef = useReveal<HTMLDivElement>({ selector: ".work-reveal", stagger: 0.08 });
  const processRef = useReveal<HTMLOListElement>({ selector: ".process-reveal", stagger: 0.1 });
  const faqRef = useReveal<HTMLDivElement>({ selector: ".faq-reveal", stagger: 0.06 });
  const otherPages = SERVICE_PAGE_LIST.filter((other) => other.slug !== slug);
  const imageWork = page.work.filter((item) => item.image);
  const rowWork = page.work.filter((item) => !item.image);

  const riseIn = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE_OUT },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-storm-black px-6 pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(230,57,70,0.14),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 diamond-grid opacity-40" />
        <FloatingEmbers count={14} />

        <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <motion.span {...riseIn(0)} className="hud-kicker mb-5">
              {page.kicker}
            </motion.span>
            <motion.h1
              {...riseIn(0.1)}
              className="mb-6 text-6xl font-black uppercase leading-[0.92] tracking-[0.02em] text-storm-light sm:text-7xl md:text-8xl"
            >
              {page.heading}
            </motion.h1>
            <motion.p {...riseIn(0.2)} className="mb-5 text-xl font-light tracking-wide text-storm-red sm:text-2xl">
              {page.punchline}
            </motion.p>
            <motion.p {...riseIn(0.3)} className="mb-9 max-w-xl text-base leading-relaxed text-storm-muted sm:text-lg">
              {page.intro}
            </motion.p>
            <motion.div {...riseIn(0.4)} className="flex flex-wrap items-center gap-4">
              <a
                href="#quote"
                onClick={(event) => scrollToId(event, "quote")}
                className="glow-btn inline-flex items-center rounded-2xl bg-storm-red px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-storm-red-dark sm:px-10 sm:text-lg"
              >
                Get a Quote
              </a>
              <a
                href="#work"
                onClick={(event) => scrollToId(event, "work")}
                className="inline-flex items-center rounded-2xl border border-white/15 px-7 py-4 text-base font-semibold text-storm-light transition-colors duration-300 hover:border-storm-red/60 hover:text-storm-red-light"
              >
                See the Work
              </a>
            </motion.div>
          </div>

          <div className="min-w-0">
            <ServiceVisual slug={slug} />
          </div>
        </div>
      </section>

      {/* Proof numbers */}
      <section aria-label="At a glance" className="border-y border-white/5 bg-storm-dark px-6">
        <div
          ref={statsRef}
          className="mx-auto grid max-w-7xl grid-cols-2 divide-white/5 lg:grid-cols-4 lg:divide-x"
        >
          {page.stats.map((stat) => (
            <div key={stat.label} className="stat-reveal min-w-0 px-2 py-7 sm:px-6 sm:py-9">
              <p className="font-heading text-5xl leading-none text-storm-light sm:text-6xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-storm-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="relative overflow-hidden bg-storm-black px-6 py-16 sm:py-24">
        <span aria-hidden="true" className="section-watermark">
          {page.watermark}
        </span>
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker={page.offersKicker} heading={page.offersHeading} />
          <div ref={offersRef}>
            <div ref={offersRevealRef} className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
              {page.offers.map((offer, index) => {
                const IconComponent = SERVICE_ICONS[offer.icon];
                return (
                  <div key={offer.title} className={`offer-reveal min-w-0 ${OFFER_SPANS[index]}`}>
                    <div className="spot-card group h-full p-6 pl-8 sm:p-8 sm:pl-10">
                      <span className="spot-card__notch" aria-hidden="true" />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-6 left-0 top-6 w-[3px] origin-center scale-y-[0.35] bg-storm-red shadow-[0_0_14px_#E63946] transition-transform duration-500 group-hover:scale-y-100"
                      />
                      <div className="relative z-10">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-storm-red/20 bg-storm-red/10 transition-all duration-300 group-hover:bg-storm-red group-hover:shadow-[0_0_24px_rgba(230,57,70,0.6)]">
                          {IconComponent && (
                            <IconComponent className="h-6 w-6 text-storm-red transition-colors duration-300 group-hover:text-white" />
                          )}
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-storm-light sm:text-3xl">{offer.title}</h3>
                        <p className="max-w-xl text-sm leading-relaxed text-storm-muted sm:text-base">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative scroll-mt-16 bg-storm-dark px-6 py-16 sm:py-24 section-fade-top">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker={page.workKicker} heading={page.workHeading} />
          <p className="-mt-6 mb-10 max-w-2xl text-base leading-relaxed text-storm-muted sm:mb-14 sm:text-lg">
            {page.workIntro}
          </p>
          <div ref={workRef}>
            {imageWork.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {imageWork.map((item) => (
                  <ImageWorkCard key={item.title} item={item} />
                ))}
              </div>
            )}
            {rowWork.length > 0 && (
              <div className={imageWork.length > 0 ? "mt-10" : ""}>
                {rowWork.map((item, index) => (
                  <WorkRow key={item.title} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {slug === "web-developer" && <WebsiteGallery />}

      <Marquee items={page.stack} />

      {/* Process */}
      <section className="relative bg-storm-black px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <SectionHeading kicker="Start To Finish" heading={page.processHeading} />
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[9px] hidden h-px bg-gradient-to-r from-storm-red/70 via-storm-red/25 to-transparent lg:block"
            />
            <ol ref={processRef} className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {page.process.map((step, index) => (
              <li key={step.title} className="process-reveal relative min-w-0 pl-8 lg:pl-0 lg:pt-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[18px] w-[18px] rotate-45 border border-storm-red bg-storm-black lg:top-0"
                />
                <span aria-hidden="true" className="font-heading text-lg tracking-widest text-storm-red">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 mt-1 text-2xl font-bold text-storm-light">{step.title}</h3>
                <p className="text-sm leading-relaxed text-storm-muted sm:text-base">{step.description}</p>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-storm-dark px-6 py-16 sm:py-24 section-fade-top">
        <div className="relative z-10 mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading kicker="Good To Know" heading={["COMMON", "QUESTIONS"]} />
          <div ref={faqRef} className="min-w-0">
            {page.faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0} className="faq-reveal group border-t border-white/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red-light [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light leading-none text-storm-red transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-storm-muted sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="relative scroll-mt-16 overflow-hidden bg-storm-black px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 diamond-grid opacity-30" />
        <FloatingEmbers count={10} />
        <div className="relative z-10 mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="min-w-0">
            <span className="hud-kicker mb-3">Get A Quote</span>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-storm-light sm:text-5xl md:text-6xl">
              {page.quoteHeading[0]} <span className="text-storm-red">{page.quoteHeading[1]}</span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-storm-muted sm:text-lg">{page.quoteIntro}</p>

            <ul className="mb-8 space-y-3 text-sm">
              <li>
                <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-storm-light transition-colors hover:text-storm-red">
                  <WhatsappIcon className="h-4 w-4 text-storm-red" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={SOCIALS.discord} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-storm-light transition-colors hover:text-storm-red">
                  <DiscordIcon className="h-4 w-4 text-storm-red" /> Discord
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-3 text-storm-light transition-colors hover:text-storm-red">
                  <MailIcon className="h-4 w-4 text-storm-red" /> {CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            <p className="text-sm leading-relaxed text-storm-muted">
              Led by Nafis Iqbal, founder of Tufan Studio.{" "}
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-storm-light underline decoration-storm-red/50 underline-offset-4 transition-colors hover:text-storm-red">
                LinkedIn
              </a>{" "}
              ·{" "}
              <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-storm-light underline decoration-storm-red/50 underline-offset-4 transition-colors hover:text-storm-red">
                GitHub
              </a>
            </p>
          </div>
          <div className="min-w-0">
            <ContactForm defaultType={page.projectType} />
          </div>
        </div>
      </section>

      {/* Other services */}
      <nav aria-label="Other services" className="border-t border-white/5 bg-storm-dark px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <Link href="/" className="text-storm-muted transition-colors duration-300 hover:text-storm-red">
            &larr; Tufan Studio
          </Link>
          {otherPages.map((other) => (
            <Link
              key={other.slug}
              href={`/${other.slug}`}
              className="font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red"
            >
              {other.navLabel}
            </Link>
          ))}
          <Link href="/tufan-terminal" className="font-semibold text-storm-light transition-colors duration-300 hover:text-storm-red">
            Tufan Terminal
          </Link>
        </div>
      </nav>
    </>
  );
}
