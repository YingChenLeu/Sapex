import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FADE_MS = 600;
const SAFETY_TIMEOUT_MS = 20_000;

function hideSplashElement(splash: HTMLElement, onDone: () => void) {
  splash.classList.add("is-fading");
  window.setTimeout(() => {
    splash.remove();
    document.body.style.overflow = "";
    onDone();
  }, FADE_MS);
}

export function RootIntroSplash({ contentReady }: { contentReady: boolean }) {
  const location = useLocation();
  const [show, setShow] = useState(
    () => typeof document !== "undefined" && !!document.getElementById("intro-splash")
  );
  const finishedRef = useRef(false);
  const [videoDone, setVideoDone] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    const splash = document.getElementById("intro-splash");
    if (!splash) {
      finishedRef.current = true;
      document.body.style.overflow = "";
      setShow(false);
      return;
    }
    finishedRef.current = true;
    hideSplashElement(splash, () => setShow(false));
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      document.getElementById("intro-splash")?.remove();
      document.body.style.overflow = "";
      setShow(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!show) return;

    const video = document.getElementById(
      "intro-splash-video"
    ) as HTMLVideoElement | null;

    if (!video) {
      setVideoDone(true);
      return;
    }

    video.playbackRate = 1;

    const markDone = () => setVideoDone(true);
    const keepNormalSpeed = () => {
      if (video.playbackRate !== 1) video.playbackRate = 1;
    };

    if (video.ended) markDone();

    video.addEventListener("ended", markDone);
    video.addEventListener("error", markDone);
    video.addEventListener("ratechange", keepNormalSpeed);

    const safety = window.setTimeout(markDone, SAFETY_TIMEOUT_MS);

    return () => {
      video.removeEventListener("ended", markDone);
      video.removeEventListener("error", markDone);
      video.removeEventListener("ratechange", keepNormalSpeed);
      window.clearTimeout(safety);
    };
  }, [show]);

  useEffect(() => {
    if (!show || !videoDone) return;
    if (contentReady) {
      finish();
      return;
    }
    const grace = window.setTimeout(finish, 1500);
    return () => window.clearTimeout(grace);
  }, [show, videoDone, contentReady, finish]);

  return null;
}
