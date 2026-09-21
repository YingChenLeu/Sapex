import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GoogleSearchScene from "./animation/GoogleSearchScene";
import LogoVideoScene from "./animation/LogoVideoScene";
import ShowcaseReel from "./animation/ShowcaseReel";

type Act = "google" | "logo" | "showcase" | "black";

export default function AnimationPage() {
  const [act, setAct] = useState<Act>("google");
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const replay = useCallback(() => {
    setAct("google");
    setRunId((n) => n + 1);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      <video
        src="/sapex-animation.mp4"
        muted
        preload="auto"
        className="hidden"
        aria-hidden
      />

      <AnimatePresence>
        {act === "google" && (
          <GoogleSearchScene
            key={`google-${runId}`}
            onComplete={() => setAct("logo")}
          />
        )}
        {act === "logo" && (
          <LogoVideoScene
            key={`logo-${runId}`}
            onComplete={() => setAct("showcase")}
          />
        )}
        {act === "showcase" && (
          <ShowcaseReel
            key={`showcase-${runId}`}
            onComplete={() => setAct("black")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {act === "black" && (
          <motion.div
            className="absolute inset-0 z-50 bg-black flex items-end justify-center pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              type="button"
              onClick={replay}
              className="pointer-events-auto text-sm tracking-[0.2em] uppercase text-white/40 hover:text-[#A8D3CC] transition-colors font-syncopate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Replay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
