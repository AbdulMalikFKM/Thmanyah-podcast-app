"use client";
import Image from "next/image";
import { Mic, Headphones, Play, ChevronDown, Loader2, X } from "lucide-react";
import { Podcast } from "../types/podcast";
import Link from "next/link";

interface PodcastGridProps {
  podcasts: Podcast[];
  onShowMore: () => void;
  totalCount: number;
  isLoading: boolean;
  selectedGenre: string | null;
  onClearGenre: () => void;
  isFiltering: boolean;
}

export default function PodcastGrid({
  podcasts,
  onShowMore,
  totalCount,
  isLoading,
  selectedGenre,
  onClearGenre,
  isFiltering,
}: PodcastGridProps) {
  const hasMore = podcasts.length < totalCount;

  return (
    <section
      className={`py-20 relative bg-[#0a0a0b] transition-all duration-700 ${isFiltering ? "pt-32" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/2 backdrop-blur-3xl rounded-[3rem] p-8 sm:p-12 border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-white">
                  {isFiltering ? "نتائج البحث" : "جميع البودكاست"}
                </h2>

                {selectedGenre && (
                  <button
                    onClick={onClearGenre}
                    className="flex items-center gap-2 px-4 py-1.5 bg-orange-600/20 border border-orange-600/40 text-orange-500 rounded-full text-xs font-bold hover:bg-orange-600 hover:text-white transition-all cursor-pointer group"
                  >
                    <span>{selectedGenre}</span>
                    <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                  </button>
                )}
              </div>
              <p className="text-white/50">
                {isFiltering
                  ? `تم العثور على ${totalCount} بودكاست`
                  : "اكتشف مكتبتنا الكاملة من البودكاست عالية الجودة"}
              </p>
            </div>
          </div>

          {/* Grid mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <Link
                href={`/podcast/${podcast.collectionId}`}
                key={podcast.collectionId}
                className="group relative bg-white/3 rounded-4xl overflow-hidden border border-white/5 hover:border-orange-600/30 transition-all duration-500 hover:-translate-y-2 shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={podcast.image.replace(/\d+x\d+/, "600x600")}
                    alt={podcast.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                  <button className="absolute bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-orange-600 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-orange-600/40">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {podcast.name}
                  </h3>
                  <p className="text-white/50 mb-4 flex items-center gap-2 text-sm">
                    <Mic className="w-4 h-4 text-orange-500" /> {podcast.artist}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-white/40 flex items-center gap-2 font-medium">
                      <Headphones className="w-3.5 h-3.5" />{" "}
                      {podcast.episodeCount} حلقة
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty Search Results State */}
          {podcasts.length === 0 && !isLoading && (
            <div className="py-20 text-center">
              <p className="text-white/40 text-lg italic">
                لا توجد نتائج تطابق بحثك...
              </p>
              <button
                onClick={onClearGenre}
                className="mt-4 text-orange-500 hover:underline cursor-pointer"
              >
                العودة للرئيسية
              </button>
            </div>
          )}

          {hasMore && (
            <div className="flex items-center justify-center mt-16">
              <button
                onClick={onShowMore}
                disabled={isLoading}
                className="flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-600 hover:text-white transition-all hover:scale-105 shadow-2xl cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {" "}
                    عرض المزيد <ChevronDown className="w-5 h-5" />{" "}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
