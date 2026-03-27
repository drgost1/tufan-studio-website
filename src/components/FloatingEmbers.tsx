"use client";

import { motion } from "framer-motion";

export default function FloatingEmbers({ count = 15, color = "storm-red" }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 10;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-${color}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-5%",
              opacity: 0,
            }}
            animate={{
              y: [0, -800 - Math.random() * 400],
              x: [0, (Math.random() - 0.5) * 150],
              opacity: [0, 0.4, 0.6, 0.3, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
