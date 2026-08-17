"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, SOCIALS, CONTACT_EMAIL } from "@/lib/constants";
import { DiscordIcon, YoutubeIcon, ShoppingBagIcon, DiamondIcon } from "./Icons";
import KitsuneLogo from "./KitsuneLogo";
import FloatingEmbers from "./FloatingEmbers";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "YouTube",
    href: SOCIALS.youtube,
    icon: YoutubeIcon,
    color: "hover:text-red-500",
  },
  {
    name: "Tebex Store",
    href: SOCIALS.tebex,
    icon: ShoppingBagIcon,
    color: "hover:text-green-400",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll(".contact-animate");
      if (elements) {
        gsap.from(elements, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: container,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-section flex flex-col items-center justify-center bg-storm-black relative py-24 lg:py-20"
    >
      {/* Background particles effect (subtle) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,57,70,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 diamond-grid opacity-30" />
      </div>

      <FloatingEmbers count={18} />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-red/30 to-transparent" />

      <div ref={contentRef} className="relative z-10 w-full px-6 max-w-6xl mx-auto">
        {/* Kitsune watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none hidden lg:block">
          <KitsuneLogo size={500} />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left — pitch and the direct channels */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Label */}
            <div className="contact-animate flex items-center gap-3 mb-6">
              <DiamondIcon className="text-storm-red w-2 h-2" />
              <span className="text-sm tracking-[0.3em] uppercase text-storm-red font-medium">
                Get In Touch
              </span>
              <DiamondIcon className="text-storm-red w-2 h-2" />
            </div>

            {/* Title */}
            <h2 className="contact-animate text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-storm-light mb-4">
              JOIN THE <span className="text-storm-red">STORM</span>
            </h2>

            <p className="contact-animate text-lg text-storm-muted mb-8 max-w-md">
              Want to hire us, or want to build with us? Fill the form — it lands
              straight in our inbox. Prefer to talk first? The Discord is always open.
            </p>

            {/* Direct channels */}
            <div className="contact-animate flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full sm:w-auto">
              <a
                href={SOCIALS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-storm-red hover:bg-storm-red-dark text-white font-bold rounded-xl transition-all duration-300 glow-btn hover:scale-105"
              >
                <DiscordIcon className="w-5 h-5" />
                Join Our Discord
              </a>
              <a
                href={SOCIALS.founderDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 border border-storm-red/30 text-storm-light hover:text-white hover:border-storm-red/70 hover:bg-storm-red/10 font-bold rounded-xl transition-all duration-300"
              >
                <DiscordIcon className="w-5 h-5 text-storm-red" />
                DM Us
              </a>
            </div>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-animate mt-6 text-sm text-storm-muted hover:text-storm-red transition-colors duration-300 tracking-wide"
            >
              {CONTACT_EMAIL}
            </a>

            {/* Social links */}
            <div className="contact-animate flex items-center gap-8 mt-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 text-storm-muted transition-colors duration-300 ${social.color}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs tracking-widest uppercase">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — the quotation / hire / join form */}
          <div id="contact-form" className="contact-animate scroll-mt-24">
            <ContactForm />
          </div>
        </div>

        {/* Decorative divider */}
        <div className="contact-animate w-16 h-px bg-gradient-to-r from-transparent via-storm-red/40 to-transparent mt-16 mb-8 mx-auto" />

        {/* Footer */}
        <footer className="contact-animate text-center">
          <p className="text-sm text-storm-muted/60" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-storm-muted/30 mt-2 tracking-widest uppercase">
            {BRAND.tagline}
          </p>
        </footer>
      </div>
    </section>
  );
}
