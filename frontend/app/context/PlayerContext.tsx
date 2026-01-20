"use client";
import React, { createContext, useContext, useState } from "react";

interface Episode {
  title: string;
  audioUrl: string;
  artist: string;
  image: string;
}

interface PlayerContextType {
  currentEpisode: Episode | null;
  playEpisode: (episode: Episode) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{ currentEpisode, playEpisode, isPlaying, setIsPlaying }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};
