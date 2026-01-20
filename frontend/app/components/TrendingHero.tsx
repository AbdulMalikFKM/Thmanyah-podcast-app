"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Mic, ChevronRight, ChevronLeft, Headphones } from "lucide-react";
import Link from "next/link";
import { Podcast } from "../types/podcast";

interface TrendingHeroProps {
  podcasts: Podcast[];
}

export default function TrendingHero({ podcasts }: TrendingHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    if (!podcasts.length) return;
    setCurrentIndex((prev) => (prev + 1) % podcasts.length);
  }, [podcasts.length]);

  const handlePrev = () => {
    if (!podcasts.length) return;
    setCurrentIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  if (!podcasts || podcasts.length < 3) return null;

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-brand-bg">
      {/* Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Logic */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            الأكثر رواجاً الآن
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm cursor-pointer group"
            >
              <ChevronRight className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm cursor-pointer group"
            >
              <ChevronLeft className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* The Sliding Track */}
        <div className="relative h-112.5 sm:h-125 flex items-center justify-center overflow-visible">
          {podcasts.map((podcast, i) => {
            // Logic to calculate the relative position
            let offset = i - currentIndex;

            // Handle circular loop logic
            if (offset < -Math.floor(podcasts.length / 2))
              offset += podcasts.length;
            if (offset > Math.floor(podcasts.length / 2))
              offset -= podcasts.length;

            // Only render cards that are close to the center to save performance
            const isVisible = Math.abs(offset) <= 2;
            const isActive = offset === 0;

            return (
              <Link
                href={`/podcast/${podcast.collectionId}`}
                key={podcast.collectionId}
                className={`absolute transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
                  isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  // The offset * 400 determines the gap between cards
                  transform: `translateX(${offset * -400}px) scale(${isActive ? 1 : 0.8})`,
                  zIndex: isActive ? 30 : 10,
                  filter: isActive ? "none" : "grayscale(80%) blur(2px)",
                }}
              >
                <div
                  className={`relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 
                  ${isActive ? "w-[320px] sm:w-105" : "w-75 sm:w-95 opacity-40"} 
                  aspect-square`}
                >
                  <Image
                    src={podcast.image.replace(/\d+x\d+/, "1000x1000")}
                    alt={podcast.name}
                    fill
                    priority={isActive}
                    className="object-cover"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  />

                  {/* Information Overlay (Only on Center Card) */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-brand-bg/20 to-transparent" />

                      {/* Rank Badge */}
                      <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center shadow-2xl">
                        <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">
                          الترتيب
                        </span>
                        <span className="text-white font-black text-xl">
                          #{podcast.rank}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-10 text-right">
                        <div className="mb-2">
                          <span className="inline-block px-4 py-1 bg-orange-600 text-white text-[10px] font-black rounded-full mb-4">
                            رائج
                          </span>
                          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                            {podcast.name}
                          </h3>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-white/90 text-sm flex items-center gap-2">
                              <Mic className="w-3.5 h-3.5 text-orange-500" />{" "}
                              {podcast.artist}
                            </span>
                            <span className="flex items-center gap-2 text-sm text-white/60">
                              <Headphones className="w-3.5 h-3.5 text-orange-500" />{" "}
                              {podcast.episodeCount} حلقة
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {podcasts.slice(0, 10).map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === currentIndex
                  ? "w-8 bg-orange-600"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
