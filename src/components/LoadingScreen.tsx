"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KitsuneLogo from "./KitsuneLogo";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-storm-black flex flex-col items-center justify-center"
        >
          {/* Logo breathing */}
          <div className="mask-breathe mb-6">
            <KitsuneLogo size={80} />
          </div>

          {/* Loading bar */}
          <div className="w-48 h-0.5 bg-storm-gray rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-storm-red rounded-full"
            />
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs tracking-[0.4em] uppercase text-storm-muted"
          >
            Summoning the storm
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
