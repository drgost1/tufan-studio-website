"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      <Navigation />
      <main className="scroll-container">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Team />
        <Contact />
      </main>
    </>
  );
}
