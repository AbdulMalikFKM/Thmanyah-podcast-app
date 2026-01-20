"use client";
import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const { currentEpisode, isPlaying, setIsPlaying } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  // New States for Progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying, currentEpisode]);

  // Function to format seconds (e.g., 95 -> "1:35")
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121214]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Progress Bar (Scrubber) */}
        <div className="flex items-center gap-3 w-full group">
          <span className="text-[10px] text-white/40 tabular-nums w-8">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600 hover:h-1.5 transition-all"
          />
          <span className="text-[10px] text-white/40 tabular-nums w-8">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Episode Info (Right side in RTL) */}
          <div className="flex items-center gap-4 w-1/3 flex-row-reverse text-right">
            <img
              src={currentEpisode.image}
              alt=""
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="overflow-hidden">
              <h5 className="text-sm font-bold truncate text-white">
                {currentEpisode.title}
              </h5>
              <p className="text-xs text-white/40 truncate">
                {currentEpisode.artist}
              </p>
            </div>
          </div>

          {/* Controls (Center) */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime -= 10;
              }}
              className="text-white/40 hover:text-white transition"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition shadow-lg shadow-white/5"
            >
              {isPlaying ? (
                <Pause size={20} fill="black" />
              ) : (
                <Play size={20} fill="black" className="ml-0.5" />
              )}
            </button>
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime += 30;
              }}
              className="text-white/40 hover:text-white transition"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume (Left side in RTL) */}
          <div className="flex items-center justify-start gap-3 w-1/3 text-white/40">
            <Volume2 size={18} />
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
              <div className="w-2/3 h-full bg-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
