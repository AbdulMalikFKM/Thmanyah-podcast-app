export default function PodcastSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Header Skeleton */}
      <div className="h-100 bg-white/5 w-full flex flex-col justify-end pb-12 px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row-reverse gap-8 items-center md:items-end">
          <div className="flex-1 space-y-4 w-full">
            <div className="h-6 w-20 bg-orange-600/20 rounded-full" />
            <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-6 w-1/2 bg-white/5 rounded-lg" />
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-3xl" />
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="h-14 w-full bg-white/5 rounded-2xl" />
      </div>

      {/* Episodes List Skeleton */}
      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 w-full bg-white/3 rounded-2xl border border-white/5"
          />
        ))}
      </div>
    </div>
  );
}
