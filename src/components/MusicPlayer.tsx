"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_TRACKS = [
  { youtubeId: "k2qgadSvNyU", startAt: 12, title: "Track 1" },
];

// Extend window for YouTube API
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    window.onYouTubeIframeAPIReady = () => resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
}

export default function MusicPlayer() {
  const [asked, setAsked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show prompt after loading screen
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

  const createPlayer = useCallback(
    (trackIndex: number) => {
      const track = MUSIC_TRACKS[trackIndex];

      // Destroy existing player
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      // Create fresh div for the player
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        const div = document.createElement("div");
        div.id = "yt-music-player";
        containerRef.current.appendChild(div);
      }

      playerRef.current = new window.YT.Player("yt-music-player", {
        height: "40",
        width: "40",
        videoId: track.youtubeId,
        playerVars: {
          autoplay: 1,
          start: track.startAt,
          loop: 1,
          playlist: track.youtubeId,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.setVolume(volume);
            event.target.playVideo();
          },
        },
      });
    },
    [volume]
  );

  const startMusic = useCallback(
    async (trackIndex: number) => {
      await loadYouTubeAPI();
      createPlayer(trackIndex);
    },
    [createPlayer]
  );

  const handleAccept = () => {
    setShowPrompt(false);
    setAsked(true);
    setPlaying(true);
    startMusic(0);
  };

  const handleDecline = () => {
    setShowPrompt(false);
    setAsked(true);
    sessionStorage.setItem("music-dismissed", "1");
  };

  const togglePlay = () => {
    if (!playerRef.current) {
      setPlaying(true);
      startMusic(currentTrack);
      return;
    }
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      // Playing -> pause
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      // Paused/other -> play
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % MUSIC_TRACKS.length;
    setCurrentTrack(next);
    setPlaying(true);
    startMusic(next);
  };

  const prevTrack = () => {
    const prev =
      (currentTrack - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrack(prev);
    setPlaying(true);
    startMusic(prev);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
    }
  };

  return (
    <>
      {/* YouTube player container — positioned behind the music controller button
          Must remain "visible" (not display:none, not opacity:0, not off-screen)
          for browser autoplay policies to allow audio on remote domains */}
      <div
        ref={containerRef}
        className="fixed bottom-6 left-6 w-10 h-10 overflow-hidden pointer-events-none"
        style={{ zIndex: 89, clipPath: "inset(0 0 0 0)" }}
      />

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

      {/* Bottom-left floating controller */}
      {asked && (
        <div className="fixed bottom-6 left-6 z-[90]">
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setExpanded(true)}
                className="w-10 h-10 rounded-full bg-storm-dark/90 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-storm-red/40 transition-all duration-300 group shadow-lg shadow-black/30"
                aria-label="Open music controller"
              >
                {playing ? (
                  <div className="flex items-end gap-[2px] h-3.5">
                    <span className="w-[2.5px] rounded-full bg-storm-red animate-[eq1_0.8s_ease-in-out_infinite]" style={{ height: "60%" }} />
                    <span className="w-[2.5px] rounded-full bg-storm-red animate-[eq2_0.7s_ease-in-out_infinite]" style={{ height: "100%" }} />
                    <span className="w-[2.5px] rounded-full bg-storm-red animate-[eq3_0.9s_ease-in-out_infinite]" style={{ height: "40%" }} />
                  </div>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, width: 40, borderRadius: 20 }}
                animate={{ opacity: 1, width: 220, borderRadius: 16 }}
                exit={{ opacity: 0, width: 40, borderRadius: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="bg-storm-dark/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40 overflow-hidden"
                style={{ borderRadius: 16 }}
              >
                <div className="p-3">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex-1 overflow-hidden mr-2">
                      <p className="text-[10px] tracking-widest uppercase text-storm-red font-medium truncate">
                        Now Playing
                      </p>
                      <p className="text-xs text-storm-light truncate">
                        {MUSIC_TRACKS[currentTrack].title}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpanded(false)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-storm-muted hover:text-storm-light transition-colors shrink-0"
                      aria-label="Collapse"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
                        <path d="M2 3.5L5 6.5L8 3.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3 mb-2.5">
                    <button onClick={prevTrack} className="text-storm-muted hover:text-storm-light transition-colors" aria-label="Previous">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                    </button>
                    <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-storm-red/20 hover:bg-storm-red/30 flex items-center justify-center transition-all" aria-label={playing ? "Pause" : "Play"}>
                      {playing ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="#E63946"><rect x="2" y="1" width="3" height="10" rx="0.5" /><rect x="7" y="1" width="3" height="10" rx="0.5" /></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="#E63946"><path d="M3 1l8 5-8 5V1z" /></svg>
                      )}
                    </button>
                    <button onClick={nextTrack} className="text-storm-muted hover:text-storm-light transition-colors" aria-label="Next">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                    </button>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                      {volume > 50 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                    </svg>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolume}
                      className="w-full h-1 appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-storm-red [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-storm-red [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                      style={{ background: `linear-gradient(to right, #E63946 ${volume}%, #1A1A1A ${volume}%)` }}
                    />
                    <span className="text-[9px] text-storm-muted w-6 text-right shrink-0">{volume}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
