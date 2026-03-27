"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KitsuneLogo from "./KitsuneLogo";
import { NAV_LINKS, SOCIALS } from "@/lib/constants";
import { DiscordIcon, MenuIcon, CloseIcon } from "./Icons";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 50);

      // Detect active section
      const sections = container.querySelectorAll(".scroll-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(section.id || "");
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    const container = document.querySelector(".scroll-container");
    if (el && container) {
      container.scrollTo({ top: (el as HTMLElement).offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[51] transition-all duration-500 ${
          scrolled
            ? "bg-storm-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-3 group"
          >
            <KitsuneLogo
              size={36}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-storm-light hidden sm:block">
              Tufan Studio
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm font-medium tracking-wide text-storm-muted hover:text-storm-light transition-colors duration-300"
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-storm-red"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Discord CTA */}
            <a
              href={SOCIALS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-storm-red/90 hover:bg-storm-red text-white text-sm font-semibold rounded-lg transition-all duration-300 glow-btn"
            >
              <DiscordIcon className="w-4 h-4" />
              <span>Join</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-storm-light p-2"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-storm-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Background kitsune watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <KitsuneLogo size={400} />
            </div>

            <nav className="flex flex-col items-center gap-8 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-bold tracking-[0.15em] uppercase text-storm-light hover:text-storm-red transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                href={SOCIALS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 px-8 py-3 bg-storm-red text-white text-lg font-bold rounded-xl glow-btn"
              >
                <DiscordIcon className="w-5 h-5" />
                Join The Storm
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
