"use client";

export default function MainSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      {/* Hero/Title Skeleton */}
      <div className="space-y-4 text-right">
        <div className="h-10 w-48 bg-white/10 rounded-lg ml-auto" />
        <div className="h-6 w-64 bg-white/5 rounded-lg ml-auto" />
      </div>

      {/* Trending Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="space-y-4">
            {/* The Image Square */}
            <div className="aspect-square w-full bg-white/5 rounded-3xl border border-white/5" />
            {/* The Text Lines */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-white/10 rounded ml-auto" />
              <div className="h-3 w-1/2 bg-white/5 rounded ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
