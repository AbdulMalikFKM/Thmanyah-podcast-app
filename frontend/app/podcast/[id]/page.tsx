"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Play,
  Calendar,
  Clock,
  ChevronRight,
  Mic,
  Info,
  Pause,
  Search,
  X,
} from "lucide-react";
// import { Podcast } from "../../page";
import { Podcast, Episode } from "@/app/types/podcast";
import { usePlayer } from "@/app/context/PlayerContext";
import ExpandableDescription from "@/app/components/ExpandableDescription";
import PodcastSkeleton from "@/app/components/PodcastSkeleton";

export default function PodcastDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { playEpisode, currentEpisode, isPlaying } = usePlayer();

  // 1. Filter Logic (Already in your code, now used below)
  const filteredEpisodes =
    podcast?.episodes?.filter(
      (episode: Episode) =>
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/podcasts/${id}`);
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-brand-bg">
        <PodcastSkeleton />
      </div>
    );

  if (!podcast)
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-white text-right p-10">
        لم يتم العثور على البودكاست
      </div>
    );

  return (
    <main className="min-h-screen bg-brand-bg text-white pb-32">
      {/* Header / Hero Section */}
      <section className="relative h-100 w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={podcast.image.replace(/\d+x\d+/, "1000x1000")}
            alt={podcast.name}
            fill
            className="object-cover blur-3xl opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-brand-bg/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
          <button
            onClick={() => router.back()}
            className="absolute top-10 right-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>العودة</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end text-right">
            <div className="relative w-48 h-48 md:w-64 md:h-64 shadow-2xl rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={podcast.image.replace(/\d+x\d+/, "1000x1000")}
                alt={podcast.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <span className="px-4 py-1 bg-orange-600 text-xs font-bold rounded-full">
                بودكاست
              </span>
              <h1 className="text-4xl md:text-6xl font-black">
                {podcast.name}
              </h1>
              <div className="flex items-center gap-4 text-white/60">
                <span className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-orange-500" /> {podcast.artist}
                </span>
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-orange-500" />{" "}
                  {/* {podcast.episodeCount} حلقة */}
                  {podcast.episodes?.length ?? 0} حلقة
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 Search Bar Section */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="relative group">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="بحث في الحلقات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-right"
            aria-label="بحث عن بودكاست"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-sm text-white/40 mt-3 text-right px-2">
            تم العثور على {filteredEpisodes.length} حلقة
          </p>
        )}
      </div>

      {/* Episodes List Section */}
      <section className="max-w-5xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-8 text-right">الحلقات المتاحة</h2>

        <div className="space-y-4">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode: Episode, index: number) => (
              <div
                key={index}
                className="group flex flex-row-reverse items-start gap-6 p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-orange-600/30 hover:bg-white/6 transition-all"
              >
                {/* Play Button - flex-shrink-0 is crucial here */}
                <button
                  onClick={() =>
                    playEpisode({
                      title: episode.title,
                      audioUrl: episode.audioUrl,
                      artist: podcast.artist,
                      image: podcast.image,
                    })
                  }
                  aria-label={
                    isPlaying && currentEpisode?.audioUrl === episode.audioUrl
                      ? "إيقاف مؤقت"
                      : "تشغيل الحلقة"
                  }
                  className="w-14 h-14 flex shrink-0 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                >
                  {currentEpisode?.audioUrl === episode.audioUrl &&
                  isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {/* Episode Details Container - min-w-0 prevents shrinking issues */}
                <div className="text-right flex-1 min-w-0">
                  <h4 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors truncate">
                    {episode.title}
                  </h4>

                  <div className="mb-4">
                    <ExpandableDescription text={episode.description} />
                  </div>

                  <div className="flex flex-row-reverse items-center gap-6 text-sm text-white/40">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(episode.pubDate).toLocaleDateString("ar-SA")}
                    </span>
                    <span className="flex items-center gap-1.5 text-orange-500/80 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {episode.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <p className="text-white/40">لا توجد حلقات تطابق بحثك</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
