"use client";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TrendingHero from "./components/TrendingHero";
import GenreCloud from "./components/GenreCloud";
import PodcastGrid from "./components/PodcastGrid";
import MainSkeleton from "./components/MainSkeleton";
import { Podcast } from "./types/podcast";
import { API_URL } from "./config/api";

export default function Home() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(9);

  // Load Initial Trending State
  const loadTrending = async () => {
    setIsLoading(true);
    setHasSearched(false);
    setSelectedGenre(null);
    setDisplayLimit(9);
    try {
      const response = await fetch(`${API_URL}/podcasts/trending`);
      const data = await response.json();
      setPodcasts(data);
    } catch (error) {
      console.error("Failed to load trending", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  // Handle Search & Genre Clicks
  const handleSearch = async (term: string, isGenre = false) => {
    if (!term) return;
    setIsLoading(true);
    setHasSearched(true);
    if (isGenre) setSelectedGenre(term);
    else setSelectedGenre(null); // Clear genre if it's a manual text search

    setDisplayLimit(9);
    try {
      const response = await fetch(
        `${API_URL}/podcasts/search?term=${encodeURIComponent(term)}`,
      );
      const data = await response.json();
      setPodcasts(data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logic: Are we in search/filter mode?
  const isFiltering = hasSearched || selectedGenre;

  return (
    <main className="bg-brand-bg min-h-screen">
      {isLoading ? (
        <MainSkeleton />
      ) : (
        <>
          <SearchBar
            onSearch={(term) => handleSearch(term)}
            onReset={loadTrending}
          />

          <div className="transition-all duration-500">
            {/* discovery sections: only show if NOT filtering */}
            {!isFiltering && (
              <>
                <TrendingHero podcasts={podcasts.slice(0, 10)} />
                <GenreCloud
                  onGenreSelect={(genre) => handleSearch(genre, true)}
                />
              </>
            )}

            {/* Results section */}
            <PodcastGrid
              podcasts={podcasts.slice(0, displayLimit)}
              onShowMore={() => setDisplayLimit((prev) => prev + 9)}
              totalCount={podcasts.length}
              isLoading={isLoading}
              selectedGenre={selectedGenre}
              onClearGenre={loadTrending}
              isFiltering={!!isFiltering}
            />
          </div>
        </>
      )}
    </main>
  );
}
