"use client";

const GENRES = [
  { name: "تاريخ", color: "234, 88, 12", top: "20%", left: "15%", size: "lg" },
  {
    name: "تكنولوجيا",
    color: "59, 130, 246",
    top: "15%",
    left: "45%",
    size: "base",
  },
  { name: "مجتمع", color: "139, 92, 246", top: "25%", left: "75%", size: "lg" },
  { name: "ثقافة", color: "236, 72, 153", top: "55%", left: "25%", size: "sm" },
  {
    name: "بزنس",
    color: "16, 185, 129",
    top: "50%",
    left: "55%",
    size: "base",
  },
  { name: "علوم", color: "6, 182, 212", top: "55%", left: "85%", size: "sm" },
  { name: "صحة", color: "245, 158, 11", top: "80%", left: "10%", size: "sm" },
  { name: "رياضة", color: "20, 184, 166", top: "75%", left: "70%", size: "sm" },
];

interface GenreCloudProps {
  onGenreSelect: (genre: string) => void;
}

export default function GenreCloud({ onGenreSelect }: GenreCloudProps) {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            اكتشف عالم البودكاست
          </h2>
          <p className="text-white/60 text-lg">
            اختر التصنيف المفضل لديك وابدأ رحلتك
          </p>
        </div>

        <div className="relative h-112.5 rounded-[3rem] overflow-hidden border border-white/5 bg-white/2 backdrop-blur-3xl">
          {GENRES.map((genre, idx) => (
            <button
              key={genre.name}
              onClick={() => onGenreSelect(genre.name)}
              className="absolute cursor-pointer whitespace-nowrap font-bold rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-lg animate-float"
              style={{
                left: genre.left,
                top: genre.top,
                backgroundColor: `rgba(${genre.color}, 0.15)`,
                color: `rgb(${genre.color})`,
                border: `1.5px solid rgb(${genre.color}, 0.5)`,
                boxShadow: `0 0 20px rgba(${genre.color}, 0.2)`,
                animationDelay: `${idx * 0.2}s`, // Staggered animation
                padding:
                  genre.size === "lg"
                    ? "1rem 2rem"
                    : genre.size === "base"
                      ? "0.75rem 1.5rem"
                      : "0.5rem 1.25rem",
                fontSize:
                  genre.size === "lg"
                    ? "1.125rem"
                    : genre.size === "base"
                      ? "1rem"
                      : "0.875rem",
              }}
            >
              {genre.name}
            </button>
          ))}

          {/* Animated Background logic */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 19) % 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
