"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import KitsuneLogo from "./KitsuneLogo";
import { NAV_LINKS, SOCIALS } from "@/lib/constants";
import { SERVICE_PAGE_LIST } from "@/lib/servicePages";
import { DiscordIcon, MenuIcon, CloseIcon } from "./Icons";
import { hasPageBooted, markPageBooted } from "@/lib/intro";
import { scrollToId, scrollToTarget } from "@/lib/sections";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isServicePage = SERVICE_PAGE_LIST.some((service) => pathname === `/${service.slug}`);
  // Slides in as the home intro shutter opens. Anywhere else there is no shutter
  // to wait for, and a nav that vanishes on every page change eats clicks.
  const [entersWithIntro] = useState(() => isHome && !hasPageBooted());

  useEffect(() => {
    markPageBooted();
  }, []);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 50);

      // Detect active section (only meaningful on the one-page home layout)
      const sections = container.querySelectorAll(".scroll-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(section.id || "");
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Keep the URL on the section in view, so Back from another page returns here
  // and a reload stays put. Waits for the scroll to settle so a long smooth
  // scroll doesn't rewrite it for every section it passes.
  useEffect(() => {
    if (!isHome || !activeSection) return;
    const timer = setTimeout(() => {
      const { pathname: currentPath, search, hash } = window.location;
      const nextHash = activeSection === "hero" ? "" : `#${activeSection}`;
      if (currentPath === "/" && hash !== nextHash) {
        window.history.replaceState(null, "", `/${search}${nextHash}`);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [isHome, activeSection]);

  // Section links are real links to /#id. On home they just scroll; from any
  // other page they navigate client-side and useHashArrival does the jump.
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (isHome && href.startsWith("#")) scrollToId(event, href.slice(1));
  };

  return (
    <>
      <motion.nav
        initial={entersWithIntro ? { y: -100 } : false}
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
          {isHome ? (
            <button
              onClick={() => scrollToTarget("hero")}
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
          ) : (
            <Link href="/" className="flex items-center gap-3 group">
              <KitsuneLogo
                size={36}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-storm-light hidden sm:block">
                Tufan Studio
              </span>
            </Link>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 whitespace-nowrap">
            {NAV_LINKS.map((link) => {
              const isRoute = link.href.startsWith("/");

              if (isRoute) {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                      active ? "text-storm-light" : "text-storm-muted hover:text-storm-light"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-storm-red"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              const active = isHome && activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  scroll={false}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="relative text-sm font-medium tracking-wide text-storm-muted hover:text-storm-light transition-colors duration-300"
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-storm-red"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Hire menu: opens on hover and on keyboard focus */}
            <div className="relative group/hire">
              <button
                type="button"
                aria-haspopup="true"
                className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isServicePage ? "text-storm-light" : "text-storm-muted hover:text-storm-light"
                }`}
              >
                Hire Us
                <span
                  aria-hidden="true"
                  className="text-[10px] transition-transform duration-300 group-hover/hire:rotate-180 group-focus-within/hire:rotate-180"
                >
                  &#9662;
                </span>
              </button>
              <div className="invisible absolute left-1/2 top-full z-10 w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover/hire:visible group-hover/hire:opacity-100 group-focus-within/hire:visible group-focus-within/hire:opacity-100">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-storm-black/95 p-2 shadow-2xl shadow-black/70 backdrop-blur-xl">
                  {SERVICE_PAGE_LIST.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-storm-red/15 hover:text-storm-light ${
                        pathname === `/${service.slug}` ? "text-storm-red-light" : "text-storm-muted"
                      }`}
                    >
                      {service.navLabel}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

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
            className="lg:hidden text-storm-light p-2"
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
            className="fixed inset-0 z-50 bg-storm-black/95 backdrop-blur-2xl flex flex-col items-center overflow-y-auto py-20"
          >
            {/* Background kitsune watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <KitsuneLogo size={400} />
            </div>

            <nav className="my-auto flex flex-col items-center gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => {
                const isRoute = link.href.startsWith("/");

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={isRoute ? link.href : `/${link.href}`}
                      scroll={isRoute}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className="text-2xl font-bold tracking-[0.15em] uppercase text-storm-light hover:text-storm-red transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                className="mt-2 flex flex-col items-center gap-3 border-t border-white/10 pt-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-storm-red">Hire Us</span>
                {SERVICE_PAGE_LIST.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-semibold text-storm-light hover:text-storm-red transition-colors"
                  >
                    {service.navLabel}
                  </Link>
                ))}
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.1 }}
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
