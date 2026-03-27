"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_TRACKS = [
  { youtubeId: "k2qgadSvNyU", startAt: 12 },
];

export default function MusicPlayer() {
  const [asked, setAsked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerReady = useRef(false);

  // Show prompt after loading screen finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("music-dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      } else {
        setAsked(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const postCommand = useCallback((command: string, args?: Record<string, unknown>) => {
    if (iframeRef.current?.contentWindow) {
      const msg: Record<string, unknown> = { event: "command", func: command };
      if (args) Object.assign(msg, args);
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify(msg),
        "https://www.youtube.com"
      );
    }
  }, []);

  const handleAccept = () => {
    setShowPrompt(false);
    setAsked(true);
    setPlaying(true);
    playerReady.current = true;
  };

  const handleDecline = () => {
    setShowPrompt(false);
    setAsked(true);
    sessionStorage.setItem("music-dismissed", "1");
  };

  const togglePlay = () => {
    if (!playerReady.current) {
      playerReady.current = true;
      setPlaying(true);
      return;
    }
    if (playing) {
      postCommand("pauseVideo");
    } else {
      postCommand("playVideo");
    }
    setPlaying(!playing);
  };

  const track = MUSIC_TRACKS[0];
  const embedUrl = `https://www.youtube.com/embed/${track.youtubeId}?start=${track.startAt}&autoplay=${playing ? 1 : 0}&enablejsapi=1&loop=1&playlist=${track.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`;

  return (
    <>
      {/* Hidden YouTube iframe */}
      {asked && playing && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="hidden"
          width="0"
          height="0"
          allow="autoplay; encrypted-media"
          title="Background Music"
        />
      )}

      {/* Music prompt overlay */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-storm-black/80 backdrop-blur-md flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-storm-dark border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              {/* Music icon */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-storm-red/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-storm-light mb-2">
                Enable Background Music?
              </h3>
              <p className="text-sm text-storm-muted mb-6">
                Enhance your experience with ambient music while browsing.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-storm-muted hover:text-storm-light hover:border-white/20 transition-all text-sm font-medium"
                >
                  No thanks
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-storm-red hover:bg-storm-red-dark text-white transition-all text-sm font-bold glow-btn"
                >
                  Play Music
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause toggle in header area */}
      {asked && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          onClick={togglePlay}
          className="fixed top-[18px] right-20 md:right-48 z-[52] w-8 h-8 rounded-full bg-storm-gray/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-storm-red/40 hover:bg-storm-gray transition-all duration-300 group"
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            /* Pause icon with animated bars */
            <div className="flex items-center gap-[3px]">
              <span className="w-[2px] h-3 bg-storm-red rounded-full animate-pulse" />
              <span className="w-[2px] h-3 bg-storm-red rounded-full animate-pulse [animation-delay:0.15s]" />
            </div>
          ) : (
            /* Play icon */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#E63946">
              <path d="M2 1l9 5-9 5V1z" />
            </svg>
          )}
        </motion.button>
      )}
    </>
  );
}
