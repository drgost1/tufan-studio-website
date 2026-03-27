"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function FloatingEmbers({ count = 15 }: { count?: number }) {
  const embers = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      size: seededRandom(i * 7 + 1) * 3 + 1,
      left: seededRandom(i * 13 + 3) * 100,
      delay: seededRandom(i * 17 + 5) * 8,
      duration: 6 + seededRandom(i * 23 + 7) * 10,
      xDrift: (seededRandom(i * 29 + 11) - 0.5) * 150,
      yTravel: -(800 + seededRandom(i * 31 + 13) * 400),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {embers.map((ember, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ember.size,
            height: ember.size,
            left: `${ember.left}%`,
            bottom: "-5%",
            opacity: 0,
            backgroundColor: "#E63946",
          }}
          animate={{
            y: [0, ember.yTravel],
            x: [0, ember.xDrift],
            opacity: [0, 0.4, 0.6, 0.3, 0],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
