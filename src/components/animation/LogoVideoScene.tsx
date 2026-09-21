import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SAFETY_MS = 20_000;

export default function LogoVideoScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const video = videoRef.current;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onCompleteRef.current();
    };

    if (!video) {
      finish();
      return;
    }

    video.playbackRate = 1;
    const onEnded = () => finish();
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onEnded);
    const playAttempt = video.play();
    if (playAttempt?.catch) playAttempt.catch(() => finish());

    const safety = window.setTimeout(finish, SAFETY_MS);
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onEnded);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-[#161A24] z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <video
        ref={videoRef}
        src="/sapex-animation.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
