import { createContext, useContext, type ReactNode } from "react";

const PlaybackSpeedContext = createContext(1);

/** Scales FeatureShowcase scene loops, mock cursor, and typed input. Default 1. */
export function PlaybackSpeedProvider({
  speed,
  children,
}: {
  speed: number;
  children: ReactNode;
}) {
  return (
    <PlaybackSpeedContext.Provider value={speed}>
      {children}
    </PlaybackSpeedContext.Provider>
  );
}

export function usePlaybackSpeed() {
  return useContext(PlaybackSpeedContext);
}
